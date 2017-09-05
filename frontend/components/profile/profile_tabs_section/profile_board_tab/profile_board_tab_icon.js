import React, { Component } from 'react'
import { hashHistory } from 'react-router';

export default class ProfileBoardTabIcon extends Component {
  constructor(props) {
    super(props)
  }

  routeToBoard() {
    hashHistory.push(`/boards/${this.props.board.id}`)
  }

  horizontalImages() {
    return this.props.board.sample_images.slice(0,2).map((url, idx) => {
      return (
        <div key={idx} onClick={this.routeToBoard.bind(this)}
          className='profile-board-tab-icon-image-container'>
          <img
            src={url}
            className='profile-board-tab-icon-image'
            onClick={this.routeToBoard.bind(this)}
          />
        </div>
      )
    })
  }

  lastImage() {
    const url = this.props.board.sample_images.slice(2,3)
    return (
      <div onClick={this.routeToBoard.bind(this)}>
        <img
          src={url}
          className='profile-board-tab-icon-last-image'
          onClick={this.routeToBoard.bind(this)}
        />
      </div>
    )
  }

  render() {
    return (
      <div className='profile-board-tab-icon-container'>
        <div>
          <div className='profile-board-tab-icon-horizontal-container'>
            {this.horizontalImages()}
          </div>
          <div className='profile-board-tab-icon-last-container'>
            {this.lastImage()}
          </div>
        </div>
        <div className='profile-board-tab-icon-name'>
          {this.props.board.name}
        </div>
      </div>
    )
  }
}
