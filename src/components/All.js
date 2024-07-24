import React from 'react'

import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {InputGroup , FormControl} from 'react-bootstrap'
import { IoSearch } from "react-icons/io5";
import { GoArrowDown } from "react-icons/go";

import car from '../images/car.jpeg'
import properties from '../images/properties.jpg'
import helicopter from '../images/helicopter.jpg'
import tools from '../images/tools.jpeg'
import carpentry from '../images/carpentry.jpeg'
import painting from '../images/painting.jpeg'
import carwashing from '../images/carwashing.jpg'
import repairing from '../images/repairing.jpg'

const All = () => {
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <InputGroup style={{ width: '700px' }}>
        <InputGroup.Text id="search-addon" style={{ borderRadius: '15px 0px 0px 15px' }}>
          <IoSearch />
        </InputGroup.Text>
        <FormControl
          placeholder="Search for properties, cars and more"
          aria-label="Search"
          aria-describedby="search-addon"
          style={{ borderRadius: '0px 15px 15px 0px' }}
        />
      </InputGroup>
      <Button as="input" type="submit" value="Search" style={{ marginLeft: '20px', borderRadius: '15px 15px 15px 15px',width: '150px',
        backgroundColor: '#00b3b3',borderColor: '#00b3b3'
       }}  />
    </div>

<Container style={{ marginTop: '50px' }}>
      <Row>
        <Col md={4} className="text-center">
          <h6>RENTAL'S</h6>
          <Row>
            <Col xs={6}>
              {/* <Card>
                <Card.Img variant="top" src={car} />
                <Card.Body>
                  <Card.Title>Cars</Card.Title>
                </Card.Body>
              </Card> */}
              <Image src={car} className="img rounded" alt="car" style={{width: '170px', height: '170px' }} /><br />
              <p>CARS</p>
            </Col>
            <Col xs={6}>
              <Image src={properties} className="img rounded" alt="properties" style={{ width: '170px', height: '170px'}} /> <br/>
              <p>PROPERTIES</p>
            </Col>
            <Col xs={6}>
            <Image src={helicopter} className="img rounded" alt="helicopter" style={{ width: '170px', height: '170px'}} /> <br/>
              <p>HELICOPTERS</p>
            </Col>
            <Col xs={6}>
            <Image src={tools} className="img rounded" alt="tools" style={{ width: '170px', height: '170px'}} /> <br/>
              <p>TOOLS</p>
             </Col>

          </Row>
          <Button  className="mt-3 text-dark" style={{ width: '350px', height: '40px',borderRadius: '18px' ,backgroundColor: '#FDD77F',borderColor: '#FDD77F'}}>
            Discover more Rentals <GoArrowDown size={24}/>
          </Button>
        </Col>
        <Col md={4} className="text-center">
          <div style={{background: 'linear-gradient(180deg, #F5CC40 0%, #4FBBB4 100%)', padding: '20px', borderRadius: '15px',  width: '400px', height: '500px' }}>
            <b><h6 style={{marginTop: '63px'}}>TURN YOUR TALENTS INTO <br/>
            CASH: EARN MONEY WITH ELK <br/> PLATFORM SERVICE JOBS AND<br/> RENTING OPPORTUNITIES!</h6></b>
            <p  style={{marginTop: '28px'}}>
              In today’s gig economy, there are<br/> countless opportunities to<br/> leverage your skills and assets to<br/> earn extra income.
              ELK Platform<br/>emerges as a versatile solution, <br/>offering both service jobs and<br/> renting opportunities for<br/> individuals
              looking to turn their<br/> talents into cash.
            </p>
          </div>
        </Col>
        <Col md={4} className="text-center">
          <h6>SERVICE JOB'S</h6>
          <Row>
            <Col xs={6}>
              <Image src={carwashing} className="img rounded" alt="carwashing" style={{width: '170px', height: '170px' }} /><br />
              <p>CAR WASHING</p>
            </Col>
            <Col xs={6}>
              <Image src={repairing} className="img rounded" alt="repairing" style={{ width: '170px', height: '170px'}} /> <br/>
              <p>REPAIRING</p>
            </Col>
            <Col xs={6}>
            <Image src={painting} className="img rounded" alt="painting" style={{ width: '170px', height: '170px'}} /> <br/>
              <p>PAINTING</p>
            </Col>
            <Col xs={6}>
            <Image src={carpentry} className="img rounded" alt="carpentry" style={{ width: '170px', height: '170px'}} /> <br/>
              <p>CARPENTRY</p>
             </Col>

          </Row>
          <Button  className="mt-3 text-dark" style={{ width: '350px', height: '40px',borderRadius: '18px' ,backgroundColor: '#FDD77F',borderColor: '#FDD77F'}}>
            Discover more Service jobs <GoArrowDown size={24}/>
          </Button>
        </Col>
      </Row>
    </Container>
    
    </>
  )
}

export default All
