import React from 'react';
import {hashHistory} from 'react-router';
import Modal from 'react-modal';
import PinContainer from '../pins/pins_container';
import UserProfileFormContainer from './user_profile_form_container';
import BoardMasonry from '../boards/board_masonry';
import Masonry from 'react-masonry-component'
import UserBoards from './user_boards'

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
      pinTab: false,
      boardTab: true,
      followedTab: false,
      followedTab: false,
      editFormOpen: false,
      doneLoading: false,
      owner: false
    }
    document.body.style.overflow = "auto";
  }

  componentWillReceiveProps(nextProps){
    if (this.props.userId !== nextProps.userId) {
      this.setState({doneLoading: false})
      this.resetTabs()
      this.props.getProfilePage(nextProps.userId)
      .then( () => {
        this.setState({
          doneLoading: true,
          boardTab: true
        })
      })
    }
    if (this.state.followStateChanged){
      this.props.getProfilePage(nextProps.userId).then( () => {
        this.setState({followStateChanged: false})
      })
    }
  }

  resetTabs(){
    this.setState({
      pinTab: false,
      boardTab: false,
      followersTab: false,
      followedTab: false
    })
  }

  componentDidMount(){
    this.props.getProfilePage(this.props.userId)
  }

  componentWillMount(){
    this.props.getProfilePage(this.props.userId)
    .then( () => {
      this.setState({
        doneLoading: true,
        isFollowing: this.props.user.isFollowing,
        owner: this.props.user.owner
      })
    })
  }

  countPins(object){
    let counter = 0;
    Object.values(object).forEach( (array) => {
      counter += array.length
    })
    return counter
  }

  _handleTabClick(name){
    this.resetTabs();
    switch (name) {
      case "pin":
        this.setState({ pinTab: true });
        break;
      case "board":
        this.setState({ boardTab: true });
        break;
      case "followers":
        this.setState({ followersTab: true });
        break;
      case "followed":
        this.setState({ followedTab: true })
        break;
    }
  }

  handleFollowActionClick(e){
    e.preventDefault()
    const currentUser = this.props.currentUser.id
    const user = this.props.user.id
    if (this.state.isFollowing){
      this.props.deleteFollow({user_following_id: currentUser,
      user_followed_by_id: user})
      this.setState({isFollowing: false})
    } else {
      this.props.createFollow({user_following_id: user,
      user_followed_by_id: currentUser})
      this.setState({isFollowing: true})
    }
    this.props.getProfilePage(user)
  }

  followButton(){
    return (
      <button className="profile-follow-button" onClick={this.handleFollowActionClick.bind(this)}>
        { this.state.isFollowing ? "unfollow" : "follow" }
      </button>
    )
  }

  _handleProfileRedirect(e){
    e.preventDefault();
    const userId = e.target.getAttribute("name")
    hashHistory.push(`/user/${userId}`)
  }

  followers(){
    return (
      this.props.userContent.followers.map( (user, idx) => {
        return (
        <div key={idx} className="followers-modal">
          <div className="user-profile-image-container">
            <button name={user.id} onClick={this._handleProfileRedirect} className="follow-user-button">
              <img className="follow-button-image" name={user.id} onClick={this._handleProfileRedirect} src={user.profile_picture}/>
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
            <button name={user.id} onClick={this._handleProfileRedirect} className="follow-user-button">
              <img className="follow-button-image" name={user.id} onClick={this._handleProfileRedirect} src={user.profile_picture}/>
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
        owner={this.state.owner}
        deletePin={this.props.deletePin}
        />
    )
  }

  userBoards(){
    return(
      <div>
        <UserBoards
          boards={this.props.userContent.boards}
          owner={this.state.owner}
          />
      </div>
    )
  }

  _handleEditForm(){
    this.setState({editFormOpen: true})
  }

  userInfo(){
    console.log(this.props);
    return(
      <div className="user-info">
        <div className="username-image">
          <img className="profile-picture" src={this.props.user.profile_picture}/>
          {this.state.owner ?
            <button className="edit-user-button" onClick={this._handleEditForm.bind(this)}>
              edit user
            </button>
            :
            null
          }
        </div>
      </div>
    )
  }

  closeModal(){
    this.props.getProfilePage(this.props.user.id)
    .then( () => {
      this.setState({editFormOpen: false})
    })
  }

  userUpdateForm(){
    return(
      <UserProfileFormContainer
        closeModal={this.closeModal.bind(this)}
        user={this.props.user}
        />
    )
  }

  render(){
    //console.log(this.props);
    return(
      <div className="user-profile">
        <div className="user-profile-body">
          {this.state.doneLoading ? this.userInfo() :null}
          <div className="user-profile-description-container">
            {this.state.doneLoading ?
              this.state.owner ? null : this.followButton()
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
            <button className={this.state.boardTab ? "profile-tab-button-active" :"profile-tab-button-inactive"}
              onClick={() => this._handleTabClick("board")}>
              <div className="profile-button-text-container">
                <div>
                  Boards
                </div>
                <div>
                  {this.props.userContent.boards.length}
                </div>
              </div>
            </button>
            <button className={this.state.pinTab ? "profile-tab-button-active" :"profile-tab-button-inactive"}
              onClick={() => this._handleTabClick("pin")}>
              <div className="profile-button-text-container">
                <div>
                  Pins
                </div>
                <div>
                  {this.countPins(this.props.userContent.pins)}
                </div>
              </div>
            </button>
            <button className={this.state.followersTab ? "profile-tab-button-active" :"profile-tab-button-inactive"}
              onClick={() => this._handleTabClick("followers")}>
              <div className="profile-button-text-container">
                <div>
                  Followers
                </div>
                <div>
                  {this.props.userContent.followers.length}
                </div>
              </div>
            </button>
            <button className={this.state.followedTab ? "profile-tab-button-active" :"profile-tab-button-inactive"}
              onClick={() => this._handleTabClick("followed")}>
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
              {this.state.followersTab && this.state.doneLoading ? this.followers() : null}
              {this.state.followedTab && this.state.doneLoading ? this.followed() : null}
              {this.state.boardTab && this.state.doneLoading ? this.userBoards() : null}
              {this.state.pinTab && this.state.doneLoading ? this.pinShow() : null }
            </div>
        </div>
          {this.state.doneLoading && this.state.editFormOpen ? this.userUpdateForm() : null}
      </div>
    )
  }
}

// {this.state.boardTab ? this.boardMasonryLayout() : null }
