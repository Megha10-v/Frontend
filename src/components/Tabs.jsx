import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import Rental from './Rental';
import Service from './Service';
import MyBusiness from './MyBusiness';
import './Tabs.css';
import AppHeader from './AppHeader';
import Footer from './AppFooter';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState('rentals'); 

  const renderTabContent = () => {
    switch (activeTab) {
      case 'rentals':
        return <Rental />;
      case 'services':
        return <Service />;
      case 'my business':
        return <MyBusiness />;
      default:
        return null;
    }
  };

  return (
    <>
      <AppHeader />
      <Nav className="custom-tabs mx-auto d-flex justify-content-center">
        {['rentals', 'services', 'my business'].map((tab) => (
          <button
            key={tab}
            onClick={(e) => {
              e.preventDefault(); 
              setActiveTab(tab);
            }}
            className={`tab-item ${activeTab === tab ? 'active-tab' : ''}`}
            style={{
              margin: '0 15px',
              paddingBottom: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              position: 'relative',
              textDecoration: 'none',
              background: 'none', 
              border: 'none',
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </Nav>

      <div className="tab-content">{renderTabContent()}</div>
      <Footer />
    </>
  );
}
