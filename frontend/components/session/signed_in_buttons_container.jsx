import { connect } from 'react-redux';
import { login, signup, logout, clearErrors, getCurrentUser } from '../../actions/session_actions';
import SignedInButtons from './signed_in_buttons'

const mapStateToProps = ({session}) => ({
  // userId: currentUserId,
  // userName: currentUser
});

const mapDispatchToProps = (dispatch) => ({
  processLogout: () => dispatch(logout()),
  getCurrentUser: () => dispatch(getCurrentUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (SignedInButtons);
