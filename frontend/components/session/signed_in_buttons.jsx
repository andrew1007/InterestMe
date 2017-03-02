import React, {Component} from 'react';
import {withRouter, Router, Link, hashHistory } from 'react-router';

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

  }

  _handleProfileClick(){
    const userUrl = `/user/${this.props.currentUserId}`
    hashHistory.push(userUrl);
  }

  closeModal(){

  }

  newPinForm(){
    return
      // <Modal
      //   isOpen={this.state.newPinFormOpen}
      //   onAfterOpen={this.afterOpenModal}
      //   onRequestClose={this.closeModal.bind(this)}
      //   contentLabel="Session form"
      //   className="newPinModal"
      //   >
      //     <PinNewFormContainer {...this.props} handleChildCancelButton={this.handleChildCancelButton}/>
      // </Modal>

  }

  sessionButtons(){
    console.log(this.props);
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
