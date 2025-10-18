import React from 'react';
import Footer from './Footer';

const Careers = () => {
  return (
    <div>
      <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh',
      textAlign: 'center',
      background: 'linear-gradient(180deg, #F5CC40 0%, #4FBBB4 100%)',
    }}>
      <h2 style={{ color: 'white' }}>"Thank you for your interest, <br/>
        but there are no job openings available at this time. <br/>
        Please check back at another time."</h2>
    </div>
    <Footer/>
    </div>
  );
};

export default Careers;