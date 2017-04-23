import React from 'react'
import MapLayer from './MapLayer'
import AppHeader from './AppHeader'
import BottomNav from './BottomNav'
import * as Actions from '../actions/appActions'
import '../sass/App.sass'

const App = () => {
  Actions.onLoad()
  return (
    <div className='App'>
      <div className='columns'>
        <div className='column'>
          <AppHeader />
          <MapLayer />
          <BottomNav />
        </div>
      </div>
    </div>
  )
}

export default App
