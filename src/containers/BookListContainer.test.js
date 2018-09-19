import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import chunk from 'redux-thunk';
import {setSearchTerm, fetchBooks} from "./BookList.service";

const middlewares = [chunk];
const mockStore = configureMockStore(middlewares);

describe('BookListContainer related actions', () => {
  it('Set search keyword', () => {
    const term = '';
    const expected = {
      type: 'FETCH_BOOKS',
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
      {type: 'FETCH_BOOKS_PENDING'},
      {type: 'FETCH_BOOKS_SUCCESS', payload: books}
    ];

    const store = mockStore({books: []});

    return store.dispatch(fetchBooks('')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Fetch data with error', () => {
    axios.get = jest.fn().mockImplementation(() => Promise.reject({message: 'Something went wrong'}));

    const expectedActions = [
      {type: 'FETCH_BOOKS_PENDING'},
      {type: 'FETCH_BOOKS_FAILED', payload: {message: 'Something went wrong'}}
    ];

    const store = mockStore({books: []});

    return store.dispatch(fetchBooks('')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});
