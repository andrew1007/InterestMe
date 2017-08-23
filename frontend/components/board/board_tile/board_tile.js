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

  togglePinShow() {
    this.setState({showPin: this.state.showPin ? false : true})
    console.log("show pin");
  }

  _handleUserRedirect() {
    console.log("go to user profile");
  }

  render() {
    console.log(this.props);
    const props = {
      ...this.props,
      togglePinShow: this.togglePinShow.bind(this)
    }
    return (
      <div>
        <div className='board-tile-container'>
          <div>
            <img
              src={this.props.image_url}
              onClick={this.togglePinShow.bind(this)}
              className='board-tile-image'
            />
          </div>
          <BoardTileBody {...this.props}/>
        </div>
        {this.state.showPin ? <Pin {...props}/> : null}
      </div>
    )
  }
}
