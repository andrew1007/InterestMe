import React, {Component} from 'react'

export default class BoardTileBody extends Component {
  render() {
    console.log(this.props);
    return (
      <div className='board-tile-body-container'>
        <span>
          <div>
            <img
              src={this.props.profile_picture}
              className='board-tile-body-profile-icon'
            />
          </div>
          <div>
            {this.props.username}
          </div>
        </span>
        <span className='board-tile-body-description'>
          {this.props.title}
        </span>
      </div>
    )
  }
}
