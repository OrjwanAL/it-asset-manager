import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu } from 'lucide-react'; // Importing the logo icon
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/* Render the logo icon */}
        <Cpu className="brand-logo" size={28} strokeWidth={2} />
        <h2>IT Asset Manager</h2>
      </div>
      <ul className="navbar-links">
        <li><Link to="/" className="nav-item">Computers</Link></li>
        <li><Link to="/hardware" className="nav-item">Hardware</Link></li>
        <li><Link to="/accessories" className="nav-item">Accessories</Link></li>
        <li><Link to="/network" className="nav-item">Network</Link></li>
        <li><Link to="/about" className="nav-item">About Team</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;