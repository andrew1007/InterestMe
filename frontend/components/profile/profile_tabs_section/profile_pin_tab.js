import React, { Component } from 'react'
import BoardMasonry from '../../board/board_masonry'

export default class ProfilePinTab extends Component {
  render() {
    return (
      <div style={{'width':'100vw'}}>
        <BoardMasonry {...this.props}/>
      </div>
    )
  }
}
