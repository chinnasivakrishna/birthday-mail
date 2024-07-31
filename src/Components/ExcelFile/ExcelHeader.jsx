import React from 'react';
import './Header.css'; 
import logo from '../photos/logo.png'

const ExcelHeader = () => {
  const handleDownload = () => {
    window.location.href = 'birthday.xlsx';
  };

  return (
    <header style={{ "backgroundColor": "lightblue" }}>
      <nav>
        <div className="logo">
          <img src={logo} className='img' />
        
        </div>
      
        <div className="auth-buttons">
          <button className="download-button" onClick={handleDownload}>
            <i class="fa-solid fa-download"></i>  Download Sample Excel
          </button>
          <button className="download-button" >Logout</button>
        </div>
      </nav>
    </header>
  )
};

export default ExcelHeader;
