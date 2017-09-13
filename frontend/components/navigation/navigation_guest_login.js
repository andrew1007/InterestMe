import React, { Component } from 'react'
import { hashHistory } from 'react-router'

export default class NavigationGuestLogin extends Component {

  _handleClick() {
    const user = {username: "Pusheen", password: "password"};
    this.props.processLogin(user).then( () => {
      hashHistory.push('/home')
    })
  }

  render() {
    return (
      <div>
        <button onClick={() => this._handleClick()}>
            Guest Login
        </button>
      </div>
    )
  }
}
