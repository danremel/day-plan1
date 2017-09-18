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

class EditTask extends Component {
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

  componentWillMount(){
    const taskId = this.props.match.params.id;
    this._fetchTask(taskId)
  }

  _fetchTask = async (taskId) => {
    try {
      const { dayId, id } = this.props.match.params;
      const response = await axios.get(`/api/days/${dayId}/tasks/${id}`)
      await this.setState({
        task: response.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  _editTask = async (e) => {
    e.preventDefault();
    const payload = this.state.task;
    console.log(payload)
    const { dayId, id } = this.props.match.params;
    try {
      const response = await axios.patch(`/api/days/${dayId}/tasks/${id}`, payload)
      this.setState({redirect: true})
      return response.data;
    } catch (err) {
      console.log(err)
    }
  }

  _deleteTask = async (e) => {
    const c = window.confirm('Are you sure you want to delete this Task?')
    if (c == true) {
      const { dayId, id } = this.props.match.params;
      try {
        const response = await axios.delete(`/api/days/${dayId}/tasks/${id}`)
        this.setState({redirect: true})
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log("Did not delete Task")
    }
  }

  _handleChange = (e) => {
    const newState = {...this.state.task}
    newState[e.target.name] = e.target.value;
    this.setState({
      task: newState
    })
  }
  render() {
    const { dayId } = this.props.match.params;
    return (
      <div>
        {this.state.redirect ?
        <Redirect to={{pathname:`/days/${dayId}/`}}/>
        :
        <FormContainerStyles>
          <form onSubmit={this._editTask}>
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
              <button>Edit Task</button>
            </FormDivStyles>
          </form>
          <FormDivStyles>
            <button onClick={this._deleteTask}><FontAwesome className="fa fa-trash-o" name="" aria-hidden="true"/> - Delete</button>
          </FormDivStyles>
        </FormContainerStyles>
        }
      </div>
    );
  }
}

export default EditTask;