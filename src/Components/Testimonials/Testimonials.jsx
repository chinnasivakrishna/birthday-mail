import React from 'react';
import './styles.css';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Manager',
    text: 'I highly recommend this program to anyone looking to add a personal touch to their client relationships.',
    image: 'path/to/sarah-johnson.jpg',
  },
  {
    name: 'Michael Smith',
    role: 'HR Director',
    text: 'The birthday mail sender made it easy for us to stay connected with our team members, even when working remotely.',
    image: 'path/to/michael-smith.jpg',
  },
  {
    name: 'Emily Davis',
    role: 'Operations Manager',
    text: 'Sending birthday wishes has never been simpler. The program is user-friendly, saving us time and effort each month.',
    image: 'path/to/emily-davis.jpg',
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials">
      <h2>Testimonials</h2>
      {testimonials.map((testimonial, index) => (
        <div className="testimonial" key={index}>
          <img src={testimonial.image} alt={`${testimonial.name}`} />
          <h3>{testimonial.name}</h3>
          <span>{testimonial.role}</span>
          <p>{testimonial.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
