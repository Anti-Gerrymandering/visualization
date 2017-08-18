/* eslint-env jest */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import { Map } from 'immutable'

import actions from 'actions'
import { switchBranch, fetchGeoJson, setCurrentDistrict } from 'actions/mapActions'

const mockStore = configureMockStore([thunk])

describe('switchBranch', () => {
  it('dispatches a switch layer action', () => {
    const store = mockStore({
      mapDataReducer: { statsFiles: [], geoFiles: Map({ federal: { 2015: 'somefile' } }) },
      mapControllerReducer: { year: '2015', branch: 'federal' } }
    )

    fetchMock.get(
      'end:somefile.geojson',
      { some: 'geojson' }
    )

    store.dispatch(switchBranch('federal'))

    expect(store.getActions()).toEqual([{ type: actions.MAP_SWITCH_LAYER, year: '2015', branch: 'federal' }])
  })
})

describe('fetchGeoJson', () => {
  it('fetches district geojson layer and dispatches update', () => {
    const store = mockStore({
      mapDataReducer: { geoFiles: Map({ upper: { 2015: 'somefile' } }) },
      mapControllerReducer: { branch: 'upper', year: '2015' }
    })

    fetchMock.get(
      'end:somefile.geojson',
      { some: 'geojson' }
    )

    store.dispatch(fetchGeoJson()).then(() =>
      expect(store.getActions())
        .toEqual([{ type: actions.GEO_DATA_LOADED, data: { some: 'geojson' } }])
    )
  })
})

describe('setCurrentDistrict', () => {
  it('retuns correct action with passed in district', () => {
    const action = setCurrentDistrict('somedistrict')

    expect(action).toEqual({
      type: actions.CHANGE_ACTIVE_DISTRICT,
      district: 'somedistrict'
    })
  })
})
