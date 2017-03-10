import * as ajax_request from '../util/ajax_request.js';
export const RECEIVE_PINS = 'RECEIVE_PINS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const DESTROY_PIN = 'DELETE_PIN';
export const RECEIVE_PIN = "RECEIVE_PIN";

export const createPin = pin => dispatch => (
  ajax_request.createPin(pin)
  .then(pin => dispatch(receivePins(pin)))
)

export const editPin = pin => dispatch => (
  ajax_request.editPin(pin).then((pin) => dispatch(receivePins(pin)))
);

export const deletePin = id => dispatch => (
  ajax_request.deletePin(id).then((id) => dispatch(destroyPin(id)))
);

export const getPins = id => dispatch => (
   ajax_request.getPins(id).then((pin) => dispatch(receivePins(pin)))
)

export const getPin = id => dispatch => (
  ajax_request.getPin(id).then((pin) => dispatch(receivePin(pin)))
)

export const getHome = () => dispatch => (
  ajax_request.getHome().then((pins) => dispatch(receivePins(pins)) )
)

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
