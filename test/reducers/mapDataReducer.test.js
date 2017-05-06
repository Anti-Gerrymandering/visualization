/* eslint-env jest */
import { mapDataReducer } from '../../src/reducers/mapDataReducer'
import ACTION_EVENTS from '../../src/actions/index'
import { fromJS, Map, OrderedSet } from 'immutable'
import metaData from '../../public/districts/pa/metaData.json'

const { MAP_SWITCH_LAYER, META_DATA } = ACTION_EVENTS

// State from the configure store
const initState = {
  geoFiles: fromJS({}),
  data: {},
  addr: null
}

describe('Reducer::mapData', function () {
  it('Switches branch', () => {
    const filledState = Object.assign(
      {},
      initState,
      { geoFiles: fromJS(metaData.geoFiles) }
    )
    const geoFiles = filledState.geoFiles
    const yearsFederal = OrderedSet(Object.keys(geoFiles.get('federal')))
    const yearsHouse = OrderedSet(Object.keys(geoFiles.get('lower')))
    const yearsSenate = OrderedSet(Object.keys(geoFiles.get('upper')))
    const action = { type: MAP_SWITCH_LAYER, years: yearsFederal }
    const stateChangeOne = mapDataReducer(initState, action)
    // Assert the new and old state aren't the same instance
    expect(stateChangeOne === filledState).toBeFalsy()
    action.years = yearsHouse
    const stateChangeTwo = mapDataReducer(stateChangeOne, action)
    expect(stateChangeTwo === stateChangeOne).toBeFalsy()
    action.years = yearsSenate
    const stateChangeThree = mapDataReducer(stateChangeTwo, action)
    expect(stateChangeTwo === stateChangeThree).toBeFalsy()
  })

  it('Loading MetaData', () => {
    const { geoFiles } = metaData
    const action = { type: META_DATA, geoFiles: fromJS(geoFiles) }
    const newState = mapDataReducer(initState, action)
    // Assert the new and old state aren't the same instance
    expect(newState === initState).toBeFalsy()
    // Test might be useless, consider cutting
    expect(newState.geoFiles).toBeInstanceOf(Map)
    // TODO: Test years
  })
})
