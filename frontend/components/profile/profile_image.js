import React, { Component } from 'react'

export default class ProfileImage extends Component {
  render() {
    return (
      <div>
        <img
          src={this.props.url}
        />
        {this.props.username}
      </div>
    )
  }
}
