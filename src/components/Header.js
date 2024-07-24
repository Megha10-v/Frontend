import React from 'react'
import LogoImage from '../images/LogoImage.jpg';
import logo from '../images/logo.jpg'
import logonew from '../images/logonew.jpg'
import elk from '../images/elk.png'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'
import { MdLogin } from "react-icons/md";


function Header() {
  return (
    <>
      {/* <Navbar expand='lg'>
        <Container style={{height: '100px'}} >
          <Navbar.Brand href="#logo" ><Image src={LogoImage} thumbnail style={{ width: '208px', height: '54.51px' }} /><br />
          <p className="text-center">COMPANY</p>
          </Navbar.Brand>
          
          <Nav className="me-auto">
            <Nav.Link href="#home" className='ms-5'>Home</Nav.Link>
            <Nav.Link href="#rentals&services" className='ms-5 fw-bold'>Rental & Services</Nav.Link>
            <Nav.Link href="#aboutus" className='ms-5'>About Us</Nav.Link>
            <Nav.Link href="#elk" className='ms-5'>ELK PLATFORM</Nav.Link>
            <Nav.Link href="#blog" className='ms-5'>Blog</Nav.Link>
            <Nav.Link href="#login" className='ms-5'>Login Or Sign Up<MdLogin /></Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}
      <Navbar expand="lg" >
      <Container style={{ height: '100px'}}>
        <Navbar.Brand href="#logo" className="d-flex flex-column align-items-center">
          <Image src={logonew} thumbnail style={{ width: '208px', height: '64px', border: 'none' }} />
          {/* <p className="text-center mb-0">BUISNESS HUB</p> */}
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className='ms-5 '>Home</Nav.Link>
            {/* <Nav.Link href="#rentals&services" className='ms-5 fw-bold '>Rental & Services</Nav.Link> */}
            <Nav.Link href="#aboutus" className='ms-5 '>About Us</Nav.Link>
            <Nav.Link href="#elk" className='ms-5 fw-bold '>ELK Platform</Nav.Link>
            <Nav.Link href="#blog" className='ms-5 '>Blog</Nav.Link>
            {/* <Nav.Link href="#login" className='ms-5'>Login Or Sign Up <MdLogin /></Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  
    </>
  )
}

export default Header
