import { createStore } from 'redux'
import rootReducer from './reducers/index'

/**
 * Data Store for the application
 */
const store = createStore(rootReducer)

export default store
