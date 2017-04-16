import React from 'react'

const TimeLine = () => {
  return (
    <div>
      <ul id='timeline'>
        <li className='event down'>
          <div className='content'>
            <div className='avatar'>me</div>
          </div>

          <div className='dot'>
            <span className='circle' />
          </div>
          <div className='date'>2008</div>
        </li>
        <li className='event up'>
          <div className='content'>
            <div className='avatar'>me</div>
          </div>
          <div className='dot'>
            <span className='circle' />
          </div>
          <div className='date'>2009</div>
        </li>
        <li className='event down'>
          <div className='content'>
            <div className='avatar'>me</div>
          </div>
          <div className='dot'>
            <span className='circle' />
          </div>
          <div className='date'>2010</div>
        </li>
        <li className='event up'>
          <div className='content'>
            <div className='avatar'>me</div>
          </div>
          <div className='dot'>
            <span className='circle' />
          </div>
          <div className='date'>2011</div>
        </li>
        <li className='last'>
          <div className='rectangle'>story continuing ...</div>
        </li>
      </ul>
    </div>
  )
}

export default TimeLine
