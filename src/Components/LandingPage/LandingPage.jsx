import React from 'react';

import './styles.css';
import Header from '../Header/Header';
import HeroSection from '../HeroSection/HeroSection';
import Features from '../Features/Features';
import Pricing from '../Pricing/Pricing';
import Steps from '../Steps/Steps';
import Testimonials from '../Testimonials/Testimonials';
import ContactUs from '../Contact/Contact';
import Footer from '../Footer/Footer';

const LandingPage = () => (
  <div className="app">
    <Header />
    <HeroSection />
    <Features />
    <Testimonials />
    <ContactUs />
    <Footer />
    
  </div>
);

export default LandingPage;
