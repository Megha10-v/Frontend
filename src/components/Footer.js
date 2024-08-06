import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { FiDownload } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import layer1 from '../images/layer1.png'
import layer2 from '../images/layer2.png'
import logo from '../images/LogoImage.jpg'
import logonew from '../images/footerlogo.png'
import './Home.css'
const Footer = () => {
  return (
    <Container fluid style={{ backgroundColor: '#E5E5E5' }} id='contacts' >
      <Row className="text-center">
        <Col md={4}>
        <a href="/" style={{ display: 'inline-block' }}>
          <Image src={logonew} thumbnail alt="Company Logo"  style={{width: '400px', height: '250px',marginTop:'50px',marginLeft:'100px',backgroundColor: 'transparent'}} />
        </a>
          {/* <p style={{marginLeft:'150px'}}>COMPANY</p> */}
          {/* <p style={{ marginTop: '10px', fontWeight: 'bold',marginLeft:'150px' }}>TURN YOUR STUFF AND SERVICES<br/> INTO CASH MACHINES</p> */}
        </Col>
        <Col md={2}>
        <Button variant="primary" className="download-btn text-white" style={{ width: '152px', height: '42px', marginTop:'75px',borderColor:'#4FBBB4'}}>
            Download App <FiDownload/> <i className="fas fa-download"></i></Button>
          <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
            <Image src={layer1} alt="Google Play" fluid style={{ maxWidth: '150px', margin: '10px 0' }} />
          </a>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
            <Image src={layer2} alt="App Store" fluid style={{ maxWidth: '150px' }} />
          </a>
        </Col>
        <Col md={2}style={{marginTop:'61px'}} className='text-start'>
          <h6 className=" font-weight-bold" >Company</h6>
          <p style={{marginTop:'30px',fontSize:'15px'}}><a href="/" className="text-dark">About Us</a></p>
          <p style={{fontSize:'15px'}}><a href="/careers" className="text-dark">Careers</a></p>
          <p style={{fontSize:'15px'}}><a href="/terms" className="text-dark">Terms of Use</a></p>
          <p style={{fontSize:'15px'}}><a href="/privacy" className="text-dark">Privacy Policy</a></p>
        </Col>
        <Col md={2} style={{marginTop:'61px'}} className='text-start'>
          <h6 className=" font-weight-bold">Get Social</h6>
          <p style={{marginTop:'30px',fontSize:'15px'}}><a href="#" className="text-dark">Instagram</a></p>
        <p style={{fontSize:'15px'}}><a href="#" className="text-dark">LinkedIn</a></p>
          {/* <p style={{fontSize:'15px'}}><a href="#" className="text-dark">Facebook</a></p> */}
      <p style={{fontSize:'15px'}}><a href="#" className="text-dark">X</a></p>
        </Col>
        <Col md={2 } style={{marginTop:'61px'}} className='text-start'>
          <h6 className=" font-weight-bold">Support</h6>
          {/* <p style={{marginTop:'30px',fontSize:'15px'}}><a href="#" className="text-dark">Help</a></p> */}
          <p style={{fontSize:'15px'}}><a href="#" className="text-dark">Contact Us</a></p>
          {/* <p style={{fontSize:'15px'}}><a href="#" className="text-dark">Call Us</a></p> */}
           <p style={{fontSize:'15px'}}><a href="#" className="text-dark">Customer care</a></p> 
        </Col>
      </Row>
      <div className="line"></div>

      <Row className="text-center mt-3">
        <Col  style={{marginTop:'20px'}}>
          <p>© elk company.in 2024, All Rights Reserved.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
