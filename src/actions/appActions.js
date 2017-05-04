import ACTIONS, { uri } from './index'
import { Map } from 'immutable'
import { fetchGeoJson, fetchStatsJson } from './mapActions'
import store from '../configureStore'

/**
 * Simple function to change the year
 * @param {String} year
 */
export function changeYear (year) {
  return () => {
    store.dispatch({ type: ACTIONS.CHANGE_YEAR, year })
    console.log('Year change')
    fetchGeoJson()
  }
}

/**
 * Convert branch to the display name
 * TODO: Consider moving this to metadata.json
 * @param {String} branch
 */
export function convertBranch (branch) {
  switch (branch) {
    case 'federal':
      return 'U.S. House Districts'
    case 'lower':
      return 'P.A. House Districts'
    case 'upper':
      return 'P.A. Senate Districts'
    default:
      return branch
  }
}

/**
 * onLoad functions checks on the availability of the META-Data
 */
export function onLoad () {
  const { mapDataReducer } = store.getState()
  // REVIEW: Potentially unnecessary check
  if (mapDataReducer.geoFiles.size < 1) {
    pullMetaData()
    return
  }
  fetchGeoJson()
}

/**
 * pullMetaData triggers an ajax action and loads necessary data if needed
 */
export function pullMetaData () {
  const { META_DATA } = ACTIONS
  window.fetch(uri + 'metaData.json')
        .then(rsp => {
          rsp.json().then(json => {
            const geoFiles = Map(json.geoFiles)
            const { statsFiles } = json
            store.dispatch({
              type: META_DATA,
              geoFiles,
              statsFiles,
              branch: Object.keys(geoFiles)[0]
            })
            fetchGeoJson()
            fetchStatsJson()
          })
        })
        .catch(e => console.error(e))
}
