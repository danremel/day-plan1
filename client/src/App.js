import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AllDays from './components/AllDays';
import Day from './components/Day';
import EditDay from './components/EditDay';
import Task from './components/Task';
import EditTask from './components/EditTask';
import NewTask from './components/NewTask';
import SignUpLogIn from './components/SignUpLogIn';
import GlobalNav from './components/GlobalNav';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <GlobalNav />
          <Route exact path="/" component={AllDays}/>
          <Route exact path="/days/:id" component={Day}/>
          <Route exact path="/days/:id/edit" component={EditDay}/>
          <Route exact path="/days/:id/task/new" component={NewTask}/>
          <Route exact path="/days/:dayId/tasks/:id" component={Task}/>
          <Route exact path="/days/:dayId/tasks/:id/edit" component={EditTask}/>
          <Route exact path="/signup" component={SignUpLogIn} />
        </div>
      </Router>
    );
  }
}

export default App;
