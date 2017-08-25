import React, {Component} from 'react'
import PinHeaderEditModal from './pin_header_edit_modal'
import {hashHistory} from 'react-router';

export default class PinHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  toggleModal(type = null) {
    this.setState({
      showModal: this.state.showModal ? false : true
    })
    if (type === 'delete') {
      this.props.togglePinShow
    }
  }

  handleBoardRedirect() {
    hashHistory.push(`/boards/${this.props.board_id}`)
  }

  render() {
    console.log("pinheader");
    console.log(this.props);
    let editModalProps = {
      id: this.props.id,
      title: this.props.title,
      body: this.props.body,
      toggleModal: this.toggleModal.bind(this),
      boardId: this.props.board_id,
      owner: this.props.owner
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
        <div onClick={this.handleBoardRedirect.bind(this)}>
          Board link
        </div>
        { this.state.showModal ?
          <PinHeaderEditModal {...editModalProps}/> : null }
      </div>
    )
  }
}
