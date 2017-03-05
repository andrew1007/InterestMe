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
      const currentUser = action.currentUser
      return merge({}, state, {currentUser: currentUser})
    case LOG_OUT_USER:
      return defaultState;
    case CLEAR_ERRORS:
      return merge({}, state, {errors: null});
    case RECEIVE_ERRORS:
      const errors = action.errors;
      return merge({}, state, {errors});
  default:
    return state
  }
};

export default SessionReducer;
