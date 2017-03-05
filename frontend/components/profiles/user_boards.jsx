import React, {Component} from 'react';
import Masonry from 'react-masonry-component';

export default class userBoard extends Component {
  constructor(props) {
    super(props)
  }

  showBoards(){
    return(
      this.props.boards.map ((board, idx)=> {
        return (
          <li name={board.id} onClick={this.handleBoardClick} key={idx} className="board-button-set">
            <button name={board.id} onClick={this.handleBoardClick} className="user-profile-board-button" key={idx}>
              <div name={board.id} onClick={this.handleBoardClick} className="user-profile-board-images">
                <div name={board.id} onClick={this.handleBoardClick} className="user-profile-first-pic-container">
                  <img name={board.id} onClick={this.handleBoardClick} src={board.samplePins[0]}/>
                </div>
                <div name={board.id} onClick={this.handleBoardClick} className="user-profile-sub-image-board-pin-container">
                  <div name={board.id} onClick={this.handleBoardClick} className="sub-image-single-pic-container">
                    <img name={board.id} onClick={this.handleBoardClick} src={board.samplePins[1]}/>
                  </div>
                  <div name={board.id} onClick={this.handleBoardClick} className="sub-image-single-pic-container">
                    <img name={board.id} onClick={this.handleBoardClick} src={board.samplePins[2]}/>
                  </div>
              </div>
            </div>
            </button>
            <div name={board.id} className="board-title" onClick={this.handleBoardClick}>
              {board.name}
            </div>
          </li>
        )
      })
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
              {
                this.isProfileOwner() ?
                <li className="board-button-set">
                  <button className="user-profile-board-button" onClick={this.handleNewBoardClick}>
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
                :
                null
              }
              {this.showBoards()}
            </Masonry>
        </div>
      </div>
    </div>
    )
  }
  handleNewBoardClick(e){
    e.preventDefault()
    this.setState({showNewBoardForm: true, newBoardModalIsOpen: true})
  }

  newBoardModal(){
    return (
      <div>
        {
          this.state.showNewBoardForm ?
          <Modal
            isOpen={this.state.newBoardModalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Modal"
            className="board-new-modal"
            >
            <NewBoardContainer handleSelfClose={this.closeModal}/>
          </Modal>
          : null
        }
      </div>
    )
  }
}
