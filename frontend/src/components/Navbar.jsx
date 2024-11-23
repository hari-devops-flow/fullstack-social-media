import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white px-4 py-2">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Knowledge Share</h1>
        <div>
          <Link to="/" className="mx-2">Feed</Link>
          <Link to="/upload" className="mx-2">Upload</Link>
          <Link to="/login" className="mx-2">Login</Link>
          <Link to="/register" className="mx-2">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
