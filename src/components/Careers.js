import React from 'react';
import Header from './Header';  // Adjust the import paths as necessary
import Footer from './Footer'; 
import logonew from '../images/logonew.jpg' // Adjust the import paths as necessary
import {Image} from 'react-bootstrap'

const Careers = () => {
  return (
    <div>
      <a href="/" style={{ display: 'inline-block' }}>
      <Image src={logonew} thumbnail style={{ marginTop:'30px',marginLeft:'50px',marginBottom:'30px',width: '208px', height: '80px', border: 'none' }} />
      </a>
      <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      textAlign: 'center',
      background: 'linear-gradient(180deg, #F5CC40 0%, #4FBBB4 100%)',
      

    }}>
      <h2 style={{ color: 'white' }}>"Thank you for your interest, <br/>
        but there are no job openings available at this time. <br/>
        Please check back at another time."</h2>
    </div>
      <Footer />
    </div>
  );
};

export default Careers;
