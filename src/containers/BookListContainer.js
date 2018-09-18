import React, {Component} from 'react';
import axios from 'axios';
import BookList from "../comps/BookList";
import SearchBox from "../comps/SearchBox";

class BookListContainer extends Component {
  state = {
    books: [],
    loading: true,
    error: null,
    term: ''
  };

  componentDidMount() {
    this.fetchBooks();
  }

  updateBooks(res) {
    this.setState({
      books: res.data,
      loading: false
    });
  }

  updateError(err) {
    this.setState({
      loading: false,
      error: err
    });
  }

  filterBook(e) {
    this.setState({
      term: e.target.value
    }, this.fetchBooks);
  }

  fetchBooks() {
    const {term} = this.state;
    axios.get(`http://localhost:8080/books?q=${term}`)
      .then(res => this.updateBooks(res))
      .catch(err => this.updateError(err));
  }

  render() {
    return (
      <div>
        <SearchBox onChange={(e)=>this.filterBook(e)} term={this.state.term}/>
        <BookList {...this.state}/>
      </div>
    )
  }
}

export default BookListContainer;
