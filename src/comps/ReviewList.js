import React from 'react';
import Review from './Review';

export const ReviewList = ({reviews}) => {
  return (
    <div className="review-container">
      {
        reviews.map(review => <Review review={review} key={`${review.name}-${review.timestamp}`}/>)
      }
    </div>
  );
};

