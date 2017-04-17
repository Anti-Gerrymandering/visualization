import ACTION_EVENTS from '../actions/index'

const {
  CHANGE_YEAR,
  GEO_DATA_LOADED,
  GEO_CODE_ADDR, META_DATA,
  MAP_SWITCH_LAYER
} = ACTION_EVENTS

export function mapReducer (state = {}, action) {
  const { year, years } = action // need to reafactor this
  switch (action.type) {
    case GEO_DATA_LOADED:
      const { data } = action
      return Object.assign({}, state, { data })
    case GEO_CODE_ADDR:
      const { addr } = action
      return Object.assign({}, state, { addr })
    case META_DATA:
      // The data object is left out to avoid conflicts with the first case
      const { geoFiles } = action
      return Object.assign({}, state, { geoFiles, years })
    case MAP_SWITCH_LAYER:
      const { branch, layer } = action
      return Object.assign({}, state, { years, currentLayer: { branch, layer, year } })
    case CHANGE_YEAR:
      console.log('Change year is happening', year)
      const updateCurrentLayer = Object.assign({}, state.currentLayer, { year })
      console.log('Update', updateCurrentLayer)
      return Object.assign({}, state, { currentLayer: updateCurrentLayer })
    default:
      return state
  }
}
