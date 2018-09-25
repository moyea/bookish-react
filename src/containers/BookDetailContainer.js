import React, {Component} from 'react';
import BookDetail from '../comps/BookDetail';
import {connect} from 'react-redux';
import {fetchABook, saveReview, updateReview} from '../store/actions';
import {bindActionCreators} from 'redux';

export class BookDetailContainer extends Component {

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchABook(id);
  }

  render() {
    return <BookDetail {...this.props}/>;
  }
}

const mapStateToProps = (state) => ({
  book: state.list.current
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchABook,
  saveReview
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailContainer);
