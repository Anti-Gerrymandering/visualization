import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Map, Marker, TileLayer } from 'react-leaflet'
import GeoJsonUpdatable from './GeoJsonUpdatable'
import L from 'leaflet'
import { fetchGeoJson, setCurrentDistrict } from '../actions/mapActions'

// Begin Map Variables
const stamenTonerTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const stamenTonerAttr = 'Map tiles by &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
const mapCenter = [41.203323, -77.194527]
const zoomLevel = 7
// End Map Variables

/**
 * Places the marker for address lookup
 * @param {ReactProps} props - containing lat and long
 */
const AddressMarker = props => {
  if (!props) return null

  const position = [props.lat, props.lng]
  return <Marker position={position} />
}

const getColorCompactness = (c) =>
  c > 0.55 ? '#ffffff'
    : c > 0.40 ? '#ffffb2'
    : c > 0.25 ? '#fed976'
    : c > 0.15 ? '#feb24c'
    : c > 0.10 ? '#fc4e2a'
    : c > 0.05 ? '#e31a1c'
    : '#b10026'

const setDistrictStyle = (feature, layer) => {
  layer.setStyle({
    fillColor: getColorCompactness(feature.properties.Compactness),
    weight: 1,
    opacity: 1,
    color: 'black',
    fillOpacity: 0.8
  })
  layer.on({
    click: () => setCurrentDistrict(feature)
  })
}

/**
 * MapLayer is the GIS layer of this web-app
 * Most of the GIS is Handled through Map and TileLayer
 * Most of this was taken from Azavea's Blog:
 * https://azavea.com/blog/2016/12/05/getting-started-with-react-and-leaflet
 *
 * This Component holds a reference to a real DOM node outside the virtual DOM
 * so leaflet can be updated.
 * https://facebook.github.io/react/docs/refs-and-the-dom.html
 */
@connect(state => {
  const { coordinates, data } = state.mapDataReducer
  return { coordinates, data }
})
class MapLayer extends Component {
  static propTypes = {
    coordinates: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  }

  componentWillMount () {
    fetchGeoJson()
  }

  componentDidUpdate () {
    this.zoomTo()
  }

  zoomTo () {
    if (!this.props.coordinates) return
    const { lat, lng } = this.props.coordinates
    const latLng = L.latLng([lat, lng])
    this.leaflet.leafletElement.setView(latLng, 14)
  }

  render () {
    const geo = () => {
      // TODO: refactor in a more efficient manner
      if (Object.keys(this.props.data).length >= 1) {
        return <GeoJsonUpdatable data={this.props.data} onEachFeature={setDistrictStyle} />
      }
      return null
    }
    return (
      <div className='leaflet-container'>
        <div className='columns'>
          <div className='column is-12'>
            <Map className='map' center={mapCenter} zoom={zoomLevel}
              // Reference to actual DOM
              ref={ref => { this.leaflet = ref }} >
              <TileLayer
                attribution={stamenTonerAttr}
                url={stamenTonerTiles} />
              { geo() }
              { AddressMarker(this.props.coordinates) }
            </Map>
          </div>
        </div>
      </div>
    )
  }
}

export default MapLayer
