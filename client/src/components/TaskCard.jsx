import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TaskCardStyles = styled.div`
box-shadow: 1px 1px 1px black;
border: 1px solid black;
padding: 10px;
width: 300px;
height: auto;
text-align: center;
margin: 1.5% 0;
background-color: #e1b97e;
&:hover {
  background-color: #E5C8A0;
}
`;

const TaskCard = (props) => {
  const task = props.task;
  const day = props.day;

  return (
    <TaskCardStyles>
      <Link to={`/days/${day.id}/tasks/${task.id}`}>
        <h3>Task: {task.name}</h3>
        <hr/>
        <p>Description: {task.description}</p>
        <p>Priority level: {task.priority_level} out of 3</p>
        <p>To be completed by: {task.completion_time}</p>
      </Link>
    </TaskCardStyles>
  );
};

export default TaskCard;