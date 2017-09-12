import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import AllDays from './components/AllDays';
import Day from './components/Day';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={AllDays}/>
          <Route path="/days/:id" component={Day}/>
        </div>
      </Router>
    );
  }
}

export default App;
