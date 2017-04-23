import React from 'react'
import TimeLine from './TimeLine'
import StatsSidebar from './StatsSidebar'

const BottomNav = () => {
  return (
    <div classNameName='BottomNav'>
      <div className='columns'>

        <div className='column is-1'>

          <div id='gm-results' />

        </div>

        <div className='column is-4'>
          <TimeLine />
        </div>

        <div className='column is-2' />

        <div className='column is-4'>
          <StatsSidebar />
        </div>

        <div className='column is-1' />
      </div>
    </div>
  )
}

export default BottomNav
