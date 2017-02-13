import { connect } from 'react-redux';
import { editProfilePage } from '../../actions/user_actions'
import UserProfileForm from './user_profile_form'


const mapStateToProps = (state, ownProps) => {
  return {
  data: state
}};


const mapDispatchToProps = (dispatch) => ({
  editProfilePage: (id) => dispatch(editProfilePage(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (UserProfileForm);
