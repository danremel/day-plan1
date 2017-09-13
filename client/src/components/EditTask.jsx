import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
    const task = this.state.task;
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
    const task = this.state.task;
    const { dayId, id } = this.props.match.params;
    try {
      const response = await axios.delete(`/api/days/${dayId}/tasks/${id}`)
      this.setState({redirect: true})
    } catch (err) {
      console.log(err)
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
    const { dayId, id } = this.props.match.params;
    return (
      <div>
        {this.state.redirect ?
        <Redirect to={{pathname:`/days/${dayId}/`}}/>
        :
        <div>
          <form onSubmit={this._editTask}>
            <div>
              <label htmlFor="name">Task Name: </label>
              <input onChange={this._handleChange}
                type="text"
                name="name"
                value={this.state.task.name} />
            </div>
            <div>
              <label htmlFor="description">Description: </label>
              <input onChange={this._handleChange}
                type="text"
                name="description"
                value={this.state.task.description} />
            </div>
            <div>
              <label htmlFor="priority_level">Priority Level: <em>(out of 3)</em> </label>
              <input onChange={this._handleChange}
                type="number"
                name="priority_level"
                value={this.state.task.priority_level} />
            </div>
            <div>
              <label htmlFor="completion_time">Complete By: </label>
              <input onChange={this._handleChange}
                type="text"
                name="completion_time"
                value={this.state.task.completion_time} />
            </div>
            {/* <div>
              <label htmlFor="completed">Complete? </label>
              <input onChange={this.setState({ completed: !this.state.completed })}
                type="checkbox"
                value="completed" />
            </div> */}
            <div>
              <button>Edit Task</button>
            </div>
          </form>
          <button onClick={this._deleteTask}>DELETE</button>
        </div>
        }
      </div>
    );
  }
}

export default EditTask;