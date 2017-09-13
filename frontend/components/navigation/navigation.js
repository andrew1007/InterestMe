import React, { Component } from 'react'
import NavigationProfile from './navigation_profile'
import NavigationHome from './navigation_home'
import NavigationLogout from './navigation_logout'
import { connect } from 'react-redux';
import { login, signup, logout, clearErrors, getCurrentUser } from '../../actions/session_actions';

class NavigationPresentational extends Component {
  render() {
    const { id } = this.props.currentUser
    const { processLogout } = this.props
    const navigationProfileProps = { id }
    const navigationLogoutProps = { processLogout }
    return (
      <div className='navigation-container'>
        <NavigationProfile {...navigationProfileProps}/>
        <NavigationHome/>
        <NavigationLogout {...navigationLogoutProps}/>
      </div>
    )
  }
}

const mapStateToProps = ({session}) => {
  return ({
    currentUser: session.currentUser,
    errors: session.errors,
  })
}

const mapDispatchToProps = (dispatch) => ({
  processLogin: (user) => dispatch(login(user)),
  processSignUp: (user) => dispatch(signup(user)),
  processLogout: () => dispatch(logout()),
  getCurrentUser: () => dispatch(getCurrentUser()),
  clearErrors: () => dispatch(clearErrors())
});

const Navigation = connect(
  mapStateToProps,
  mapDispatchToProps)
  (NavigationPresentational)

export default Navigation
