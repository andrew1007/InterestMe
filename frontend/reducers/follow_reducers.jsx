import {RECEIVE_FOLLOW, DELETE_FOLLOW} from '../actions/follow_actions';

const defaultState = Object.freeze({
  user_followed: 0,
  user_following: -1
});

const FollowReducer = (state = defaultState, action) =>{
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_FOLLOW:
      //////console.log("receieved follow");

      return 0
    case DELETE_FOLLOW:
      //////console.log("deleted follow");
      return 0
    default:
      //////console.log('no follow actions hit');
      return state
    }
}

export default FollowReducer
