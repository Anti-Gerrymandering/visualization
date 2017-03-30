import { createStore } from 'redux'
import rootReducer from './reducers/index'

/** State provided on load */
const defaultState = {
  mapReducer: {
    // An Array with no more than two elements
    currentLayer: ['lower', 'cb_2015_42_sldl_500k'],
    data: {}
  }
}

/**
 * Data Store for the application
 */
const store = createStore(rootReducer, 
                          defaultState,
                          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
