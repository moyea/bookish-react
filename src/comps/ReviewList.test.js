import React from 'react';
import {shallow} from 'enzyme';
import {ReviewList} from './ReviewList';

describe('ReviewList', () => {
  it('Empty list', () => {
    const props = {
      reviews: []
    };

    const wrapper = shallow(<ReviewList {...props}/>);

    expect(wrapper.find('.review-container').length).toBe(1);
  });

  it('Render list', () => {
    const props = {
      reviews: [
        {name: 'JunTao', timestamp: 1537407155321, content: 'Excellent work,really impressive on the efforts you put'},
        {name: 'Jane', timestamp: 1536407930256, content: 'What a great book'}
      ]
    };

    const wrapper = shallow(<ReviewList {...props}/>);
    expect(wrapper.find('.review-container').length).toBe(1);
    expect(wrapper.find('.review').length).toBe(2);
    const firstReview = wrapper.find('.review').at(0);
    expect(firstReview.text()).toEqual('Excellent work,really impressive on the efforts you put');
  });
});
