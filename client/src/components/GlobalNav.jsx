import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class GlobalNav extends Component {
  constructor(){
    super();
    this.state = {
      user: {},
      loggedIn: false
    };
  }

  componentWillMount(){
    this._isLoggedIn();
  }
  componentWillReceiveProps() {
    this._isLoggedIn();
  }

  _isLoggedIn = async () => {
    const response = await axios.get("/auth/validate_token");
    this.setState({
      user: response.data.data,
      loggedIn: response.data.success
    });
  }

  _logOut = async () => {
    console.log("Click");
    const response = await axios.delete("/auth/sign_out");
    // Forces refresh of browser
    window.location.reload();
  };

  render() {
    if (this.state.loggedIn) {
      return (
        <div>
          <Link to="/">
            <h1>DayPlan</h1>
          </Link>
          <div>
            <span>Signed In As: {this.state.user.email}</span>
            <Link to="/" onClick={this._logOut}>Log Out</Link>
          </div>
        </div>
      )
    }
    return (
      <div>
        <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Log In</Link>
          </div>
      </div>
    );
  }
}

export default GlobalNav;