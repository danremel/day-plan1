import React, { Component } from 'react';
import axios from 'axios';
import DayCard from './DayCard';
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
    return (
      <div>
        {this.state.days.map((day) => (
          <DayCard key={day.id} day={day} />
        ))}
      </div>
    );
  }
}

export default AllDays;