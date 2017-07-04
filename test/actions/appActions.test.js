/* eslint-env jest */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

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
    const store = mockStore({})

    store.dispatch(pullMetaData()).then(() =>
      expect(store.getActions()).toEqual([{ type: actions.META_DATA, geoFiles: 'testFiles' }])
    )
  })
})
