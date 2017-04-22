import ACTION_EVENTS from '../actions/index'

const {
    GEO_CODE_ADDR,
    GEO_DATA_LOADED,
    MAP_SWITCH_LAYER,
    META_DATA,
    STATS_LOADED
} = ACTION_EVENTS

export function mapDataReducer (state = {}, action) {
  const { years } = action
  switch (action.type) {
    case GEO_DATA_LOADED:
      const { data } = action
      return Object.assign({}, state, { data })
    case GEO_CODE_ADDR:
      const { addr } = action
      return Object.assign({}, state, { addr })
    case META_DATA:
      // The data object is left out to avoid conflicts with the first case
      const { geoFiles, statsFiles } = action
      return Object.assign({}, state, { geoFiles, statsFiles, years })
    case MAP_SWITCH_LAYER:
      return Object.assign({}, state, { years })
    case STATS_LOADED:
      const { stats } = action
      return Object.assign({}, state, { stats })
    default:
      return state
  }
}
