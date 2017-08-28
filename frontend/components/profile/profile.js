import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProfilePage } from '../../actions/user_actions'

class ProfilePresentational extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: {'pin': 'pinTab',
            'board': 'boardTab',
            'followers': 'followersTab',
            'followed': 'followedTab'
          },
    }
  }

  async componentWillMount() {
    await this.props.getProfilePage(1)
    console.log(this.props.user);
  }

  render() {
    return(
      <div>

      </div>
    )
  }
}

const mapStateToProps = ({user, session}, ownProps) => ({
  user: user
})

const mapDispatchToProps = dispatch => ({
  getProfilePage: (id) => dispatch(getProfilePage(id))
})

const Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePresentational)

export default Profile
