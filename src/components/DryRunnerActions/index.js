import React from 'react'
import CTA from '../CTA'
import Row from '../Row'
import './index.css'

export default React.memo(function DryRunnerActions(props) {
  if (!props.activeCard) return null

  return (
    <div className='DryRunnerActions'>
      <Row desktopOnly>
        <Row.Column align='center'>
          <CTA
            type='button'
            data-testid='cycle-btn'
            onClick={props.cycleCard}
            disabled={props.hasCycledThisTurn}
          >
            <u>C</u>ycle card
          </CTA>
        </Row.Column>
        <Row.Column align='center'>
          <CTA
            type='button'
            data-testid='play-btn'
            onClick={props.playCard}
            disabled={!props.canCardBePlayed(props.activeCard)}
          >
            <u>P</u>lay card
          </CTA>
        </Row.Column>
      </Row>
    </div>
  )
})
