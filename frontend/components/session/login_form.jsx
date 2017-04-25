import React, {Component} from 'react';
import Modal from 'react-modal';
import {withRouter, Router, Link, hashHistory } from 'react-router';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginModal: false,
      signupModal: false,
      error: false,
      modalIsOpen: true
    };
    this.update = this.update.bind(this);
    this.dispatchSession = this.dispatchSession.bind(this);
  }

  update(text) {
    return e => this.setState({
      [text]: e.currentTarget.value
    });
  }

  modalText() {
    return this.props.isLogin ? "Log In" : "Sign Up"
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  dispatchSession(){
    const login = {
      username: this.state.username,
      password: this.state.password
    }
    if (this.props.isLogin){
      return this.props.processLogin(login)
    } else {
      return this.props.processSignUp(login)
    }
  }

  handleSubmit(e){
    this.dispatchSession()
    .then( () => {
      this.props.closeModal()
      hashHistory.push('/home')
    })
  }

  renderErrors(){
    const errors = Array.from(new Set(this.props.errors))
    return(
      <ul>
        {
          errors.map((error, i) => (
            <li key={`error-${i}`}>
              {error}
            </li>
          ))
        }
      </ul>
    )
  }

  closeModal(){
    this.setState({modalIsOpen: false})
    this.props.closeModal()
  }

  render(){
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.closeModal.bind(this)}
        contentLabel="Session form"
        className="session-modal-container"
        >
          <form className="session-login-form" onSubmit={this.handleSubmit.bind(this)}>
            <div id="session-form-title">{this.props.isLogin ? "Log In" : "Sign Up"}</div>
            { this.props.errors ? this.renderErrors() : null}
            <br/>
              <input className="textbox-login" autoFocus type='text'
                type="text"
                value={this.state.username}
                onChange={this.update('username')}
                placeholder="username"
                />
            <br/>
            <br/>
              <input className="textbox-login"
                type='password'
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="password"
                />
            <br/>
            <br/>
            <div className="submission-session-buttons">
              <button id="submit-button" type="Submit" value="Submit">
                {this.props.isLogin ? "Log In" : "Sign Up"}
              </button>
              <button id="cancel-button" className="session-modal-button" onClick={this.closeModal.bind(this)}>
                Cancel
              </button>
            </div>
          </form>
      </Modal>
    )
  }
}
