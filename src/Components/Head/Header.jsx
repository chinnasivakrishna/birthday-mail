import React from 'react';
import './Header.css'; 
import logo from '../photos/logo.png'

const Header = () => (
  <header style={{"backgroundColor":"lightblue"}}>
    <nav>
      <div className="logo">
        <img src={logo}  className='img'/>
        
      </div>
      
      <div className="auth-buttons">
        <button className="login">Login</button>
        <button className="signup">Sign Up</button>
      </div>
    </nav>
  </header>
);

export default Header;
