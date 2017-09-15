import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const NavStyles = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.5%;
  box-shadow: 0px 1px 6px black;
  background-color: rgba(209, 66, 44, .6);
  color: rgb(243, 232, 214);

  a {
    color: rgb(243, 232, 214);
    text-decoration: none;
    margin: 0 5px;
    &:hover {
      text-decoration: underline;
    }
  }
  `;

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
        <NavStyles>
          <Link to="/days">
            <h1>DayPlan</h1>
          </Link>
          <div>
            <span>Signed In As: {this.state.user.email}</span>
            <Link to="/" onClick={this._logOut}>Log Out</Link>
          </div>
        </NavStyles>
      )
    }
    return (
      <NavStyles>
        <div>
          <h1>DayPlan</h1>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Log In</Link>
        </div>
      </NavStyles>
    );
  }
}

export default GlobalNav;