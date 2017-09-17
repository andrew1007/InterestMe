import React, { Component } from 'react'
import ProfileBoardTabIcon from './profile_board_tab_icon'
import OnImagesLoaded from 'react-on-images-loaded'
import LoadingIcon from '../../../shared/loading_icon'

export default class ProfileBoardTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  boards() {
    return this.props.boards.map((board, idx) => (
      <ProfileBoardTabIcon board={board} key={idx}/>
    ))
  }

  _changeClassName() {
    setTimeout(() => this.setState({show: true}), 0)
  }

  render() {
    const className = `profile-board-tab-container ${this.state.show ? 'visible' : 'hidden'}`
    return (
        <OnImagesLoaded onLoaded={() => this._changeClassName()}>
          {this.state.show ? "" : <LoadingIcon/>}
          <div className={className}>
            {this.boards()}
          </div>
      </OnImagesLoaded>
    )
  }
}
