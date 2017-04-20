import React from 'react';
import Modal from 'react-modal';
import {withRouter, Router, Link, hashHistory } from 'react-router';
import BoardNewFormContainer from '../boards/board_new_container'
import PinNewFormContainer from '../pins/pin_new_container'
import LoginFormContainer from './login_form_container'
import SignedInButtonsContainer from './signed_in_buttons_container'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class Session extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      modalIsOpen: false,
      loginModal: false,
      signupModal: false,
      showDropdown: false,
      error: false,
      newPinFormOpen: false,
      showHomeButton: false
    };
    document.body.style.overflow = "hidden"
  }

  _handleGuestSubmit(e){
    e.preventDefault();
    const user = {username: "Pusheen", password: "password"};
    this.props.processLogin(user).then( () => {
      hashHistory.push('/home')
    })
  }

  loginButtons(){
    return (
      <div>
        <button onClick={this.openLogin.bind(this)} className='session'>Login</button>
        <button onClick={this.openSignup.bind(this)} className='session' >Sign Up</button>
        <button onClick={this._handleGuestSubmit.bind(this)} className='session' >Guest Login</button>
      </div>
    )
  }

  openLogin(){
    this.setState({loginModal:true, signupModal: false});
  }

  openSignup(){
    this.setState({signupModal:true, loginModal: false});
  }

  closeModal(){
    this.props.clearErrors()
    this.setState({signupModal:false, loginModal: false});
  }

  handleLogoImageClick(e){
    e.preventDefault();
    hashHistory.push(`/home`)
  }

  signedInButtons(){
    return (
      <SignedInButtonsContainer
        currentUserId={this.props.currentUser.id}
        />
    )
  }

  loginForm(){
    return(
      <div>
        <LoginFormContainer
          modalIsOpen={this.state.signupModal || this.state.loginModal}
          isLogin={this.state.loginModal}
          closeModal={this.closeModal.bind(this)}
          errors={this.props.errors}
          />
      </div>
    )
  }

  render() {
    return (
      <div className="session-button-container">
        {
          this.props.currentUser ?
          <div className="logo-container">
            <img className="interest-me-logo"
              onClick={this.handleLogoImageClick.bind(this)}
              src="https://res.cloudinary.com/andoo/image/upload/v1487088792/Logomakr_8HgPFi_j5afkw.png"
              alt="Interest Me!">
            </img>
          </div>
          :
          null
        }
          <ul className="session-buttons">
            {this.props.currentUser ? this.signedInButtons() : this.loginButtons()}
          </ul>
          {this.state.loginModal || this.state.signupModal ? this.loginForm() : null}
      </div>
    );
  }
}
