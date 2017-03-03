import React from 'react';
import Masonry from 'react-masonry-component'
import Modal from 'react-modal';
import BoardEditContainer from './board_edit_container'
import PinNewContainer from '../pins/pin_new_container'
import Dropzone from 'react-dropzone'
import {hashHistory} from 'react-router'
import BoardMasonry from './board_masonry'
export default class Board extends React.Component {

  constructor(props) {
    super(props)
    this.state= {
      modalIsOpen: false,
      focusedPinId: null,
      pin: null,
      owner:this.props.board.owner,
      newPinFormOpen: false,
      finishedLoading: false,
      imageUrl: null,
      editFormOpen: false,
      name: ""
    }
    document.body.style.overflow = "auto"
    this.editSelfClose = this.editSelfClose.bind(this);
    this.handleEditButtonOpen = this.handleEditButtonOpen.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSelfClose = this.handleSelfClose.bind(this);
    this.handleBoardEditSubmit = this.handleBoardEditSubmit.bind(this);
    this.handleEditButtonOpen = this.handleEditButtonOpen.bind(this);
    this.openNewPinForm = this.openNewPinForm.bind(this);
    this.redirectToAuthorProfile = this.redirectToAuthorProfile.bind(this);
  }

  handleChildCancelButton(){
    this.closeModal()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.boardId !== nextProps.boardId){
      this.setState({finishedLoading: false})
      this.props.getBoard(nextProps.boardId)
      .then ( () => this.setState({finishedLoading: true,
        name: this.props.board.name,
        owner:  this.props.board.owner
      }))
    }
    if (this.props.location.state && this.props.location.state.newPinMade){
      hashHistory.push({
        pathname: `/boards/${this.props.boardId}`,
        state: {
          newPinMade: false
        }
      })
      this.setState({finishedLoading: false})
      this.props.getBoard(nextProps.boardId)
      .then ( () => this.setState({finishedLoading: true,
        name: this.props.board.name,
        owner:  this.props.board.owner
      }))
    }
  }

  componentWillMount() {
    this.props.getBoard(this.props.boardId)
    .then( () => this.setState({finishedLoading: true,
      name: this.props.board.name
    }))
  }

  handleTileClick(e) {
    e.preventDefault();
    const idx = e.currentTarget.name
    this.setState({focusedPinId: idx, modalIsOpen: true})
    document.body.style.overflow = "hidden";
  }

  masonryLayout(){
    return (
      <BoardMasonry
        pins={this.props.board.pins}
        owner={this.props.board.owner}
        />
    )
  }

  boardAuthor(){
    return (
      <button className="board-name-author-link" onClick={this.redirectToAuthorProfile}>
        {this.props.board.owner ? "you" : this.props.board.author}
      </button>
    )
  }

  redirectToAuthorProfile(e){
    e.preventDefault()
    hashHistory.push(`/user/${this.props.board.owner_id}`)
  }

  handleBoardEditSubmit(){
    this.props.getBoard(this.props.boardId)
  }

  closeModal() {
    this.props.getBoard(this.props.boardId)
    .then( () => {
      this.setState({modalIsOpen: false, newPinFormOpen: false, editFormOpen: false, name: this.props.board.name})
    })
    document.body.style.overflow = "auto";
  }

  handleSelfClose(){
    this.props.getBoard(this.props.boardId)
    .then( () => {
        this.setState({modalIsOpen: false, newPinFormOpen: false, name: this.props.board.name, editFormOpen: false})
    })
    document.body.style.overflow = "auto";
  }

  editSelfClose(){
    this.setState({modalIsOpen: false, newPinFormOpen: false, editFormOpen: false})
  }

  boardTitle(){
    //console.log(this.state);
    return(
      <div className="board-overhead-bar-container">
        <div className="board-overhead-bar">
          <div className="board-name-container">
            <div id="board-name">
              {this.state.name}
            </div>
            <div className="owner-edit-buttons">
              {this.props.board.owner?
                <button className="board-edit-button edit-modal-cog" onClick={this.handleEditButtonOpen}>
                  <i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
                </button>
                : null }
              </div>
          </div>
          <div className="author-edit-flexbox">
            <a id="board-author">a board by {this.props.board ? this.boardAuthor() : null} </a>
          </div>
        </div>
      </div>
    )
  }

  openNewPinForm(){
    return(
      <Modal
        isOpen={this.state.newPinFormOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Session form"
        className="new-pin-modal ReactModal__Content"
        >
          <PinNewContainer
            selfClose={this.handleSelfClose}
            {...this.props}
          />
      </Modal>
    )
  }

  handleEditButtonOpen(){
    this.setState({editFormOpen: true})
  }

  openEditBoardForm(){
    return(
      <Modal
        isOpen={this.state.editFormOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Session form"
        className="board-edit-modal"
        >
        <BoardEditContainer handleSelfClose={this.handleSelfClose} {...this.props}/>
      </Modal>
    )
  }

  render() {
    console.log("board");
    console.log(this.props);
    return (
      <div>
        {this.state.finishedLoading ? this.boardTitle() : null}
        <div className="homepage-board">
          {this.state.finishedLoading ? this.masonryLayout() : null}
        </div>
        { this.state.newPinFormOpen ?
          this.openNewPinForm()
        : null }
        { this.state.editFormOpen ?
           this.openEditBoardForm()
         : null}
      </div>
    )
  }
}
