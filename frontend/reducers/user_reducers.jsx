import { RECEIVE_USER_DATA, EDIT_USER_DATA, GET_PROFILE } from '../actions/user_actions';
import merge from 'lodash/merge';

const defaultState = Object.freeze({
  userContent: {
    pins: [],
    boards:[],
    errors: [],
    following: [],
    followers: []
  },
  user: {
    description: "",
    id: 0,
    isFollowing: false,
    profile_picture: "",
    username: "",
    owner: false
  }
});

const UserReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch(action.type){
    case EDIT_USER_DATA:
      return merge({}, state, {user: action.userData.user})
    case GET_PROFILE:
      const user = action.userData.user
      const userContent = action.userData.userContent
      return merge({}, state, {user: user}, {userContent: userContent})
    default:
      return state;
  }
}

export default UserReducer
