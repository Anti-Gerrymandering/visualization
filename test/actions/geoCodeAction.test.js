/* eslint-env jest */

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import actions from 'actions'
import { geoCodeAddress } from 'actions/geoCodeAction'

const mockStore = configureMockStore([thunk])

describe('geoCodeAddress', () => {
  it('looks up coordinates from Google', () => {
    const store = mockStore({})

    fetchMock.get(
      'begin:https://maps.googleapis.com/maps/api/geocode/json?address=testaddr',
      { results: [{ geometry: { location: 'testcoords' } }] }
    )

    store.dispatch(geoCodeAddress('testaddr')).then(() =>
      expect(store.getActions()).toEqual([{ type: actions.GEO_CODE_ADDR, addr: ['testcoords'] }])
    )
  })
})
