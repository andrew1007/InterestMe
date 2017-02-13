import { connect } from 'react-redux';
import { editBoard, deleteBoard } from '../../actions/board_actions';
import BoardEdit from './board_edit';

const mapStateToProps = (state, ownProps) => ({
  board: state
});

const mapDispatchToProps = (dispatch) => ({
  editBoard: (board) => dispatch(editBoard(board)),
  deleteBoard: (board) => dispatch(deleteBoard(board)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (BoardEdit);
