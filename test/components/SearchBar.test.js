/* eslint-env jest */
import React from 'react'
import ReactDOM from 'react-dom'
import SearchBar from '../../src/components/SearchBar'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const map = <SearchBar />
  ReactDOM.render(map, div)
})
