import React, { Component } from 'react';
import axios from 'axios';

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