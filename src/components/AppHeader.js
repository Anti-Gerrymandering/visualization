import React, { Component } from 'react'
import SearchBar from './SearchBar'
import { connect } from 'react-redux'
import * as Actions from '../actions/mapActions'
import { convertBranch } from '../actions/appActions'

const BranchTab = ({ branch, active }) => {
  const style = () => {
    const base = 'nav-item '
    if (active) return base + ' active'

    return base
  }

  return (
    <a onClick={Actions.switchBranch(branch)} className={style()} >
      <span>{convertBranch(branch)}</span>
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
  branchTabs () {
    return this.props.layers.entrySeq().map(([branch, _years]) =>
      <BranchTab
        branch={branch}
        key={branch}
        active={branch === this.props.currentBranch}
      />
    )
  }
  render () {
    return (
      <div className='App-header'>
        <div className='headerApp-innerDiv'>
          <div className='nav'>
            <div className='nav-left gr-overflowDiv'>
              { this.branchTabs() }
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
