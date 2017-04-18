/* eslint-env jest */
import { mapDataReducer } from '../../src/reducers/mapDataReducer'
import ACTION_EVENTS from '../../src/actions/index'
import { OrderedSet } from 'immutable'
import metaData from '../../public/districts/pa/metaData.json'

const {
  GEO_CODE_ADDR,
  GEO_DATA_LOADED,
  MAP_SWITCH_LAYER,
  META_DATA
} = ACTION_EVENTS

// State from the configure store
const initState = {
  geoFiles: OrderedSet([]),
  data: {},
  addr: null,
  years: OrderedSet([])
}

describe('Reducer::mapData', function () {
  it('Switch Layer', () => {
    const filledState = Object.assign(
      {},
      initState,
      { geoFiles: OrderedSet(metaData.geoFiles) }
    )
    const geoFilesArray = filledState.geoFiles.toArray()
    const yearsFederal = OrderedSet(Object.keys(geoFilesArray[0]['federal']))
    const yearsHouse = OrderedSet(Object.keys(geoFilesArray[1]['lower']))
    const yearsSenate = OrderedSet(Object.keys(geoFilesArray[2]['upper']))
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
    const action = { type: META_DATA, geoFiles: OrderedSet(geoFiles) }
    const newState = mapDataReducer(initState, action)
    // Assert the new and old state aren't the same instance
    expect(newState === initState).toBeFalsy()
    // Test might be useless, consider cutting
    expect(newState.geoFiles).toBeInstanceOf(OrderedSet)
    // TODO: Test years
  })
})
