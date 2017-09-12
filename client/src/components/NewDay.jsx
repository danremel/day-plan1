import React, { Component } from 'react';
import axios from 'axios';

class NewDay extends Component {
  constructor(){
    super();
    this.state = {
      day: {
        name: '',
        date: ''
      }
    }
  }

  _handleChange = (e) => {
    const newState = {...this.state.day};
    newState[e.target.name] = e.target.value;
    this.setState({
      day: newState
    });
  }

  _addDay = async (e) => {
    const payload = this.state.day
    const response = await axios.post('/api/days', payload)
  }

  render() {
    return (
      <div>
        <form onSubmit={this._addDay}>
          <div>
            <label htmlFor="name">Name: </label>
            <input onChange={this._handleChange} 
              type="text" 
              name="name" 
              value={this.state.day.name} />
          </div>
          <div>
            <label htmlFor="date">Date: </label>
            <input onChange={this._handleChange}
              type="text"
              name="date"
              value={this.state.day.date} />
          </div>
          <button>Add New Day</button>
        </form>
      </div>
    );
  }
}

export default NewDay;