import * as ajax_request from '../util/ajax_request.js';
export const RECEIVE_PINS = 'RECEIVE_PINS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const DESTROY_PIN = 'DELETE_PIN';
export const RECEIVE_PIN = "RECEIVE_PIN";

export const createPin = pin => async (dispatch) => {
  const pins = await ajax_request.createPin(pin)
  return dispatch(receivePins(pins))
}

export const editPin = pin => async (dispatch) => {
  const pins = await ajax_request.editPin(pin)
  return dispatch(receivePins(pins))
}

export const deletePin = id => async (dispatch) => {
  const pinId = await ajax_request.deletePin(id)
  return dispatch(destroyPin(pinId))
}

export const getPins = id => async (dispatch) => {
  const pins = await ajax_request.getPins(id)
  return dispatch(receivePins(pins))
}

export const getPin = id => async (dispatch) => {
  const pin = await ajax_request.getPin(id)
  return dispatch(receivePin(pin))
}

export const getHome = () => async (dispatch) => {
  const pins = await ajax_request.getHome()
  return dispatch(receivePins(pins))
}

export const receivePins = pins => ({
  type: RECEIVE_PINS,
  pins
});

export const receivePin = pin => ({
  type: RECEIVE_PIN,
  pin
})

export const destroyPin = pins => ({
  type: DESTROY_PIN,
  pins
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});
