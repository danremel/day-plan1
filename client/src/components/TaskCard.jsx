import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TaskCardStyles = styled.div`
border: 1px solid black;
padding: 10px;
width: 300px;
height: auto;
text-align: center;
margin: 1.5% 0;
background-color: rgb(222, 88, 66);
&:hover {
  background-color: rgb(190, 88, 66);
}
a {
  color: rgb(243, 232, 214);
  text-decoration: none;
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