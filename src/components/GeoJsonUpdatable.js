import { GeoJSON } from 'react-leaflet'

function getColorCompactness(c) {
  return c > 0.54  ? '#ffffff' :
    c > 0.45  ? '#ffffb2' :
    c > 0.30  ? '#fed976' :
    c > 0.15  ? '#feb24c' :
    c > 0.10  ? '#fc4e2a' :
    c > 0.05  ? '#e31a1c' :
    '#b10026'
}

let updateDistrictColors = (leafletElement) => {
  leafletElement.eachLayer((layer) => {
    layer.setStyle({
      fillColor: getColorCompactness(layer.feature.properties.Compactness),
      weight: 1,
      opacity: 1,
      color: 'black',
      fillOpacity: 0.8
    })
  })
}

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
    }
    this.leafletElement.addData(this.props.data)
    updateDistrictColors(this.leafletElement)
  }
}

export default GeoJsonUpdatable
