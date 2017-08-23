import * as ajax_request from '../util/ajax_request';
export const RECEIVE_FOLLOW = 'RECEIVE_FOLLOW';
export const DELETE_FOLLOW = 'DELETE_FOLLOW';

export const createFollow = user => async (dispatch) => {
  const userData = await ajax_request.follow(user)
  return dispatch(receiveFollow(userData))
}

export const deleteFollow = user => async (dispatch) => {
  const userData = await ajax_request.unfollow(user)
  return dispatch(removeFollow(user))
}

const receiveFollow = user => ({
  type: RECEIVE_FOLLOW,
  user
})

const removeFollow = user => ({
  type: DELETE_FOLLOW,
  user
})
