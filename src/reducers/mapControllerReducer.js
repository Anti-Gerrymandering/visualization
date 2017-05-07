import ACTION_EVENTS from '../actions/index'

const { CHANGE_YEAR, CHANGE_ACTIVE_DISTRICT, MAP_SWITCH_LAYER } = ACTION_EVENTS

export function mapControllerReducer (state = {}, action) {
  const { year } = action

  switch (action.type) {
    case MAP_SWITCH_LAYER:
      const { branch } = action
      return Object.assign({}, state, { branch, year })
    case CHANGE_YEAR:
      return Object.assign({}, state, { year })
    case CHANGE_ACTIVE_DISTRICT:
      const activeDistrict = action.district
      return Object.assign({}, state, { activeDistrict })
    default:
      return state
  }
}

export default mapControllerReducer
