import React from 'react';
import logo from '../photos/logo.png'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const register = () => {
    navigate("/register")
  }
  const login = () => {
    navigate("/login")
  }

  
  
  return (
  
    <header>
      <nav>
        <div className="logo">
          <img src={logo} className='img' />
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      
        <div className="auth-buttons">
          <button className="login" onClick={login}>Login</button>
          <button className="signup" onClick={register}>Sign Up</button>
        </div>
      </nav>
    </header>
  )
};

export default Header;
