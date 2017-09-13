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
    },() => document.body.style.overflow = this.state.showModal ? 'auto' : 'hidden')
    if (type === 'delete') {
      this.props.togglePinShow()
    }
  }

  handleBoardRedirect() {
    document.body.style.overflow = 'auto'
    hashHistory.push(`/boards/${this.props.board_id}`)
  }

  render() {
    console.log("pinheader");
    console.log(this.props);
    let { id, title, body, board_id, owner } = this.props
    let editModalProps = { id, title, body, board_id, owner,
      toggleModal: this.toggleModal.bind(this)
    }
    return (
      <div>
        <div className='pin-header-title-link-container'>
          <div className='pin-header-title'>
            {this.props.title}
          </div>
          <span onClick={this.toggleModal.bind(this)}>
            {this.props.owner ? 'edit link' : null}
          </span>
        </div>
        <a onClick={this.handleBoardRedirect.bind(this)}>
          {this.props.board_name}
        </a>
        { this.state.showModal ?
          <PinHeaderEditModal {...editModalProps}/> : null }
      </div>
    )
  }
}
