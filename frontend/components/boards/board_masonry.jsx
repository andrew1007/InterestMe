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
      doneLoading: false,
      hasMorePins: true
    }
  }

  redirectToAuthorProfile(e){
    e.preventDefault()
    const userId = e.target.getAttribute("value")
    hashHistory.push(`/user/${parseInt(userId)}`)
  }

  // componentDidMount(){
  //   this.findImageHeight();
  // }

  componentWillMount(){
    this.setState({
      pinBatchCounter: 0,
      pinsToRender: this.props.pins[this.state.pinBatchCounter],
      pinSetCount: this.props.pinSetCount
    })
    this.setState({doneLoading: true})
    setTimeout( () => this.findImageHeight(), 1000)
  }

  pinTileRender(){
    var pinTileContainerClassName = "pin-tile-container-hide";
    var boardTilePicClassName = "board-tile-pic-hide";
    var pinImageClassName = "pin-image-hide";
    console.log(this.props);
    const pinsToRender = this.state.pinsToRender ? this.state.pinsToRender : []
    return (
      pinsToRender.map( (tile, idx) => {
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
      transitionDuration: '0.07s'
    };
    return (
      <div>
        <div>
          <Masonry
            elementType={'div'}
            disableImagesLoaded={false}
            className='homepage-board'
            options={masonryOptions}
            >
            {this.pinTileRender()}
          </Masonry>
      </div>
    </div>
    )
  }

  findImageHeight(){
    let newClass;
    $('.pin-image').attr("style", `width:300px`)
    setTimeout( () => {
      [
        "pin-tile-hide",
        "board-tile-pic-hide",
        "pin-image-hide",
        "pin-tile-container-hide"
      ].forEach( (className) => {
        newClass = className.replace("-hide", "")
        $(`.${className}`).attr('class', newClass)
      })
    }, 200)
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
          //console.log("deleted");
          this.state.pinsToRender.splice(i, 1)
          // this.props.deletePin(pinState.pinId);
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
    const currentPin = this.state.pinsToRender.filter( (pin) => {
      return pin.id === parseInt(this.state.focusedPinId)
    })
    return (
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
    //console.log(this.pinBatchCounter);
    setTimeout( () => {
      if (this.state.pinBatchCounter == this.state.pinSetCount){
        this.setState({
          hasMorePins: false
        })
      } else {
        let newPins = this.props.pins[this.state.pinBatchCounter + 1]
        let nextBatch = this.state.pinBatchCounter + 1
        let newPinsToRender = this.state.pinsToRender.concat(newPins)
        this.setState({
          pinsToRender: newPinsToRender,
          pinBatchCounter: nextBatch
        })
        setTimeout( ()=> this.findImageHeight(), 0)
      }
        return
    }, 100)
  }

  render(){
    let threshhold = this.state.pinBatchCounter < 1 ? 500 : 1600
    return(
      <div className='user-profile-board-pins'>
        { this.state.doneLoading ?
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMorePins.bind(this)}
            hasMore={this.state.hasMorePins}
            loader={<div className="loader"></div>}
            threshold={threshhold}
            className='board'
            >
            {this.masonryLayout()}
          </InfiniteScroll>
          :
          null
        }
        {this.state.modalIsOpen ? this.pinShow() : null}
      </div>
    )
  }
}
