import React from 'react';
import format from 'date-fns/format';

const Review = ({review}) => {
  return (
    <div className="review">
      <div>
        <span className="name">{review.name}</span>
        <span className="date">{format(review.timestamp, 'YYYY-MM-DD')}</span>
      </div>
      <p className="content">{review.content}</p>
    </div>
  );
};

export default Review;
