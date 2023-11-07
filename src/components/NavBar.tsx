import React from 'react';
import '../styles/NavBar.css';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <Link to="/" className="nav-item">Home</Link>
      <Link to="/schedule" className="nav-item">Schedule</Link>
    </div>
  );
}

export default Navbar;
