import React from 'react'
import MapLayer from './MapLayer'
import AppHeader from './AppHeader'
import * as Actions from '../actions/appActions'
import '../sass/App.sass'

const App = () => {
  Actions.onLoad()
  return (
    <div className='App'>
      <AppHeader />
      <MapLayer />
    </div>
  )
}

export default App
