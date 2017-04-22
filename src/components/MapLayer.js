import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map, Marker, TileLayer } from 'react-leaflet'
import GeoJsonUpdatable from './GeoJsonUpdatable'
import L from 'leaflet'
import { fetchGeoJson } from '../actions/mapActions'

// Begin Map Variables
const stamenTonerTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const stamenTonerAttr = 'Map tiles by &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
const mapCenter = [41.203323, -77.194527]
const zoomLevel = 8
// End Map Variables

/**
 * Places the marker for address lookup
 * @param {ReactProps} props - containing lat and long
 */
const AddressMarker = props => {
  if (props === null) return null
  const markers = props.map((e, i) => {
    const position = [e.lat, e.lng]
    return <Marker key={i} position={position} />
  })
  return markers
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
@connect(props => {
  const { addr, data } = props.mapDataReducer
  return { addr, data }
})
class MapLayer extends Component {
  componentWillMount () {
    fetchGeoJson()
  }

  componentDidUpdate (prevProps, prevState) {
    this.zoomTo()
  }

  zoomIn () {
    this.leaflet.leafletElement.zoomIn()
  }

  zoomOut () {
    this.leaflet.leafletElement.zoomOut()
  }

  zoomTo () {
    if (this.props.addr === null) return
    const { lat, lng } = this.props.addr[0]
    const latLng = L.latLng([lat, lng])
    this.leaflet.leafletElement.setView(latLng, 14)
  }

  render () {
    const geo = () => {
      // TODO: refactor in a more efficient manner
      if (Object.keys(this.props.data).length >= 1) {
        return <GeoJsonUpdatable data={this.props.data} />
      }
      return null
    }
    return (
      <div className='leaflet-container'>
        <Map className='map' center={mapCenter} zoom={zoomLevel}
          // Reference to actual DOM
          ref={ref => { this.leaflet = ref }} >
          <TileLayer
            attribution={stamenTonerAttr}
            url={stamenTonerTiles} />
          { geo() }
          { AddressMarker(this.props.addr) }
        </Map>
        <div className='resize'>
          <ul>
            <li><button className='button'
              onClick={this.zoomIn.bind(this)} >+</button></li>
            <li>
              <button className='button'
                onClick={this.zoomOut.bind(this)} >-</button></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default MapLayer
