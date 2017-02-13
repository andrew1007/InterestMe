import { connect } from 'react-redux';
import { getProfilePage } from '../../actions/user_actions'
import { createFollow, deleteFollow } from '../../actions/follow_actions'
import UserProfile from './user_profile_page'
import { getCurrentUser } from '../../actions/session_actions'
const mapStateToProps = (state, ownProps) => {
  return {
  boards: state.boards,
  pins: state.pins,
  user: state.user,
  userId: ownProps.params.userId,
  session: state.session
}};

const mapDispatchToProps = (dispatch) => ({
  getProfilePage: (id) => dispatch(getProfilePage(id)),
  createFollow: (user) => dispatch(createFollow(user)),
  deleteFollow: (user) => dispatch(deleteFollow(user)),
  getCurrentUser: () => dispatch(getCurrentUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (UserProfile);
