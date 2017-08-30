import React, { Component } from 'react'
import ProfileBoardTabIcon from './profile_board_tab_icon'

export default class ProfileBoardTab extends Component {
  boards() {
    return this.props.boards.map((board, idx) => {
      return (
        <div key={idx} className='profile-board-tab-button'>
          <ProfileBoardTabIcon board={board}/>
        </div>
      )
    })
  }

  render() {
    return (
      <div className='profile-board-tab-container'>
        asdfsdf
        {this.boards()}
      </div>
    )
  }
}
