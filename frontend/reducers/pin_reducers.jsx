import { RECEIVE_PINS, RECEIVE_ERRORS, DESTROY_PIN, RECEIVE_PIN} from '../actions/pin_actions';
import merge from 'lodash/merge';

const defaultState = Object.freeze({
  pins: []
});

const PinReducer = (state = defaultState, action) => {
  Object.freeze(state);
  console.log(action);
  switch(action.type){
    case RECEIVE_PINS:
      const pins = action.pins.pins;
      return merge({}, pins)
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
