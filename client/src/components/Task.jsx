import React, { Component } from 'react';
import axios                from 'axios';
import { Link }             from 'react-router-dom';
import styled               from 'styled-components';
import FontAwesome 					from 'react-fontawesome';

const BackStyles = styled.div`
color: black;
margin: 0 auto;
a {
	text-decoration: none;
}
`;

const TaskStyles = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: flex-start;
align-items: center;
width: 25%;
margin: 5% 28%;
border: 1px solid black;
box-shadow: 1px 1px 1px black;
color: black;
background-color: rgb(222, 88, 66);
&:hover {
	background-color: rgb(190, 88, 66);
}
h1 {
	text-align: center;
}
p {
	text-align: center;
}
a {
	color: rgb(243, 232, 214);
	text-decoration: none;
}
`;


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
		const {dayId, id} = this.props.match.params;
		return (
		<div>
			<Link to={`days/${dayId}`}>
				<BackStyles>
					<FontAwesome className="fa fa-chevron-left" name="" aria-hidden="true"/> - Back
				</BackStyles>
			</Link>
			<TaskStyles>
				<h1>{this.state.task.name}</h1>
				<div>
					<p>{this.state.task.description}</p>
					<p>Priority level: {this.state.task.priority_level} out of 3</p>
					<p>To be completed by: {this.state.task.completion_time}</p>
				</div>
				<Link to={`/days/${dayId}/tasks/${id}/edit`} fetchTask={this._fetchTask}><FontAwesome className="fa fa-pencil" name="" aria-hidden="true"/></Link>
			</TaskStyles>
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