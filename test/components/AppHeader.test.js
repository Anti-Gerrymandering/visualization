/* eslint-env jest */
import React from 'react'
import ReactDOM from 'react-dom'
import AppHeader from '../../src/components/AppHeader'
import { Provider } from 'react-redux'
import store from '../../src/configureStore'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const appHeader = () => {
    return (
      <Provider store={store}>
        <AppHeader />
      </Provider>
    )
  }
  ReactDOM.render(<appHeader />, div)
})
