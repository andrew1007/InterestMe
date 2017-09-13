import React, { Component } from 'react'
import { hashHistory } from 'react-router'

export default class NavigationLogout extends Component {
  async _handleClick() {
    await this.props.processLogout()
    hashHistory.push('/session')
  }

  render() {
    return (
      <button onClick={this._handleClick}>
        Logout
      </button>
    )
  }
}
