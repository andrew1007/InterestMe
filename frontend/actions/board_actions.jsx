import * as ajax_request from '../util/ajax_request';

export const RECEIVE_BOARD = 'RECEIVE_BOARD';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const DESTROY_BOARD = 'DELETE_BOARD';
export const GET_BOARD = 'GET_BOARD';

export const createBoard = board => dispatch => (
  ajax_request.createBoard(board).then((board) => dispatch(receiveBoard(board)))
);

export const editBoard = board => dispatch => (
  ajax_request.editBoard(board).then((board) => dispatch(receiveBoard(board)))
);

export const deleteBoard = board => dispatch => (
  ajax_request.deleteBoard(board).then((board) => dispatch(receiveBoard(null)))
);

export const getBoard = id => dispatch => {
   return ajax_request.getBoard(id).then((board) => dispatch(gettingBoard(board)))
}

export const receiveBoard = board => ({
  type: RECEIVE_BOARD,
  board
});

export const gettingBoard = board => ({
  type: GET_BOARD,
  board
})

export const destroyBoard = board => ({
  type: DESTROY_BOARD,
  board
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});
