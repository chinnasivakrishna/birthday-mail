import React from 'react';
import cake from '../photos/cake.png'
import './Features.css'

const Features = () => (
  <section className="features">
    <div className='image'>
      <img src={cake} className='cake'/>
    </div>
    <div>
    <div className="feature">
      <h2>Personalized Birthday Messages</h2>
      <p>Send messages tailored to your loved ones with ease.</p>
    </div>
    <div className="feature">
      <h2>Automated Birthday Reminders</h2>
      <p>Never miss a birthday with our automatic reminder service.</p>
      </div>
    <div className="feature">
      <h2>Automated Birthday Reminders</h2>
      <p>Never miss a birthday with our automatic reminder service.</p>
    </div>  
    
    </div>
  </section>
);

export default Features;
