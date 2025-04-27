import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import layer1 from '../assets/layer1.png';
import layer2 from '../assets/layer2.png';
import logonew from '../assets/footerlogo.png';

const Footer = () => {
  return (
    <Container fluid style={{backgroundColor: '#E5E5E5', marginTop: "20px"}} id='contacts' >
      <Row className="text-center">
        <Col md={4} sm={12}>
        <Link to="/" style={{ display: 'inline-block' }}>
          <Image src={logonew} thumbnail alt="Company Logo"  style={{width: '400px', height: '250px',backgroundColor: 'transparent'}} />
        </Link>
        </Col>
        <Col className='mt-md-5 mb-4' md={2} sm={12} >
          <Row className='justify-content-center'>
            <Link to="https://play.google.com" target="_blank" rel="noopener noreferrer">
              <Image src={layer1} alt="Google Play" fluid style={{ maxWidth: '150px', margin: '10px 0' }} />
            </Link>
          </Row>
          <Row className='justify-content-center'>
            <Link to="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <Image src={layer2} alt="App Store" fluid style={{ maxWidth: '150px' }} />
            </Link>
          </Row>
        </Col>
        <Col  md={2} sm={12} className='text-center mt-md-5'>
          <h6 className=" font-weight-bold" >Company</h6>
          <p style={{fontSize:'15px'}}>
          <Link to="https://elkbusinesshub.com/" target="_blank"  className="text-dark" onClick={() => {
          // Scroll to the 'aboutus' section on home page
          setTimeout(() => {
            const element = document.getElementById('aboutus');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 0);
        }}>
          About Us
        </Link>
          </p>

          <p style={{fontSize:'15px'}}><Link to="https://elkbusinesshub.com/careers" target="_blank" className="text-dark">Careers</Link></p>
          <p style={{fontSize:'15px'}}><Link to="https://elkbusinesshub.com/terms" target="_blank" className="text-dark">Terms of Use</Link></p>
          <p style={{fontSize:'15px'}}><Link to="https://elkbusinesshub.com/privacy" target="_blank" className="text-dark">Privacy Policy</Link></p>
        </Col>
        <Col md={2} sm={12}  className='text-center mt-md-5'>
          <h6 className=" font-weight-bold">Get Social</h6>
          <p style={{fontSize:'15px'}}><Link to="https://www.instagram.com/elkcompany2024?igsh=a2s4dTVpbmQ0amNm" className="text-dark">Instagram</Link></p>
        <p style={{fontSize:'15px'}}><Link to="https://www.linkedin.com/company/elkcompany/" className="text-dark">LinkedIn</Link></p>
          {/* <p style={{fontSize:'15px'}}><Link to="#" className="text-dark">Facebook</Link></p> */}
      <p style={{fontSize:'15px'}}><Link to="https://x.com/elkcompanyin?t=pOgye8kJHalI7o-00wpJJA&s=09" className="text-dark">X</Link></p>
        </Col>
        <Col md={2} sm={12}  className='text-center mt-md-5'>
          <h6 className=" font-weight-bold">Support</h6>
          <p style={{fontSize:'15px'}}><Link  to="https://elkbusinesshub.com/privacy"  target="_blank" className="text-dark" onClick={() => {
          // Scroll to the 'aboutus' section on home page
          setTimeout(() => {
            const element = document.getElementById('contactsinprivacy');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 0);
        }}>Contact Us</Link></p>
           <p style={{fontSize:'15px'}}><Link  to="https://elkbusinesshub.com/privacy" target="_blank" className="text-dark" onClick={() => {
          // Scroll to the 'aboutus' section on home page
          setTimeout(() => {
            const element = document.getElementById('contactsinprivacy');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 0);
        }}>Customer care</Link></p> 
        </Col>
      </Row>
      <div className="line"></div>

      <Row className="text-center mt-3">
        <Col  >
          <p>© elk company.in 2024, All Rights Reserved.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;