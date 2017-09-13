import React, {Component} from 'react'
import Pin from '../../pin/pin'
import BoardTileBody from './board_tile_body'

export default class BoardTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPin: false,
      loaded: false
    }
    this.togglePinShow = this.togglePinShow.bind(this)
  }

  togglePinShow() {
    this.setState({showPin: this.state.showPin ? false : true}, () => {
      document.body.style.overflow = this.state.showPin ? 'hidden' : 'auto'
    })
  }

  _handleUserRedirect() {
    document.body.style.overflow = 'auto'
    console.log("go to user profile");
  }

  _reveal() {
    this.props.pinLoaded()
  }

  render() {
    const props = {
      ...this.props,
      togglePinShow: this.togglePinShow
    }
    return (
      <div>
        <div className='board-tile-container hidden'>
          <div>
            <img
              onClick={this.togglePinShow}
              src={this.props.image_url}
              className='board-tile-image'
              onLoad={this._reveal.bind(this)}
            />
          </div>
          <BoardTileBody {...this.props}/>
        </div>
        {this.state.showPin ? <Pin {...props}/> : null}
      </div>
    )
  }
}
