import React, {Component} from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Bookish</h1>
        <div className="books">
          <div className="book">
            <h1 className="title">Refactoring</h1>
          </div>
          <div className="book">
            <h1 className="title">Domain-driven design</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
