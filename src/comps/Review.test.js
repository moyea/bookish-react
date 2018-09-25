import React from 'react';
import {shallow} from 'enzyme';
import {Review} from './Review';

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

  it('Editing', () => {
    const props = {
      review: {
        name: 'JunTao',
        timestamp: 1537435886653,
        content: 'Content'
      },
      updateReview: jest.fn()
    };

    const wrapper = shallow(<Review {...props}/>);

    expect(wrapper.find('button.submit').length).toEqual(0);
    expect(wrapper.find('button.edit').length).toEqual(1);
    expect(wrapper.find('.review .content').text()).toEqual('Content');
    wrapper.find('button.edit').simulate('click');
    expect(wrapper.find('button.submit').length).toEqual(1);
    expect(wrapper.find('button.edit').length).toEqual(0);
    expect(wrapper.find('.review textarea').props().value).toEqual('Content');
    wrapper.find('button.submit').simulate('click');
    expect(props.updateReview).toHaveBeenCalled();
  });
});
