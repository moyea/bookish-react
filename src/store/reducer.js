import * as types from './types';

const initState = {
  term: '',
  books: [],
  error: '',
  current: {}
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
        error: action.err,
        loading: false
      };
    case types.FETCH_BOOK_SUCCESS:
      return {
        ...state,
        current: action.payload
      };
    default:
      return state;
  }
};
export default reducer;
