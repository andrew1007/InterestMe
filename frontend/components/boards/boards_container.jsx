import { connect } from 'react-redux';
import { getBoard } from '../../actions/board_actions';
import { getPins, createPin } from '../../actions/pin_actions';
import Board from './board';

const mapStateToProps = ({boards, session, pins}, ownProps) => ({
  board: boards,
  boardId: ownProps.params.boardId,
  pins: pins
});

const mapDispatchToProps = (dispatch) => ({
  getBoard: (board) => dispatch(getBoard(board)),
  getPins: (id) => dispatch(getPins(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (Board);
