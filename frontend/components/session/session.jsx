import React from 'react';
import Modal from 'react-modal';
import {withRouter, Router, Link, hashHistory } from 'react-router';
import BoardNewFormContainer from '../boards/board_new_container'
import PinNewFormContainer from '../pins/pin_new_container'

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
      newPinFormOpen: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openLogin = this.openLogin.bind(this);
    this.openSignup = this.openSignup.bind(this);
    this.modalText = this.modalText.bind(this);
    this._handleLogoutClick = this._handleLogoutClick.bind(this);
    this.dropdown = this.dropdown.bind(this);
    this.onSettingsClick = this.onSettingsClick.bind(this);
    this.handleGuestSubmit = this.handleGuestSubmit.bind(this);
    this.handleChildCancelButton = this.handleChildCancelButton.bind(this);
    this.handleNewBoardClick = this.handleNewBoardClick.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.loginForms = this.loginForms.bind(this);
    this.handleLogoImageClick = this.handleLogoImageClick.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const user = Object.assign({}, this.state);
    if (this.state.loginModal){
      this.props.processLogin(user).then( ()=> {
        this.setState({modalIsOpen: false})
      }).then(() => {
        hashHistory.push('/home')
      })
    }
    else {
      this.props.processSignUp(user)
      this.setState({modalIsOpen: false})
      hashHistory.push('/home')
  }
}

  renderErrors(){
    return(
      <ul>
        {
          this.props.errors.map((error, i) => (
            <li key={`error-${i}`}>
              {error}
            </li>
          ))
        }
      </ul>
    )
  }

  componentWillReceiveProps(){
    this.forceUpdate()
  }

  onSettingsClick(){
    if (this.state.showDropdown){
      this.setState({showDropdown: false})
    } else {
      this.setState({showDropdown: true})
    }
  }

  handleGuestSubmit(e){
    e.preventDefault();
    const user = {username: "Pusheen", password: "password"};
    this.props.processLogin(user).then( () => {
      hashHistory.push('/home')
    })
    this.forceUpdate()
  }

  _handleLogoutClick(e){
    e.preventDefault()
    this.props.processLogout().then( ()=> {
      hashHistory.push('/session')
    })
  }

  componentWillMount() {
    Modal.setAppElement('body');
   }

   update(text) {
     return e => this.setState({
       [text]: e.currentTarget.value
     });
   }

  openLogin(){
    this.setState({modalIsOpen: true, loginModal:true, signupModal: false});
  }

  openSignup(){
    this.setState({modalIsOpen: true, signupModal:true, loginModal: false});
  }

  closeModal() {
    this.setState({modalIsOpen: false, newPinFormOpen: false});
    this.props.clearErrors();
  }

  modalText() {
    return this.state.loginModal ? "Log In" : "Sign Up"
  }

  dropdown(){
    return (<li><button className="menu-dropdown active logout" onClick={this._handleLogoutClick}>logout</button></li>)
  }

  handleChildCancelButton(){
    this.setState({newPinFormOpen: false})
  }

  newPinForm(){
    return(
      <Modal
        isOpen={this.state.newPinFormOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Session form"
        className="newPinModal"
        >
          <PinNewFormContainer {...this.props} handleChildCancelButton={this.handleChildCancelButton}/>
      </Modal>
    )
  }

  handleNewBoardClick(){
    this.setState({newPinFormOpen: true})
  }

  handleProfileClick(e){
    e.preventDefault()
    let url = this.props.currentUser.currentUser.user_id || this.props.currentUser.currentUser.currentUserId || this.props.currentUser.currentUserId;
    hashHistory.push(`/user/${url}`)
  }

  loginButtons(){
    return(
      <div>
        <button onClick={this.openLogin} className='session'>Login</button>
        <button onClick={this.openSignup} className='session' >Sign Up</button>
        <button onClick={this.handleGuestSubmit} className='session' >Guest Login</button>
      </div>
    )
  }

  signedInButtons(){
    return(
      <div className="session-button-list">
        <button className="session-button" onClick={this.handleNewBoardClick}>
          <i
            className="fa fa-plus-circle fa-3x"
            aria-hidden="true"
            >
          </i>
        </button>
        <button className="session-button" onClick={this.handleLogoImageClick}>
          <i className="fa fa-home fa-3x" aria-hidden="true"></i>
        </button>
        <button className="session-button" onClick={this.handleProfileClick}>
          <i className="fa fa-user fa-3x" aria-hidden="true"></i>
        </button>
        <button className="session-button" onClick={this._handleLogoutClick}>
          <i className="fa fa-sign-out fa-3x" aria-hidden="true"></i>
        </button>
      </div>
    )
  }

  loginForms(){
    return(
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Session form"
        className="ReactModal__Content"
        >
        <div className="session-modal-container">
          <form className="session-login-form" onSubmit={this.handleSubmit}>
            <div id="session-form-title">{this.state.loginModal ? "Log In" : "Sign Up"}</div>
            { this.props.errors ? this.renderErrors() : null}
            <br/>
            <label className="session-input-label">
              <input className="textbox-login" autoFocus type='text'
                value={this.state.username}
                onChange={this.update('username')}
                placeholder="username"
                />
            </label>
            <br/>
            <br/>
            <label className="session-input-label">
              <input className="textbox-login"
                type='password'
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="password"
                />
            </label>
            <br/>
            <br/>
            <div className="submission-session-buttons">
              <button id="submit-button" type="Submit" value="Submit">
                {this.state.loginModal ? "Log In" : "Sign Up"}
              </button>
              <button id="cancel-button" className="session-modal-button" onClick={this.closeModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }

  handleLogoImageClick(e){
    e.preventDefault();
    hashHistory.push(`/home`)
  }

  render() {
    return (
      <div>
        {
          this.props.currentUser.currentUser ?
          <div className="logo-container">
            <img className="interest-me-logo"
              onClick={this.handleLogoImageClick}
              src="http://res.cloudinary.com/andoo/image/upload/v1484187051/Logomakr_2W78HQ_k95ah7.png"
              alt="Interest Me!">
            </img>
          </div>
          :
          null
        }
        <ul className="session-buttons">
          {this.props.currentUser.currentUser ? this.signedInButtons() : this.loginButtons()}
        </ul>
        {this.state.newPinFormOpen ? this.newPinForm() : null}
        {this.loginForms()}
      </div>
    );
  }
}
