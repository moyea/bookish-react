import React from 'react';
import {shallow} from 'enzyme';
import BookDetail from "./BookDetail";

describe('BookDetail', () => {
  let wrapper;

  beforeAll(() => {
    const props = {
      book: {
        name: 'Refactoring',
        description: 'The book about how to do refactoring'
      }
    };
    wrapper = shallow(<BookDetail {...props}/>);
  });

  it('Show book name', () => {
    expect(wrapper.find('.name').text()).toEqual('Refactoring');
  });

  it('Show book description', () => {
    expect(wrapper.find('.description').text()).toEqual('The book about how to do refactoring');
  })

});
