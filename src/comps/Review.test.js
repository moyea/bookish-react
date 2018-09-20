import React from 'react';
import {shallow} from 'enzyme';
import Review from './Review';

describe('Review', () => {
  it('Render', () => {
    const props = {
      review: {
        name: 'JunTao',
        timestamp: 1537435886653,
        content: 'Content'
      }
    };

    const wrapper = shallow(<Review {...props}/>);

    const content = wrapper.find('.review .content');
    expect(content.text()).toEqual('Content');
    const name = wrapper.find('.review .name');
    expect(name.text()).toEqual('JunTao');
    // const date = wrapper.find('.review .date');
    // expect(date.text).toEqual('2018-09-20');
  });
});
