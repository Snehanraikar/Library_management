import React from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import lib1 from './lib1.jpg';
import lib2 from './lib2.jpg';

const Main = () => {
  return (
    <div className="main-container">
      <img src={lib1} height={70} />
      <div class ="background">
      <h1>Library Management</h1>
      <p>Welcome to our library management system!</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <br></br>
      </div>
      <img src={lib1} height={50} />
    </div>
  );
};

export default Main;