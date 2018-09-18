import React, {Component} from 'react';
import './App.css';
import BookList from './comps/BookList';
import axios from "axios";

class App extends Component {

  state = {
    books: [],
    loading: true,
    error: null
  };

  componentDidMount() {
    axios.get('http://localhost:8080/books')
      .then(res => {
        this.setState({
          books: res.data,
          loading: false
        })
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err
        })
      });
  }

  render() {
    const {loading, error, books} = this.state;

    if (loading) {
      return <div className="loading"/>
    }

    if (error) {
      return <div className="error"/>
    }

    return (
      <div className="App">
        <h1>Bookish</h1>
        <BookList books={books}/>
      </div>
    );
  }
}

export default App;
