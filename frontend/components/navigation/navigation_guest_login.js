import React, { Component } from 'react'
import { hashHistory } from 'react-router'

export default class NavigationGuestLogin extends Component {

  async _handleClick() {
    const user = {username: "Pusheen", password: "password"};
    await this.props.processLogin(user)
    hashHistory.push('/home')
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
