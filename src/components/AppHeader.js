import React from 'react'
import SearchBar from './SearchBar'


const AppHeader = props => {
  return (
    <div className='App-header section'>
      <h2>Visualizing Gerrymandering</h2>
      <div className='columns'>
        <div className='column tabs is-toggle'>
          <ul>
            <li className='is-active'>
              <a>
                <span>PA House</span>
              </a>
            </li>
            <li className='is-active'>
              <a>
                <span>PA Senate</span>
              </a>
            </li>
          </ul>
        </div>
        <div className='column'>
          <SearchBar />
        </div>
      </div>
    </div>
  )
}

export default AppHeader
