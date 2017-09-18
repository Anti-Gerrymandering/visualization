import React from 'react'
import { connect } from 'react-redux'

import MapLayer from './MapLayer'
import AppHeader from './AppHeader'
import BottomNav from './BottomNav'
import * as Actions from '../actions/appActions'
import '../sass/App.sass'

const App = connect()(({ dispatch }) => {
  dispatch(Actions.onLoad())
  return (
    <div className='AppHolder'>
      <div className='App'>
        <div className='columns'>
          <div className='column'>
            <AppHeader />
            <MapLayer />
            <BottomNav />
          </div>
        </div>
        <div className='columns'><div className='column is-12'><div className='gr-bottomApp' /></div></div>
      </div>

    </div>
  )
})

export default App
