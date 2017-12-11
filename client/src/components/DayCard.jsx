import React    from 'react';
import { Link } from 'react-router-dom';
import styled   from 'styled-components';

const DayCardStyles = styled.div`
  padding: 10px;
  width: 300px;
  height: auto;
  text-align: center;
  margin: 1.5% 0;
  background-color: rgb(222, 88, 66);
  &:hover {
    background-color: rgb(190, 88, 66);
  }
  `;

const DayCard = (props) => {
  const day = props.day;
  return (
    <div>
      <Link to={`/days/${day.id}`}>  
        <DayCardStyles>
          <h1>{day.name}</h1>
          <h1>{day.date}</h1>
        </DayCardStyles>
      </Link>
    </div>
  );
};

export default DayCard;