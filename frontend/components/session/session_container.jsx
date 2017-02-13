import { connect } from 'react-redux';
import { login, signup, logout, clearErrors, getCurrentUser } from '../../actions/session_actions';
import Session from './session'

const mapStateToProps = ({session, user}) => ({
  currentUser: session,
  x: user,
  errors: session.errors
});

const mapDispatchToProps = (dispatch) => ({
  processLogin: (user) => dispatch(login(user)),
  processSignUp: (user) => dispatch(signup(user)),
  processLogout: () => dispatch(logout()),
  getCurrentUser: () => dispatch(getCurrentUser()),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (Session);
