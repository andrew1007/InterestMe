import React, {Component} from 'react'
import PinHeaderEditModal from './pin_header_edit_modal'
import {hashHistory, Link} from 'react-router';

export default class PinHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  toggleModal(type = null) {
    this.setState({ showModal: this.state.showModal ? false : true
    },() => {
      document.body.style.overflow = this.state.showModal && type !== 'edit' ? 'auto' : 'hidden'
    })
    if (type === 'delete') {
      this.props.togglePinShow()
    }
  }

  handleBoardRedirect() {
    this.props.togglePinShow()
    hashHistory.push(`/boards/${this.props.board_id}`)
    document.body.style.overflow = 'auto'
  }

  render() {
    let { id, title, body, board_id, owner } = this.props
    let editModalProps = { id, title, body, board_id, owner,
      toggleModal: () => this.toggleModal()
    }
    const editStyle = {"paddingLeft": "10px"}
    return (
      <div>
        <div className='pin-header-title-link-container'>
          <div className='pin-header-title'>
            {this.props.title}
          </div>
          <span onClick={() => this.toggleModal('edit')} style={editStyle}>
            {this.props.owner ? <i className="fa fa-pencil-square-o fa-2x edit-modal-cog"/> : null}
          </span>
        </div>
        <a className='pin-header-board-name'onClick={() => this.handleBoardRedirect()}>
          {this.props.board_name}
        </a>
        { this.state.showModal ?
          <PinHeaderEditModal {...editModalProps}/> : null }
      </div>
    )
  }
}
