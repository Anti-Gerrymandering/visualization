import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map } from 'immutable'

import { changeYear } from '../actions/appActions'

const yearLi = prop => {
  const { key, year } = prop
  return (
    <li key={key} onClick={changeYear(year)} >
      { year }
    </li>
  )
}

@connect(state => {
  const { mapDataReducer, mapControllerReducer } = state
  const geoFiles = Map(mapDataReducer.geoFiles.get(mapControllerReducer.branch) || {})
  return { geoFiles: geoFiles }
})
class TimeLine extends Component {
  render () {
    const years = this.props.geoFiles.entrySeq()
      .sort((fileA, fileB) => fileB[0] - fileA[0])
      .map(([ year, file ]) => {
        return yearLi({ key: file, year: year })
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
