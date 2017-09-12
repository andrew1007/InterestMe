import React from 'react'

const BoardHeader = props => (
  <div className='board-header-container'>
    <div className='board-header-underbar'>
      <div className='board-header-name'>
        {props.name}
      </div>
      <div className='board-header-username'>
        {props.username ? `A board by ${props.username}` : null}
      </div>
    </div>
  </div>
)

export default BoardHeader
