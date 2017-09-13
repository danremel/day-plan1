import React from 'react';
import { Link } from 'react-router-dom';

const GlobalNav = () => {
  return (
    <div>
      <Link to="/"><h1>Day-Plan</h1></Link>
      <div>
        <Link to="/signup">Sign Up</Link>
        <Link to="/">Days</Link>
      </div>
    </div>
  );
};

export default GlobalNav;