import React from 'react'
import logo from '../photos/logo.png'
import { useNavigate } from 'react-router-dom'

const Uploadheader = () => {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/login", { replace: true });
    
    window.history.replaceState(null, '', '/login');
  }
  return (
    <header style={{ "backgroundColor": "lightblue" }}>
      <nav>
        <div className="logo">
          <img src={logo} className='img' />
        
        </div>
        <div className="auth-buttons">
          
          <button className="download-button" onClick={logout} >Logout</button>
        </div>
      
        
      </nav>
    </header>
  )
}

export default Uploadheader
