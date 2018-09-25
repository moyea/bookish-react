import React, {Component} from 'react';
import format from 'date-fns/format';
import './Review.css';
import {updateReview} from '../store/actions';
import {connect} from 'react-redux';

export class Review extends Component {

  state = {
    editing: false,
    content: ''
  };

  edit() {
    const {content} = this.props.review;
    this.setState({
      editing: true,
      content
    });
  }

  submit() {
    this.setState({
      editing: false
    });
    const {id} = this.props.review;
    this.props.updateReview(id, {
      content: ''
    });
  }

  updateContent = (e) => {
    this.setState({
      content: e.target.value
    });
  };

  render() {
    const {review} = this.props;
    const {editing} = this.state;
    return (
      <div className="review">
        <div>
          <span className="name">{review.name}</span>
          <span className="date">{format(review.timestamp, 'YYYY-MM-DD')}</span>
        </div>
        {editing ? <textarea value={this.state.content} cols="30" rows="10" className="review-content"
                             onChange={(e) => this.updateContent(e)}/> :
          <p className="content">{review.content}</p>}
        {this.state.editing ? <button className="submit" onClick={() => this.submit()}>Submit</button> :
          <button className="edit" onClick={() => this.edit()}>Edit</button>
        }
      </div>
    );
  }
}

export default connect(null, {updateReview})(Review);
