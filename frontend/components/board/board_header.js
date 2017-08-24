import React, { Component } from 'react'

export default class BoardHeader extends Component {
  render() {
    return(
      <div className='board-header-container'>
        <div className='board-header-underbar'>
          <div className='board-header-name'>
            {this.props.name}
          </div>
          <div className='board-header-username'>
            A board by {this.props.username}
          </div>
        </div>
      </div>
    )
  }
}
