import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2% 15%;
  `;

const FormDivStyles = styled.div`
  max-width: 20%;
  margin: 10px 40%;
  align-items: center;  
  a {
    text-decoration: none;
    font-weight: bold;
  }
  button {
    width: auto;
    height: 40px;
    &:hover {
      background-color: #E5C8A0;
    }
  }
  input {
    background-color: rgb(237, 237, 234);
    border: none;
    border-bottom: 0.5px solid black;
    outline: none;
  }
  `;

class NewDay extends Component {
  constructor(){
    super();
    this.state = {
      day: {
        name: '',
        date: ''
      }
    }
  }

  _handleChange = (e) => {
    const newState = {...this.state.day};
    newState[e.target.name] = e.target.value;
    this.setState({
      day: newState
    });
  }

  _addDay = async (e) => {
    const payload = this.state.day
    const response = await axios.post('/api/days', payload)
  }

  render() {
    return (
      <FormContainerStyles>
        <form onSubmit={this._addDay}>
          <FormDivStyles>
            <label htmlFor="name">Name: </label>
            <input onChange={this._handleChange} 
              type="text" 
              name="name" 
              value={this.state.day.name} />
          </FormDivStyles>
          <FormDivStyles>
            <label htmlFor="date">Date: </label>
            <input onChange={this._handleChange}
              type="text"
              name="date"
              value={this.state.day.date} />
          </FormDivStyles>
          <FormDivStyles>
            <button>Add New Day</button>
          </FormDivStyles>
        </form>
      </FormContainerStyles>
    );
  }
}

export default NewDay;