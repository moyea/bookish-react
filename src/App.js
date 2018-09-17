import React, {Component} from 'react';
import './App.css';
import BookList from './comps/BookList';
import axios from "axios";

class App extends Component {

  state = {
    books: []
  };

  componentDidMount() {
    axios.get('http://localhost:8080/books')
      .then(res => {
        this.setState({
          books: res.data
        })
      });
  }

  render() {
    const {books} = this.state;
    return (
      <div className="App">
        <h1>Bookish</h1>
        <BookList books={books}/>
      </div>
    );
  }
}

export default App;
