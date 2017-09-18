import React, { Component } from 'react';
import axios from 'axios';
import DayCard from './DayCard';
import NewDay from './NewDay';
import styled from 'styled-components';

const AllDaysContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 5% 28%;
  a {
    color: rgb(243, 232, 214);
    text-decoration: none;
  }
  `;

class AllDays extends Component {
  constructor(){
    super();
    this.state = {
      error: '',
      days: []
    }
  }

  componentWillMount(){
    this._fetchDays();
  }

  _fetchDays = async () => {
    try {
      const response = await axios.get('/api/days');
      const days = response.data;
      this.setState({days});
    } catch (err) {
      this.setState({error: err});
    }
  }

  render() {
    if (this.state.error){
      return <h1>{this.state.error.message}</h1>
    }
    else if (this.state.days.length === 0) {
      return (
      <div>
        <NewDay/>
        <AllDaysContainer>
          <h3>You have no days. Create one now!</h3>
        </AllDaysContainer>
      </div>
      )
    }
    return (
      <div>
        <NewDay/>
        <AllDaysContainer>
          {this.state.days.map((day) => (
            <DayCard key={day.id} day={day} />
          ))}
        </AllDaysContainer>
      </div>
    );
  }
}

export default AllDays;