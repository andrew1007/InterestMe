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
      const pins = action.pins.pins;
      const pinSetCount = action.pins.pinSetCount
      if (action.pins.pin_user_info){
        const pinUserInfo = action.pins.pin_user_info
        return {pins: pins, pinUserInfo: pinUserInfo}
      } else {
        return merge({}, state, {pins: pins, pinSetCount: pinSetCount})
      }
    case DESTROY_PIN:
      const newState = merge({}, state);
      delete newState[action.id];
      return newState;
    case RECEIVE_PIN:
      return merge({}, state, {pins: action.pin.pin})
    case RECEIVE_ERRORS:
      const errors = action.errors;
      return merge({}, state, {errors})
    default:
      return state;
  }
}

export default PinReducer;
