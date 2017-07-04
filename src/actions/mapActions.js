import { OrderedSet } from 'immutable'

import ACTION_EVENTS, { uri } from './index'
import store from '../configureStore'

/**
 * switchBranch changes the active branch (office) and triggers a fetchGeoJson
 * for the map file
 * @param {String} branch
 * @return {Function} callback for onClick
 */
export function switchBranch (branch) {
  const { MAP_SWITCH_LAYER } = ACTION_EVENTS
  const { mapDataReducer } = store.getState()

  // The sort here is duplicated in the tabs rendering. We should refactor
  // to do this when the data is loaded instead.
  let years = Object.keys(mapDataReducer.geoFiles.get(branch))
  years = OrderedSet(years.sort((x, y) => y - x))

  return () => {
    store.dispatch({
      type: MAP_SWITCH_LAYER,
      year: years.first(),
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
  const { branch, year } = mapControllerReducer
  if (geoFiles.size < 1) return
  // Ugly uri builder
  const fileUri = uri + branch + '/' + geoFiles.get(branch)[year] + '.geojson'
  console.log('FETCHING URI', fileUri)
  window.fetch(fileUri)
        .then(rsp => {
          rsp.json().then(json => {
            const { GEO_DATA_LOADED } = ACTION_EVENTS
            store.dispatch({ type: GEO_DATA_LOADED, data: json })
          })
        })
        // TODO: FINISH ERROR HANDLER
        .catch(() => console.log('Failed to fetch GEOJSON!'))
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
