/* eslint-env jest */
import React from 'react'
import ReactDOM from 'react-dom'
import MapLayer from '../../src/components/MapLayer'
import { Provider } from 'react-redux'
import store from '../../src/configureStore'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const map = <Provider store={store}><MapLayer /></Provider>
  ReactDOM.render(map, div)
})
