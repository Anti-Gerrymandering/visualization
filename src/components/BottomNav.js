import React from 'react'
import TimeLine from './TimeLine'
import StatsPanel from './StatsPanel'

const BottomNav = () => {
  return (
    <div className='BottomNav'>
      <div className='columns'>

        <div className='column is-4'>
          <div className='gr-BottomNavInnerPadding'>
            <div className='gr-HR' />
            <TimeLine />
          </div>
          <div className='gr-Maplegend'><div className='gr-InnerMaplegend'><h3 className='gr-InnerMapLegendHeader'>Map Legend</h3></div></div>
          <div id='gm-results' />
        </div>

        <div className='column is-1' />

        <div className='column is-7'>
          <div className='gr-BottomNavInnerPadding gr-ResultsDiv'>
            <div className='gr-HR' />
            <StatsPanel />
          </div>
        </div>

      </div>
    </div>
  )
}

export default BottomNav
