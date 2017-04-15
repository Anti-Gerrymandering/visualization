/**
 * All actions to trigger a reducer must be placed with this object literal
 * The format should follow a key-value pair
 * With the Key Being completely capitalized
 * And the Value being just the string representation of the Key
 * Like so:
 *   { ON_LOAD: 'ON_LOAD' }
 * The values should always be accessed using a destructing pratice:
 *   const { ON_LOAD } = ACTION_EVENTS
 */
const ACTION_EVENTS = {
  MAP_EVENT: 'MAP_EVENT',
  MAP_SWITCH_LAYER: 'MAP_SWITCH_LAYER',
  GEO_DATA_LOADED: 'GEO_DATA_LOADED', // For GeoJSON
  GEO_CODE_ADDR: 'GEO_CODE_ADDR', // For Converting Address to Lat&Lng
  META_DATA: 'META_DATA'
}

// Base uri to pull from for fetch
export const uri = 'districts/pa/'

export default ACTION_EVENTS
