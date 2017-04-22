import React, { Component } from 'react'
import { connect } from 'react-redux'


/**
 * StatsSidebar displays a sidebar with statistics for the
 * currently selected district
 */
@connect(props => {
  const { activeDistrict } = props.mapControllerReducer
  return { activeDistrict }
})
class StatsSidebar extends Component {
  districtStats () {
    const district = this.props.activeDistrict
    if (!district) return

    return (
      <dl>
        <dt>Compactness</dt>
        <dd>{district.properties.Compactness}</dd>
      </dl>
    )
  }

  render () {
    return (
      <div id='sidebar'>
        {this.districtStats()}
      </div>
    )
  }
}

export default StatsSidebar
