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
  if (data === null) console.log('Undefined')
  else {
    const { GEO_DATA_LOADED } = ACTION_EVENTS
    store.dispatch({ type: GEO_DATA_LOADED, data: GEO_DATA_LOADED })
  }
}
