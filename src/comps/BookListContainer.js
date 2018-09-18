import React, {Component} from 'react';
import axios from 'axios';
import BookList from "./BookList";

class BookListContainer extends Component {
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
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err
        });
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
    return <BookList books={books}/>
  }
}

export default BookListContainer;
