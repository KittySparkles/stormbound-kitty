import React from 'react'
import { Link } from 'react-router-dom'
import BattleSimApp from '../BattleSimApp'
import Column from '../Column'
import DeckStatsChart from '../DeckStatsChart'
import FeaturedDeck from '../FeaturedDeck'
import Guide from '../Guide'
import Info from '../Info'
import Only from '../Only'
import Row from '../Row'
import Title from '../Title'
import WikiLink from '../WikiLink'
import guides from '../../data/guides'
import getResolvedCardData from '../../helpers/getResolvedCardData'
import serialisation from '../../helpers/serialisation'
import './index.css'

const guide = guides.find(g => g.id === 'COMMON_DIAMOND_GUIDE')

const DECK_ID = '5n15n25f45f35n35n95n125n165n285f145n305n52'

const Graph = props => {
  const deck = serialisation.deck.deserialise(props.id).map(getResolvedCardData)

  return (
    <DeckStatsChart
      deck={deck}
      modifier={props.modifier}
      syncId={props.syncId}
    />
  )
}

export default React.memo(function GuideBeginner(props) {
  return (
    <Guide {...guide}>
      <p>
        Fair disclaimer: I am not the most talented player. I have been playing
        on and off since late 2018 and reached Diamond 1 in May 2019, and then
        every month since.
      </p>
      <p>
        As a free-to-play player, my collection is not very developed. I
        originally reached Diamond with a Winter rush deck, and kept playing
        Winter for a long while. Eventually I switched to Shadowfen for a change
        of pace, but did not have a lot of options. So thanks to kind help from
        the_mirc, I came up with a deck made of 11 common cards and 1 rare.
      </p>
      <p>
        I am still rocking that deck in Diamond 1 today, waiting for my
        collection to evolve so I can experiment with other things. It’s a
        strong deck that’s easy to make, and that’s what we are going to focus
        on today.
      </p>

      <Title id='the-deck'>The deck</Title>

      <p>
        Before we get into gameplay and situations, let’s have a look at the
        deck itself. As I mentioned before, it is made of 11 common cards, and 1
        rare. There might be a way to replace Green Prototypes with a common
        card for the sake of having a fully common deck, but that’s for another
        day.
      </p>

      <div className='Article__fullwidth' style={{ '--padding': '120px' }}>
        <Row desktopOnly wideGutter>
          <Column>
            <FeaturedDeck
              id={DECK_ID}
              name='Meow'
              author='Kitty'
              category='DIAMOND_1'
              faction='shadowfen'
            />
          </Column>
          <Column>
            <p>A few interesting points to note about that deck:</p>
            <ul>
              <li>
                <span className='Highlight'>It’s fast.</span> It has 0 structure
                and 9 units, including 4 runners. Its cell on play is 1.08,
                which is particularly fast.
              </li>
              <li>
                <span className='Highlight'>It’s cheap.</span> The average mana
                cost is exactly 3, with 6 cards being playable as the first
                player (excluding Toxic Sacrifice), and 8 or 9 as the second.
              </li>
              <li>
                <span className='Highlight'>It’s simple.</span> With 4 runners
                at various costs, this deck has a single win condition: running
                through the baseline and knocking down this base health quickly
                and aggressively.
              </li>
            </ul>
          </Column>
        </Row>
      </div>

      <div className='Article__fullwidth' style={{ '--padding': '120px' }}>
        <Row desktopOnly wideGutter>
          <Column>
            <p>
              Looking at the mana curve graph, we can see that the first few
              turns are pretty stable, which is a good quality of a deck. Turn
              mana 6 is the most risky one with possibly (although not so
              likely) some 1 mana loss.
            </p>

            <p>
              Other consideration is that by turn mana 5, it is already possible
              to play all 4 cards if we have to use Toxic Sacrifice. The
              likelihood of being able to play all 4 cards increases rapidly at
              every turn to pass the 50% threshold by turn mana 9.
            </p>
          </Column>
          <Column>
            <Graph id={DECK_ID} />
          </Column>
        </Row>
      </div>

      <Title id='the-cards'>The cards</Title>

      <h3 id='cheap-drops'>Cheap Drops</h3>

      <p>
        This build has 2 main facets: cheap drops and runners. The cheap drops
        are <WikiLink id='N1' />, <WikiLink id='N2' />, <WikiLink id='N3' />,{' '}
        <WikiLink id='F3' /> and to a lesser extent <WikiLink id='N12' /> and{' '}
        <WikiLink id='N16' />. That’s half the deck.
      </p>
      <p>
        Like in any deck, these cards serve two purposes: being able to defend
        by having cheap units with movement — and being able to push the
        frontline quickly and reliable in order to allow the runners to do their
        job.
      </p>

      <h3 id='runners'>Runners</h3>

      <p>
        The reason this deck is so fast is because it has an unusual amount of
        runners (4). Indeed, this is the bread and butter of this deck: we need
        to pass the runners through the baseline. That’s why it is interesting
        to have several of them, and of different costs.
      </p>

      <p>
        What is interesting about this configuration is that our runners all
        have a different mana cost (3, 4, 5 and 7), making it possible to use a
        runner at basically any maan turn in the game.
      </p>

      <p>
        Another quirk of the setup we learn to turn into our advantage is the
        ability of First Mutineer not impacting other pirates. Fortunately, we
        run Westwind Sailors and Bluesail Raiders, both of which are immune to
        that discard penalty.
      </p>

      <Info icon='sword' title='Runner variations'>
        <p>
          If you happen to have <WikiLink id='N67' /> at level 3 or more, it
          might be a good idea to replace Summon Militia with it. Not only does
          it grant another runner, but it also makes for a less random target
          for Toxic Sacrifice combos.
        </p>
        <p>
          On a similar note, <WikiLink id='F25' /> is a better alternative to
          First Mutineer since it comes without any penalty, and varies races to
          avoid being subject to <WikiLink id='N18' />
          ’s ability.
        </p>
      </Info>

      <h3 id='witches-of-the-wild'>Witches of the Wild</h3>

      <p>
        <WikiLink id='F14' /> is such a versatile card that it has to take part
        in most Shadowfen decks. At level 5, it can have up to 29 strength value
        for 4 mana in perfect conditions, and easily averages between 11 and 17
        value.
      </p>

      <h3 id='spells'>Spells</h3>

      <p>
        In this deck, spells are mainly here to tempo the game and counter
        aggressive push long enough to maintain the frontline or end the game.
        They do not aim at being use offensively.
      </p>
      <p>
        <WikiLink id='F4' /> is included in this deck because it provides
        excellent board control. Not only does it make it possible to counter
        early pushes, but it also can clear our own units if they are in the way
        of lethal.
      </p>
      <p>
        Originally, I ran a slight variation of this deck with{' '}
        <WikiLink id='N5' /> instead of <WikiLink id='N9' /> but it did not
        work. Northsea Dog ends up being cycled for most of the game and does
        not help defending whatsoever. Confinement is here to dramatically slow
        down a heavy push, and to counter Elders.
      </p>

      <Title id='playstyle-and-strategies'>Playstyle and Strategies</Title>

      <h3 id='general-strategy'>General strategy</h3>

      <p>
        The main idea is to push fast early on and establish board dominance
        near the enemy’s baseline, or at most mid-field. From there, it’s a bit
        of an endurance game to keep control of the board for the next few turns
        while the mana increases.
      </p>
      <p>
        When the game reaches turn mana 10/11, there starts to be a lot of
        opportunities for passing two runners in the same turn, or one runner +
        a move to keep board presence. Knowing what are the damage possibilities
        by combining 2 runners is equally important:
      </p>

      <Only.Mobile>
        <ul>
          <li>First Mutineer + Warfront Runners: 7 mana for 11 damage</li>
          <li>First Mutineer + Bluesail Raiders: 8 mana for 12 damage</li>
          <li>Warfront Runners + Bluesail Raiders: 9 mana for 13 damage</li>
          <li>First Mutineer + Salty Outcasts: 10 mana for 15 damage</li>
          <li>Warfront Runners + Salty Outcasts: 11 mana for 16 damage</li>
          <li>Bluesail Raiders + Salty Outcasts: 12 mana for 17 damage</li>
        </ul>
      </Only.Mobile>

      <Only.Desktop>
        <div className='Article__fullwidth' style={{ '--padding': '60px' }}>
          <table className='GuideCommonDiamond__table'>
            <thead>
              <tr>
                <th></th>
                <th style={{ color: '#a28668' }}>First Mutineer</th>
                <th style={{ color: '#66b8b0' }}>Warfront Runners</th>
                <th style={{ color: '#cb2f29' }}>Bluesail Raiders</th>
                <th style={{ color: '#98c941' }}>Salty Outcasts</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={{ color: '#a28668' }}>First Mutineer</th>
                <td>3 mana / 5 damage</td>
                <td>7 mana / 11 damage</td>
                <td>8 mana / 12 damage</td>
                <td>10 mana / 15 damage</td>
              </tr>
              <tr>
                <th style={{ color: '#66b8b0' }}>Warfront Runners</th>
                <td>7 mana / 11 damage</td>
                <td>4 mana / 6 damage</td>
                <td>9 mana / 13 damage</td>
                <td>11 mana / 16 damage</td>
              </tr>
              <tr>
                <th style={{ color: '#cb2f29' }}>Bluesail Raiders</th>
                <td>8 mana / 12 damage</td>
                <td>9 mana / 13 damage</td>
                <td>5 mana / 7 damage</td>
                <td>12 mana / 17 damage</td>
              </tr>
              <tr>
                <th style={{ color: '#98c941' }}>Salty Outcasts</th>
                <td>10 mana / 15 damage</td>
                <td>11 mana / 16 damage</td>
                <td>12 mana / 17 damage</td>
                <td>7 mana / 10 damage</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Only.Desktop>

      <p>
        Toxic Sacrifice should be used sporadically and with caution. Keeping
        the front line is usually more important than clearing the opponent’s
        baseline.
      </p>

      <h3 id='openings'>Openings</h3>

      <p>
        Thanks to the variety of cards costing 3 mana or less, there are
        actually quite a lot of different openings.
      </p>
      <p>
        The ideal opening is{' '}
        <span className='Highlight'>
          Green Prototypes into either Gifted Recruits or Dubious Hags
        </span>
        , giving 2 movements with 2 units for 3 mana. Another decent opening is
        Gifted Recruits or Dubious Hags into Summon Militia.
      </p>

      <div className='Article__fullwidth'>
        <BattleSimApp
          environment='shadowfen'
          mode='DISPLAY'
          simId='LCwsLCwsLCwsLDZGM0I1LCw1TjFCNSwsLCwsLCw7UjIwUy1CMThGOzBNMDs1TjE1TjI1RjQ1RjM1TjM1Tjk1TjEyNU4xNjVOMjg1RjE0NU4zMDVONTI7TjksTjI4'
        />
      </div>

      <h3 id='against-winter'>Against Winter Pact</h3>

      <p>
        Most Winter decks tend to be quite heavy, and aim at mid/late game to
        take full control of the board and eventually push the frontline until
        lethal. The goal is finish before they get to that point.
      </p>

      <p>
        It is critical to preserve high board presence at all cost. There is
        usually no coming back from a board clear passed 7 mana against a Winter
        deck. We absolutely need to stay up front until turn mana 10/11 where we
        can start passing heavy runners in.
      </p>

      <hr />

      <p>
        When facing a Winter freeze deck, we might be facing difficulty moving
        our runners through their baseline because they keep freezing our cheap
        units there. This is one of these cases where using Toxic Sacrifice in
        an offensive way can pay off.
      </p>

      <p>
        Consider the following board where Gifted Recruits have been frozen by a
        Moment’s Peace onto the Frozen Core. By playing Toxic Sacrifice on the
        Gifted Recruits, we not only kill the Rockworkers, but also free the way
        for Salty Outcasts to run it.
      </p>

      <div className='Article__fullwidth'>
        <BattleSimApp
          environment='winter'
          mode='DISPLAY'
          simId='NU4zQjVGLDE2VzlSNSwsLCwzVzEzUjUsLDhOMTNSNSwsLCwsLCwsLCwsLDtSMTBXLUIxOEY7OE0wOzVOMTVOMjVGNDVGMzVOMzVOOTVOMTI1TjE2NU4yODVGMTQ1TjMwNU41MjtGNCxONTIsTjI4LE4y'
        />
      </div>

      <h3 id='against-swarm'>Against Swarm of the East</h3>

      <p>
        There are two archetypes of Swarm decks: early rush and control (which
        is usually Queen of Herds + Bucks of Wasteland). It is helpful to try to
        guess early which kind of deck we’re facing.
      </p>
      <p>
        When facing a rush deck, such as{' '}
        <Link to='/deck/3n13n23s13n33s243s23n633n673s63n153s83s11/detail'>
          Reckless Rush
        </Link>
        , I would recommend defending. With 4 runners costing 3/4/5/7 mana, we
        have opportunities to come back mid-game. Our deck is not a particularly
        early game rush, so defending to counter-attack around turn mana 10/11
        has proven to be a decent approach.
      </p>
      <p>
        When facing a Queen of Herds deck however, things can get more tricky,
        especially when she is paired with a high-level Bucks of Wasteland.
        Against such deck, what’s important is maintaining the front-line at all
        time. Confinement is kept especially for Bucks so that Toxic Sacrifice
        can be used without risking buffing the entire raid.
      </p>

      <h3 id='against-ironclad'>Against Ironclad Union</h3>

      <p>
        When facing an Ironclad deck, one has to be ready to be countered by{' '}
        <WikiLink id='I20' />. The worst that can happen is our frontline being
        reset for only 4 mana because we set 2 units side-by-side on the
        opponent’s baseline. Therefore, it might be interesting to split the
        attack on both sides.
      </p>

      <div className='Article__fullwidth'>
        <BattleSimApp
          environment='ironclad'
          mode='DISPLAY'
          simId='NU4zQjUsLCw2RjNCNSwsLCwsLCwsLCwsLCwsLCw7UjIwSS1CMThGOzVNMDs1TjE1TjI1RjQ1RjM1TjM1Tjk1TjEyNU4xNjVOMjg1RjE0NU4zMDVONTI7'
        />
      </div>

      <p>
        This will not guarantee keeping the frontline, but this will increase
        the chances a little, especially if the opponnent does not have a
        particularly cheap deck.
      </p>

      <hr />

      <p>
        To wrap up, this deck is a solid rush deck which remains viable in
        mid-game. It has the particularity of being composed almost exclusively
        of common cards, making it the perfect deck to reach Diamond 1 as a
        free-to-play player. I hope you like it.{' '}
        <span role='img' aria-label='sparkly heart'>
          💖
        </span>
      </p>
    </Guide>
  )
})