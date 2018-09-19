import React, {Component} from 'react';
import BookList from '../comps/BookList';
import SearchBox from '../comps/SearchBox';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setSearchTerm, fetchBooks} from '../store/actions';

class BookListContainer extends Component {

  componentDidMount() {
    this.props.fetchBooks();
  }

  filterBook(e) {
    this.props.setSearchTerm(e.target.value);
    this.props.fetchBooks();
  }

  render() {
    return (
      <div>
        <SearchBox onChange={(e) => this.filterBook(e)} term={this.props.term}/>
        <BookList {...this.props}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.list.loading,
  books: state.list.books,
  error: state.list.error,
  term: state.list.term
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setSearchTerm,
  fetchBooks
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookListContainer);
