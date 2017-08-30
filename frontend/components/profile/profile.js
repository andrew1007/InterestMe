import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProfilePage } from '../../actions/user_actions'
import ProfileTabsSection from './profile_tabs_section/profile_tabs_section'
import ProfileImage from './profile_image'
import ProfileDescription from './profile_description'

class ProfilePresentational extends Component {
  constructor(props) {
    super(props)
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

  render() {
    let { description, username, profile_picture, boards, id, pins, followed_by, following } = this.props.user
    const tabSectionProps = { boards, id, pins, followed_by, following }
    const profileImageProps = { url: profile_picture, username }
    const profileDescriptionProps = { description }
    return (
      <div>
        <br/><br/><br/><br/><br/>
        <ProfileImage {...profileImageProps}/>
        <ProfileDescription {...profileDescriptionProps}/>
        <ProfileTabsSection {...tabSectionProps}/>
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
