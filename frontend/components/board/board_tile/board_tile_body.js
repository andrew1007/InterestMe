import React, {Component} from 'react'
import {hashHistory} from 'react-router';

export default class BoardTileBody extends Component {
  handleUserRedirect() {
    hashHistory.push(`/user/${this.props.user_id}`)
  }

  render() {
    return (
      <div className='board-tile-body-container'>
        {/* <span className='board-tile-body-user-info-container'>
          <div>
            <img
              onClick={this.handleUserRedirect.bind(this)}
              src={this.props.profile_picture}
              className='board-tile-body-profile-icon'
            />
          </div>
          <a onClick={this.handleUserRedirect.bind(this)}>
            {this.props.username}
          </a>
        </span> */}
        <span className='board-tile-body-description'>
          {this.props.title}
        </span>
      </div>
    )
  }
}
