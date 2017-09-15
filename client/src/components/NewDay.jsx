import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainerStyles = styled.div`
  margin: 2% 15%;
  `;

const FormDivStyles = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 20%;
  margin: 10px 40%;
  align-items: center;
  color: rgb(243, 232, 214);  
  a {
    text-decoration: none;
    font-weight: bold;
  }
  button {
    width: 100%;
    height: 40px;
    border-radius: 10%;
    box-shadow: .5px .5px .5px black;
    background-color: #e1b97e;
    &:hover {
      background-color: #E5C8A0;
    }
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