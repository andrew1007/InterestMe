import * as ajax_request from '../util/ajax_request';
export const RECEIVE_FOLLOW = 'RECEIVE_FOLLOW';
export const DELETE_FOLLOW = 'DELETE_FOLLOW';

export const createFollow = user => dispatch => (
  ajax_request.follow(user)
  .then((user) => dispatch(receiveFollow(user)))
)

export const deleteFollow = user => dispatch => (
  ajax_request.unfollow(user)
  .then((user) => dispatch(removeFollow(user)))
)

const receiveFollow = user => ({
  type: RECEIVE_FOLLOW,
  user
})

const removeFollow = user => ({
  type: DELETE_FOLLOW,
  user
})
