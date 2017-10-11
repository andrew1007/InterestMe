import React, { Component } from 'react'
import NavigationProfile from './navigation_profile'
import NavigationHome from './navigation_home'
import NavigationLogout from './navigation_logout'
import NavigationNewPin from './navigation_new_pin'
import NavigationLogin from './navigation_login'
import NavigationSignup from './navigation_signup'
import NavigationNewBoard from './navigation_new_board'
import { connect } from 'react-redux';

import { login, signup, logout, clearErrors, getCurrentUser } from '../../actions/session_actions';

class NavigationPresentational extends Component {
  loggedInButtons() {
    return (
      <div>
        <NavigationProfile {...navigationProfileProps}/>
        <NavigationHome/>
        <NavigationLogout {...navigationLogoutProps}/>
        <NavigationNewPin/>
        <NavigationNewBoard/>
      </div>
    )
  }

  render() {
    console.log(this.props)
    const { id } = this.props.currentUser
    const { logout } = this.props
    const navigationProfileProps = { id }
    const navigationLogoutProps = { logout: () => logout() }
    return (
      <div className='navigation-container'>
        <NavigationLogin/>
        <NavigationSignup/>
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
  logout: () => dispatch(logout()),
  getCurrentUser: () => dispatch(getCurrentUser()),
  clearErrors: () => dispatch(clearErrors())
});

const Navigation = connect(
  mapStateToProps,
  mapDispatchToProps)
  (NavigationPresentational)

export default Navigation
