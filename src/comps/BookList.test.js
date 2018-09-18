import React from 'react';
import {shallow} from "enzyme";
import BookList from "./BookList";

describe('BookList', () => {
  it('Show a loading bar when loading', () => {
    const props = {
      loading: true
    };
    const wrapper = shallow(<BookList {...props}/>);
    expect(wrapper.find('.loading').length).toEqual(1);
  });

  it('Show a error bar when error occurs', () => {
    const props = {
      error: {
        message: 'Something went wrong'
      }
    };
    const wrapper = shallow(<BookList {...props}/>);
    expect(wrapper.find('.error').length).toEqual(1);
  });

  it('Show a list of books', () => {
    const props = {
      books: [
        {id: 1, name: 'Refactoring'},
        {id: 2, name: 'Biilding Mocro-service'}
      ]
    };

    const wrapper = shallow(<BookList {...props}/>);

    expect(wrapper.find('.book .title').length).toEqual(2);
  })
});
