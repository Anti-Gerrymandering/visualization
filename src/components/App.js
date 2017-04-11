import React, { Component } from 'react'
import MapLayer from './MapLayer'
import AppHeader from './AppHeader'
import '../sass/App.sass'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <AppHeader />
        <MapLayer />
      </div>
    )
  }
}

export default App
