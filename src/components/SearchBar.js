import React, { Component } from 'react'
import * as Actions from '../actions/geoCodeAction'

class SearchBar extends Component {
  constructor () {
    super()
    this.state = { addr: '1401 John F Kennedy Blvd, Philadelphia, PA 19107' }
  }
  changeVal (e) {
    this.setState({addr: e.target.value})
  }
  submit (e) {
    e.preventDefault()
    Actions.geoCodeAddress(this.state.addr)
  }
  render () {
    return (
      <form onSubmit={this.submit.bind(this)} >
        <div className='field has-addons'>
          <p className='control'>
            <input className='input'
              type='text'
              onChange={this.changeVal.bind(this)}
              defaultValue={this.state.addr} />
          </p>
          <p className='control'>
            <button type='submit' className='button is-info'>Plot</button>
          </p>
        </div>
      </form>
    )
  }
}

export default SearchBar
