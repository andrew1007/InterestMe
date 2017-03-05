import { RECEIVE_BOARD, RECEIVE_ERRORS, DESTROY_BOARD, GET_BOARD } from '../actions/board_actions';
import merge from 'lodash/merge';

const defaultState = Object.freeze({
  board: [],
  errors: []
});

const BoardReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_BOARD:
      ////console.log("received board");
      const board = action.board
      return merge({}, state, {board})
    case GET_BOARD:
      ////console.log("get board");
      return merge({}, action.board)
    case DESTROY_BOARD:
      ////console.log("delete board");
      const newState = merge({}, state);
      delete newState[action.board.id]
      return newState;
    case RECEIVE_ERRORS:
      ////console.log("board errors hit");
      const errors = action.errors;
      return merge({}, state, {errors})
    default:
      ////console.log("No board actions hit. Defaulted");
      return state;
  }
}

export default BoardReducer;
