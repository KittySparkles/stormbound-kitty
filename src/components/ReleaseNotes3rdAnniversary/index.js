import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import Image from '../Image'
import Info from '../Info'
import Notice from '../Notice'
import Only from '../Only'
import ReleaseNotes from '../ReleaseNotes'
import ResourceIcon from '../ResourceIcon'
import { Legendary, Coins, Crowns, Stones, Rubies } from '../Resource'
import Row from '../Row'
import Table from '../Table'
import Title from '../Title'
import { MILESTONES } from '../../constants/brawl'
import getRewardLabel from '../../helpers/getRewardLabel'
import './index.css'

export default React.memo(function ReleaseNotes3rdAnniversary(props) {
  return (
    <ReleaseNotes id='3RD_ANNIVERSARY' withAvif={false}>
      <Article.Narrow>
        <p>
          On September 18th, Stormbound is turning 3 years old. That’s
          incredible that a prototype issued from a game-jam turned into the
          game we all like and play daily! Happy anniversary Boundy!
        </p>

        <p>
          Going against the tradition, Stormbound is the one offering gifts on
          that special occasion. On the menu, four different things, enough to
          please everyone, whether paying or non-paying player.
        </p>

        <p>
          To begin with, every player will receive a one-time bundle containing{' '}
          <Coins amount={330} />, <Rubies amount={30} /> and{' '}
          <Stones amount={3} /> as well as <Legendary amount={1} /> at random
          upon login.
        </p>

        <Title id='brawl'>Brawl</Title>

        <p>
          All matches for the{' '}
          <Link to='/brawl/feline-strength'>
            Brawl following the 18th of September
          </Link>{' '}
          will{' '}
          <span className='Highlight'>
            cost a third of their original price
          </span>{' '}
          (rounded to the closest multiple of 5).
          <Only.Desktop>
            {' '}
            Here are the adjust values for every milestone:
          </Only.Desktop>
        </p>
      </Article.Narrow>

      <Only.Desktop>
        <Article.Embed>
          <Table>
            <thead>
              <tr>
                <th>Required crowns</th>
                <th>Cost per match</th>
                <th>Reward once reached</th>
              </tr>
            </thead>
            <tbody>
              {MILESTONES.map(milestone => {
                const cost = Math.ceil(Math.ceil(milestone.cost / 3) / 5) * 5
                return (
                  <tr key={milestone.crowns}>
                    <td>
                      <Crowns amount={milestone.crowns} />
                    </td>
                    <td>
                      <Coins amount={cost} /> ({-1 * (milestone.cost - cost)})
                    </td>
                    <td>{getRewardLabel(milestone, true)}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Article.Embed>
      </Only.Desktop>

      <Article.Narrow>
        <Info icon='crown' title='Oeni’s Gazette'>
          <p>
            Be sure to read{' '}
            <Link to='/guides/noble-coalition'>Oeni’s Gazette</Link> to learn
            more about the Noble Coalition Brawl, especially in regard to this
            anniversary event.
          </p>
        </Info>

        <Title>Boosted books</Title>

        <p>
          If you were waiting for an appealing sale to spend all your rubies,
          now is the time. Because between September 17th and September 20th,{' '}
          <span className='Highlight'>
            all books will contain 33% more cards
          </span>
          . As a result:{' '}
        </p>

        <ul>
          <li>
            Mythic, Heroic and Classic books will yield 8 cards instead of 6.
          </li>
          <li>Noble books will yield 4 cards instead of 3.</li>
          <li>Humble books will still contain a single card.</li>
        </ul>

        <Title>Limited Offers</Title>

        <p>
          For players who can afford or are willing to spend some money into the
          game, this 3rd anniversary brings exciting new limited one-time offers
          between September 17th and September 24th:
        </p>

        <ul>
          <li>
            At $4.99: 1 Mythic book + <Coins amount={100} />
          </li>
          <li>
            At $19.99: 4 Mythic books + 4 Heroic books + <Coins amount={500} />
          </li>
          <li>
            At $49.99: 10 Mythic books + 10 Heroic books + 10 Classic books +{' '}
            <Coins amount={1500} />
          </li>
          <li>
            At $99.99: 20 Mythic books + 20 Heroic books + 20 Classic books +{' '}
            <Coins amount={5000} /> + <Stones amount={50} />
          </li>
        </ul>
      </Article.Narrow>

      <Article.Embed>
        <Row desktopOnly wideGutter>
          <Row.Column>
            <Image
              src='/assets/images/releases/birthday_pack_1.png'
              alt='$4.99 promotion: 1 Mythic book + 100 coins'
            />
          </Row.Column>
          <Row.Column>
            <Image
              src='/assets/images/releases/birthday_pack_2.png'
              alt='$10.99 promotion: 4 Mythic books + 4 Heroic books + 500 coins'
            />
          </Row.Column>
        </Row>
        <Row desktopOnly wideGutter>
          <Row.Column>
            <Image
              src='/assets/images/releases/birthday_pack_3.png'
              alt='$49.99 promotion: 10 Mythic books + 10 Heroic books + 10 Classic books + 1500 coins'
            />
          </Row.Column>
          <Row.Column>
            <Image
              src='/assets/images/releases/birthday_pack_4.png'
              alt='$99.99 promotion: 20 Mythic books + 20 Heroic books + 20 Classic books + 5000 coins + 50 fusion stones'
            />
          </Row.Column>
        </Row>
      </Article.Embed>

      <Article.Narrow>
        <p>
          Additionally, <ResourceIcon resource='RUBY' /> rubies and{' '}
          <ResourceIcon resource='COIN' /> coins offers in the shop will yield
          33% more resources. The $9.99 offer for instance will yield{' '}
          <Rubies amount={170} /> instead of 130. Similarly, the coins pack for{' '}
          <Rubies amount={50} /> will yield <Coins amount={600} /> instead of
          450.
        </p>

        <Title id='wallpapers'>Wallpapers</Title>

        <p>
          Last but not least, the Sheepyard design team has put up a collection
          of desktop and home screen wallpapers that you can find in exclusivity
          in the <Link to='/fan-kit/wallpapers'>wallpapers section</Link>. Enjoy
          them!
        </p>
      </Article.Narrow>

      <Article.Embed>
        <Image
          src='/assets/images/wallpapers/lite/wp-d-3.png'
          alt='Stormbound Wallpaper'
          withAvif
        />
      </Article.Embed>

      <hr />

      <Notice>
        <span className='Highlight'>Meow</span> and happy fighting, fellow
        Stormbounders!
      </Notice>
    </ReleaseNotes>
  )
})
