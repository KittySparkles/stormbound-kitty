import React from 'react'
import NumberInput from '../NumberInput'
import Row from '../Row'

export default React.memo(function BrawlCalculatorDiscount(props) {
  return (
    <>
      <Row>
        <Row.Column>
          <label htmlFor='discount'>Cost Discount (%)</label>
          <NumberInput
            id='discount'
            name='discount'
            value={props.discount}
            onChange={props.setDiscount}
            min={0}
            max={100}
            placeholder='e.g. 50'
          />
        </Row.Column>
        <Row.Column />
      </Row>
    </>
  )
})
