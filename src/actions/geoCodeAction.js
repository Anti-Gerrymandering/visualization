import tokens from './tokens'
import ACTION_EVENTS from './index'
import store from '../configureStore'

/**
 * geoCodeAddress serves to convert an address string to a url
 * complient string and query of Google's GeoCode API
 * @param {String} addr The full address to be queried against
 */
export function geoCodeAddress (addr) {
  const { GEO_CODE_ADDR } = ACTION_EVENTS
  const { googleAPI } = tokens
  const uriAddr = window.encodeURIComponent(addr)
  const uri = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
              uriAddr + '&key=' + googleAPI
  window.fetch(uri)
        .then(response => {
          response.json().then(json => {
            if (json.error_message === undefined) {
              const latLng = json.results.map(r => {
                return Object.assign({}, r.geometry.location)
              })
              store.dispatch({ type: GEO_CODE_ADDR, addr: latLng })
            } else console.error('API Key error')
          })
        })
        .catch(err => console.log(err))
}
