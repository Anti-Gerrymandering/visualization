import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Map } from 'immutable'

import SearchBar from './SearchBar'
import * as Actions from '../actions/mapActions'
import { convertBranch } from '../actions/appActions'

const BranchTab = connect(null, (dispatch, { branch }) => ({
  onClick: () => {
    dispatch(Actions.switchBranch(branch))
  }
}))(({ branch, active, onClick }) => {
  const style = () => {
    const base = 'nav-item '
    if (active) return base + ' active'

    return base
  }

  return (
    <a onClick={onClick} className={style()} >
      <span>{convertBranch(branch)}</span>
    </a>
  )
})

BranchTab.propTypes = {
  branch: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
}

@connect(state => (
  {
    // All the layers that could be processed
    layers: state.mapDataReducer.geoFiles,
    // The current Layer meta-data
    currentBranch: state.mapControllerReducer.branch
  }
))
class AppHeader extends Component {
  static propTypes = {
    layers: PropTypes.instanceOf(Map).isRequired,
    currentBranch: PropTypes.string.isRequired
  }

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
