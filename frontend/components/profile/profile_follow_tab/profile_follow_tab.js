import React, { Component } from 'react'

export default class ProfileFollowTab extends Component {
  constructor(props) {
    super(props)
  }

  followIcons() {
    console.log(this.props.users);
    return this.props.users.map(user => {
      return (
        <div>
          dddddddddddd
          <img
            src={user.profile_picture}
          />
          {user.username}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        asdasdfasdf
        {this.followIcons()}
      </div>
    )
  }
}
