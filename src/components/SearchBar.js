import React, { Component } from 'react'
import * as Actions from '../actions/geoCodeAction'

class SearchBar extends Component {
  constructor () {
    super()
    this.state = { addr: '' }

    // Bind event listeners to the class
    this.submit = this.submit.bind(this)
    this.changeVal = this.changeVal.bind(this)
  }
  changeVal (e) {
    this.setState({ addr: e.target.value })
  }
  submit (e) {
    e.preventDefault()
    Actions.geoCodeAddress(this.state.addr)
  }
  render () {
    return (
      <div className='inner-nav'>
        <div className='columns'>
          <div className='column is-1 leftNav-outterDiv-left'>
            <div className='leftNav-innerDiv-left' />
          </div>
          <div className='column is-6 leftNav-outterDiv-middle'>
            <div className='leftNav-innerDiv-middle' />
          </div>
          <div className='column is-5'>
            <form onSubmit={this.submit} >
              <div className='gm-rightHorn'>
                <input className='gm-form-control'
                  type='text'
                  onChange={this.changeVal}
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
