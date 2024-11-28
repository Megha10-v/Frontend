import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import './CustomNav.css'; // Import your CSS file
import All from './All';

function CustomNav() {
  const [key, setKey] = useState('all');

  return (
    <div id='rentals&services'>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="custom-tabs"
      >
        <Tab eventKey="all" title="All">
          <div className='container-fluid'>
            <All />
          </div>
        </Tab>
        <Tab eventKey="rental" title="Rental">
          <div>
            <h3>Rental</h3>
            <p>Tab content for Rental</p>
          </div>
        </Tab>
        <Tab eventKey="services" title="Services">
          <div>
            <h3>Services</h3>
            <p>Tab content for Services</p>
          </div>
        </Tab>
        <Tab eventKey="jobs" title="Jobs">
          <div>
            <h3>Jobs</h3>
            <p>Tab content for Jobs</p>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default CustomNav;

