import React, { Component } from 'react'

export default class ProfileFollowTab extends Component {
  followIcons() {
    console.log(this.props.users);
    return this.props.users.map((user, idx) => (
      <div key={idx}>
        <img
          src={user.profile_picture}
        />
        {user.username}
      </div>
    ))
  }

  render() {
    return (
      <div>
        {this.followIcons()}
      </div>
    )
  }
}
