import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProfilePage } from '../../actions/user_actions'
import ProfileBoardTab from './profile_board_tab/profile_board_tab'
import ProfileFollowTab from './profile_follow_tab/profile_follow_tab'
import BoardMasonry from '../board/board_masonry'

class ProfilePresentational extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pins: false,
      boards : false,
      followers: false,
      following: false
    }
    this.tabs = ['pins', 'boards', 'followers', 'following']
    this.tabComponents = [
      this.profileBoardTab.bind(this),
      this.profilePinsTab.bind(this),
      this.followersTab.bind(this),
      this.followingTab.bind(this)
    ]
  }

  async componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      await this.props.getProfilePage(this.props.userId)
      this.forceUpdate()
    }
  }

  async componentWillMount() {
    await this.props.getProfilePage(this.props.userId)
    this.forceUpdate()
  }

  showTab(name) {
    eval(`this.setState({${name}: this.state.${name} ? false : true})`)
    console.log(this.state);
    this.hideOtherTabs(name)
  }

  hideOtherTabs(name) {
    for (let tab of this.tabs) {
      if (name === tab) continue
      eval(`this.setState({${tab}: false})`)
    }
  }


  profileBoardTab() {
    const { boards, id } = this.props.user
    const boardTabProps = { boards, id }
    return this.state.boards ? <ProfileBoardTab {...boardTabProps}/> : null
  }

  profilePinsTab() {
    const { pins } = this.props.user
    const pinTabProps = { pins }
    return this.state.pins ? <BoardMasonry {...pinTabProps}/> : null
  }

  followersTab() {
    const { followed_by } = this.props.user
    const followersTabProps = { users: followed_by }
    return this.state.followers ? <ProfileFollowTab {...followersTabProps}/> : null
  }

  followingTab() {
    const { following } = this.props.user
    const followingTabProps = { users: following }
    return this.state.following ? <ProfileFollowTab {...followingTabProps}/> : null
  }

  buttonTabs() {
    return this.tabs.map((name, idx) => {
      return (
        <button key={idx} onClick={() => this.showTab(name)}>
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
        <br/><br/><br/><br/><br/>
        {this.buttonTabs()}
        {this.components()}
      </div>
    )
  }
}

const mapStateToProps = ({user}, ownProps) => ({
  user: user.user,
  userId: ownProps.params.userId
})

const mapDispatchToProps = dispatch => ({
  getProfilePage: (id) => dispatch(getProfilePage(id))
})

const Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePresentational)

export default Profile
