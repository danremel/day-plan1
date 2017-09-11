import React, { Component } from 'react';
import axios from 'axios';

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
      const response = await axios.get('/api/days')
    }
  }
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default AllDays;