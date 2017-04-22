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
  const { mapDataReducer } = store.getState()
  // Not sure if moving this out of the lazy-loading callback will hurt performance
  const years = collectBranchAndYears(mapDataReducer.geoFiles, cur)[1]
  year = years.get(year) !== undefined ? year : years.first()
  return () => {
    store.dispatch({
      type: MAP_SWITCH_LAYER,
      layer: cur,
      year,
      years,
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
  const { mapDataReducer, mapControllerReducer } = store.getState()
  const { geoFiles } = mapDataReducer
  const { branch, layer, year } = mapControllerReducer
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
