import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'

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
 */
class MapLayer extends Component {
  render () {
    return (
      <div className='leaflet-container'>
        <Map center={mapCenter} zoom={zoomLevel}>
          <TileLayer
            attribution={stamenTonerAttr}
            url={stamenTonerTiles} />
        </Map>
      </div>
    )
  }
}

export default MapLayer
