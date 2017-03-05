import React from 'react';
import Masonry from 'react-masonry-component';
import Modal from 'react-modal';
import PinContainer from '../pins/pins_container';
import {hashHistory} from 'react-router';
import BoardMasonry from '../boards/board_masonry';

export default class Homepage extends React.Component{
  constructor(props){
    super(props)
    this.state={
      pinsReceieved: false,
      modalIsOpen: false,
      focusedPinId: null,
      finishedLoading: false,
      pinSet: [],
      pinsToRender: [],
      pinBatchCounter: 0,
      pinSetCount: 0,
      hasMorePins: true
    }
    document.body.style.overflow = "auto";
    this.loadMorePins = this.loadMorePins.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
    this.pinTileRender = this.pinTileRender.bind(this);
    this.masonryLayout = this.masonryLayout.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSelfClose = this.handleSelfClose.bind(this);
    this.findImageHeight = this.findImageHeight.bind(this);
  }


  closeModal() {
    this.setState({modalIsOpen: false});
    document.body.style.overflow = "auto";
  }

  componentDidMount(){
    this.props.getHome()
  }

  componentWillMount(){
    this.props.getHome()
    // .then( () => this.setState({
    //   pinsToRender: this.props.pins.pins[this.state.pinBatchCounter]
    // }))
    .then( () => {
        this.setState({
          finishedLoading: true
        })
    })
  }

  handleTileClick(e) {
    e.preventDefault();
    const idx = e.currentTarget.name
    this.setState({focusedPinId: idx, modalIsOpen: true})
    document.body.style.overflow = "hidden";
  }

  redirectToAuthorProfile(e){
    e.preventDefault()
    hashHistory.push(`/user/${e.target.getAttribute("value")}`)
  }

  pinTileRender(){
    ////console.log(this.state.pinBatchCounter);
    if (this.state.pinBatchCounter === 0){
      var pinTileContainerClassName = "pin-tile-container-hide";
      var boardTilePicClassName = "board-tile-pic-hide";
      var pinImageClassName = "pin-image-hide";
    } else {
      var pinTileContainerClassName = "pin-tile-container";
      var boardTilePicClassName = "board-tile-pic";
      var pinImageClassName = "pin-image";
    }
    return(
      this.state.pinsToRender.map( (tile, idx) => {
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
    return (
      <BoardMasonry
        pins={this.props.pins.pins}
        pinSetCount={this.props.pins.pinSetCount}
        owner={null}
        deletePin={null}
        />
    )
  }

  findImageHeight(){
    let counter = 0;
    this.imageHeight = setTimeout( () => {
      switch(counter){
        case 0:
        let allImages = document.images
        for (let i=0; i < allImages.length; i++){
          let scale = 300 / allImages[i].naturalWidth
          let scaledHeight = Math.floor(allImages[i].naturalHeight * scale)
          allImages[i].setAttribute("style", `height:${scaledHeight}`)
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
    }, 600)
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    document.body.style.overflow = "auto";
  }

  handleSelfClose(){
    this.setState({modalIsOpen: false})
    document.body.style.overflow = "auto";
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
        <PinContainer
          handleSelfClose={this.handleSelfClose}
          pinId={this.state.focusedPinId}
          />
      </Modal>
    )
  }

  loadMorePins(){
    setTimeout( () => {
      if (this.state.pinBatchCounter == this.state.pinSetCount){
        this.setState({
          hasMorePins: false
        })
      } else {
        this.setState({pinSet: this.props.pins.pins[this.state.pinBatchCounter + 1],
          pinsToRender: this.state.pinsToRender.concat(this.state.pinSet),
          pinBatchCounter: this.state.pinBatchCounter + 1})
        }
        return
    }, 50)
  }


  render(){
    console.log(this.props);
    return(
      <div>
        <div className="homepage-welcome">
        </div>
        <div className="board-overhead-bar-container">
          <div className="board-overhead-bar">
            <a id="board-name">
              Discover
            </a>
            <div className="author-edit-flexbox-hidden">
              invisible filler
            </div>
          </div>
        </div>
        {this.state.finishedLoading ? this.masonryLayout() : null }

        {this.state.finishedLoading ? this.pinShow() : null}
      </div>
    )
  }
}
