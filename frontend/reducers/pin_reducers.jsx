import { RECEIVE_PINS, RECEIVE_ERRORS, DESTROY_PIN, RECEIVE_PIN} from '../actions/pin_actions';
import merge from 'lodash/merge';

const defaultState = Object.freeze({
  pins: [],
  errors: []
});

const PinReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_PINS:
      //console.log("received pins");
      const pins = action.pins.pins;
      const pinSetCount = action.pins.pinSetCount
      if (action.pins.pin_user_info){
        const pinUserInfo = action.pins.pin_user_info
        return {pins: pins, pinUserInfo: pinUserInfo}
      } else {
        return {pins: pins, pinSetCount: pinSetCount}
      }
    case DESTROY_PIN:
      //console.log("delete pin");
      const newState = merge({}, state);
      delete newState[action.id];
      return newState;
    case RECEIVE_PIN:
      //console.log("received pin");
      return merge({}, state, {pins: action.pin.pin})
    case RECEIVE_ERRORS:
      //console.log("pin errors hit");
      const errors = action.errors;
      return merge({}, state, {errors})
    default:
      //console.log("no pin actions hit. defaulted");
      return state;
  }
}

export default PinReducer;
