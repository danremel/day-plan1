import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class EditDay extends Component {
  constructor(){
    super();
    this.state = {
      day: {
        name: '',
        date: ''
      },
      redirect: false
    }
  }

  componentWillMount(){
    const dayId = this.props.match.params.id;
    this._fetchDay(dayId)
  }

  _fetchDay = async (dayId) => {
    try {
      const response = await axios.get(`/api/days/${dayId}`)
      
      await console.log(response.data.day) 
      this.setState({
        day: {
          name: response.data.day.name,
          date: response.data.day.date
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  _editDay = async (e) => {
    e.preventDefault();
    const day = this.state.day;
    const dayId = this.props.match.params.id;
    try {
      const response = await axios.patch(`/api/days/${dayId}`, day)
      this.setState({redirect: true})
      return response.date;
    } catch (err) {
      console.log(err)
    }
  }

  _deleteDay = async (e) => {
    const id = this.props.match.params.id;
    try {
      const response = await axios.delete(`/api/days/${id}`)
      this.setState({redirect: true})
    } catch (err) {
      console.log(err)
    }
  }

  _handleChange = (e) => {
    const newState = {...this.state.day}
    newState[e.target.name] = e.target.value;
    this.setState({
      day: newState
    })
  }

  render() {
    return (
      <div>
        {this.state.redirect ?
        <Redirect to={{pathname:'/', state: {refresh: true}}}/>
        :
        <div>
          <form>
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
            <div>
              <button onClick={this._editDay}>Edit Day</button>
            </div>
          </form>
          <button onClick={this._deleteDay}>DELETE</button>
        </div>
        }
      </div>
    );
  }
}

export default EditDay;