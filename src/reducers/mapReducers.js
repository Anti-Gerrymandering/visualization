import ACTION_EVENTS from '../actions/index'

const { GEO_DATA_LOADED, GEO_CODE_ADDR } = ACTION_EVENTS

export function mapReducer (state = {}, action) {
  switch (action.type) {
    case GEO_DATA_LOADED:
      return Object.assign({}, state, action)
    case GEO_CODE_ADDR:
      const { addr } = action
      return Object.assign({}, state, { addr })
    default:
      return state
  }
}
