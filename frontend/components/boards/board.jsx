import React from 'react';
import Masonry from 'react-masonry-component'
import Modal from 'react-modal';
import BoardEditContainer from './board_edit_container'
import PinContainer from '../pins/pins_container'
import PinNewContainer from '../pins/pin_new_container'
import Dropzone from 'react-dropzone'
import {hashHistory} from 'react-router'

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
    this.pinTileRender = this.pinTileRender.bind(this);
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

  componentDidMount(){
    this.findImageHeight()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.boardId !== nextProps.boardId){
      this.setState({finishedLoading: false})
      this.props.getBoard(nextProps.boardId)
      .then ( () => this.setState({finishedLoading: true,
        name: this.props.board.name,
        owner:  this.props.board.owner
      }))
      .then( () => {
        this.findImageHeight()
      })
    }
    if (this.props.location.state){
      if (this.props.location.state.newPinMade){
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
        .then( () => {
          this.findImageHeight()
          this.props.location.state
        })
      }
    }
  }

  componentWillMount() {
    this.props.getBoard(this.props.boardId)
    .then( () => this.findImageHeight())
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

  pinTileRender(){
    var pinTileContainerClassName = "pin-tile-container-hide";
    var boardTilePicClassName = "board-tile-pic-hide";
    var pinImageClassName = "pin-image-hide";
    return(
      this.props.board.pins.map( (tile, idx) => {
        return(
          <div key={idx} className={pinTileContainerClassName}>
            <button className={boardTilePicClassName} name={tile.id} onClick={this.handleTileClick}>
              <img className={pinImageClassName} src={tile.image_url}/>
            </button>
            <div className="pin-tile-content">
              <div className="pin-tile-author-container">
                <div className="pin-tile-author-profile-picture-container">
                  <img value={tile.user_id} onClick={this.redirectToAuthorProfile}
                    className="pin-tile-author-profile-picture"
                    src={tile.profile_picture}/>
                </div>
                <div className="pin-tile-author-name">
                  <button className="board-pin-author-button" value={tile.user_id} onClick={this.redirectToAuthorProfile}>
                    {tile.username}
                  </button>
                </div>
              </div>
              <div className="pin-tile-information-container">
                <div className="pin-tile-title">
                  {tile.title}
                </div>
              </div>
            </div>
          </div>
        )
      })
    )
  }

  masonryLayout(){
    var masonryOptions = {
      fitWidth: true,
      transitionDuration: 0
    };
    return (
      <div>
        <div>
          <div>
            <Masonry
              elementType={'div'}
              disableImagesLoaded={false}
              className='board'
              options={masonryOptions}
              >
              {this.pinTileRender()}
            </Masonry>
        </div>
      </div>
    </div>
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
          <a id="board-name">
            {this.state.name}
          </a>
          <div className="author-edit-flexbox">
            <a id="board-author">a board by {this.props.board ? this.boardAuthor() : null} </a>
            <div className="owner-edit-buttons">
              {this.props.board.owner?
                <button className="board-edit-button edit-modal-cog" onClick={this.handleEditButtonOpen}>
                  <i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
                </button>
                 : null }
            </div>
          </div>
        </div>
      </div>
    )
  }

  pinShow(){
    return(
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Modal"
        className="ReactModal__Content"
      >
        <PinContainer pinId={this.state.focusedPinId} handleSelfClose={this.handleSelfClose}/>
      </Modal>
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

  findImageHeight(){
    let counter = 0;
    this.imageHeight = setTimeout( () => {
      switch(counter){
        case 0:
        let allImages = document.images
        for (let i=0; i < allImages.length; i++){
          allImages[i].setAttribute("style", `height:${allImages[i].naturalHeight}`)
        }
        case 1:
        [
          "pin-tile-hide",
          "board-tile-pic-hide",
          "pin-image-hide",
          "pin-tile-container-hide"
        ].forEach( (className) => {
          let classes = document.getElementsByClassName(`${className}`);
          while (classes.length){
            classes[0].className = classes[0].className.replace("-hide","")
          }
          clearInterval(this.imageHeight)
          return
        })
        counter += 1
      }
    }, 800)
  }


  render() {
    return (
      <div>
        {this.state.finishedLoading ? this.boardTitle() : null}
        {this.state.finishedLoading ? this.masonryLayout() : null}
        {this.state.finishedLoading ? this.pinShow() : null}
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
