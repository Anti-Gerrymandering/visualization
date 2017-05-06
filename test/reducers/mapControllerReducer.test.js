/* eslint-env jest */
import mapControllerReducer from 'reducers/mapControllerReducer'
import actions from 'actions'

describe('Map Controller Reducer', () => {
  describe(actions.MAP_SWITCH_LAYER, () => {
    it('sets current branch', () => {
      const oldState = { branch: 'oldbranch' }
      const action = { type: actions.MAP_SWITCH_LAYER, branch: 'newbranch' }

      const newState = mapControllerReducer(oldState, action)

      expect(newState.branch).toEqual('newbranch')
    })
  })

  describe(actions.CHANGE_YEAR, () => {
    it('updates the year', () => {
      const oldState = { branch: 'oldbranch', year: '1970' }
      const action = { type: actions.CHANGE_YEAR, year: '2017' }

      const newState = mapControllerReducer(oldState, action)

      expect(newState).toEqual({ branch: 'oldbranch', year: '2017' })
    })
  })

  describe(actions.CHANGE_ACTIVE_DISTRICT, () => {
    it('updates the active district', () => {
      const oldState = { year: '1970' }
      const action = { type: actions.CHANGE_ACTIVE_DISTRICT, district: 'newDistrict' }

      const newState = mapControllerReducer(oldState, action)

      expect(newState).toEqual({ activeDistrict: 'newDistrict', year: '1970' })
    })
  })
})
