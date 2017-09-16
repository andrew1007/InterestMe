import React, { Component } from 'react'
import SessionLogin from '../session/session_login/session_login'

export default class NavigationLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  toggleLoginModal() {
    this.setState({show: this.state.show ? false : true})
  }

  render() {
    const sessionLoginProps = {toggleLoginModal: () => this.toggleLoginModal()}
    return(
      <div>
        <button onClick={() => this.toggleLoginModal()}>
          Login
        </button>
        {this.state.show ? <SessionLogin {...sessionLoginProps}/> : null}
      </div>
    )
  }
}
