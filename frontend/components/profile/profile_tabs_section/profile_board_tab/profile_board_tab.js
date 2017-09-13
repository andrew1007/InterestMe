import React, { Component } from 'react'
import ProfileBoardTabIcon from './profile_board_tab_icon'
import OnImagesLoaded from 'react-on-images-loaded'
import LoadingIcon from '../../../shared/loading_icon'

export default class ProfileBoardTab extends Component {
  boards() {
    return this.props.boards.map((board, idx) => (
      <div key={idx} className='profile-board-tab-button'>
        <ProfileBoardTabIcon board={board}/>
      </div>
    ))
  }

  render() {
    return (
      <div className='profile-board-tab-container'>
        {
          this.props.boards.length > 0 ?
          <OnImagesLoaded
            classNameOnMount='hidden profile-board-tab-container'
            classNameOnLoaded='visible profile-board-tab-container'
            placeholder={<LoadingIcon/>}
            >
            {this.boards()}
          </OnImagesLoaded>
          :
          null
        }
      </div>
    )
  }
}
