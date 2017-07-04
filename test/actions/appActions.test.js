/* eslint-env jest */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import { Map } from 'immutable'

import actions from 'actions'
import { changeYear, pullMetaData } from 'actions/appActions'

const mockStore = configureMockStore([thunk])

describe('changeYear', () => {
  it('dispatches a CHANGE_YEAR action', () => {
    const store = mockStore({})

    store.dispatch(changeYear('2015'))
    expect(store.getActions()).toEqual([{ type: actions.CHANGE_YEAR, year: '2015' }])
  })
})

describe('pullMetaData', () => {
  it('fetches metadata file and triggers action', () => {
    fetchMock.get('*', { geoFiles: { a: 'test' }, statsFiles: 'hi' })
    const store = mockStore({})

    const expectedAction = {
      type: actions.META_DATA,
      geoFiles: Map({a: 'test'}),
      statsFiles: 'hi',
      branch: 'a'
    }

    store.dispatch(pullMetaData()).then(() =>
      expect(store.getActions()).toEqual([expectedAction])
    )
  })
})
