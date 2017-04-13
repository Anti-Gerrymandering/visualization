import ACTION_EVENTS, { uri } from './index'
import store from '../configureStore'

/**
 * The mapLoad function checks localStorage for already saved
 * geojson data for the current layer. If the localStorage is
 * empty then it initiates another function to pull the data from
 * the webserver.
 * The localStorage Key for geoJSON is 'geo_data'
 */
export function mapLoad () {
  const data = null // JSON.parse(window.localStorage.getItem('geo_data'))
  if (data === null) fetchGeoJson()
  else {
    const { GEO_DATA_LOADED } = ACTION_EVENTS
    store.dispatch({ type: GEO_DATA_LOADED, data })
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
  console.log('GeoJSOn sent')
  const { mapReducer } = store.getState()
  const { currentLayer, geoFiles } = mapReducer
  if (geoFiles.length < 1) return
  const layer = geoFiles[currentLayer]
  const fileUri = uri + layer + '.geojson'
  console.log('The url', fileUri)
  window.fetch(fileUri)
        .then(rsp => {
          rsp.json().then(json => {
            const { GEO_DATA_LOADED } = ACTION_EVENTS
            store.dispatch({ type: GEO_DATA_LOADED, data: json })
            console.log('The JSON', json)
            window.localStorage.setItem('geo_data', JSON.stringify(json))
          })
        })
        // TODO: FINISH ERROR HANDLER
        .catch(err => console.log(err))
}
