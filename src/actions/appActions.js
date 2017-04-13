import ACTIONS, { uri } from './index'
import * as mapActions from './mapActions'
import store from '../configureStore'

export function buildBranchYear () {
  const { mapReducer } = store.getState()
  const years = []
  console.log(mapReducer.years)
  const arrays = Object.values(mapReducer.geoFiles)
  console.log('That val', arrays)
  mapReducer.geoFiles[mapReducer.currentLayer].values().forEach(e => {
    years.push(Object.keys(e))
  })
  //years.sort()
  console.log(years)
}

/**
 * onLoad functions checks on the availability of the META-Data
 */
export function onLoad () {
  const { mapReducer } = store.getState()
  if (mapReducer.geoFiles.length < 1) {
    pullMetaData()
    return
  }
  pullMetaData()
  return 0
}

/**
 * pullMetaData triggers an ajax action and loads necessary data if needed
 */
export function pullMetaData () {
  const { META_DATA } = ACTIONS
  window.fetch(uri + 'metaData.json')
        .then(rsp => {
          console.log(rsp)
          rsp.json().then(json => {
            store.dispatch({ type: META_DATA, json })
            mapActions.fetchGeoJson()
            buildBranchYear()
          })
        })
        .catch(e => console.error(e))
}
