import ACTION_EVENTS, { uri } from './index'

/**
 * switchBranch changes the active branch (office) and triggers a fetchGeoJson
 * for the map file
 * @param {String} branch
 * @return {Function} callback for onClick
 */
export function switchBranch (branch) {
  const { MAP_SWITCH_LAYER } = ACTION_EVENTS

  return (dispatch, getState) => {
    const { mapDataReducer: { geoFiles } } = getState()

    const years = Object.keys(geoFiles.get(branch))
    const year = years[years.length - 1]

    dispatch({
      type: MAP_SWITCH_LAYER,
      year,
      branch
    })

    dispatch(fetchGeoJson())
    dispatch(fetchStatsJson())
  }
}

/**
 * The default function to grab GEOJSON Data
 * TODO: FINISH ERROR HANDLER
 */
export function fetchGeoJson () {
  return (dispatch, getState) => {
    const { mapDataReducer, mapControllerReducer } = getState()
    const { geoFiles } = mapDataReducer
    const { branch, year } = mapControllerReducer
    if (geoFiles.size < 1) return
    // Ugly uri builder
    const fileUri = uri + branch + '/' + geoFiles.get(branch)[year] + '.geojson'
    console.log('FETCHING URI', fileUri)
    return window.fetch(fileUri)
          .then(rsp =>
            rsp.json().then(json => {
              const { GEO_DATA_LOADED } = ACTION_EVENTS
              dispatch({ type: GEO_DATA_LOADED, data: json })
            })
          )
          // TODO: FINISH ERROR HANDLER
          .catch(() => console.log('Failed to fetch GEOJSON!'))
  }
}

/**
 * Set active district
 * This determines which district to show stats for in the sidebar.
 * @param {Object} district - GEOJSON district to set as active
 */
export function setCurrentDistrict (district) {
  return {
    type: ACTION_EVENTS.CHANGE_ACTIVE_DISTRICT,
    district
  }
}

export function fetchStatsJson () {
  return (dispatch, getState) => {
    const { mapDataReducer, mapControllerReducer } = getState()
    const { statsFiles } = mapDataReducer
    const { branch } = mapControllerReducer

    if (statsFiles.length < 1) return
    const fileUri = '/stats/' + statsFiles[branch] + '.json'

    return window.fetch(fileUri).then(response =>
      response.json().then(json => {
        dispatch({
          type: ACTION_EVENTS.STATS_LOADED,
          stats: json
        })
      })
    )
  }
}
