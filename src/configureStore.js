import { createStore } from 'redux'
import rootReducer from './reducers/index'
import { Map, OrderedSet } from 'immutable'

/* State provided on load */
const defaultState = {
  /* mapReducer: {
    geoFiles: OrderedSet([]),
    // Years refers to all the years available for the current layer
    years: OrderedSet([]),
    // Object to find the current layer in the metaData.json
    currentLayer: {
      layer: 0,
      year: '2015',
      branch: 'federal'
    },
    data: {},
    addr: null
  }, */
  mapDataReducer: {
    geoFiles: Map({}),
    data: {},
    addr: null,
    years: OrderedSet([])
  },
  mapControllerReducer: {
    layer: 0,
    year: '2015',
    branch: 'federal'
  }

}

/**
 * Data Store for the application
 */
const store = createStore(rootReducer,
                          defaultState,
                          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
