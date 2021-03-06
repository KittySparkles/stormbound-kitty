/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../Article'
import FAQSection from '../FAQSection'
import Notice from '../Notice'
import PageMeta from '../PageMeta'
import Row from '../Row'
import Title from '../Title'
import TournamentDeck from '../TournamentDeck'
import TournamentPodium from '../TournamentPodium'
import TournamentWinners from '../TournamentWinners'
import { Rubies } from '../Resource'
import tournaments from '../../data/tournaments.json'
import './index.css'
import MemberList from '../MemberList'
import { formatDate } from '../../helpers/formatDate'

export const getDate = string => {
  if (!string) return null
  const [month, year] = string.split('/')
  return new Date(+year, +month - 1, 1)
}

export default React.memo(function TournamentHallOfFame(props) {
  return (
    <Article title='Tournaments'>
      <TournamentPodium />

      <Title>Tournaments</Title>
      {tournaments
        .slice(0)
        .reverse()
        .map(tournament => (
          <section className='Tournament'>
            <Row desktopOnly wideGutter>
              <Row.Column>
                <h2 className='Tournament__name'>{tournament.name}</h2>
                <p className='Tournament__meta'>
                  {formatDate(getDate(tournament.date))} · By{' '}
                  <MemberList members={tournament.hosts} />
                </p>
                {Boolean(tournament.description) && (
                  <p>{tournament.description}</p>
                )}
                <TournamentWinners podium={tournament.podium} />
              </Row.Column>
              <Row.Column>
                <TournamentDeck {...tournament} />
              </Row.Column>
            </Row>
          </section>
        ))}

      <FAQSection
        id='faq'
        title='FAQ'
        entries={[
          {
            id: 'about-tournaments',
            question: 'What exactly are tournaments? How do they work?',
            answer:
              'Tournaments are organised by community members and yield in-game rewards such as cards and rubies. They usually face about 20 players divided in brackets, eliminating more and more of them until there is only one (or more) winner left. Some tournmanents have different rules, but they more or less all work like this.',
          },
          {
            id: 'hosting-a-tournament',
            question: 'Who can host a tournament?',
            answer:
              'In theory, everyone can. Kepp and Brzoza on Discord are responsible for the schedule. If you would like to host an event, have them invite you to a dedicated Discord server where all the event hosts organise events. In there, you will find the schedule, and will be able to talk about your ideas and get some help.',
          },
          {
            id: 'head-count',
            question:
              'How many participants usually join an event? What kind of rewards can there be?',
            answer: (
              <>
                <p>
                  These both depend on the kind of event, whether it’s a{' '}
                  <span className='Highlight'>Tournament</span> or a{' '}
                  <span className='Highlight'>Joust</span>.
                </p>{' '}
                <p>
                  Tournaments can have unlimited members, and have a prize pool
                  of about <Rubies amount={400} /> to distribute between the
                  winners. They get official media coverage, but require at
                  least 2 hosts, last longer, and are bound to a pretty long
                  schedule.
                </p>
                <p>
                  Jousts on the other hand are smaller (up to 32 players), can
                  be self-hosted on a short schedule and usually have less
                  pressure on them. They do not benefit from media coverage and
                  the prize pool is about <Rubies amount={160} />.
                </p>
                <p>
                  This distinction helps the hosts with experimenting more with
                  events, without having to wait months for other tournaments to
                  be hosted, and generally makes things clearer for everyone.
                </p>
              </>
            ),
          },
          {
            id: 'tools',
            question: 'Are there tools to help organise everything?',
            answer: (
              <>
                The <Link to='/deck'>deck builder</Link> to compose decks,{' '}
                <a
                  href='https://challonge.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Challonge
                </a>{' '}
                to create and display brackets, Google Forms for the
                registration, and Discord for communication.
              </>
            ),
          },
          {
            id: 'rules',
            question: 'How to write good rules that prevent cheating?',
            answer:
              'Have a look at the rules of previous tournaments to avoid starting from scratch. Make sure to have them proofread by some tournament organisers so they are bulletproof. ',
          },
        ]}
      />

      <Notice icon='crown'>
        For more information about ongoing tournaments and how to participate,
        join the{' '}
        <a
          href='https://discord.gg/stormbound'
          target='_blank'
          rel='noopener noreferrer'
        >
          official Discord server
        </a>
        .
      </Notice>

      <PageMeta
        title='Tournaments – Hall of Fame'
        description='Find the list of all past Stormbound tournaments and the hall of fame.'
      />
    </Article>
  )
})
