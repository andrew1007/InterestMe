import React from 'react';
import {Router, hashHistory} from 'react-router';
import Dropzone from 'react-dropzone'
import request from 'superagent';
import BoardNewContainer from '../boards/board_new_container';
import Dropdown from 'react-dropdown'

const CLOUDINARY_PRESET = 'punlriir'
const CLOUDINARY_UPLOAD ='http://api.cloudinary.com/v1_1/andoo/upload'

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
      newBoardForm: false
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
        console.log("error uploading!");
      }
    })
  }

  handleSubmit(e) {
    // log(this.getPath())
    e.preventDefault();
    this.props.newPin({
      title: this.state.title,
      body: this.state.body,
      board_id: parseInt(this.state.boardId),
      image_url: this.state.imageUrl})
    this.setState( {imageUrl: false})
    .then( () => {
      this.props.handleChildCancelButton()
      hashHistory.push(`/`)
      hashHistory.push(`/boards/${this.state.boardId}`)
    })
  }

  update(text) {
    return e => this.setState({
      [text]: e.currentTarget.value
    });
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
    let id
    if (this.props.currentUser.currentUser.currentUserId){
      id = this.props.currentUser.currentUser.currentUserId
    } else if ( this.props.currentUser.currentUserId){
      id = this.props.currentUser.currentUserId
    } else {
      id = this.props.x.currentUserId
    }
    this.props.getProfilePage(parseInt(id))
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="new-pin-form">
            <a>Title</a>
            <br/
              ><input
              onChange={this.update('title')}
              defaultValue={this.state.title}
              /><br/>
            <a>Body</a>
            <br/>
            <textarea className="new-pin-textarea"
              type="textarea"
              onChange={this.update('body')}
              >
              {this.state.body}
            </textarea>
            <br/>
            <select className="new-pin-board-select-dropdown" onChange={this.update("boardId")}>
              <option selected disabled>--Select a board--</option>
              {
                this.props.x.boards.map(board =>
                  <option value={board.id} key={board.id}>{board.name}</option>
                )
              }
            </select>
            <br/>
            <button type="Submit" value="Submit">Post</button>
            <button onClick={this.handleNewPinCancelButton}>
              Cancel
            </button>
          </div>
        </form>
        <div className="pin-new-add-board-container">
          <button className="pin-new-add-board-button" onClick={this.handleNewBoardButton}>
            <i className="fa fa-plus fa-1x" aria-hidden="true"></i>
            Create a new Board
          </button>
        </div>
      </div>
    )
  }

  handleNewPinCancelButton(){
    this.props.handleChildCancelButton()
  }

  handleNewBoardButton(){
    this.setState({newBoardForm: true})
  }

  handleCancelNewBoard(){
    this.setState({newBoardForm: false})
  }

  handleBoardSubmit(){
    this.props.createBoard({name: this.state.name})
    .then((action) => hashHistory.push(`/boards/${action.board.id}`))
    this.props.handleChildCancelButton()
  }

  newBoardForm() {
    return(
      <div className='board-new-form-container'>
        <form className="board-new-form" onSubmit={this.handleBoardSubmit}>
          <span className="board-new-text">
            New board
          </span>
          <br/>
          <input
            autoFocus type='text' onChange={this.update('name')}
            />
          <br/>
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
    // {this.state.doneLoading ? this.selectBoardForNewPin() : null}
    return (
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
    )
  }
}
