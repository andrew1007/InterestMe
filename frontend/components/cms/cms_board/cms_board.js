import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { createBoard } from '../../../actions/board_actions'
import CMSBoardForm from './cms_board_form'

class CMSBoardPresentational extends Component {
  constructor(props) {
    super(props)
    this.state {
      show: true
    }
  }

  toggleCMSBoard() {
    this.setState({show: this.state.show ? false : true})
  }

  render() {
    const cmsBoardFormProps = {toggleCMSBoard: () => this.toggleCMSBoard()}
    return (
      <Modal
        isOpen={true}
        onRequestClose={() => this.toggleCMSBoard()}
        contentLabel='modal'
        className='cms-board-modal'
        >
        <CMSBoardForm {...cmsBoardFormProps}/>
      </Modal>
    )
  }
}
