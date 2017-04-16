import React from 'react'

const TimeLine = () => {
  return (
    <div>
      <ul id='timeline'>
        <li className='event'>
          <div className='content'>
            <div className='avatar'>me</div>
          </div>
          <div className='dot'>
            <span className='circle' />
          </div>
          <div className='date'>2008</div>
        </li>
        <li className='event'>
          <div className='content'>
            <div className='avatar'>me</div>
          </div>
          <div className='dot'>
            <span className='circle' />
          </div>
          <div className='date'>2009</div>
        </li>
        <li className='event'>
          <div className='content'>
            <div className='avatar'>me</div>
          </div>
          <div className='dot'>
            <span className='circle' />
          </div>
          <div className='date'>2010</div>
        </li>
        <li className='event'>
          <div className='content'>
            <div className='avatar'>me</div>
          </div>
          <div className='dot'>
            <span className='circle' />
          </div>
          <div className='date'>2011</div>
        </li>
      </ul>
    </div>
  )
}

export default TimeLine
