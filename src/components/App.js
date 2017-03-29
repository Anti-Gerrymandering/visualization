import React, { Component } from 'react'
import MapLayer from './MapLayer'
import '../sass/App.sass'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Visualizing Gerrymandering</h2>
        </div>
        <MapLayer />
      </div>
    )
  }
}

export default App
