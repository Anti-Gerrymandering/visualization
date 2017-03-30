import { createStore } from 'redux'
import rootReducer from './reducers/index'

/** State provided on load */
const defaultState = {
  mapReducer: {
    currentLayer: ['lower', 'cb_2015_42_sldl_500k'],
    data: {}
  }
}

/**
 * Data Store for the application
 */
const store = createStore(rootReducer, defaultState)

export default store
