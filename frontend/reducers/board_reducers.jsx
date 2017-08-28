import { RECEIVE_BOARD, RECEIVE_ERRORS, DESTROY_BOARD, GET_BOARD } from '../actions/board_actions';
import merge from 'lodash/merge';

const defaultState = Object.freeze({
  board: {},
  errors: []
});

const BoardReducer = (state = defaultState, action) => {
  let board
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_BOARD:
      board = action.board
      return merge({}, state, board)
    case GET_BOARD:
      board = action.board.board
      return merge({}, board)
    case DESTROY_BOARD:
      const newState = merge({}, state);
      delete newState[action.board.id]
      return newState;
    case RECEIVE_ERRORS:
      const errors = action.errors;
      return merge({}, state, {errors})
    default:
      return state;
  }
}

export default BoardReducer;
