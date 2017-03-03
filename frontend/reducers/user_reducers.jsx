import { RECEIVE_USER_DATA, EDIT_USER_DATA, GET_PROFILE } from '../actions/user_actions';
import merge from 'lodash/merge';

const defaultState = Object.freeze({
  userContent: {
    pins: [],
    boards:[],
    errors: [],
    following: [],
    followed: []
  },
  user: {
    user: null
  }
});

const UserReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch(action.type){
    case EDIT_USER_DATA:
      //console.log("received updated user data")
      return merge({}, state, {user: action.userData.user})
    case GET_PROFILE:
      const userData = action.userData
      console.log(userData);
      const userContent = {
        pins: userData.pins,
        boards: userData.boards,
        followed: userData.followed,
        followed_by: userData.followed_by
      }
      const user = {
        username: userData.username,
        description: userData.description,
        id: userData.id,
        profile_picture: userData.profile_picture
      }
      console.log(action);
      console.log("received user data")
      return merge({}, state, {user: user}, {userContent: userContent})
    default:
    //console.log("defaulted user data");
    return state;
  }
}

export default UserReducer
