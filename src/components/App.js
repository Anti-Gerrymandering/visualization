import React from 'react'
import MapLayer from './MapLayer'
import AppHeader from './AppHeader'
import TimeLine from './TimeLine'
import StatsSidebar from './StatsSidebar'
import * as Actions from '../actions/appActions'
import '../sass/App.sass'

const App = () => {
  Actions.onLoad()
  return (
    <div className='App'>
      <AppHeader />
      <StatsSidebar />
      <MapLayer />
      <TimeLine />
    </div>
  )
}

export default App
