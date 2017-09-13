import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AllDays from './components/AllDays';
import Day from './components/Day';
import EditDay from './components/EditDay';
import Task from './components/Task';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={AllDays}/>
          <Route exact path="/days/:id" component={Day}/>
          <Route exact path="/days/:id/edit" component={EditDay}/>
          <Route exact path="/days/:dayId/tasks/:id" component={Task}/>
        </div>
      </Router>
    );
  }
}

export default App;
