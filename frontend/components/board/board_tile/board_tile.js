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
    debugger
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
    const { board_id, board_name, body, id } = this.props
    const { image_url, owner, profile_picture } = this.props
    const { title, user_id, username } = this.props
    const pinProps = {boardTile: {
      board_id, board_name, body, id, image_url,
      owner, profile_picture, title, user_id, username,
      togglePinShow: this.togglePinShow
    }}
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
        {this.state.showPin ? <Pin {...pinProps}/> : null}
      </div>
    )
  }
}
