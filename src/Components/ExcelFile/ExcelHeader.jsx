import React from 'react';
import './Header.css'; 
import logo from '../photos/logo.png'
import { useNavigate } from 'react-router-dom';

const ExcelHeader = ({user}) => {
  const navigate = useNavigate()
  console.log(user)
  const handleDownload = () => {
    window.location.href = 'birthday.xlsx';
  };
  const upload = () => {
    navigate('/upload',{state:{user:user}})
  }
  const logout = () => {
    navigate("/login", { replace: true });
    
    // Use replaceState to prevent back navigation
    window.history.replaceState(null, '', '/login');
  }

  return (
    <header style={{ "backgroundColor": "lightblue" }}>
      <nav>
        <div className="logo">
          <img src={logo} className='img' />
        
        </div>
      
        <div className="auth-buttons">
          <button className="download-button" onClick={upload}>Uploaded</button>
          <button className="download-button" onClick={handleDownload}>
            <i class="fa-solid fa-download"></i>  Download Sample Excel
          </button>
          <button className="download-button" onClick={logout} >Logout</button>
        </div>
      </nav>
    </header>
  )
};

export default ExcelHeader;
