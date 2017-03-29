import { combineReducers } from 'redux'
import { mapReducer } from './mapReducers'

/**
 * Aggregate reducers as a singleton for the store
 */
const rootReducer = combineReducers({ mapReducer })

export default rootReducer
