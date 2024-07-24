import React from 'react'

import {Row, Col, Image} from 'react-bootstrap'

import { FaStar } from "react-icons/fa";

import amina from '../images/amina.jpg'

function Customer() {
  return (
    <div className='container-fluid' style={{backgroundColor:'#F7F7F7', height:'450px',marginTop:'80px'}}>
    
        <h4 style={{ marginLeft: '600px',position: 'relative', top: '80px' }}>WHAT OUR CUSTOMER SAYS</h4>
       
        <Row style={{marginLeft:'200px',marginTop:'120px'}}>
            <Col md={5}>
            
            <Row>
            <Col md={2} className="d-flex justify-content-center align-items-center">
            <Image src={amina} roundedCircle style={{ width: '80px', height: '80px' }} />

            </Col>
            <Col md={10}>

            <p>
            <p><FaStar  style={{ color: 'rgb(255, 165, 0)', fontSize: '24px' }}/>
            <FaStar  style={{ color: 'rgb(255, 165, 0)', fontSize: '24px' }}/>
            <FaStar  style={{ color: 'rgb(255, 165, 0)', fontSize: '24px' }}/>
            <FaStar  style={{ color: 'rgb(255, 165, 0)', fontSize: '24px' }}/>
            <FaStar  style={{ color: 'rgb(255, 165, 0)', fontSize: '24px' }}/>
            </p>
            “I just wanted to share a quick note and let you know that ELK app do a really help to make real money.
             I’m glad I decided to work with you. It’s really great how easy your websites are to update and manage.
              I never have any problem at all.<br/>
              <strong style={{display:'block'}}>- Ajeer Xanax - Nexa Mall</strong>

            </p>
            </Col>
            </Row>
            </Col>
            <Col md={5} style={{marginLeft:'20px'}}>
            
            <Row>
            <Col md={2} className="d-flex justify-content-center align-items-center">
            <Image src={amina} roundedCircle style={{ width: '80px', height: '80px' }} />

            </Col>
            <Col md={10}>

            <p>
            <p><FaStar  style={{ color: 'rgb(255, 165, 0)', fontSize: '24px' }}/>
            <FaStar  style={{ color: 'rgb(255, 165, 0)', fontSize: '24px' }}/>
            <FaStar  style={{ color: 'rgb(255, 165, 0)', fontSize: '24px' }}/>
            <FaStar  style={{ color: 'rgb(255, 165, 0)', fontSize: '24px' }}/>
            <FaStar  style={{ color: 'rgb(255, 165, 0)', fontSize: '24px' }}/>
            </p>
            “I just wanted to share a quick note and let you know that ELK app do a really help to make real money.
             I’m glad I decided to work with you. It’s really great how easy your websites are to update and manage.
              I never have any problem at all.<br/>
              <strong style={{display:'block'}}>- Ajeer Xanax - Nexa Mall</strong>


            </p>
            </Col>
            </Row>
            </Col>
        </Row>

        <p style={{marginLeft:'1200px',marginTop:'47px'}}>Preview<span>{" >>"}</span> <span style={{marginLeft:'30px'}}>Next<span>{" >>"}</span></span></p>
        
    </div>
  )
}

export default Customer
