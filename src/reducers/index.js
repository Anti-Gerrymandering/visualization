import { combineReducers } from 'redux'
import { mapControllerReducer } from './mapControllerReducer'
import { mapDataReducer } from './mapDataReducer'

/**
 * Aggregate reducers as a singleton for the store
 */
const rootReducer = combineReducers({
  mapControllerReducer,
  mapDataReducer
})

export default rootReducer
