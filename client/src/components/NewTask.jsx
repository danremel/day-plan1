import React, { Component } from 'react';
import axios                from 'axios';
import { Redirect }         from 'react-router-dom';
import styled               from 'styled-components';

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

class NewTask extends Component {
  constructor(){
    super();
    this.state = {
      task: {
        name: '',
        description: '',
        priority_level: undefined,
        completion_time: '',
        completed: false
      },
      redirect: false
    }
  }

  _handleChange = (e) => {
    const newState = {...this.state.task};
    newState[e.target.name] = e.target.value;
    this.setState({
      task: newState
    });
  }

  _addTask = async (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const payload = this.state.task
    const response = await axios.post(`/api/days/${id}/tasks`, payload)
    console.log(response);
    this.setState({redirect: true})
  }

  render() {
    const id = this.props.match.params.id;
    return (
      <div>
        {this.state.redirect ?
        <Redirect to={{pathname:`/days/${id}/`}}/>
        :
        <FormContainerStyles>
          <form onSubmit={this._addTask}>
          <FormDivStyles>
                <label htmlFor="name">Task Name: </label>
                <input onChange={this._handleChange}
                  type="text"
                  name="name"
                  value={this.state.task.name} />
              </FormDivStyles>
              <FormDivStyles>
                <label htmlFor="description">Description: </label>
                <input onChange={this._handleChange}
                  type="text"
                  name="description"
                  value={this.state.task.description} />
              </FormDivStyles>
              <FormDivStyles>
                <label htmlFor="priority_level">Priority Level: <em>(out of 3)</em> </label>
                <input onChange={this._handleChange}
                  type="number"
                  name="priority_level"
                  value={this.state.task.priority_level} />
              </FormDivStyles>
              <FormDivStyles>
                <label htmlFor="completion_time">Complete By: </label>
                <input onChange={this._handleChange}
                  type="text"
                  name="completion_time"
                  value={this.state.task.completion_time} />
              </FormDivStyles>
              <FormDivStyles>
                <button>Add Task</button>
              </FormDivStyles>
            </form>
          </FormContainerStyles>
        }
      </div>
    );
  }
}

export default NewTask;