import React from 'react';
import {hashHistory} from 'react-router';
import Modal from 'react-modal';
import PinContainer from '../pins/pins_container';
import UserProfileFormContainer from './user_profile_form_container';
import BoardMasonry from '../boards/board_masonry';
import Masonry from 'react-masonry-component'

export default class UserProfile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      followersArray: [],
      followedArray: [],
      boards: [],
      boardCount: 0,
      followersCount: 0,
      followedCount: 0,
      pinCount: 0,
      isFollowing: false,
      owner: false,
      selectPinTab: true,
      selectBoardTab: false,
      followedOpen: false,
      followerOpen: false,
      boardButtonFocus: false,
      pinButtonFocus: false,
      followerButtonFocus: false,
      followedButtonFocus: false,
      doneLoading: false
    }
    document.body.style.overflow = "auto";
  }

  componentWillReceiveProps(nextProps){
    if (this.props.userId !== nextProps.userId) {
      this.props.getProfilePage(nextProps.userId)
      this.handleBoardTabClick()
    }
    if (this.state.followStateChanged){
      this.props.getProfilePage(nextProps.userId).then( () => {
        this.setState({followStateChanged: false})
      })
    }
  }

  resetTabs(){
    this.setState({
      selectPinTab: false,
      selectBoardTab: false,
      followedOpen: false,
      followerOpen: false,
      boardButtonFocus: false,
      pinButtonFocus: false,
      followerButtonFocus: false,
      followedButtonFocus: false,
    })
  }

  componentDidMount(){
    this.props.getProfilePage(this.props.userId)
  }

  componentWillMount(){
    this.props.getProfilePage(this.props.userId)
    .then( () => {
      this.setState({
        followersArray: this.props.userContent.followed_by,
        followedArray: this.props.followed,
        boardCount: this.props.userContent.boards.length,
        pinCount: this.props.userContent.pins.length,
        followedCount: this.props.userContent.followed.length,
        followersCount: this.props.userContent.followers.length,
        isFollowing: this.props.user.isFollowing,
        owner: this.props.user.owner,
        boards: this.props.userContent.boards,
        doneLoading: true
      })
    })
  }

  _handleTabClick(name){
    this.resetTabs();
    switch (name) {
      case "pinTab":
        this.setState({
          pinButtonFocus: true,
          selectPinTab: true
        });
        break;
      case "boardTab":
        this.setState({
          selectBoardTab: false,
          boardButtonFocus: false
        });
      case "followersTab":
        this.setState({
          followerOpen: false,
          followerButtonFocus: false
        });
      case "followedTab":
        this.setState({
          followedOpen: false,
          followedButtonFocus: false
        })
      default:

    }
  }

  handleFollowActionClick(e){
    e.preventDefault()
    if (this.state.isFollowing){
      this.props.deleteFollow({user_following_id: this.props.user.currentUserId,
      user_followed_by_id: parseInt(this.props.user.user.id)})
      this.setState({isFollowing: false})
    } else {
      this.props.createFollow({user_following_id: this.props.userId,
      user_followed_by_id: this.props.user.currentUserId})
      this.setState({isFollowing: true})
    }
  }

  followButton(){
    return (
      <button className="profile-follow-button" onClick={this.handleFollowActionClick}>
        { this.props.user.isFollowing ? "unfollow" : "follow" }
      </button>
    )
  }

  followers(){
    return (
      this.props.userContent.followed.map( (user, idx) => {
        return (
        <div key={idx} className="followers-modal">
          <div className="user-profile-image-container">
            <button name={user.id} onClick={this.handleProfileRedirect} className="follow-user-button">
              <img className="follow-button-image" src={user.profile_picture}/>
              <a className="follow-username">
              </a>
            </button>
          </div>
          {user.username}
        </div>
        )
      })
    )
  }

  followed(){
    return (
      this.props.userContent.following.map( (user, idx) => {
        return (
        <div key={idx} className="followers-modal">
          <div className="user-profile-image-container">
            <button name={user.id} onClick={this.handleProfileRedirect} className="follow-user-button">
              <img className="follow-button-image" src={user.profile_picture}/>
              <a className="follow-username">
              </a>
            </button>
          </div>
          {user.username}
        </div>
        )
      })
    )
  }

  pinShow(){
    return(
      <BoardMasonry
        pins={this.props.userContent.pins}
        pinSetCount={this.props.userContent.pinSetCount}
        owner={this.props.user.owner}
        deletePin={this.props.deletePin}
        />
    )
  }

  userInfo(){
    return(
      <div className="user-info">
        <div className="username-image">
          <img className="profile-picture" src={this.props.user.profile_picture}/>
          {this.props.user.owner ?
            <button className="edit-user-button" onClick={this.handleEditForm}>
              edit user
            </button>
            :
            null
          }
        </div>
      </div>
    )
  }

  pictureUpdateForm(){
    return(
      <Modal
        isOpen={this.state.editFormOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Modal"
        className="user-profile-update-picture-modal"
      >
        {<UserProfileFormContainer {...this.props} handleSelfClose={this.closeModal} userId={this.props.userId}/>}
      </Modal>
    )
  }

  render(){
    // debugger
    console.log(this.props);
    return(
      <div className="user-profile">
        <div className="user-profile-body">
          {this.state.doneLoading ? this.userInfo() :null}
          <div className="user-profile-description-container">
            {this.state.doneLoading ?
              this.props.user.owner ? null : this.followButton()
              :
              null}
            <div className="user-profile-username">
              {this.state.doneLoading ? this.props.user.username : null}
            </div>
            <div className="user-profile-description">
              {this.state.doneLoading ? this.props.user.description : null}
            </div>
          </div>
        </div>
        <div className="user-profile-buttons-bar-container">
          <div className="user-profile-buttons-bar">
            <button className={this.state.boardButtonFocus ? "profile-tab-button-active" :"profile-tab-button-inactive"} onClick={this.handleBoardTabClick}>
              <div className="profile-button-text-container">
                <div>
                  Boards
                </div>
                <div>
                  {this.props.userContent.boards.length}
                </div>
              </div>
            </button>
            <button className={this.state.pinButtonFocus ? "profile-tab-button-active" :"profile-tab-button-inactive"} onClick={this.handlePinTabClick}>
              <div className="profile-button-text-container">
                <div>
                  Pins
                </div>
                <div>
                  {this.props.userContent.pins.length}
                </div>
              </div>
            </button>
            <button className={this.state.followerButtonFocus ? "profile-tab-button-active" :"profile-tab-button-inactive"} onClick={this.handleFollowerClick}>
              <div className="profile-button-text-container">
                <div>
                  Followers
                </div>
                <div>
                  {this.props.userContent.followed.length}
                </div>
              </div>
            </button>
            <button className={this.state.followedButtonFocus ? "profile-tab-button-active" :"profile-tab-button-inactive"} onClick={this.handleFollowedClick}>
              <div className="profile-button-text-container">
                <div>
                  Followed
                </div>
                <div>
                  {this.props.userContent.following.length}
                </div>
              </div>
            </button>
          </div>
        </div>
        <div>
          <div className="board-pin-underbar">
              {this.state.followerOpen ? this.followers() : null}
              {this.state.followedOpen ? this.followed() : null}
              {this.state.selectPinTab && this.state.doneLoading ? this.pinShow() : null }
            </div>
        </div>
          {this.state.doneLoading ? this.pictureUpdateForm() : null}
      </div>
    )
  }
}

// {this.state.selectBoardTab ? this.boardMasonryLayout() : null }
