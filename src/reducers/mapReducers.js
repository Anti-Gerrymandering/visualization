import ACTION_EVENTS from '../actions/index'

const { GEO_DATA_LOADED, GEO_CODE_ADDR, META_DATA } = ACTION_EVENTS

export function mapReducer (state = {}, action) {
  switch (action.type) {
    case GEO_DATA_LOADED:
      const { data } = action
      return Object.assign({}, state, { data })
    case GEO_CODE_ADDR:
      const { addr } = action
      return Object.assign({}, state, { addr })
    case META_DATA:
      const { json } = action
      const years = Object.keys(json.geoFiles)
      console.log('Ye old years', years)
      return Object.assign({}, state, { geoFiles: json, years })
    default:
      return state
  }
}
