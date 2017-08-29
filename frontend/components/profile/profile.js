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
          },
      loaded: false
    }
  }

  async componentWillMount() {
    await this.props.getProfilePage(1)
    this.setState({loaded: true})
    console.log(this.props.user);
  }

  render() {
    const { boards, id } = this.props.user
    const boardTabProps = {boards, id}
    return(
      <div>
        <br/><br/><br/><br/><br/>
        dddddddddddddd
        <ProfileBoardTab {...boardTabProps}/>
      </div>
    )
  }
}

const mapStateToProps = ({user}) => ({
  user: user.user
})

const mapDispatchToProps = dispatch => ({
  getProfilePage: (id) => dispatch(getProfilePage(id))
})

const Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePresentational)

export default Profile
