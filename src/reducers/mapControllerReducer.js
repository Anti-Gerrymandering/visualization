import ACTION_EVENTS from '../actions/index'

const { CHANGE_YEAR, MAP_SWITCH_LAYER } = ACTION_EVENTS

export function mapControllerReducer (state = {}, action) {
  switch (action.type) {
    case MAP_SWITCH_LAYER:
      const { branch, layer } = action
      return Object.assign({}, state, { branch, layer })
    case CHANGE_YEAR:
      const { year } = action
      return Object.assign({}, state, { year })
    default:
      return state
  }
}
