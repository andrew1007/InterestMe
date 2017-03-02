import { connect } from 'react-redux';
import { login, signup, logout, clearErrors, getCurrentUser } from '../../actions/session_actions';
import LoginForm from './login_form'

const mapStateToProps = state => ({
})

const mapDispatchToProps = (dispatch) => ({
  processLogin: (user) => dispatch(login(user)),
  processSignUp: (user) => dispatch(signup(user)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
(LoginForm)
