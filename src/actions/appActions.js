import ACTIONS, { uri } from './index'
import { Map } from 'immutable'
import { fetchGeoJson, fetchStatsJson } from './mapActions'

/**
 * Simple function to change the year
 * @param {String} year
 */
export function changeYear (year) {
  return (dispatch) => {
    console.log('Year change')
    dispatch({ type: ACTIONS.CHANGE_YEAR, year })
    return fetchGeoJson()
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
  return (dispatch) =>
    dispatch(pullMetaData())
}

/**
 * pullMetaData triggers an ajax action and loads necessary data if needed
 */
export function pullMetaData () {
  return (dispatch) =>
    window.fetch(uri + 'metaData.json')
      .then(rsp => rsp.json())
      .then(json => {
        const geoFiles = Map(json.geoFiles)
        const { statsFiles } = json
        dispatch({
          type: ACTIONS.META_DATA,
          geoFiles,
          statsFiles,
          branch: Object.keys(json.geoFiles)[0]
        })
        fetchGeoJson()
        fetchStatsJson()
      })
      .catch(() => console.error('Failed to fetch metadata!'))
}
