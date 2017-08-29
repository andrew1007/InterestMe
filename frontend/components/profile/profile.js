import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProfilePage } from '../../actions/user_actions'
import ProfileBoardTab from './profile_board_tab/profile_board_tab'

class ProfilePresentational extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: {'pin': 'pinTab',
            'board': 'boardTab',
            'followers': 'followersTab',
            'followed': 'followedTab'
          }
    }
  }

  componentWillMount() {
    this.props.getProfilePage(this.props.userId)
  }

  render() {
    const { boards, id } = this.props.user
    const boardTabProps = { boards, id }
    return (
      <div>
        <br/><br/><br/><br/><br/>
        {/* <ProfileBoardTab {...boardTabProps}/> */}
        
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
