import React, { Component } from 'react'
import { hashHistory } from 'react-router';

export default class ProfileBoardTabIcon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      loadedCounter: 0
    }
  }

  updateCounter() {
    this.setState({loadedCounter: this.state.loadedCounter + 1},
      () => {
        if (this.state.loadedCounter > 2) {
          this.setState({loaded: true})
        }
      }
    )
  }

  routeToBoard() {
    hashHistory.push(`/boards/${this.props.board.id}`)
  }

  images() {
    return this.props.board.sample_images.map((url, idx) => {
      return (
        <div onClick={this.routeToBoard.bind(this)}>
          <img
            src={url}
            className='profile-board-tab-icon-image'
            onLoad={this.updateCounter.bind(this)}
            onClick={this.routeToBoard.bind(this)}
          />
        </div>
      )
    })
  }

  render() {
    return (
      <div className='visible'>
        {this.props.name}
        {this.images()}
      </div>
    )
  }
}
