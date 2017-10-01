import React, {Component} from 'react'
import BoardEdit from './board_edit/board_edit'

export default class BoardHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  toggleModal(name) {
    this.setState({
      show: this.state.show ? false : true
    })
  }

  render() {
    const { id, username, name } = this.props
    const boardEditProps = { id, name,
      toggleModal: () => this.toggleModal()
    }
    return (
      <div className='board-header-container'>
        <div className='board-header-underbar'>
          <div className='board-header-name'>
            {name}
          </div>
          <div className='board-header-username'>
            {username ? `A board by ${username}` : null}
          </div>
          <button onClick={() => this.toggleModal()}>
            edit board
          </button>
        </div>
        {this.state.show ? <BoardEdit {...boardEditProps}/> : null}
      </div>
    )
  }
}
