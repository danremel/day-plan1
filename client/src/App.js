import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AllDays 							from './components/AllDays';
import Day 									from './components/Day';
import EditDay 							from './components/EditDay';
import Task                 from './components/Task';
import EditTa								from './components/EditTask';
import NewTask 							from './components/NewTask';
import SignUp 							from './components/SignUp';
import SignIn 							from './components/SignIn';
import GlobalNav 						from './components/GlobalNav';
import SplashPage 					from './components/SplashPage';
import { setAxiosDefaults } from './util';


class App extends Component {

  componentWillMount(){
    setAxiosDefaults();
  }

  render() {
    return (
      <Router>
        <div>
          <GlobalNav />
          <Route exact path="/" component={SplashPage} />
          <Route exact path="/days" component={AllDays} />
          <Route exact path="/days/:id" component={Day} />
          <Route exact path="/days/:id/edit" component={EditDay} />
          <Route exact path="/days/:id/task/new" component={NewTask} />
          <Route exact path="/days/:dayId/tasks/:id" component={Task} />
          <Route exact path="/days/:dayId/tasks/:id/edit" component={EditTask} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
        </div>
      </Router>
    );
  }
}

export default App;
