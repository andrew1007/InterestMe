import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS, LOG_OUT_USER, CLEAR_ERRORS } from '../actions/session_actions';
import merge from 'lodash/merge';

const defaultState = Object.freeze({
  currentUser: null,
  errors: []
});


const SessionReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      console.log(action);
      debugger
      const currentUser = action.currentUser
      return merge({}, state, {currentUser: currentUser})
    case LOG_OUT_USER:
      //console.log("logging out user");
      return merge({}, state, defaultState);
    case CLEAR_ERRORS:
      //console.log("cleared errors");
      return merge({}, state, {errors: null});
    case RECEIVE_ERRORS:
      //console.log("got session errors");
      const errors = action.errors;
      return merge({}, state, {errors});
  default:
    //console.log("No session actions hit. Defaulted");
    return state
  }
};

export default SessionReducer;
