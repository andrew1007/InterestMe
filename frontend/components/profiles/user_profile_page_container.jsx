import { connect } from 'react-redux';
import { getProfilePage } from '../../actions/user_actions'
import { createFollow, deleteFollow } from '../../actions/follow_actions'
import UserProfile from './user_profile_page'
import { getCurrentUser } from '../../actions/session_actions'
const mapStateToProps = ({session, userContent, user}, ownProps) => {
  //console.log(user);
  return {
    userId: ownProps.params.userId,
    user: user.user,
    userContent: user.userContent,
    currentUser: session.currentUser
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
