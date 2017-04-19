/* eslint-env jest */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '../../src/configureStore'
import App from '../../src/components/App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const app = <Provider store={store}><App /></Provider>
  ReactDOM.render(app, div)
})
