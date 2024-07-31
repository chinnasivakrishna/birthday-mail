import React from 'react';
import logo from '../photos/logo.png'

const Header = () => (
  <header>
    <nav>
      <div className="logo">
        <img src={logo}  className='img'/>
        <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/features">Features</a></li>
        <li><a href="/pricing">Pricing</a></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      </div>
      
      <div className="auth-buttons">
        <button className="login"><a href='/login'>Login</a></button>
        <button className="signup">Sign Up</button>
      </div>
    </nav>
  </header>
);

export default Header;
