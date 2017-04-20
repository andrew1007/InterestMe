import React, {Component} from 'react';
import {withRouter, Router, Link, hashHistory } from 'react-router';
import PinNewFormContainer from '../pins/pin_new_container'

export default class SignedInButtons extends Component {
  constructor(props){
    super(props);
    this.state = {
      newPinFormOpen: false
    }
  }

  _handleLogoutClick(e){
    e.preventDefault();
    this.props.processLogout().then( ()=> {
      hashHistory.push('/session');
    })
  }

  _handleHomeImageClick(e){
    e.preventDefault();
    hashHistory.push(`/home`);
  }

  _handleNewPinClick(e){
    e.preventDefault()
    document.body.style.overflow = "hidden";
    this.setState({
      newPinFormOpen: true
    })
  }

  _handleProfileClick(){
    ////console.log(this.props);
    const userUrl = `/user/${this.props.currentUserId}`
    hashHistory.push(userUrl);
  }

  closeModal(){
    document.body.style.overflow = "auto";
    this.setState({
      newPinFormOpen: false
    })
  }

  newPinForm(){
    return (
      <PinNewFormContainer
        closeModal={this.closeModal.bind(this)}
        currentUserId={this.props.currentUserId}
        />
    )
  }

  sessionButtons(){
    ////console.log(this.props);
    return (
      <div className="session-button-list">
        <button className="session-button" onClick={this._handleNewPinClick.bind(this)}>
          <i
            className="fa fa-plus-circle fa-3x"
            aria-hidden="true"
            >
          </i>
        </button>
        <button className="session-button" onClick={this._handleHomeImageClick.bind(this)}>
          <i className="fa fa-home fa-3x" aria-hidden="true"></i>
        </button>
        <button className="session-button" onClick={this._handleProfileClick.bind(this)}>
          <i className="fa fa-user fa-3x" aria-hidden="true"></i>
        </button>
        <button className="session-button" onClick={this._handleLogoutClick.bind(this)}>
          <i className="fa fa-sign-out fa-3x" aria-hidden="true"></i>
        </button>
      </div>
    )
  }

  render(){
    return(
      <div>
        {this.sessionButtons()}
        {this.state.newPinFormOpen ? this.newPinForm() : null}
      </div>
    )
  }
}
