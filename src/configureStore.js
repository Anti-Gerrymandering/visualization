import { createStore } from 'redux'
import rootReducer from './reducers/index'

/* State provided on load */
const defaultState = {
  mapReducer: {
    geoFiles: {},
    branches: ['federal'],
    years: ['2015'],
    // Index of the current geo file
    currentLayer: {
      branch: 'federal',
      year: '2015'
    },
    data: {},
    addr: null
  }
}

/**
 * Data Store for the application
 */
const store = createStore(rootReducer,
                          defaultState,
                          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
