import React, {Component} from 'react';
import Masonry from 'react-masonry-component';
import Modal from 'react-modal';
import {hashHistory} from 'react-router';
import BoardNewContainer from '../boards/board_new_container';

export default class UserBoards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showNewBoardForm: false,
      newBoardModalIsOpen: false,
      loaded: true,
      boards: []
    }
  }

  componentWillMount(){
    this.setState({
      boards: this.props.boards
    })
  }

  showBoards(){
    return(
      this.state.boards.map ((board, idx)=> {
        return (
          <li name={board.id} onClick={this._handleBoardClick} key={idx} className="board-button-set">
            <button name={board.id} onClick={this._handleBoardClick} className="user-profile-board-button" key={idx}>
              <div name={board.id} onClick={this._handleBoardClick} className="user-profile-board-images">
                <div name={board.id} onClick={this._handleBoardClick} className="user-profile-first-pic-container">
                  <img name={board.id} onClick={this._handleBoardClick} src={board.samplePins[0]}/>
                </div>
                <div name={board.id} onClick={this._handleBoardClick} className="user-profile-sub-image-board-pin-container">
                  <div name={board.id} onClick={this._handleBoardClick} className="sub-image-single-pic-container">
                    <img name={board.id} onClick={this._handleBoardClick} src={board.samplePins[1]}/>
                  </div>
                  <div name={board.id} onClick={this._handleBoardClick} className="sub-image-single-pic-container">
                    <img name={board.id} onClick={this._handleBoardClick} src={board.samplePins[2]}/>
                  </div>
              </div>
            </div>
            </button>
            <div name={board.id} className="board-title" onClick={this._handleBoardClick}>
              {board.name}
            </div>
          </li>
        )
      })
    )
  }

  _handleBoardClick(e){
    e.preventDefault();
    hashHistory.push(`/boards/${e.target.getAttribute("name")}`);
  }

  createNewBoardButton(){
    return (
      <li className="board-button-set">
        <button className="user-profile-board-button" onClick={this._handleNewBoardClick.bind(this)}>
          <div className="add-new-board-container">
            <i className="fa fa-plus fa-1x" aria-hidden="true"></i>
            <div className="create-new-board-text">
              Create a new Board
            </div>
          </div>
        </button>
        <div className="board-title-invisible">
          sdfdsag
        </div>
      </li>
    )
  }

  boardMasonryLayout(){
    var masonryOptions = {
      fitWidth: true,
      transitionDuration: 0
    };
    return (
      <div className='user-profile-board-pins'>
        <div>
          <div>
            <Masonry
              elementType={'div'}
              disableImagesLoaded={false}
              className='user-profile-boards-container'
              options={masonryOptions}
              >
              {this.props.owner ? this.createNewBoardButton() : null }
              {this.showBoards()}
            </Masonry>
        </div>
      </div>
    </div>
    )
  }

  _handleNewBoardClick(e){
    e.preventDefault()
    this.setState({
      showNewBoardForm: true,
      newBoardModalIsOpen: true
    })
  }

  closeModal(){
    this.setState({
      showNewBoardForm: false
    })
  }

  newBoardModal(){
    return (
      <BoardNewContainer
        closeModal={this.closeModal.bind(this)}
        />
    )
  }

  render(){
    return (
      <div>
        {this.boardMasonryLayout()}
        {this.state.showNewBoardForm ? this.newBoardModal() : null}
      </div>
    )
  }
}
