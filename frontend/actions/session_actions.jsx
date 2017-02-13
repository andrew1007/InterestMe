import * as ajax_request from '../util/ajax_request.js';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const LOG_OUT_USER = "LOG_OUT_USER";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const signup = user => dispatch => (
  ajax_request.signup(user).then( (user) => dispatch(receiveCurrentUser(user))
, err => dispatch(receiveErrors(err.responseJSON)))
);

export const login = user => dispatch => (
  ajax_request.login(user).then( (user) => dispatch(receiveCurrentUser(user))
, err => dispatch(receiveErrors(err.responseJSON)))
);

export const logout = () => dispatch => (
  ajax_request.logout().then( () => dispatch(logOutUser(null)))
)

export const getCurrentUser = () => dispatch => (
  ajax_request.getCurrentUser().then(() => dispatch(receiveCurrentUser()))
);

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const logOutUser = () =>({
  type: LOG_OUT_USER
})

export const clearErrors = () => ({
  type: CLEAR_ERRORS
})

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});
