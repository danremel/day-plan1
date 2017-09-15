import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { saveAuthTokens } from '../util';
import styled from 'styled-components';

const VideoBGStyles = styled.video`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  z-index: -100;
  transform: translateX(-50%) translateY(-50%);
  background: url('https://static.pexels.com/photos/314726/pexels-photo-314726.jpeg') no-repeat;
  background-size: cover;
  transition: 1s opacity;
  `;

const FormContainerStyles = styled.div`
  margin-top: 25%;
  margin-left:5%;
  `;

const FormDivStyles = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 20%;
  margin: 10px 5%;
  align-items: center;
  a {
    text-decoration: none;
    font-weight: bold;
  }
  `;

class SignIn extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      redirect: false
    }
  }

  _signIn = async (e) => {
    e.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.password
    }
    const response = await axios.post('/auth/sign_in', payload);
    saveAuthTokens(response.headers);
    this.setState({redirect: true})
  }

  _handleChange = (e) => {
    const newState = {...this.state};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/days" />
    }
    return (
      <div>
          <div class="fullscreen-bg">
	          <VideoBGStyles poster="" id="bgvid" playsInline autoPlay muted loop>
              <source src="/vid-bg.mp4" type="video/mp4"></source>
            </VideoBGStyles>
          </div>
        <FormContainerStyles>
          <form onSubmit={this._signIn}>
            <FormDivStyles>
              <label htmlFor="email">Email: </label>
              <input onChange={this._handleChange} type="text" name="email" value={this.state.email} />
            </FormDivStyles>
            <FormDivStyles>
              <label htmlFor="password">Password: </label>
              <input onChange={this._handleChange} type="password" name="password" value={this.state.password} />
            </FormDivStyles>
            <FormDivStyles>
              <button>Sign In</button>
              <p>Don't have an account? <Link to="/signup">Sign Up!</Link></p>
            </FormDivStyles>
          </form>
        </FormContainerStyles>
      </div>
    );
  }
}

export default SignIn;