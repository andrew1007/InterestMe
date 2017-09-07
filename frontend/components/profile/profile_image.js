import React, { Component } from 'react'

export default class ProfileImage extends Component {
  render() {
    return (
      <div className='profile-image-container'>
        <img
          src={this.props.url}
        />
        <div>
          {this.props.username}
        </div>
      </div>
    )
  }
}
