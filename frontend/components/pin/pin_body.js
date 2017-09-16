import React, {Component} from 'react'
import {hashHistory} from 'react-router';

export default class PinBody extends Component {
  handleUserRedirect() {
    this.props.togglePinShow()
    hashHistory.push(`/user/${this.props.user_id}`)
    document.body.style.overflow = 'auto'
  }

  render() {
    return(
      <div className='pin-body-container'>
        <div className='pin-body-user-container'>
          <div>
            <img
              onClick={this.handleUserRedirect.bind(this)}
              className='pin-body-profile-thumbnail'
              src={this.props.profile_picture}
            />
          </div>
          <a onClick={this.handleUserRedirect.bind(this)}>
            {this.props.username}
          </a>
        </div>
        <span className='pin-body-body-container'>
          <p>
            {this.props.body}
          </p>
        </span>
      </div>
    )
  }
}
