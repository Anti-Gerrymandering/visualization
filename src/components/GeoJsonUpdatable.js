import { GeoJSON } from 'react-leaflet'

/**
 * This module was coppied from:
 * https://github.com/open-austin/austingreenmap/blob/master/client/js/components/GeoJsonUpdatable.jsx
 * It allows for GeoJSON to be rerender and not coddified on load.
 */
class GeoJsonUpdatable extends GeoJSON {
  componentWillReceiveProps (prevProps) {
    if (prevProps.data !== this.props.data) {
      // Removes old data
      this.leafletElement.clearLayers()
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.data !== this.props.data) {
      // Adds new data to the map
      this.leafletElement.addData(this.props.data)
    }
  }
}

export default GeoJsonUpdatable
