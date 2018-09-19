import * as types from './types';

const initState = {
  term: ''
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case types.SET_SEARCH_TERM:
      return {
        ...state,
        term: action.term
      };
    case types.FETCH_BOOKS_PENDING:
      return {
        ...state,
        loading: true
      };
    case types.FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload
      };
    case types.FETCH_BOOKS_FAILED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
export default reducer;
