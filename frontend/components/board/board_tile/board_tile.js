import React, {Component} from 'react'
import Pin from '../../pin/pin'
import BoardTileBody from './board_tile_body'

export default class BoardTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPin: false
    }
  }

  _handlePinShow() {
    this.setState({showPin: true})
    console.log("show pin");
  }

  _handleUserRedirect() {
    console.log("go to user profile");
  }

  render() {
    return (
      <div>
        <div className='board-tile-container'>
          <div>
            <img
              src={this.props.image_url}
              onClick={this._handlePinShow.bind(this)}
              className='board-tile-image'
            />
          </div>
          <BoardTileBody {...this.props}/>
        </div>
        {this.state.showPin ? <Pin {...this.props}/> : null}
      </div>
    )
  }
}
