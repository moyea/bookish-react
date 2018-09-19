import list from './reducer';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import chunk from 'redux-thunk';


const rootReducer = combineReducers({
  list
});

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(chunk)
);

export default store;
