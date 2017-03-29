import React from 'react'
import ReactDOM from 'react-dom'
import MapLayer from '../../src/components/MapLayer'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MapLayer />, div)
})