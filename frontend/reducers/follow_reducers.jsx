import {RECEIVE_FOLLOW, DELETE_FOLLOW} from '../actions/follow_actions';

const defaultState = Object.freeze({
  user_followed: 0,
  user_following: -1
});

const FollowReducer = (state = defaultState, action) =>{
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_FOLLOW:
      return 0
    case DELETE_FOLLOW:
      return 0
    default:
      return state
    }
}

export default FollowReducer
