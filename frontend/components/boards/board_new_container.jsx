import { connect } from 'react-redux';
import { createBoard, getBoard } from '../../actions/board_actions';
import { getPins } from '../../actions/pin_actions'
import BoardNew from './board_new';

const mapDispatchToProps = (dispatch) => ({
  createBoard: (board) => dispatch(createBoard(board)),
  getBoard: (board) => dispatch(getBoard(board)),
  getPinss: (pin) => dispatch(getPins(pin))
})

export default connect(
  null,
  mapDispatchToProps)
  (BoardNew)
