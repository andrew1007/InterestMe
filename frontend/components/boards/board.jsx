import React from 'react';
import Masonry from 'react-masonry-component'
import Modal from 'react-modal';
import BoardEdit from './board_edit';
import PinNewContainer from '../pins/pin_new_container';
import Dropzone from 'react-dropzone';
import {hashHistory} from 'react-router';
import BoardMasonry from './board_masonry';
export default class Board extends React.Component {

  constructor(props) {
    super(props)
    this.state= {
      modalIsOpen: false,
      focusedPinId: null,
      pin: null,
      owner: false,
      newPinFormOpen: false,
      finishedLoading: false,
      imageUrl: null,
      editFormOpen: false,
      name: ""
    }
    document.body.style.overflow = "auto"
    this.handleEditButtonOpen = this.handleEditButtonOpen.bind(this);
    this.handleEditButtonOpen = this.handleEditButtonOpen.bind(this);
    this.openNewPinForm = this.openNewPinForm.bind(this);
    this.redirectToAuthorProfile = this.redirectToAuthorProfile.bind(this);
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

  masonryLayout(){
    return (
      <BoardMasonry
        pins={this.props.board.pins}
        pinSetCount={this.props.board.pinSetCount}
        owner={this.props.board.owner}
        deletePin={this.props.deletePin}
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

  closeEditModal(editFormState){
    this.setState({
      editFormOpen: false
    })
    //console.log(editFormState);
    if (editFormState.name !== this.state.name && editFormState.nameUpdated){
      this.setState({
        name: editFormState.name
      })
    }
    document.body.style.overflow = "auto";
  }

  boardTitle(){
    //////console.log(this.state);
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
      <BoardEdit
        closeEditModal={this.closeEditModal.bind(this)}
        name={this.state.name}
        boardId={this.props.boardId}
        deleteBoard={this.props.deleteBoard.bind(this)}
        editBoard={this.props.editBoard.bind(this)}
         />
    )
  }

  render() {
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
