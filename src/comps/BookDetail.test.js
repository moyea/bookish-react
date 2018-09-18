import React from 'react';
import {shallow} from 'enzyme';
import BookDetail from "./BookDetail";

describe('BookDetail', () => {
  it('Show book name', () => {
    const props = {
      book: {
        name: 'Refactoring',
        description: 'The book about how to do refactoring'
      }
    };
    const wrapper = shallow(<BookDetail {...props}/>);
    expect(wrapper.find('.name').text()).toEqual('Refactoring');
  })
});
