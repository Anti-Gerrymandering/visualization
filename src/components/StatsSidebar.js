import React, { Component } from 'react'
import { connect } from 'react-redux'

/**
 * StatsSidebar displays a sidebar with statistics for the
 * currently selected district
 */
@connect(props => {
  const { activeDistrict } = props.mapControllerReducer
  let stats

  if (activeDistrict) {
    const affGeoid = activeDistrict.properties.AFFGEOID
    stats = props.mapDataReducer.stats[affGeoid]
  }

  return { activeDistrict, stats }
})
class StatsSidebar extends Component {
  districtStats () {
    if (this.props.stats) {
      const district = this.props.activeDistrict
      const { stats } = this.props
      return (
        <div>
          <h2>{stats.District}</h2>

          <dl>
            <dt>Compactness</dt>
            <dd>{district.properties.Compactness}</dd>
          </dl>

          <h3>Results of last election</h3>
          {stats.Candidates.map(candidate =>
            <div key={candidate.CandidateName}>
              <h4>{candidate.CandidateName}</h4>
              <dl>
                <dt>Party</dt>
                <dd>{candidate.PartyName}</dd>
                <dt>Percentage of Vote</dt>
                <dd>{candidate.Percentage}</dd>
              </dl>
            </div>
          )}
        </div>
      )
    } else {
      return (
        <span>Select a district to see more information about that district.</span>
      )
    }
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
