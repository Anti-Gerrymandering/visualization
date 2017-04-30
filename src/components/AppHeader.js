import React, { Component } from 'react'
import SearchBar from './SearchBar'
import { connect } from 'react-redux'
import * as Actions from '../actions/mapActions'
import { convertBranch } from '../actions/appActions'

const officeTab = props => {
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

@connect(state => {
  return {
    // All the layers that could be processed
    layers: state.mapDataReducer.geoFiles,
    // The current Layer meta-data
    currentBranch: state.mapControllerReducer.branch
  }
})
class AppHeader extends Component {
  officeTabs () {
    return this.props.layers.toArray().map((e, i) => {
      const props = {
        id: i,
        name: convertBranch(Object.keys(e)[0]),
        click: Actions.switchLayer(Object.keys(e)[0], i),
        active: i === this.props.currentBranch
      }
      return officeTab(props)
    })
  }
  render () {
    return (
      <div className='App-header'>
        <div className='headerApp-innerDiv'>
          <div className='nav'>
            <div className='nav-left gr-overflowDiv'>
              { this.officeTabs() }
            </div>
          </div>
          <div className='gr-shadowDiv'>
            <SearchBar />
          </div>
        </div>
      </div>
    )
  }
}

export default AppHeader
