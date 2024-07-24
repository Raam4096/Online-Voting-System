import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
        <li><Link to="/login"><i className="fas fa-sign-in-alt"></i> Login</Link></li>
        <li><Link to="/register"><i className="fas fa-user-plus"></i> Register</Link></li>
        <li><Link to="/elections"><i className="fas fa-vote-yea"></i> Elections</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;