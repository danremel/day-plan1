import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Task extends Component {
  constructor(){
    super();
    this.state = {
      task: {}
    }
  }

  componentWillMount(){
    this._fetchTask();
  }

  _fetchTask = async () => {
    console.log(this.state.task)
    const {dayId, id} = this.props.match.params;
    const response = await axios.get(`/api/days/${dayId}/tasks/${id}`)
    this.setState({
      task: response.data
    })
  }
  render() {
    return (
      <div>
        <h1>{this.state.task.name}</h1>
        <p>{this.state.task.description}</p>
        <p>Priority level: {this.state.task.priority_level} out of 3</p>
        <p>To be completed by: {this.state.task.completion_time}</p>
        <Link to={`/days/${this.props.match.params.dayId}/tasks/${this.props.match.params.id}/edit`} fetchTask={this._fetchTask}>Edit</Link>
      </div>
    );
  }
}

Task.defaultProps = {
  match: {
    params: {
      id: ''
    }
  }
}

export default Task;