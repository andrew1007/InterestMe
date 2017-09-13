import React, { Component } from 'react'
import { hashHistory } from 'react-router'

export default class NavigationProfile extends Component {

  _handleClick() {
    hashHistory.push(`/user/${this.props.id}`)
  }

  render() {
    return (
      <div>
        <button onClick={() => this._handleClick()}>
          profile
        </button>
      </div>
    )
  }
}
