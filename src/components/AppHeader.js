import React, { Component } from 'react'
import SearchBar from './SearchBar'
import { connect } from 'react-redux'
import * as Actions from '../actions/mapActions'
import { convertBranch } from '../actions/appActions'

const columnLinks = props => {
  const { id, name, click } = props
  const style = () => {
    const base = 'nav-item '
    switch (id) {
      case 0:
        return base + 'gm-navA'
      case 1:
        return base + 'gm-navB'
      case 2:
        return base + 'gm-navC'
      default:
        return base
    }
  }
  return (
    <a key={id} onClick={click} className={style()} >
      <span>{name}</span>
    </a>
  )
}

@connect(props => {
  return {
    // All the layers that could be processed
    layers: props.mapDataReducer.geoFiles,
    // The current Layer meta-data
    cur: props.mapControllerReducer
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
      <div className='App-header'>
        <div className='nav'>
          <div className='nav-left'>
            { this.buildToggle() }
          </div>
        </div>
        <div className='column'>
          <SearchBar />
        </div>
      </div>
    )
  }
}

export default AppHeader
