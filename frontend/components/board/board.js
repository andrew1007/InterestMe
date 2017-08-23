import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getBoard } from '../../actions/board_actions';
import { getPins, createPin, deletePin } from '../../actions/pin_actions';
import { editBoard, deleteBoard } from '../../actions/board_actions';
import BoardMasonry from './board_masonry'
// this.props.board = {
//   author,
//   current_user,
//   id,
//   name,
//   owner,
//   profile_picture,
//   pins: {
//     [{board_id,
//       board_name,
//        body,
//         favorited,
//          id,
//           image_url,
//            profile_picture,
//             title,
//              user_id,
//               username}]
//   }
// }

class BoardPresentational extends Component {
  constructor(props) {
    super(props)
  }

  async componentWillMount() {
    await this.props.getBoard(this.props.boardId)
    console.log(this.props);
    document.body.style.overflow = "auto";
  }

  render() {
    let boardInfo = {
      profile_picture: this.props.board.profile_picture,
      username: this.props.board.author,
      pins: this.props.board.pins
    }
    let anyPins = this.props.board.pins
    let masonryOptions = {
      fitWidth: true,
      transitionDuration: '0.07s'
    };
    return(
      <div>
        {anyPins ? <BoardMasonry {...boardInfo}/> : null}
      </div>
    )
  }
}


const mapStateToProps = ({boards, session, pins}, ownProps) => ({
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
