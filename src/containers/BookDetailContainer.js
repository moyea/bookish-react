import React, {Component} from 'react';
import axios from 'axios';
import BookDetail from '../comps/BookDetail';
import {connect} from 'react-redux';
import {fetchABook} from '../store/actions';
import {bindActionCreators} from 'redux';

export class BookDetailContainer extends Component {

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchABook(id);
  }

  render() {
    return <BookDetail {...this.state}/>;
  }
}

const mapStateToProps = (state) => ({
  book: state.list.book
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchABook
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailContainer);
