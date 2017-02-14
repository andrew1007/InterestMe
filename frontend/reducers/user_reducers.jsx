import { RECEIVE_USER_DATA, EDIT_USER_DATA, GET_PROFILE } from '../actions/user_actions';
import merge from 'lodash/merge';

const defaultState = Object.freeze({
  pins: [],
  boards:[],
  errors: [],
  followers: [],
  followed: []
});

const UserReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_USER_DATA:
      //console.log("received user data")
      return merge({}, state, {boards: action.userData.boards, pins: action.userData.pins, user: action.userData.user, followed: action.userData.followed, followers: action.userData.followers})
    case EDIT_USER_DATA:
      //console.log("received updated user data")
      return merge({}, state, {user: action.userData.user})
    case GET_PROFILE:
      //console.log("got profile info");
      return action.userData
    default:
    //console.log("defaulted user data");
    return state;
  }
}

export default UserReducer
