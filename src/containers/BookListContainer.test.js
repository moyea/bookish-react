import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import chunk from 'redux-thunk';
import {setSearchTerm, fetchBooks} from '../store/actions';
import * as types from '../store/types';

const middlewares = [chunk];
const mockStore = configureMockStore(middlewares);

describe('BookListContainer related actions', () => {
  it('Set search keyword', () => {
    const term = '';
    const expected = {
      type: types.SET_SEARCH_TERM,
      term
    };
    const action = setSearchTerm(term);
    expect(action).toEqual(expected);
  });

  it('Fetch data successfully', () => {
    const books = [
      {id: 1, name: 'Refactoring'},
      {id: 2, name: 'Domain-driven design'}
    ];

    axios.get = jest.fn().mockImplementation(() => Promise.resolve({data: books}));

    const expectedActions = [
      {type: types.FETCH_BOOKS_PENDING},
      {type: types.FETCH_BOOKS_SUCCESS, payload: books}
    ];

    const store = mockStore({list: {books: []}});

    return store.dispatch(fetchBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Fetch data with error', () => {
    axios.get = jest.fn().mockImplementation(() => Promise.reject({message: 'Something went wrong'}));

    const expectedActions = [
      {type: types.FETCH_BOOKS_PENDING},
      {type: types.FETCH_BOOKS_FAILED, payload: {message: 'Something went wrong'}}
    ];

    const store = mockStore({list: {books: []}});

    return store.dispatch(fetchBooks()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Search data with term in state', () => {
    const books = [
      {id: 1, name: 'Refactoring'},
      {id: 2, name: 'Domain-driven design'}
    ];
    axios.get = jest.fn().mockImplementation(() => Promise.resolve({data: books}));
    const store = mockStore({list: {books: [], term: 'domain'}});

    return store.dispatch(fetchBooks()).then(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/books?q=domain');
    });
  });
});
