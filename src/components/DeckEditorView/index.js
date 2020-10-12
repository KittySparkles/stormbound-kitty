import React from 'react'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import { CollectionContext } from '../CollectionProvider'
import { PersonalDecksContext } from '../PersonalDecksProvider'
import Article from '../Article'
import CollectionClearHint from '../CollectionClearHint'
import CardLevelField from '../DeckCardLevelField'
import CardsFiltering from '../CardsFiltering'
import CardsGallery from '../CardsGallery'
import Checkbox from '../Checkbox'
import Column from '../Column'
import Deck from '../Deck'
import EmptySearch from '../EmptySearch'
import Filters from '../DeckEditorFilters'
import ImportCollection from '../ImportCollection'
import Info from '../Info'
import LearnMoreIcon from '../LearnMoreIcon'
import Only from '../Only'
import PageMeta from '../PageMeta'
import RandomDeckButton from '../RandomDeckButton'
import ResetButton from '../ResetButton'
import Row from '../Row'
import ShareButton from '../DeckShareButton'
import Title from '../Title'
import getDeckBuilderMetaTags from '../../helpers/getDeckBuilderMetaTags'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import isSuggestedDeck from '../../helpers/isSuggestedDeck'
import modifyDeck from '../../helpers/modifyDeck'
import serialisation from '../../helpers/serialisation'
import getFactionFromDeckID from '../../helpers/getFactionFromDeckID'
import useViewportWidth from '../../hooks/useViewportWidth'
import usePrevious from '../../hooks/usePrevious'
import { CATEGORIES } from '../../constants/decks'
import { BRAWLS } from '../../constants/brawl'

import './index.css'

// The `adjustCardToCollection` function is used to access the card data as it
// exists in the user’s collection. It is therefore only called when there is
// a custom collection.
const adjustCardToCollection = collection => ({ id }) => {
  const { level, missing } = collection.find(card => card.id === id)
  return missing ? null : { id, level }
}

const useModifiedDeck = deck => {
  const matchedDeck = isSuggestedDeck(deck)

  // In case the deck is in fact a suggested deck, and a brawl deck at that, it
  // should be adjusted to reflect the brawl modifier. This is especially
  // important for mana brawls in order to display the correct card mana cost.
  if (matchedDeck && matchedDeck.brawl) {
    return modifyDeck(deck, matchedDeck.brawl)
  }

  return deck
}

const useArticleProps = deck => {
  // Retrieve whether the given deck is one of the suggested decks, in which
  // case we can display more information on screen.
  const matchedDeck = isSuggestedDeck(deck) || {}
  const id = serialisation.deck.serialise(deck)
  const { decks, addDeck, removeDeck, toggleUnseen } = React.useContext(
    PersonalDecksContext
  )
  const props = {}

  props.title = matchedDeck.name || 'Create your deck'
  props.author = matchedDeck.author

  if (matchedDeck.category) {
    props.meta = `${CATEGORIES[matchedDeck.category]} deck`

    if (matchedDeck.category === 'BRAWL') {
      props.meta += `(${BRAWLS.find(b => b.id === matchedDeck.brawl).title})`
    }
  } else {
    props.meta = getFactionFromDeckID(id) + ' deck'
  }

  // This check is performed on the deck ID instead of its UUID because only
  // bookmarked decks have a UUID; the others do not. To know whether a deck has
  // been bookmarked, we need to see if it exists in the bookmarked collection.
  const bookmark = decks.find(deck => deck.id === id)

  props.action = {
    onClick: () => {
      toggleUnseen(!bookmark)
      bookmark ? removeDeck(bookmark.uuid) : addDeck(matchedDeck)
    },
    children: bookmark ? 'Unbookmark deck' : 'Bookmark deck',
    icon: 'star',
    disabled: deck.length !== 12,
  }

  return props
}

