import React from 'react';
import { Link } from 'react-router-dom';

const TaskCard = (props) => {
  const task = props.task;
  const day = props.day;

  return (
    <div>
      <Link to={`/days/${day.id}/tasks/${task.id}`}>
        <h3>Task: {task.name}</h3>
        <p>Description: {task.description}</p>
        <p>Priority level: {task.priority_level} out of 3</p>
        <p>To be completed by: {task.completion_time}</p>
      </Link>
    </div>
  );
};

export default TaskCard;