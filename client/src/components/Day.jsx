import React, { Component } from 'react';
import axios                from 'axios';
import { Link }             from 'react-router-dom';
import TaskCard             from './TaskCard';
import styled               from 'styled-components';
import FontAwesome          from 'react-fontawesome';

const AllTasksContainer = styled.div`
display: flex;
flex-direction: column;
flex-wrap: wrap;
justify-content: center;
align-items: flex-start;
margin: 5% 28%;
h1 {
  margin: 0 auto;
}
  `;

const BackStyles = styled.div`
  color: black;
  margin: 0 auto;
  `;

const EditAddLinkStyles = styled.div`
a {
  color: black;
  text-decoration: none;
  font-style: bold;
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
        <EditAddLinkStyles>
            <h1>{this.state.day.name} - ({this.state.day.date})
              <Link to={`/days/${this.props.match.params.id}/edit`}>
                <FontAwesome name="fa fa-pencil" aria-hidden="true"/>
              </Link>
            </h1>
          <div>
            <Link to={`/days/${id}/task/new`}>Add a new Task</Link>
            <h3>You have no tasks available.</h3>
          </div>
        </EditAddLinkStyles>
      )
    }
    return (
      <AllTasksContainer>
        <EditAddLinkStyles>
        <Link to="/days">
          <BackStyles>
            <FontAwesome className="fa fa-chevron-left" name="" aria-hidden="true"/> - Back
          </BackStyles>
        </Link>
          <h1>{this.state.day.name} - ({this.state.day.date})
            <Link to={`/days/${this.props.match.params.id}/edit`}>
              <FontAwesome className="fa fa-pencil" aria-hidden="true"/>
            </Link>
          </h1>
          <Link to={`/days/${id}/task/new`}>Add a new Task</Link>
        </EditAddLinkStyles>
        {this.state.tasks.map((task) => (
          <TaskCard key={task.id} task={task} day={this.state.day}/>
        ))}
      </AllTasksContainer>
    );
  }
}

export default Day;