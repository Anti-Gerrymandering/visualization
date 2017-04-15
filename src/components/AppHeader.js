import React, { Component } from 'react'
import SearchBar from './SearchBar'
import { connect } from 'react-redux'
import * as Actions from '../actions/mapActions'
import { convertBranch } from '../actions/appActions'

const columnLinks = props => {
  const { id, name, click, active } = props
  const style = () => (active) ? 'is-active' : ''
  return (
    <li key={id} className={style()}>
      <a onClick={click}>
        <span>{name}</span>
      </a>
    </li>
  )
}

@connect(props => {
  return {
    // All the layers that could be processed
    layers: props.mapReducer.geoFiles,
    // The current Layer meta-data
    cur: props.mapReducer.currentLayer
  }
})
class AppHeader extends Component {
  buildToggle () {
    return this.props.layers.toArray().map((e, i) => {
      const props = {
        id: i,
        name: convertBranch(Object.keys(e)[0]),
        click: Actions.switchLayer(this.props.cur.year, Object.keys(e)[0], i),
        active: i === this.props.cur.layer
      }
      return columnLinks(props)
    })
  }
  render () {
    // console.log(this.buildToggle())
    return (
      <div className='App-header section'>
        <h2>Visualizing Gerrymandering</h2>
        <div className='columns'>
          <div className='column tabs is-toggle'>
            <ul>
              { this.buildToggle() }
            </ul>
          </div>
          <div className='column'>
            <SearchBar />
          </div>
        </div>
      </div>
    )
  }
}

export default AppHeader
