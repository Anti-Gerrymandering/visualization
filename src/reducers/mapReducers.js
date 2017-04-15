import ACTION_EVENTS from '../actions/index'

const { GEO_DATA_LOADED, GEO_CODE_ADDR, META_DATA, MAP_SWITCH_LAYER } = ACTION_EVENTS

export function mapReducer (state = {}, action) {
  switch (action.type) {
    case GEO_DATA_LOADED:
      const { data } = action
      return Object.assign({}, state, { data })
    case GEO_CODE_ADDR:
      const { addr } = action
      return Object.assign({}, state, { addr })
    case META_DATA:
      // The data object is left out to avoid conflicts with the first case
      const { geoFiles, years } = action
      return Object.assign({}, state, { geoFiles, years })
    case MAP_SWITCH_LAYER:
      const { branch, layer, year } = action
      return Object.assign({}, state, { currentLayer: { branch, layer, year } })
    default:
      return state
  }
}
