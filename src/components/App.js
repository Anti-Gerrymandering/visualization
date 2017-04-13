import React, { Component } from 'react'
import MapLayer from './MapLayer'
import AppHeader from './AppHeader'
import * as Actions from '../actions/appActions'
import '../sass/App.sass'

class App extends Component {
  render () {
    Actions.onLoad()
    return (
      <div className='App'>
        <AppHeader />
        <MapLayer />
      </div>
    )
  }
}

export default App
