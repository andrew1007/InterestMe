import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProfilePage } from '../../actions/user_actions'
import ProfileTabsSection from './profile_tabs_section/profile_tabs_section'
import ProfileImage from './profile_image'
import ProfileDescription from './profile_description'

class ProfilePresentational extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rerendered: false
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      await this.props.getProfilePage(this.props.userId)
    }
  }

  async componentWillMount() {
    await this.props.getProfilePage(this.props.userId)
  }

  render() {
    const { description, username, profile_picture, boards, id, pins, followed_by, following } = this.props.user
    const tabSectionProps = { boards, id, pins, followed_by, following }
    const profileImageProps = { url: profile_picture, username }
    const profileDescriptionProps = { description }
    return (
      <div className='profile-container'>
        <div className='profile-subcontainer'>
          <div className='profile-image-subcontainer'>
            <ProfileImage {...profileImageProps}/>
          </div>
          <div className='profile-description-subcontainer'>
            <ProfileDescription {...profileDescriptionProps}/>
          </div>
        </div>
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
