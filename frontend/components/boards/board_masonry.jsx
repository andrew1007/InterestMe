import React, {Component} from 'react';
import Masonry from 'react-masonry-component';
import Pin from '../pins/pin';
import {hashHistory} from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';

export default class BoardMasonry extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalIsOpen: false,
      focusedPinId: 0,
      pinSet: [],
      pinsToRender: [],
      pinBatchCounter: 0,
      pinSetCount: 0,
    }
  }

  redirectToAuthorProfile(e){
    e.preventDefault()
    const userId = e.target.getAttribute("value")
    hashHistory.push(`/user/${parseInt(userId)}`)
  }

  componentDidMount(){
    this.findImageHeight();
  }

  componentWillMount(){
    this.setState({
      pinsToRender: this.props.pins[this.state.pinBatchCounter]
    })
  }

  pinTileRender(){
    var pinTileContainerClassName = "pin-tile-container-hide";
    var boardTilePicClassName = "board-tile-pic-hide";
    var pinImageClassName = "pin-image-hide";
    return (
      this.state.pinsToRender.map( (tile, idx) => {
        return(
          <div key={idx} className={pinTileContainerClassName}>
            <button className={boardTilePicClassName} name={tile.id} onClick={this._handleTileClick.bind(this)}>
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
          <Masonry
            elementType={'div'}
            disableImagesLoaded={false}
            className='user-profile-boards-container'
            options={masonryOptions}
            >
            {this.pinTileRender()}
          </Masonry>
      </div>
    </div>
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
    }, 500)
  }

  _handleTileClick(e) {
    e.preventDefault();
    const idx = e.currentTarget.name
    this.setState({focusedPinId: idx, modalIsOpen: true})
    document.body.style.overflow = "hidden";
  }

  updateBoard(pinState){
    let pinCount = this.state.pinsToRender.length;
    let pins = this.state.pinsToRender
    for (let i = 0; i < pinCount; i++) {
      if (pins[i].id === pinState.pinId) {
        if (pinState.edited) {
          pins[i].title = pinState.title
          pins[i].body = pinState.body
          this.state.pinsToRender.unshift(pins[i])
          this.state.pinsToRender.splice(i + 1, 1)
        } else {
          this.state.pinsToRender.splice(i, 1)
          this.props.deletePin(pinState.pinId);
        }
        let updatedBoard = this.state.pinsToRender
        this.setState({
          pins: this.state.pinsToRender
        })
        this.setState({modalIsOpen: false})
        return
      }
    }
  }

  closeModal(pinState){
    document.body.style.overflow = "auto";
    if (pinState.edited || pinState.deleted){
      this.updateBoard(pinState)
    }
    this.setState({modalIsOpen: false})
  }

  pinShow(){
    //console.log(this.props);
    const currentPin = this.state.pinsToRender.filter( (pin) => {
      return pin.id === parseInt(this.state.focusedPinId)
    })
    //console.log(currentPin);
    return(
      <Pin
        pin={currentPin[0]}
        closeModal={this.closeModal.bind(this)}
        id={this.state.focusedPinId}
        open={true}
        owner={this.props.owner}
        />
    )
  }

  loadMorePins(){
    console.log("triggered");
    setTimeout( () => {
      if (this.state.pinBatchCounter == this.state.pinSetCount){
        this.setState({
          hasMorePins: false
        })
      } else {
        this.setState({pinSet: this.props.pins[this.state.pinBatchCounter + 1],
          pinsToRender: this.state.pinsToRender.concat(this.state.pinSet),
          pinBatchCounter: this.state.pinBatchCounter + 1})
        }
        return
    }, 50)
  }

  render(){
    console.log("whaaaaaaaaaaat");
    return(
      <div className='user-profile-board-pins'>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMorePins}
            hasMore={this.state.hasMorePins}
            loader={<div className="loader">Loading ...</div>}
            threshold={1100}
            className='homepage-board'
          >
            {this.masonryLayout()}
          </InfiniteScroll>
        {this.state.modalIsOpen ? this.pinShow() : null}
      </div>
    )
  }
}