const DeckEditorView = React.memo(function DeckEditorView(props) {
  const viewportWidth = useViewportWidth()
  const { deckId } = useRouteMatch().params
  const history = useHistory()
  const { collection, hasDefaultCollection } = React.useContext(
    CollectionContext
  )
  // `cardLevel` is set to `0` when the user has a custom collection loaded and
  // expects the card levels to be the ones of the collection. This is done to
  // always have a number (0 for custom levels, 1 to 5 for static levels). Note
  // that this is for the card gallery, and not the cards of the deck itself.
  const [cardLevel, setCardLevel] = React.useState(hasDefaultCollection ? 1 : 0)
  const [cardTooltips, setCardTooltips] = React.useState(false)
  const [adjustCardLevels, setAdjustCardLevels] = React.useState(false)
  const previousAdjustCardLevels = usePrevious(adjustCardLevels)
  // The `originalDeckId` contains the deck ID as loaded from the URL before it
  // gets adjusted to the collection card levels when the user checks the
  // associated checkbox: this is necessary to be able to restore the original
  // deck when the user unchecks said checkbox.
  const [originalDeckId, setOriginalDeckId] = React.useState(null)

  const captureKeyboardEvents = React.useCallback(
    event => {
      const key = event.which
      const keys = [49, 50, 51, 52, 53]
      const padKeys = [97, 98, 99, 100, 101]

      if (keys.includes(key) || padKeys.includes(key)) {
        const level = Math.max(keys.indexOf(key), padKeys.indexOf(key))
        setCardLevel(level + 1)
      } else if ([48, 96].includes(key) && !hasDefaultCollection) {
        setCardLevel(0)
      }
    },
    [hasDefaultCollection]
  )

  React.useEffect(() => {
    document.addEventListener('keydown', captureKeyboardEvents)
    return () => document.removeEventListener('keydown', captureKeyboardEvents)
  }, [captureKeyboardEvents])

  // Compute the “adjusted deck ID” which is the ID of the deck once the level
  // of cards (or absence of cards in case of missing) is adjusted to the ones
  // of the collection. Therefore, when the collection is the default one, the
  // adjusted deck ID is the same as the deck ID.
  const adjustedDeck = hasDefaultCollection
    ? props.deck
    : props.deck.map(adjustCardToCollection(collection)).filter(Boolean)
  const adjustedDeckId = hasDefaultCollection
    ? deckId
    : serialisation.deck.serialise(adjustedDeck)

  // If the `adjustCardLevels` option is enabled, and the deck ID and adjusted
  // deck ID are different, we need to redirect to the adjusted deck ID path
  // so it loads the correct data.
  const shouldAdjustDeckToCollection =
    adjustCardLevels && deckId && deckId !== adjustedDeckId
  const adjustedRedirectPath = `/deck/${adjustedDeckId}`

  React.useEffect(() => {
    if (shouldAdjustDeckToCollection) {
      setOriginalDeckId(deckId)
      history.push(adjustedRedirectPath)
    }
    // There is no need for `history`, `deckId` and `adjustedRedirectPath` to be
    // passed as dependencies.
    // eslint-disable-next-line
  }, [shouldAdjustDeckToCollection])

  // If the `adjustCardLevels` option is turn off, and we have the original deck
  // ID (which we should always have), we can redirect to it to restore the
  // original data.
  const shouldRestoreOriginalDeck =
    previousAdjustCardLevels && !adjustCardLevels && originalDeckId
  const restoredRedirectPath = `/deck/${originalDeckId}`

  React.useEffect(() => {
    if (shouldRestoreOriginalDeck) {
      history.push(restoredRedirectPath)
    }
    // There is no need for `history` and `restoredRedirectPath` to be passed as
    // dependencies.
    // eslint-disable-next-line
  }, [shouldRestoreOriginalDeck])

  // Compute the card collection and its level based on whether there is in fact
  // a custom collection, and whether the levels should be the ones of the
  // collection.
  const cardCollection = collection.map(card =>
    getResolvedCardData({
      ...card,
      level: cardLevel === 0 && !hasDefaultCollection ? card.level : cardLevel,
    })
  )

  const deck = useModifiedDeck(props.deck)
  const articleProps = useArticleProps(deck)

  return (
    <Article {...articleProps}>
      <Article.FullWidth style={{ fontSize: '85%' }}>
        <Row desktopOnly wideGutter>
          <Column width='1/3'>
            <Title style={{ marginTop: 0 }}>Deck</Title>

            <Deck
              showUpgrades
              showTooltips={cardTooltips}
              id='deck'
              deck={deck}
              orientation={viewportWidth >= 700 ? 'vertical' : 'horizontal'}
              onClick={props.removeCardFromDeck}
              onClickLabel='Remove card from deck'
              highlightedCards={props.highlightedCards}
            />

            {deckId && (
              <Only.Desktop>
                <CardTooltipsCheckbox
                  value={cardTooltips}
                  set={setCardTooltips}
                />
              </Only.Desktop>
            )}

            {(deckId !== adjustedDeckId || adjustCardLevels) && (
              <CardLevelsCheckbox
                value={adjustCardLevels}
                set={setAdjustCardLevels}
              />
            )}

            {deck.length > 0 ? (
              <DeckActions reset={props.reset} />
            ) : (
              <HelpInfo defineDeck={props.defineDeck} />
            )}

            <Only.Desktop>
              <CollectionInfo
                onCollectionImport={collection =>
                  // When importing a custom collection, set the card levels in
                  // the gallery to the ones from the collection (`0`).
                  collection ? setCardLevel(0) : undefined
                }
              />
            </Only.Desktop>
          </Column>

          <Column width='2/3'>
            <Title style={{ marginTop: 0 }}>Cards</Title>

            <CardsFiltering cards={cardCollection}>
              {({
                filters,
                filtersSetters,
                collection,
                resetFilters,
                cardsPerPage,
              }) => (
                <>
                  <Filters
                    {...filters}
                    {...filtersSetters}
                    resetFilters={resetFilters}
                  />

                  {collection.length > 0 ? (
                    <Gallery
                      filter={filters}
                      collection={collection}
                      addCardToDeck={props.addCardToDeck}
                      cardsPerPage={cardsPerPage}
                      cardLevel={cardLevel}
                      setCardLevel={setCardLevel}
                      deck={props.deck}
                    />
                  ) : (
                    <EmptySearch
                      title='No cards found'
                      resetFilters={resetFilters}
                    />
                  )}
                </>
              )}
            </CardsFiltering>
          </Column>
        </Row>
      </Article.FullWidth>

      <PageMeta {...getDeckBuilderMetaTags(deck, 'Deck Builder')} />
    </Article>
  )
})

