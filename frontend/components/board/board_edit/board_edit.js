import React, {Component} from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import BoardEditForm from './board_edit_form'

export default class BoardEdit extends Component {
  render() {
    const { editBoard, id, name, toggleModal } = this.props
    const boardEditFormProps = {
      id, name,
      editBoard: (board) => editBoard(board),
      toggleModal: (name) => toggleModal(name)
    }
    return (
      <div>
        <Modal
          isOpen={true}
          onRequestClose={this.props.toggleModal}
          contentLabel="Session form"
          className="new-pin-modal ReactModal__Content"
          >
          <BoardEditForm {...boardEditFormProps}/>
        </Modal>
      </div>
    )
  }
}
