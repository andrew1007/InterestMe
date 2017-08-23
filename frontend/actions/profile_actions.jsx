import * as ajax_request from '../util/ajax_request.js';

export const RECEIEVE_PROFILE = "RECEIEVE_PROFILE"

export const getProfile = id => async (dispatch) => {
  const profile = await ajax_request.getProfilePage(id)
  return dispatch(receiveProfile(profile))
}

const receiveProfile = profile => ({
  type: RECEIVE_PROFILE,
  profile
})
