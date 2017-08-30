import React, { Component } from 'react'
import BoardMasonry from '../../board/board_masonry'

export default class ProfilePinTab extends Component {
  render() {
    return (
      <BoardMasonry {...this.props}/>
    )
  }
}
