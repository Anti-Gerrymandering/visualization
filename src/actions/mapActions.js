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
    fetchStatsJson()
  }
}

/**
 * The default function to grab GEOJSON Data
 * TODO: FINISH ERROR HANDLER
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

/**
 * Set active district
 * This determines which district to show stats for in the sidebar.
 * @param {Object} district - GEOJSON district to set as active
 */
export function setCurrentDistrict (district) {
  store.dispatch({
    type: ACTION_EVENTS.CHANGE_ACTIVE_DISTRICT,
    district
  })
}

export function fetchStatsJson () {
  const { mapDataReducer, mapControllerReducer } = store.getState()
  const { statsFiles } = mapDataReducer
  const { branch } = mapControllerReducer

  if (statsFiles.size < 1) return
  const fileUri = '/stats/' + statsFiles[branch] + '.json'

  window.fetch(fileUri).then(response =>
    response.json().then(json => {
      store.dispatch({
        type: ACTION_EVENTS.STATS_LOADED,
        stats: json
      })
    })
  )
}
