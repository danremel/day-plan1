import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
        <div>
          <form onSubmit={this._addTask}>
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
              <div>
                <button>Add Task</button>
              </div>
            </form>
          </div>
        }
      </div>
    );
  }
}

export default NewTask;