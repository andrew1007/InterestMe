import { RECEIVE_USER_DATA, EDIT_USER_DATA, GET_PROFILE } from '../actions/user_actions';
import merge from 'lodash/merge';

const defaultState = Object.freeze({
  user: {
    description: "",
    id: 0,
    is_following: false,
    profile_picture: "",
    username: "",
    owner: false,
    followed_by: [],
    following: [],
    pins: [],
    boards: []
  }
});

const UserReducer = (state = defaultState, action) => {
  Object.freeze(state);
  console.log(action);
  switch(action.type){
    case EDIT_USER_DATA:
      return merge({}, state, {user: action.userData.user})
    case GET_PROFILE:
      let user = action.user
      return merge(state, user)
    default:
      return state;
  }
}

export default UserReducer
