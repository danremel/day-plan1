import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

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
}
input {
  background-color: rgb(237, 237, 234);
  border: none;
  border-bottom: 0.5px solid black;
  outline: none;
}
`;

class EditDay extends Component {
  constructor(){
    super();
    this.state = {
      day: {
        name: '',
        date: ''
      },
      redirect: false
    }
  }

  componentWillMount(){
    const dayId = this.props.match.params.id;
    this._fetchDay(dayId)
  }

  _fetchDay = async (dayId) => {
    try {
      const response = await axios.get(`/api/days/${dayId}`)
      
      await console.log(response.data.day) 
      this.setState({
        day: {
          name: response.data.day.name,
          date: response.data.day.date
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  _editDay = async (e) => {
    e.preventDefault();
    const day = this.state.day;
    const dayId = this.props.match.params.id;
    try {
      const response = await axios.patch(`/api/days/${dayId}`, day)
      this.setState({redirect: true})
      return response.date;
    } catch (err) {
      console.log(err)
    }
  }

  _deleteDay = async (e) => {
    const c = window.confirm('Are you sure you want to delete this day?');
    if (c == true) {
    const id = this.props.match.params.id;
    try {
      const response = await axios.delete(`/api/days/${id}`)
      this.setState({redirect: true})
    } catch (err) {
      console.log(err)
    }
  } else {
    console.log("Failed to delete Day")
  }
}


  _handleChange = (e) => {
    const newState = {...this.state.day}
    newState[e.target.name] = e.target.value;
    this.setState({
      day: newState
    })
  }

  render() {
    return (
      <div>
        {this.state.redirect ?
        <Redirect to={{pathname:'/days', state: {refresh: true}}}/>
        :
        <FormContainerStyles>
          <form>
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
              <button onClick={this._editDay}>Edit Day</button>
            </FormDivStyles>
          </form>
          <FormDivStyles>
            <button onClick={this._deleteDay}>
              <FontAwesome className="fa fa-trash-o" name="" aria-hidden="true"/> - Delete
            </button>
          </FormDivStyles>
        </FormContainerStyles>
        }
      </div>
    );
  }
}

export default EditDay;