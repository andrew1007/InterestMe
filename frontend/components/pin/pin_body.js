import React, {Component} from 'react'

export default class PinBody extends Component {
  render() {
    return(
      <div className='pin-body-container'>
        <div className='pin-body-user-container'>
          <div>
            <img
              className='pin-body-profile-thumbnail'
              src={this.props.profile_picture}
            />
          </div>
          <div>
            {this.props.username}
          </div>
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
