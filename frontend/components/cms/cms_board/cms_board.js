import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { createBoard } from '../../../actions/board_actions'
import CMSBoardForm from './cms_board_form'

class CMSBoardPresentational extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true
    }
  }

  render() {
    const cmsBoardFormProps = {
      toggleCMSBoard: () => this.props.toggleCMSBoard(),
      createBoard: (board) => this.props.createBoard(board)
    }
    return (
      <Modal
        isOpen={true}
        onRequestClose={() => this.props.toggleCMSBoard()}
        contentLabel='modal'
        className='cms-board-modal'
        >
        <CMSBoardForm {...cmsBoardFormProps}/>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createBoard: (board) => dispatch(createBoard(board))
})

const CMSBoard = connect(
  null, mapDispatchToProps
)(CMSBoardPresentational)

export default CMSBoard
