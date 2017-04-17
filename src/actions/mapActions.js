import ACTION_EVENTS, { uri } from './index'
import store from '../configureStore'
import { collectBranchAndYears } from './appActions'

/**
 * switchLayer updates the store
 * and triggers a fetchGeoJson
 * @param {String} year
 * @param {String} branch
 * @param {Integer} cur
 * @return {Function} callback for onClick
 */
export function switchLayer (year, branch, cur) {
  const { MAP_SWITCH_LAYER } = ACTION_EVENTS
  const { mapReducer } = store.getState()
  return () => {
    store.dispatch({
      type: MAP_SWITCH_LAYER,
      layer: cur,
      year,
      years: collectBranchAndYears(mapReducer.geoFiles, cur)[1],
      branch
    })
    fetchGeoJson()
  }
}

/**
 * The default function to grab GEOJSON Data
 * Currently it loads the lower house data
 * TODO: FINISH ERROR HANDLER
 * NOTE: This function saves data in the localStorage object
 * that must be cleared on change
 */
export function fetchGeoJson () {
  const { mapReducer } = store.getState()
  const { currentLayer, geoFiles } = mapReducer
  const { branch, layer, year } = currentLayer
  if (geoFiles.size < 1) return
  // Ugly uri builder
  const fileUri = uri + branch + '/' + geoFiles.toArray()[layer][branch][year] + '.geojson'
  console.log('FETCHING URI', fileUri)
  window.fetch(fileUri)
        .then(rsp => {
          rsp.json().then(json => {
            const { GEO_DATA_LOADED } = ACTION_EVENTS
            store.dispatch({ type: GEO_DATA_LOADED, data: json })
          })
        })
        // TODO: FINISH ERROR HANDLER
        .catch(err => console.log(err))
}
