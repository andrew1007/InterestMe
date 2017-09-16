import React, { Component } from 'react'
import SessionSignup from '../session/session_signup/session_signup'

export default class NavigationSignup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  toggleSignupModal() {
    this.setState({show: this.state.show ? false : true})
  }

  render() {
    const sessionSignupProps = {toggleSignupModal: () => this.toggleSignupModal()}
    return(
      <div>
        <button onClick={() => this.toggleSignupModal()}>
          Sign Up
        </button>
        {this.state.show ? <SessionSignup {...sessionSignupProps}/> : null}
      </div>
    )
  }
}
