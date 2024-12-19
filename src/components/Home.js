import React from "react";
import { useState } from "react";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'
import { Carousel } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { Row, Col, Button } from 'react-bootstrap';
import { FiDownload } from "react-icons/fi";
import { Link } from 'react-router-dom';
import app1 from '../images/app1.jpg'
import app2 from '../images/app2.jpg'
import app3 from '../images/app3.jpg'
import layer1 from '../images/layer1.png'
import layer2 from '../images/layer2.png'
import './Home.css';
import astronaut from '../images/astronaut.jpg'

import Article from "./Article";
import Header from "./Header";



function Home() {

  const [expandedServiceJobs, setExpandedServiceJobs] = useState(false);
  const [expandedRentingOpportunities, setExpandedRentingOpportunities] = useState(false);
  const [expandedGettingStarted, setExpandedGettingStarted] = useState(false);
  const [expandedMaximizingEarnings, setExpandedMaximizingEarnings] = useState(false);

  
  return (
    <div>
      <Header />
      <Navbar className="mb-0 pb-0" style={{ background: '#4FBBB4', height: '80px' }}>
      <Container fluid>
        <Nav className="w-100 d-flex justify-content-end align-items-center">
          <Nav className="  d-flex align-items-center " >
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
            
            <Nav.Link as={Link} to="/privacy" className="text-white mx-3" onClick={() => {
          // Scroll to the 'aboutus' section on home page
          setTimeout(() => {
            const element = document.getElementById('contactsinprivacy');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 0);
        }}>Contacts</Nav.Link>
             
            <Nav.Link   as={Link} to="/careers" className="text-white mx-3">
              Careers
            </Nav.Link>
          </Nav>
        </Nav>
      </Container>
    </Navbar>
      
    <Container fluid className="position-relative " style={{ maxWidth: "100%", height: "100%" }} >
  <div className="position-absolute top-0 start-0 end-0 bottom-0 " id='home' >
  </div>
  <Container className="pt-md-5">
  <h1 className=" pt-4 mt-md-5  text-white">
    TURN YOUR STUFF AND SERVICES <span className="d-none d-md-inline"><br /></span> INTO CASH MACHINES
</h1>

    <Row className="text-center pb-5 mt-md-5 d-block d-md-none">
      <Carousel indicators={false} controls={true}>
        <Carousel.Item>
            <Image src={app1} className="img rounded" alt="app1" style={{ width: '189px', height: '336px'}} /><br/>
            <Button variant="primary" className="download-btn text-white" style={{ width: '189px', height: '57px', marginTop:'42px'}}>Download App <FiDownload/></Button>
        </Carousel.Item>
        <Carousel.Item>
            <Image src={app2} className="img rounded" alt="app2" style={{ width: '189px', height: '336px'}} /><br/>
            <Image src={layer1} className="img rounded" alt="layer1" style={{ width: '189px', height: '57px', marginTop:'42px'}} />
        </Carousel.Item>
        <Carousel.Item>
            <Image src={app3} className="img rounded" alt="app3" style={{ width: '189px', height: '336px'}} /><br/>
            <Image src={layer2} className="img rounded" alt="layer2" style={{ width: '189px', height: '57px', marginTop:'42px'}} />
        </Carousel.Item>
      </Carousel>
    </Row>

    <Row className="justify-content-start mt-md-5 d-none d-md-flex ">
        <Image src={app1} className="img rounded" alt="app1" style={{ width: '189px', height: '336px'}} />
        <Image src={app2} className="img rounded" alt="app2" style={{ width: '189px', height: '336px', marginLeft:'20px' }} />
        <Image src={app3} className="img rounded" alt="app3" style={{ width: '189px', height: '336px', marginLeft:'20px' }} />
    </Row>
    <Row className="justify-content-start d-none d-md-flex pb-5">
        <Button variant="primary" className="download-btn text-white" style={{ width: '189px', height: '57px', marginTop:'42px'}}>Download App <FiDownload/></Button>
        <Image src={layer1} className="img rounded" alt="layer1" style={{ width: '189px', height: '57px', marginTop:'42px', marginLeft:'20px' }} />
        <Image src={layer2} className="img rounded" alt="layer2" style={{ width: '189px', height: '57px', marginTop:'42px', marginLeft:'20px'  }} />
    </Row>    
</Container>
</Container>





{/* <Container>
  <h6  className="text-center fw-bold " style={{ marginLeft: '100px', marginTop: '70px' }}>EXPLORE RENTING AND <br /> SERVICES JOBS OPPORTUNITIES THROUGH ELK PLATFORM</h6>
  <Container>

    <CustomNav/>
  </Container>



</Container> */}

<Container fluid style={{ 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(${astronaut})`,
  backgroundSize: 'cover',
  backgroundPosition: '20%',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  padding: '0',
  margin: '0',
  zIndex: "-1"
}} id='aboutus'>
      <Row className="align-items-center" >
        <Col md={6} style={{ paddingLeft: '0' }}>
          
          
        </Col>
        <Col md={6} style={{ padding: '40px', color: '#fff' }}>
          <div style={{ padding: '20px' }}>
            <h4>WHO WE ARE?</h4>
            <p>
            ELK is an online platform for renting and services, making it simple to get what you need with a single click.
             We give you the tools to easily turn your assets and services into money-making opportunities. 
             ELK helps you modernize your rental business with ease. Our user-friendly platform makes everything simple, from managing inventory to handling service tasks, all in one place. 
            With ELK, property owners can grow their business without any hassle, while customers benefit from a seamless rental experience and quick access to services.
            </p>
            <h4 style={{marginTop:'70px'}}>MESSAGE FROM FOUNDER</h4>
            <p>
            The future of business is out of this world.
              <br />
              <strong className='d-flex justify-content-end'>- Jimson PS<br/> Founder and MD of ELK</strong>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
    <Container fluid style={{ overflowX: 'hidden' ,padding:0, backgroundColor:'#FDD77F'}} id='elk'>
      <Row style={{width:'90%',marginLeft:'5%'}} className="justify-content-center no-gutters">
        <Col md={10} className="mt-5">
          <h3 className="text-center mt-4">WHAT IS ELK PLATFORM?</h3>
          <p className="text-center description">
            ELK Platform is a dynamic online marketplace that connects service providers with consumers seeking various services and rental options. It serves as a hub for individuals to offer their skills, expertise, and resources to a wide audience.
            Overview of its Service Jobs and Renting Opportunities. ELK Platform provides two primary avenues for earning money: service jobs and renting opportunities. Service jobs encompass a wide range of tasks and services that individuals can offer, while renting opportunities involve renting out personal belongings or spaces for temporary use.
          </p>
        </Col>
      </Row>
      <Row style={{width:'90%',marginLeft:'5%'}} className="justify-content-center no-gutters">
        <Col md={5} className="mt-5" style={{fontSize:'15px'}}>
          <h5>1- UNDERSTANDING SERVICE JOBS</h5>
          <p className="mt-3 word-description">
            Explanation of Service Jobs on ELK Platform<br/>
            {/* Service jobs on ELK Platform span diverse categories, including but not limited to: Home
             services such as cleaning, gardening, and repairs. Freelance work such as writing, graphic
             design, and programming. Personal services like tutoring, fitness coaching, and event planning.
            Types of Service Jobs Available Users can browse through an array of service
             job listings and select opportunities that align with their skills and interests. 
             Whether you're {expandedServiceJobs && ( <>a professional looking to offer your expertise or a homeowner
              needing assistance with household tasks, ELK Platform has options for you.</>)} */}
              The ELK BUSINESS HUB is an online platform which acts as a meeting point
              between people who want to perform some services and people who need them.
              Whether you are a professional who wants to offer his services or a client in
              search of a professional, ELK is the solution. In addition to this, the platform
              provides various categories for different services including home services,
              freelance services and many more. {expandedServiceJobs && (<>It aims at providing an efficient platform that
              brings together people who need certain services with those who can provide
              them at their convenience.</>)}
          </p>
          <span
            style={{ cursor: 'pointer',fontStyle:'italic' }}
            onClick={() => setExpandedServiceJobs(!expandedServiceJobs)}
          >
            {expandedServiceJobs ? 'Read Less<<' : 'Read More>>'}
          </span>
        </Col>
        <Col md={5} className="mt-5" style={{fontSize:'15px'}}>
          <h5>2- EXPLORING RENTING OPPORTUNITIES</h5>
          <p className="mt-3 word-description">
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
      <Row style={{width:'90%',marginLeft:'5%'}} className="justify-content-center no-gutters mb-5">
        <Col md={5} className="mt-5" style={{fontSize:'15px'}}>
          <h5>3- HOW TO GET STARTED</h5>
          <p className="mt-3 word-description">
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
        <Col md={5} className="mt-5" style={{fontSize:'15px'}}>
          <h5>4- TIPS FOR MAXIMIZING EARNINGS</h5>
          <p className="mt-3 word-description">
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
    {/* <Footer/> */}

 

    </div>
  );
}

export default Home;
