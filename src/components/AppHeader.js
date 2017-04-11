import React from 'react'
import SearchBar from './SearchBar'

const AppHeader = props => {
  return (
    <div className='App-header'>
      <h2>Visualizing Gerrymandering</h2>
      <SearchBar />
    </div>
  )
}

export default AppHeader
