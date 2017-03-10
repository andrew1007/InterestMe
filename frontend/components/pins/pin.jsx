import React from 'react';
import Modal from 'react-modal';
import PinEditContainer from './pin_edit_container'
import {hashHistory} from 'react-router';

export default class Pin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editFormOpen: false,
      receivedPin: false,
      hasBeenDeleted: false,
      title: "",
      body:"",
      edited: false,
      deleted: false
    };
    this.pinModal = this.pinModal.bind(this);
    this._handleEditButton = this._handleEditButton.bind(this);
    this.editPinModal = this.editPinModal.bind(this);
    this.editButton = this.editButton.bind(this);
    this._handleBoardNameClick = this._handleBoardNameClick.bind(this);
    this.redirectToProfile = this.redirectToProfile.bind(this);
    this.pinAuthor = this.pinAuthor.bind(this);
  }

  _handleEditButton() {
    if (this.state.editFormOpen){
      this.setState({editFormOpen: false})
    } else {
      this.setState({editFormOpen: true})
    }
  }

  componentDidMount(){
    this.setState({
      title: this.props.pin.title,
      body: this.props.pin.body,
      pinId: this.props.pin.id
    })
  }

  editButton(){
    return (
      <button id="pin-edit-icon" onClick={this._handleEditButton}>
        edit
      </button>
    )
  }

  cancelEditCloseModal(pinEditState) {
    this.setState({
      editFormOpen: false,
      edited: false,
      deleted: false
    });
  }

  updateCloseModal(pinEditState) {
    this.setState({
      editFormOpen: false,
      title: pinEditState.title,
      body: pinEditState.body,
      edited: true,
      deleted: false
    });
  }

  closeDeleteModal() {
    this.setState({
      editFormOpen: false,
      edited: false,
      deleted: true
    })
    setTimeout( () => this.props.closeModal(this.state), 0)
  }

  editPinModal() {
    return(
        <PinEditContainer
          updateCloseModal={this.updateCloseModal.bind(this)}
          cancelEditModal={this.cancelEditCloseModal.bind(this)}
          closeDeleteModal={this.closeDeleteModal.bind(this)}
          title={this.state.title}
          body={this.state.body}
          id={this.props.pin.id}
          boardId={this.props.pin.board_id}
        />
    )
  }

  _handleBoardNameClick(e){
    this.props.closeModal(this.state)
    e.preventDefault()
    hashHistory.push(`/boards/${this.props.pin.board_id}`)
    document.body.style.overflow = "auto"
  }

  pinModal(){
    if (this.state.deleted){
      return
    }
    //add favorites!?
    ////console.log(this.props);
    return(
      <div className="modal-container">
        <div className="pin-show-modal-content-container">
          <div className="pin-show-header-container">
            <div className="pin-show-title-board-name-container">
              <div className="pin-show-title-container">
                <div id="pin-title">
                  {this.state.title}
                  <span className="pin-show-edit-button-container">
                    {this.props.owner ?
                      <i
                        className="fa fa-pencil-square-o fa-1x edit-modal-cog"
                        aria-hidden="true"
                        onClick={this._handleEditButton}>
                      </i>
                      :
                      null
                    }
                  </span>
                </div>
              </div>
              <div className="pin-show-pin-info-save-button-container">
                <div className="pin-show-board-name-edit-button-container">
                  <div className="important-text">
                    <button className="pin-show-board-name" onClick={this._handleBoardNameClick}>
                      {this.props.pin.board_name}
                    </button>
                  </div>
                </div>
                <div className="pin-show-save-button-container">

                </div>
              </div>
            </div>
          </div>
          <div className="image-container">
            <img className= "pin-modal-image" src={this.props.pin.image_url}></img>
          </div>
          <div className="pin-show-description-user-container">
            <div className="pin-show-user-name-picture-container">
              <div className="pin-show-profile-picture-container">
                <img className="pin-show-profile-picture"
                  src={this.props.pin.profile_picture}
                  onClick={this.redirectToProfile}
                  />
              </div>
              <div className="pin-show-author-name-container">
                <button className="pin-author-button" onClick={this.redirectToProfile}>
                  {this.props.pin.owner ? "you" : this.props.pin.username }
                </button>
              </div>
            </div>
            <div className="pin-show-description-container">
              {this.state.body}
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  redirectToProfile(e){
    e.preventDefault()
    this.setState({
      edited: true,
      deleted: false
    });
    this.props.closeModal(this.state)
    hashHistory.push(`/user/${this.props.pin.user_id}`)
  }

  pinAuthor(){
    return (
      <div className="link-set">
        <button className="pin-author-button" onClick={this.redirectToProfile}>
          {this.props.pin.owner ? "you" : this.props.pin.author }
        </button>
        {this.props.pin.owner ? <button id="pin-edit-icon" onClick={this._handleEditButton}>
            edit
          </button> : null }
      </div>
    )
  }

  render() {
    return(
      <div>
        <Modal
          isOpen={true}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={() => this.props.closeModal(this.state)}
          contentLabel="Modal"
          className="ReactModal__Content"
        >
        {this.pinModal()}
        </Modal>
        {this.state.editFormOpen ? this.editPinModal() : null}
      </div>
    )
  }
}
