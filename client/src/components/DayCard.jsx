import React from 'react';
import { Link } from 'react-router-dom';

const DayCard = (props) => {
  const day = props.day;
  return (
    <div>
      <Link to={`/days/${day.id}`}>  
        <h1>{day.name}</h1>
        <h1>{day.date}</h1>
      </Link>
    </div>
  );
};

export default DayCard;