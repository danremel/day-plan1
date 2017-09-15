import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TaskCard from './TaskCard';
import styled from 'styled-components';

const AllTasksContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: flex-start;
align-items: center;
margin: 5% 28%;
a {
  color: rgb(243, 232, 214);
  text-decoration: none;
}
`;

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
    const id = this.props.match.params.id;
    if (this.state.tasks.length === 0) {
      return (
        <div>
            <h1>{this.state.day.name} - ({this.state.day.date})<Link to={`/days/${this.props.match.params.id}/edit`} fetchDayAndTasks={this.props._fetchDayAndTasks}>Edit</Link></h1>
          <div>
            <Link to={`/days/${id}/task/new`}>Add a new Task</Link>
            <h3>You have no tasks available.</h3>
          </div>
        </div>
      )
    }
    return (
      <AllTasksContainer>
        <h1>{this.state.day.name} - ({this.state.day.date})<Link to={`/days/${this.props.match.params.id}/edit`} fetchDayAndTasks={this.props._fetchDayAndTasks}>Edit</Link></h1>
        <Link to={`/days/${id}/task/new`}>Add a new Task</Link>
        {this.state.tasks.map((task) => (
          <TaskCard key={task.id} task={task} day={this.state.day}/>
        ))}
        <Link to="/days">Back</Link>
      </AllTasksContainer>
    );
  }
}

export default Day;