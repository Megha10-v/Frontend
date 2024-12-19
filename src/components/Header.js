import React from 'react'
import logonew from '../images/logonew.jpg'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'


function Header() {
  return (
    <>
      <Navbar expand="lg" >
      <Container className='pt-2 pb-2'>
        <Navbar.Brand href="#logo" className="d-flex flex-column align-items-center">
          <Image src={logonew} thumbnail style={{ width: '208px', height: '80px', border: 'none' }} alt='logo header' />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" style={{zIndex:'1000'}}>
          <Nav className="ms-auto" >
            <Nav.Link href="#home" className='ms-5 '>Home</Nav.Link>
            <Nav.Link href="#aboutus" className='ms-5 '>About Us</Nav.Link>
            <Nav.Link href="#elk" className='ms-5 fw-bold '>ELK Platform</Nav.Link>
            <Nav.Link href="#blog" className='ms-5 '>Blog</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  
    </>
  )
}

export default Header
