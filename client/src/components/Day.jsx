import React, { Component } from 'react';
import axios from 'axios';

class Day extends Component {
  constructor(){
    super();
    this.state = {
      day: {},
      tasks: []
    }
  }

  componentWillMount(){
    this._fetchDayAndTasks();
  }

  _fetchDayAndTasks = async () => {
    const id = this.props.match.params.id;
    const response = await axios.get(`/api/days/${id}`)
    this.setState({
      day: response.data.day,
      tasks: response.data.tasks
    })
  }

  render() {
    return (
      <div>
        <h1>{this.state.day.name} - ({this.state.day.date})</h1>
        {this.state.tasks.map((task) => (
          <div key={task.id}>
            <h3>Task: {task.name}</h3>
            <p>Description: {task.description}</p>
            <p>Priority level: {task.priority_level} out of 3</p>
            <p>To be completed by: {task.completion_time}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Day;