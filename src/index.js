import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import store from './configureStore'

/**
 * Wraps the App/root component in the Redux Store
 */
const app = () => {
  return (
    <Provider store={store} >
      <App />
    </Provider>
  )
}

ReactDOM.render(
  app(),
  document.getElementById('root')
)
