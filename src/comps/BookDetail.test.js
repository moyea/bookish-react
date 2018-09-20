import React from 'react';
import {shallow} from 'enzyme';
import BookDetail from './BookDetail';
import {ReviewList} from './ReviewList';

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
  });

  it('Shows ReviewList', () => {
    const props = {
      book: {
        name: 'Refactoring',
        description: 'The book about how to do refactoring',
        reviews: []
      }
    };

    const wrapper = shallow(<BookDetail {...props}/>);
    expect(wrapper.find(ReviewList).length).toEqual(1);
  });

  it('Shows Review Form', () => {
    const props = {
      book: {
        name: 'Refactoring'
      }
    };
    const wrapper = shallow(<BookDetail {...props}/>);

    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('form input[name="name"]').length).toEqual(1);
    expect(wrapper.find('form textarea[name="content"]').length).toEqual(1);
    expect(wrapper.find('form button[name="submit"]').length).toEqual(1);
  });

});
