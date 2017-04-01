import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map, TileLayer } from 'react-leaflet'
import GeoJsonUpdatable from './GeoJsonUpdatable'
import * as Actions from '../actions/mapActions'

// Begin Map Variables
const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png'
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash Map data &copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
const mapCenter = [41.203323, -77.194527]
const zoomLevel = 7
// End Map Variables

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
@connect(props =>{
  return props.mapReducer
})
class MapLayer extends Component {
  componentWillMount () {
    Actions.mapLoad()
  }
  componentWillReceiveProps (prevProps) {
    if (prevProps.data !== this.props.data) {
      console.log('GeoJsonUpdatable: Clearing previous GeoJson')
      this.leaflet.leafletElement.clearLayers()
    }
  }
  componentDidMount() {
    console.log(this.leaflet) 
  }
  componentDidUpdate (prevProps) {
    if (prevProps.data !== this.props.data) {
      console.log('GeoJsonUpdatable: Rendering new GeoJson')
      this.leaflet.leafletElement.addData(this.props.data)
    }

    if (prevProps.visibleIds !== this.props.visibleIds) {
      this.leaflet.leafletElement.eachLayer((layer) => {
        if (this.props.visibleIds.indexOf(layer.feature.id) === -1) {
          layer.setStyle({fillOpacity: 0, opacity: 0})
        } else {
          layer.setStyle({fillOpacity: 0.4, opacity: 1})
        }
      })
    }
  }
  render () {
    const geoJson = () => {
      if (Object.keys(this.props.data).length === 0) return null
      return <GeoJsonUpdatable data={this.props.data} />
    }
    return (
      <div className='leaflet-container'>
        <Map className='map' center={mapCenter} zoom={zoomLevel}
          // Reference to actual DOM
          ref={ref => { this.leaflet = ref }} >
          <TileLayer
            attribution={stamenTonerAttr}
            url={stamenTonerTiles} />
        </Map>
      </div>
    )
  }
}

export default MapLayer
