import React, { Component } from 'react'

export default class SessionSignupForm extends Component {
  render() {
    return(
      <form onSubmit={(e) => this.props.handleSubmit(e)}>
        <div>
          Username
          <input onChange={e => this.props.update(e, 'username')}/>
        </div>
        <div>
          Password
          <input type="password" onChange={e => this.props.update(e, 'password')}/>
        </div>
        <div>
          <button type='Submit' value='Submit'>
            Log In
          </button>
          <button onClick={() => this.props.toggleSignupModal()}>
            Cancel
          </button>
        </div>
      </form>
    )
  }
}
