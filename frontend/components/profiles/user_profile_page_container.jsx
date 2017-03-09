import { connect } from 'react-redux';
import { getProfilePage } from '../../actions/user_actions'
import { createFollow, deleteFollow } from '../../actions/follow_actions'
import UserProfile from './user_profile_page';
import { createBoard } from '../../actions/board_actions';
import { getCurrentUser } from '../../actions/session_actions'
import { deletePin } from '../../actions/pin_actions';

const mapStateToProps = ({session, userContent, user}, ownProps) => {
  debugger
  return {
    user: user.user,
    userContent: user.userContent,
    userId: ownProps.params.userId,
    currentUser: session.currentUser
}};

const mapDispatchToProps = (dispatch) => ({
  getProfilePage: (id) => dispatch(getProfilePage(id)),
  createFollow: (user) => dispatch(createFollow(user)),
  deleteFollow: (user) => dispatch(deleteFollow(user)),
  getCurrentUser: () => dispatch(getCurrentUser()),
  createBoard: () => dispatch(createBoard()),
  deletePin: () => dispatch(deletePin())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (UserProfile);
