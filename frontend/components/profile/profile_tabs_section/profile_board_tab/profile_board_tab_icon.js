import React, { Component } from 'react'
import { hashHistory } from 'react-router';

export default class ProfileBoardTabIcon extends Component {
  constructor(props) {
    super(props)
  }

  routeToBoard() {
    hashHistory.push(`/boards/${this.props.board.id}`)
  }

  _buildHorizontalImageArray() {
    let newArr = []
    for (let i = 0; i < 2; i++) {
      if (this.props.board.sample_images[i]) {
        newArr.push(this.props.board.sample_images[i])
      }
    }
    return newArr
  }

  horizontalImages() {
    let sampleImages = this._buildHorizontalImageArray()
    return sampleImages.map((url, idx) => {
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
    const url = this.props.board.sample_images[2]
    if (url) {
      return (
        <div onClick={this.routeToBoard.bind(this)}>
          <img
            src={url}
            className='profile-board-tab-icon-last-image'
            onClick={this.routeToBoard.bind(this)}
            />
        </div>
      )
    } else {
      return <div></div>
    }
  }

  render() {
    return (
      <div className='profile-board-tab-button' onClick={() => this.routeToBoard()}>
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
    </div>
    )
  }
}
