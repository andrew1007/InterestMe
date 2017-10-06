import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getBoard } from '../../actions/board_actions';
import { getPins, createPin, deletePin } from '../../actions/pin_actions';
import { editBoard, deleteBoard } from '../../actions/board_actions';
import BoardMasonry from './board_masonry'
import BoardHeader from './board_header'
// this.props.board = {
//   id,
//   name,
//   owner,
//   user_id

// this.props.pins = {
//  0: {
//     board_id,
//     body,
//     id,
//     image_url,
//     owner,
//     profile_picture,
//     title,
//     user_id,
//     username
//  }
// }

class BoardPresentational extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  async componentWillMount() {
    const board = this.props.getBoard(this.props.boardId)
    const pins = this.props.getPins(this.props.boardId)
    await Promise.all([board, pins])
    this.setState({loaded: true})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.boardId !== this.props.boardId) {
      this.props.getBoard(this.props.boardId)
      this.props.getPins(this.props.boardId)
    }
  }

  render() {
    const { pins, editBoard } = this.props
    const { name, username, user_id, id } = this.props.board
    const boardHeaderProps = {
      name, username, user_id, id,
      editBoard: board => editBoard(board)
    }
    const boardMasonryProps = {pins: Object.values(pins)}
    return (
      <div>
        <BoardHeader {...boardHeaderProps}/>
        {this.state.loaded ? <BoardMasonry {...boardMasonryProps}/> : null}
      </div>
    )
  }
}

const mapStateToProps = ({boards, pins}, ownProps) => ({
  board: boards,
  boardId: ownProps.params.boardId,
  pins: pins
});

const mapDispatchToProps = (dispatch) => ({
  getBoard: (board) => dispatch(getBoard(board)),
  getPins: (id) => dispatch(getPins(id)),
  deletePin: (id) => dispatch(deletePin(id)),
  editBoard: (board) => dispatch(editBoard(board)),
  deleteBoard: (board) => dispatch(deleteBoard(board))
});

const Board = connect(
  mapStateToProps,
  mapDispatchToProps)
  (BoardPresentational);

export default Board
