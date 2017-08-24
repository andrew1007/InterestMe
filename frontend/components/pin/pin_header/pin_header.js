import React, {Component} from 'react'
import PinHeaderEditModal from './pin_header_edit_modal'

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

  render() {
    let editModalProps = {
      id: this.props.id,
      title: this.props.title,
      body: this.props.body,
      toggleModal: this.toggleModal.bind(this),
      boardId: this.props.board_id
    }
    return (
      <div>
        <div className='pin-header-title-link-container'>
          <div className='pin-header-title'>
            {this.props.title}
          </div>
          <span onClick={this.toggleModal.bind(this)}>
            edit link
          </span>
        </div>
        <div>
          Board link
        </div>
        { this.state.showModal ?
          <PinHeaderEditModal {...editModalProps}/> : null }
      </div>
    )
  }
}
