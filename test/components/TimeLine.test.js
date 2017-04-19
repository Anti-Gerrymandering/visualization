/* eslint-env jest */
import React from 'react'
import ReactDOM from 'react-dom'
import TimeLine from '../../src/components/TimeLine'
import { Provider } from 'react-redux'
import store from '../../src/configureStore'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const timeLine = <Provider store={store}><TimeLine /></Provider>
  ReactDOM.render(timeLine, div)
})
