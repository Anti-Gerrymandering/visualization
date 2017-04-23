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
      <div class='inner-nav'>
        <div class='columns'>
          <div class='column is-1 leftNav-outterDiv-left'>
            <div class='leftNav-innerDiv-left' />
          </div>
          <div class='column is-6 leftNav-outterDiv-middle'>
            <div class='leftNav-innerDiv-middle' />
          </div>
          <div className='column is-5'>
            <form onSubmit={this.submit.bind(this)} >
              <div className='gm-rightHorn'>
                <input className='gm-form-control'
                  type='text'
                  onChange={this.changeVal.bind(this)}
                  defaultValue={this.state.addr} />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBar
