import * as ajax_request from '../util/ajax_request.js';

export const EDIT_USER_DATA = 'EDIT_USER_DATA';
export const GET_PROFILE = 'GET_PROFILE';

export const editProfilePage = (user) => dispatch => (
  ajax_request.editProfilePage(user).then( (user) =>
  dispatch(editUserData(user)))
)

export const getProfilePage = (id) => dispatch => (
  ajax_request.getProfilePage(id).then( (id) => dispatch(getProfile(id)))
)

export const editUserData = user =>({
  type: EDIT_USER_DATA,
  user
})

export const getProfile = user => ({
  type: GET_PROFILE,
  user
})
