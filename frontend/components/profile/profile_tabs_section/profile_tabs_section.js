import React, { Component } from 'react'
import ProfileBoardTab from './profile_board_tab/profile_board_tab'
import ProfileFollowTab from './profile_follow_tab'
import ProfilePinTab from './profile_pin_tab'

export default class ProfileTabsSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pins: false,
      boards : true,
      followers: false,
      following: false
    }
    this.tabs = [
      'boards',
      'pins',
      // 'followers',
      // 'following'
    ]
    this.tabComponents = [
      this.profileBoardTab.bind(this),
      this.profilePinsTab.bind(this),
      // this.followersTab.bind(this),
      // this.followingTab.bind(this)
    ]
  }

  toggleTab(name) {
    this.setState({[name]: this.state[name] ? false : true})
    this._hideOtherTabs(name)
  }

  _hideOtherTabs(name) {
    for (let tab of this.tabs) {
      if (name === tab) continue
      this.setState({[tab]: false})
    }
  }

  profileBoardTab() {
    const { boards, id } = this.props
    const boardTabProps = { boards, id }
    return this.state.boards ? <ProfileBoardTab {...boardTabProps}/> : null
  }

  profilePinsTab() {
    const { pins } = this.props
    const pinTabProps = { pins }
    return this.state.pins ? <ProfilePinTab {...pinTabProps}/> : null
  }

  followersTab() {
    const { followed_by } = this.props
    const followersTabProps = { users: followed_by }
    return this.state.followers ? <ProfileFollowTab {...followersTabProps}/> : null
  }

  followingTab() {
    const { following } = this.props
    const followingTabProps = { users: following }
    return this.state.following ? <ProfileFollowTab {...followingTabProps}/> : null
  }

  buttonTabs() {
    return this.tabs.map((name, idx) => {
      const style = {"opacity": this.state[name] ? "1" : "0.7"}
      return (
        <button key={idx} onClick={() => this.toggleTab(name)} style={style}>
          {name}
        </button>
      )
    })
  }

  components() {
    return this.tabComponents.map((component, idx) => {
      return (
        <div key={idx}>
          {component()}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <div className='profile-tabs-section-button-container'>
          <div className='profile-tabs-section-button-underbar'>
            {this.buttonTabs()}
          </div>
        </div>
        {this.components()}
      </div>
    )
  }
}