const Gallery = React.memo(function Gallery(props) {
  const { hasDefaultCollection } = React.useContext(CollectionContext)
  const { collection, cardLevel, setCardLevel, addCardToDeck, deck } = props
  const deckIds = deck.map(card => card.id)

  const isCardMissing = id => collection.find(card => card.id === id).missing
  const isCardInDeck = id => deckIds.includes(id)

  // The `resolveCardLevel` function is used to know at which level to add card
  // to the deck. When the levels are adjusted to the ones of the custom
  // collection (`0`), it reads the level from the collection, otherwise it uses
  // the value of `cardLevel`.
  const resolveCardLevel = id =>
    cardLevel === 0 && !hasDefaultCollection
      ? collection.find(card => card.id === id).level
      : +cardLevel

  const onCardClick = id =>
    isCardMissing(id)
      ? undefined
      : addCardToDeck({ id, level: resolveCardLevel(id) })

  return (
    <CardsGallery
      filters={props.filters}
      cards={collection}
      onCardClick={onCardClick}
      cardsPerPage={props.cardsPerPage}
      isCardInDeck={isCardInDeck}
      isCardMissing={isCardMissing}
      navChildren={
        <CardLevelField cardLevel={cardLevel} setCardLevel={setCardLevel} />
      }
    />
  )
})

const DeckActions = React.memo(function DeckActions(props) {
  return (
    <div className='DeckEditorView__actions'>
      <Row>
        <Column>
          <ResetButton
            label='Reset deck'
            confirm='Are you sure you want to reset your deck?'
            reset={props.reset}
          />
        </Column>
        <Column>
          <ShareButton />
        </Column>
      </Row>
    </div>
  )
})

const CardTooltipsCheckbox = React.memo(function CardTooltipsCheckbox(props) {
  return (
    <Checkbox
      className='DeckEditorView__checkbox'
      onChange={event => props.set(event.target.checked)}
      name='card-tooltips'
      id='card-tooltips'
      checked={props.value}
    >
      Enable card tooltips on hover
    </Checkbox>
  )
})

const CardLevelsCheckbox = React.memo(function CardLevelsCheckbox(props) {
  const { hasDefaultCollection } = React.useContext(CollectionContext)

  if (hasDefaultCollection) return null

  return (
    <Checkbox
      className='DeckEditorView__checkbox'
      onChange={event => props.set(event.target.checked)}
      name='adjust-card-levels'
      id='adjust-card-levels'
      checked={props.value}
    >
      Adjust card levels to collection
    </Checkbox>
  )
})

const HelpInfo = React.memo(function HelpInfo(props) {
  return (
    <Info
      icon='stack'
      title='Getting started'
      CTA={<RandomDeckButton defineDeck={props.defineDeck} />}
    >
      If you do not know where to start,{' '}
      <Link to='/guides/deck'>read the deck-building guide</Link> to learn how
      to make a viable deck, or try one of the{' '}
      <Link to='/deck/suggestions'>ready-to-go suggested decks</Link>.
    </Info>
  )
})

export const CollectionInfo = React.memo(function CollectionInfo(props) {
  const { hasDefaultCollection } = React.useContext(CollectionContext)

  if (!hasDefaultCollection) {
    return <CollectionClearHint />
  }

  return (
    <Info
      icon='books'
      title={
        <>
          Your collection
          <LearnMoreIcon anchor='#collection-benefits' />
        </>
      }
      CTA={<ImportCollection onChange={props.onCollectionImport} />}
    >
      If you have already created your collection, you can import it directly in
      the deck builder to compose decks that you can make in-game.
    </Info>
  )
})

export default DeckEditorView
