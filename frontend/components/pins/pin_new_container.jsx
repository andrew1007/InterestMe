import { connect } from 'react-redux';
import { createPin } from '../../actions/pin_actions';
import PinNewForm from './pin_new_form';
import {getCurrentUser} from '../../actions/session_actions';
import {getProfilePage} from '../../actions/user_actions';
import {createBoard} from '../../actions/board_actions';

const mapStateToProps = ({session, user}) => {
  debugger
  return (
    {currentUser: session},
    {boards: user.userContent.boards}
  )
};

const mapDispatchToProps = (dispatch) => ({
  createBoard: (board) => dispatch(createBoard(board)),
  getProfilePage: (id) => dispatch(getProfilePage(id)),
  newPin: (pin) => dispatch(createPin(pin))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (PinNewForm);
