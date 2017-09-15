import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DayCardStyles = styled.div`
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

const DayCard = (props) => {
  const day = props.day;
  return (
    <div>
      <Link to={`/days/${day.id}`}>  
        <DayCardStyles>
          <h1>{day.name}</h1>
          <hr/>
          <h1>{day.date}</h1>
        </DayCardStyles>
      </Link>
    </div>
  );
};

export default DayCard;