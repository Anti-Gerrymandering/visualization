import ACTION_EVENTS from './index'
import store from '../configureStore'

/**
 * The mapLoad function checks localStorage for already saved
 * geojson data for the current layer. If the localStorage is
 * empty then it initiates another function to pull the data from
 * the webserver.
 * The localStorage Key for geoJSON is 'geo_data'
 */
export function mapLoad () {
  const data = window.localStorage.getItem('geo_data')
  if (data === null) fetchGeoJson()
  else {
    const { GEO_DATA_LOADED } = ACTION_EVENTS
    store.dispatch({ type: GEO_DATA_LOADED, data })
  }
}

/**
 * The default function to grab GEOJSON Data
 * TODO: FINISH ERROR HANDLER
 */
export function fetchGeoJson () {
  const { mapReducer } = store.getState()
  const fileUri = 'districts/pa/' + mapReducer.currentLayer.join('/') + '.geojson'
  window.fetch(fileUri)
        .then(response => {
          response.json().then(json => {
            console.log(json)
            const { GEO_DATA_LOADED } = ACTION_EVENTS
            store.dispatch({ type: GEO_DATA_LOADED, data: json })
          })
        })
        // TODO: FINISH ERROR HANDLER
        .catch(err => console.log(err))
}
