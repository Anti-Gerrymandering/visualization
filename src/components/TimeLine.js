import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeYear } from '../actions/appActions'

const yearLi = prop => {
  const { key, year } = prop
  return (
    <li key={key} onClick={changeYear(year)} >
      { year }
    </li>
  )
}

@connect(props => {
  const { mapDataReducer } = props
  return { years: mapDataReducer.years }
})
class TimeLine extends Component {
  render () {
    const years = this.props.years.toArray().map((e, i) => {
      return yearLi({ key: i, year: e })
    })
    return (
      <div className='timeLine'>
        <ul>
          { years }
        </ul>
      </div>
    )
  }
}

export default TimeLine
