import React from 'react';

export const ReviewList = ({reviews}) => {
  return (
    <div className="review-container">
      {
        reviews.map(review => (
          <div className="review" key={`${review.name}-${review.timestamp}`}>
            {review.content}
          </div>)
        )
      }
    </div>
  );
};

