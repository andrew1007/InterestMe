import React from 'react';
import {Router, hashHistory} from 'react-router';
import Dropzone from 'react-dropzone'
import request from 'superagent';
import BoardNewContainer from '../boards/board_new_container';
import Dropdown from 'react-dropdown'
import Modal from 'react-modal'

const CLOUDINARY_PRESET = 'punlriir'
const CLOUDINARY_UPLOAD ='https://api.cloudinary.com/v1_1/andoo/upload'

export default class PinNewForm extends React.Component {
  constructor(){
    super()
    this.state = {
      imageUrl: null,
      body: "",
      title: "",
      pinEditing: true,
      doneLoading: false,
      boardId: "",
      name: "",
      newBoardForm: false,
      renderEmptyBoardError: false,
      renderEmptyPinError: false,
      renderEmptyNameError: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.previewImage = this.previewImage.bind(this);
    this.handleCancelNewBoard = this.handleCancelNewBoard.bind(this);
    this.handleNewBoardButton = this.handleNewBoardButton.bind(this);
    this.handleBoardSubmit = this.handleBoardSubmit.bind(this);
    this.handleNewPinCancelButton = this.handleNewPinCancelButton.bind(this);
  }

  handleDrop(img){
    let imgUploaded = img[0]
    let upload = request.post(CLOUDINARY_UPLOAD)
    .field('upload_preset', CLOUDINARY_PRESET)
    .field('file', img);
    upload.end((errors, results) => {
      if (errors === null) {
        this.setState({imageUrl: results.body.secure_url})
      } else {
      }
    })
  }

  handleSubmit(e) {
    if (!this.state.boardId && !this.state.imageUrl){
      this.setState({renderEmptyPinError: true})
      this.setState({renderEmptyBoardError: true})
    }
    else if (!this.state.boardId) {
      this.setState({renderEmptyBoardError: true})
      this.setState({renderEmptyPinError: false})
    } else if (!this.state.imageUrl){
      this.setState({renderEmptyPinError: true})
      this.setState({renderEmptyBoardError: false})
    } else {
      e.preventDefault();
      hashHistory.push({
        pathname: `/boards/${this.state.boardId}`,
        state: {newPinMade: true}
      })
      this.props.newPin({
        title: this.state.title,
        body: this.state.body,
        board_id: parseInt(this.state.boardId),
        image_url: this.state.imageUrl})
      this.setState( {imageUrl: false})
      this.props.closeModal()
    }
  }

  update(text) {
    return e => this.setState({
      [text]: e.currentTarget.value
    });
  }

  emptyBoardError(){
    return(
      <div className="new-pin-error-text">
        Select a board to submit
      </div>
    )
  }

  boardErrorText(){
    return(
      <div className="edit-board-error-text">
        Board name can't be blank
      </div>
    )
  }

  emptyPinError(){
    return(
      <div className="new-pin-error-text">
        Upload a pin
      </div>
    )
  }

  previewImage() {
    return (
    <div className="original-filename">
      {this.state.imageUrl ? null :
        <div className="upload-mini-text">
          image preview
        </div>}
      { this.state.imageUrl ?
          <img className="pin-new-image-preview" src={this.state.imageUrl}/>
          : null}
      </div>
    )
  }

  componentWillMount(){
    //console.log(this.props);
    let id = this.props.currentUserId
    this.props.getProfilePage(id)
    .then( () => {
      this.setState({doneLoading: true})
    })
  }

  dropZoneDropBox(){
    return (
      <Dropzone
        multiple={false}
        accept="image/*"
        onDrop={this.handleDrop}
        className={ this.state.imageUrl ? "pin-new-image-preview" : "pin-new-image-empty"}
      >
        {this.state.imageUrl ? this.previewImage() : "click or drag to add image"}
      </Dropzone>
    )
  }

  inputForm(){

    return (
      <div className="new-pin-form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="new-pin-form">
            <div className="new-pin-form-titles">
              Title
            </div>
            <input
              onChange={this.update('title')}
              defaultValue={this.state.title}
              />
            <div className="new-pin-form-titles">
              Description
            </div>
            <textarea className="new-pin-textarea"
              type="textarea"
              onChange={this.update('body')}
              >
              {this.state.body}
            </textarea>
            <select className="new-pin-board-select-dropdown" onChange={this.update("boardId")}>
              <option selected disabled>--Select a board--</option>
              {
                this.props.boards.map(board =>
                  <option value={board.id} key={board.id}>{board.name}</option>
                )
              }
            </select>
            {this.state.renderEmptyBoardError ? this.emptyBoardError() : null}
            {this.state.renderEmptyPinError ? this.emptyPinError() : null}
            <div className="new-pin-form-button-container">
              <button type="Submit" value="Submit">
                Post
              </button>
              <button onClick={this.handleNewPinCancelButton}>
                Cancel
              </button>
            </div>
            <div className="pin-new-add-board-container">
              <button className="pin-new-add-board-button" onClick={this.handleNewBoardButton}>
                <i className="fa fa-plus fa-1x" aria-hidden="true"></i>
                <span className="pin-new-add-board-text">
                  {"Create a new Board"}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  handleNewPinCancelButton(){
    this.props.closeModal()
  }

  handleNewBoardButton(){
    this.setState({newBoardForm: true})
  }

  handleCancelNewBoard(){
    this.setState({newBoardForm: false})
  }

  handleBoardSubmit(){
    if (!this.state.name) {
      this.setState({renderEmptyNameError: true})
    } else {
      this.props.createBoard({name: this.state.name})
      .then((action) => hashHistory.push(`/boards/${action.board.id}`))
      this.props.closeModal()
    }
  }

  newBoardForm() {
    return(
      <div className='board-new-form-container'>
        <form className="board-new-form" onSubmit={this.handleBoardSubmit}>
          <br/>
          <input
            className="board-new-input"
            autoFocus type='text' onChange={this.update('name')}
            />
          <br/>
          {this.state.renderEmptyNameError ? this.boardErrorText() : null}
          <div className="board-new-form-buttons-container">
            <button type="Submit" value="Submit">
              Create
            </button>
            <button onClick={this.handleCancelNewBoard}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  selectBoardForNewPin(){
    let boards = this.props.x.boards
    return(
      boards.map((board, idx) => {
        return(
          <div>
            {board.name}
          </div>
        )
      })
    )
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={true}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.props.closeModal}
          contentLabel="Session form"
          className="newPinModal"
          >
          <div className="pin-new-add-a-new-pin-text-container">
            {this.state.doneLoading && !this.state.newBoardForm ? "New Pin" : "New Board"}
          </div>
          <div className="pin-new-content-in-box">
            {
              this.state.doneLoading && !this.state.newBoardForm ?
              <div className="pin-new-image-drop">
                {this.dropZoneDropBox()}
              </div>
              : null
            }
            <div className="pin-board-new-user-input">
              {this.state.doneLoading && !this.state.newBoardForm ? this.inputForm() : null}
              {this.state.doneLoading && this.state.newBoardForm ? this.newBoardForm() : null}
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
