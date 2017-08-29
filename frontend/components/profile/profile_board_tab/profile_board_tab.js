import React, { Component } from 'react'
import ProfileBoardTabIcon from './profile_board_tab_icon'

export default class ProfileBoardTab extends Component {
  boards() {
    console.log(this.props);
    debugger
    return this.props.boards.map((board, idx) => {
      return (
        <div>
          <ProfileBoardTabIcon board={board}/>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.boards()}
      </div>
    )
  }
}
