import React from "react";
import { useState } from "react";
import {useRef} from "react";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import {InputGroup , FormControl} from 'react-bootstrap'
import { Row, Col, Button } from 'react-bootstrap';
import { FaRegBell } from "react-icons/fa"
import { IoSearch } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import { Link } from 'react-router-dom';

import overjoyed from '../images/overjoyed.jpeg'; 
import app1 from '../images/app1.jpg'
import app2 from '../images/app2.jpg'
import app3 from '../images/app3.jpg'
import layer1 from '../images/layer1.png'
import layer2 from '../images/layer2.png'
import './Home.css'
import astronaut from '../images/astronaut.jpg'

import CustomNav from "./CustomNav";
import Article from "./Article";
import Customer from './Customer';
import Footer from "./Footer";
import Header from "./Header";


function Home() {

  const [expandedServiceJobs, setExpandedServiceJobs] = useState(false);
  const [expandedRentingOpportunities, setExpandedRentingOpportunities] = useState(false);
  const [expandedGettingStarted, setExpandedGettingStarted] = useState(false);
  const [expandedMaximizingEarnings, setExpandedMaximizingEarnings] = useState(false);

  
  return (
    <div>
      <Header />
      <Navbar expand="lg" className="mb-0 pb-0" style={{ background: '#4FBBB4', height: '80px' }}>
      <Container fluid>
        <Nav className="w-100 d-flex justify-content-between align-items-center">
          {/* <Nav.Link className="text-white" style={{ marginLeft: '100px' }}>
            <FaRegBell /> Notifications
          </Nav.Link> */}
          <Nav className="d-flex align-items-center" style={{ marginLeft: '1200px' }}>
            {/* <Nav.Link href="#search" className="text-white mx-3">
              <IoSearch /> My Searches
            </Nav.Link>
            <Nav.Link href="#favorites" className="text-white mx-3">
              <MdFavoriteBorder /> Favourites
            </Nav.Link>
            <Nav.Link href="#searchbar" className="mx-3">
              <InputGroup>
                <InputGroup.Text id="search-addon" style={{ borderRadius: '53px 0px 0px 53px', backgroundColor: 'rgba(255, 255, 255, 0.62)' }}>
                  <IoSearch />
                </InputGroup.Text>
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  style={{ borderRadius: '0px 53px 53px 0px', backgroundColor: 'rgba(255, 255, 255, 0.62)', width: '300px' }}
                />
              </InputGroup>
            </Nav.Link>
            <Nav.Link href="#elk" className="mx-3">
              <InputGroup>
                <InputGroup.Text id="ad-addon" style={{ borderRadius: '53px 0px 0px 53px', backgroundColor: 'rgba(255, 255, 255, 0.62)' }}>
                  <IoMdAddCircleOutline />
                </InputGroup.Text>
                <FormControl
                  placeholder="Place your Ad"
                  aria-label="Ad"
                  aria-describedby="ad-addon"
                  style={{ borderRadius: '0px 53px 53px 0px', backgroundColor: 'rgba(255, 255, 255, 0.62)' }}
                />
              </InputGroup>
            </Nav.Link> */}
            {/* <Nav.Link href="#faq" className="text-white mx-3" >
              FAQ
            </Nav.Link> */}
            <Nav.Link href="#contacts" className="text-white mx-3">
              Contacts
            </Nav.Link>
            <Nav.Link   as={Link} to="/careers" className="text-white mx-3">
              Careers
            </Nav.Link>
          </Nav>
        </Nav>
      </Container>
    </Navbar>
      
  <Container fluid className="position-relative " style={{ maxWidth: "100%", height: "858px" }} >
  <div className="position-absolute top-0 start-0 end-0 bottom-0"
       style={{ 
         backgroundImage: `url(${overjoyed})`,
         backgroundSize: 'cover',
         backgroundPosition: 'center',
         backgroundRepeat: 'no-repeat',
         transform: 'scaleX(-1)',
         zIndex: "-1" // Ensure the background is behind the content
       }} id='home'>
  </div>
  <h1 className="position-absolute text-white" style={{ left: '261px', top: '120px' }}>
    TURN YOUR STUFF AND SERVICES <br /> INTO CASH MACHINES
  </h1>
  <Container >
    <Image src={app1} className="img rounded" alt="app1" style={{ width: '189px', height: '336px', marginTop:'261px', marginLeft:'200px' }} />
    <Image src={app2} className="img rounded" alt="app2" style={{ width: '189px', height: '336px',marginTop:'261px', marginLeft:'20px' }} />
    <Image src={app3} className="img rounded" alt="app3" style={{ width: '189px', height: '336px',marginTop:'261px', marginLeft:'20px' }} /> <br />
    <Button variant="primary" className="download-btn text-white" style={{ width: '189px', height: '57px', marginLeft:'200px', marginTop:'42px'}}>Download App <FiDownload/> <i className="fas fa-download"></i></Button>
    <Image src={layer1} className="img rounded" alt="layer1" style={{ width: '189px', height: '57px',marginTop:'42px', marginLeft:'20px' }} />
    <Image src={layer2} className="img rounded" alt="layer1" style={{ width: '189px', height: '57px',marginTop:'42px', marginLeft:'20px'  }} />
  </Container>
</Container>



{/* <Container>
  <h6  className="text-center fw-bold " style={{ marginLeft: '100px', marginTop: '70px' }}>EXPLORE RENTING AND <br /> SERVICES JOBS OPPORTUNITIES THROUGH ELK PLATFORM</h6>
  <Container>

    <CustomNav/>
  </Container>



</Container> */}

<Container fluid style={{ 
         
         backgroundImage: `url(${astronaut})`,
         backgroundSize: 'cover',
         backgroundPosition: 'center',
         backgroundRepeat: 'no-repeat',
         zIndex: "-1" // Ensure the background is behind the content
       }} id='aboutus'>
      <Row className="align-items-center" style={{ height: '100vh' }}>
        <Col md={6} style={{ paddingLeft: '0' }}>
          
          
        </Col>
        <Col md={6} style={{ padding: '40px', color: '#fff' }}>
          <div style={{ padding: '20px' }}>
            <h4>WHO WE ARE?</h4>
            <p>
              We provide you with the tools to easily transform your assets and<br/>
              services into lucrative opportunities. ELK enables you to
              modernize your<br/> rental business effortlessly. Our user-friendly
              platform ensures a smooth <br/>experience, simplifying everything from
              inventory management to<br/> service tasks, all within a single,
              convenient interface.
            </p>
            <h4 style={{marginTop:'70px'}}>MESSAGE FROM FOUNDER</h4>
            <p>
              Lorem Ipsum has been the industry's standard dummy text ever since<br/>
              the 1500s, when an unknown printer took a galley of type and<br/>
              scrambled.
              <br />
              <strong style={{display:'block', marginLeft: '150px'}}>- Jimson PS - Founder and MD of ELK</strong>
            </p>
          </div>
        </Col>
      </Row>
    </Container>

    <Container fluid style={{ overflowX: 'hidden' ,padding:0,backgroundColor:'#FDD77F'}} id='elk'>
      <Row className="justify-content-center no-gutters">
        <Col md={10} style={{marginTop:'70px'}}>
          <h3 className="text-center mt-4" >WHAT IS ELK PLATFORM?</h3>
          <p className="text-center description ">
            ELK Platform is a dynamic online marketplace that connects service providers with consumers seeking various services and rental options. It serves as a hub<br/> for individuals to offer their skills, expertise, and resources to a wide audience.
            Overview of its Service Jobs and Renting Opportunities. ELK Platform provides<br/>two primary avenues for earning money: service jobs and renting opportunities. Service jobs encompass a wide range of tasks and services that individuals <br/>can offer, while renting opportunities involve renting out personal belongings or spaces for temporary use.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={5} style={{marginTop:'70px', fontSize:'15px'}}>
          <h5>1- UNDERSTANDING SERVICE JOBS</h5>
          <p style={{marginTop:'50px'}} className="word-description">
            Explanation of Service Jobs on ELK Platform<br/>
            Service jobs on ELK Platform span diverse categories, including but not limited to: Home
             services such as cleaning, gardening, and repairs. Freelance work such as writing, graphic
             design, and programming. Personal services like tutoring, fitness coaching, and event planning.
            Types of Service Jobs Available Users can browse through an array of service
             job listings and select opportunities that align with their skills and interests. 
             Whether you're {expandedServiceJobs && ( <>a professional looking to offer your expertise or a homeowner
              needing assistance with household tasks, ELK Platform has options for you.</>)}
          </p>
          <span
            style={{ cursor: 'pointer',fontStyle:'italic' }}
            onClick={() => setExpandedServiceJobs(!expandedServiceJobs)}
          >
            {expandedServiceJobs ? 'Read Less<<' : 'Read More>>'}
          </span>
        </Col>
        <Col md={5} style={{marginTop:'70px', fontSize:'15px'}}>
          <h5>2- EXPLORING RENTING OPPORTUNITIES</h5>
          <p style={{marginTop:'50px'}} className="word-description">
            Overview of Renting Opportunities Provided by ELK Platform<br/>
            In addition to service jobs, ELK Platform offers renting opportunities for individuals with
             assets to spare. From tools and equipment to vehicles and properties, there's no shortage 
             of items and spaces available for rent.
            Examples of Items or Spaces that Can Be Rented
             Tools and machinery for construction or DIY projects. {expandedRentingOpportunities && ( <>Vehicles for transportation or special
              occasions. Properties for short-term accommodations or events.</>)}
          </p>
          <span
            style={{ cursor: 'pointer',fontStyle:'italic' }}
            onClick={() => setExpandedRentingOpportunities(!expandedRentingOpportunities)}
          > 
        {expandedRentingOpportunities ? 'Read Less<<' : 'Read More>>'}</span>
      
        </Col>
      </Row>
      <Row className="justify-content-center no-gutters" style={{marginBottom:'70px'}} >
        <Col md={5} style={{marginTop:'70px', fontSize:'15px'}}>
          <h5>3- HOW TO GET STARTED</h5>
          <p style={{marginTop:'50px'}} className="word-description">
            Steps to Join ELK Platform<br/>
            Getting started with ELK Platform
             is simple and straightforward. 
            Follow these steps to begin your journey:
            Sign up for an account on the ELK Platform website or mobile app. Complete your profile with accurate information
             and a compelling
             bio. Browse through available service jobs and renting
              opportunities. Apply for jobs or list
              your own services and rental items.{expandedGettingStarted && (<>Communicate with potential clients and finalize 
              agreements. Fulfill your commitments professionally and efficiently.</>)}
          </p>
          <span
             style={{ cursor: 'pointer',fontStyle:'italic' }}
            onClick={() => setExpandedGettingStarted(!expandedGettingStarted)}
          >
            {expandedGettingStarted ? 'Read Less<<' : 'Read More>>'}
          </span>
        </Col>
        <Col md={5} style={{marginTop:'70px', fontSize:'15px'}}>
          <h5>4- TIPS FOR MAXIMIZING EARNINGS</h5>
          <p style={{marginTop:'50px'}} className="word-description">
            Strategies for Success on ELK Platform<br/>
            To make the most out of your experience on ELK Platform, consider the following tips:
            Optimize Your Listings: Use descriptive titles, high-quality images, and competitive
             pricing to attract potential clients. Provide Excellent Service
            : Deliver exceptional results and prioritize customer satisfaction to build
             a positive reputation. Promote Your Services: Leverage social media, 
             word-of-mouth referrals, and
             networking opportunities to expand your client base. 
             {expandedMaximizingEarnings&&(<>Stay Organized: Keep track of your appointments, tasks, 
             and earnings to ensure smooth operations and timely delivery.</>)}
          </p>
          <span
            style={{cursor: 'pointer',fontStyle:'italic'  }}
            onClick={() => setExpandedMaximizingEarnings(!expandedMaximizingEarnings)}
          >
            {expandedMaximizingEarnings ? 'Read Less<<' : 'Read More>>'}
          </span>
        </Col>
      </Row>
    </Container>
 
    <Article/>
    {/* <Customer/> */}
    <Footer/>

 

    </div>
  );
}

export default Home;
