import React, { Component } from 'react'
import { hashHistory } from 'react-router'

export default class NavigationHome extends Component {
  _handleClick() {
    hashHistory.push(`/home`)
  }

  render() {
    return (
      <div>
        <button onClick={() => this._handleClick()}>
          Home
        </button>
      </div>
    )
  }
}
