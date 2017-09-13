import React, { Component } from 'react'

export default class CMSPinFormDropdown extends Component {
  boards() {
    return this.props.boards.map(board => {
      return (
        <option value={board.id} key={board.id}>
          {board.name}
        </option>
      )
    })
  }

  render() {
    return (
      <select
        onChange={(e) => this.props.update(e, 'board_id')}
        >
        <option selected disabled>--Select a board--</option>
        {this.boards()}
      </select>
    )
  }
}
