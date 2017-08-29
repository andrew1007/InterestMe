import React, { Component } from 'react'
import ProfileBoardTabIcon from './profile_board_tab_icon'

export default class ProfileBoardTab extends Component {
  boards() {
    console.log(this.props);
    debugger
    return this.props.boards.map((board, idx) => {
      return (
        <div className='profile-board-tab-button'>
          <ProfileBoardTabIcon board={board}/>
        </div>
      )
    })
  }

  render() {
    return (
      <div className='profile-board-tab-container'>
        {this.boards()}
      </div>
    )
  }
}
