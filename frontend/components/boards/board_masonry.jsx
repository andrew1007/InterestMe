import React, {Component} from 'react';
import Masonry from 'react-masonry-component';
import Pin from '../pins/pin'
export default class BoardMasonry extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalIsOpen: false,
      focusedPinId: 0
    }
  }

  handleTileClick(e) {
    e.preventDefault();
    const idx = e.currentTarget.name
  }

  pinTileRender(){
    var pinTileContainerClassName = "pin-tile-container-hide";
    var boardTilePicClassName = "board-tile-pic-hide";
    var pinImageClassName = "pin-image-hide";
    return(
      this.props.pins.map( (tile, idx) => {
        return(
          <div key={idx} className={pinTileContainerClassName}>
            <button className={boardTilePicClassName} name={tile.id} onClick={this.handleTileClick.bind(this)}>
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

  handleTileClick(e) {
    e.preventDefault();
    const idx = e.currentTarget.name
    this.setState({focusedPinId: idx, modalIsOpen: true})
    document.body.style.overflow = "hidden";
  }

  closeModal(){
    this.setState({modalIsOpen: false})
    // document.body.style.overflow = "auto";
  }

  pinShow(){
    console.log(this.props);
    const currentPin = this.props.pins.filter( (pin) => {
      return pin.id === parseInt(this.state.focusedPinId)
    })
    console.log(currentPin);
    return(
      <Pin
        pin={currentPin[0]}
        closeModal={this.closeModal.bind(this)}
        id={this.state.focusedPinId}
        open={true}
        />
    )
  }

  render(){
    return(
      <div className='user-profile-board-pins'>
        {this.masonryLayout()}
        {this.state.modalIsOpen ? this.pinShow() : null}
      </div>
    )
  }
}
