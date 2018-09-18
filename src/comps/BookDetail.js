import React, {Component} from 'react';
import PropType from 'prop-types';

function BookDetail({book}) {

  return (
    <div className="detail">
      <h2 className="name">{book.name}</h2>
      <div className="description">{book.description}</div>
    </div>
  );
}

export default BookDetail;
