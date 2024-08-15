// import React from 'react'
// import { useState } from 'react';

// import { db } from '../firebase';
// import { collection, addDoc } from 'firebase/firestore';

// import { Container, Row,Col,Form,Button, FloatingLabel, Modal } from 'react-bootstrap'
// import Carousel from 'react-bootstrap/Carousel';

// import working from'../images/working.jpeg'
// import amina from '../images/amina.jpg'

// function Article() {
//   const [show, setShow] = useState(false);
//   const [currentImage, setCurrentImage] = useState('');

//   const handleClose = () => setShow(false);
//   const handleShow = (imageSrc) => {
//     setCurrentImage(imageSrc);
//     setShow(true);
//   }

//   const [email, setEmail] = useState('');
//   const [showModal, setShowModal] = useState(false);

//   const handleSubscribe = async (e) => {
//     e.preventDefault();
//     if (email) {
//       try {
//         const emailDoc = await addDoc(collection(db, 'emails'), {
//           email: email,
//         });
//         console.log('Document written with ID: ', emailDoc.id);
//         setEmail('');
//         setShowModal(true);
//       } catch (error) {
//         console.error('Error adding document: ', error);
//       }
//     }
//   }
//   const handleCloseModal = () => setShowModal(false);
//   return (
//     <Container fluid className=" justify-content-center" style={{ marginTop:'89px' }} id='blog'>
//       <h5 style={{marginLeft:'600px'}}>ARTICLES AND BLOGS</h5> 
//       <p style={{marginLeft:'630px'}}>Recent Blog articles</p>


//       <Carousel indicators={false} style={{height: '200px', width:'400px',marginLeft:'500px',marginTop:'47px'}}>
//         <Carousel.Item>
//           {/* <Row> */}
//             {/* <Col> */}
//               <img
//                 className="d-block w-100"
//                 src={working}
//                 alt="First image"
//               />
//               <p style={{fontSize:'12px'}}>New Resort in Peralassery <span style={{marginLeft:'200px'}}>12-4-2024</span> </p>
              
//             {/* </Col> */}
//             {/* <Col> */}
//             {/* <img
//                 className="d-block w-100"
//                 src={amina}
//                 alt="second image"
//               />
//               <p style={{fontSize:'12px'}}>Story of Amina Ali<span style={{marginLeft:'140px'}}>3-6-2024</span> </p>
//             </Col>
//             <Col>
//             <img
//                 className="d-block w-100"
//                 src={amina}
//                 alt="third image"
//               />
//               <p style={{fontSize:'12px'}}>Countdown Started<span style={{marginLeft:'130px'}}>7-6-2024</span> </p>
//             </Col>
//           </Row> */}
//         </Carousel.Item>
//         <Carousel.Item>
//         {/* <Row>
//             <Col> */}
//               <img
//                 className="d-block w-100"
//                 src={working}
//                 alt="First image"
//               />
//               <p style={{fontSize:'12px'}}>New Resort in Peralassery <span style={{marginLeft:'200px'}}>12-4-2024</span> </p>
              
//             {/* </Col>
//             <Col>
//             <img
//                 className="d-block w-100"
//                 src={amina}
//                 alt="second image"
//               />
//               <p style={{fontSize:'12px'}}>Story of Amina Ali<span style={{marginLeft:'140px'}}>3-6-2024</span> </p>
//             </Col>
//             <Col>
//             <img
//                 className="d-block w-100"
//                 src={amina}
//                 alt="third image"
//               />
//               <p style={{fontSize:'12px'}}>Countdown Started<span style={{marginLeft:'130px'}}>7-6-2024</span> </p>
//             </Col>
//           </Row> */}
//         </Carousel.Item>
//         <Carousel.Item>
//           {/* <Row>
//             <Col> */}
//               <img
//                 className="d-block w-100"
//                 src={working}
//                 alt="First image"
//               />
//               <p style={{fontSize:'12px'}}>New Resort in Peralassery <span style={{marginLeft:'200px'}}>12-4-2024</span> </p>
              
//             {/* </Col>
//             <Col>
//             <img
//                 className="d-block w-100"
//                 src={amina}
//                 alt="second image"
//               />
//               <p style={{fontSize:'12px'}}>Story of Amina Ali<span style={{marginLeft:'140px'}}>3-6-2024</span> </p>
//             </Col>
//             <Col>
//             <img
//                 className="d-block w-100"
//                 src={amina}
//                 alt="third image"
//               />
//               <p style={{fontSize:'12px'}}>Countdown Started<span style={{marginLeft:'130px'}}>7-6-2024</span> </p>
//             </Col>
//           </Row> */}
//           </Carousel.Item>
        
//       </Carousel>

//       <div className="mt-5 text-center" style={{marginTop:'800px'}}>
//         <h6 style={{marginTop:'127px'}}>SUBSCRIBE TO OUR NEWSLETTER AND BLOG</h6>
//         {/* <Form  >
//           <Form.Control
//             type="email"
//             placeholder="Enter your email"
//             className="mr-2"
//             style={{ width: '686px', marginLeft:'300px', marginTop:'20px',backgroundColor: '#FDD77F',borderRadius:'21px',borderColor:'#FDD77F'}}
//           />
//           <Button style={{ marginLeft:'7px', marginTop:'20px',backgroundColor: '#4FBBB4',borderRadius:'21px',borderColor:'#4FBBB4'}}>Subscribe</Button>
//         </Form> */}
        
//         <Form onSubmit={handleSubscribe}>
//       <Row style={{marginTop:'20px',marginBottom:'20px'}}>
//         <Col xs={7} >
//           <Form.Control value={email}
//             onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" style={{marginLeft:'450px',width:'600px',height:'40px',backgroundColor: '#FDD77F',borderRadius:'21px',borderColor:'#FDD77F'}} />
//         </Col>
//         <Col>
//         <Button type='submit' style={{ backgroundColor: '#4FBBB4',borderRadius:'21px',borderColor:'#4FBBB4',width:'200px',height:'40px'}}>Subscribe</Button>
//         </Col>
//       </Row>
//     </Form>
//     <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Success</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Email added successfully!</Modal.Body>
//         {/* <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//         </Modal.Footer> */}
//       </Modal>
//         <p className="mt-2" >
//           By clicking "Subscribe" I agree to ELK Company Privacy Policy and Terms and Conditions
//         </p>
//       </div>
//     </Container>
 
    
//   )
// }

// export default Article

import React from 'react'
import { useState } from 'react';
import './Home.css'
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

import { Container, Row,Col,Form,Button, Modal } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel';

import working from'../images/working.jpeg'

function Article() {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        const emailDoc = await addDoc(collection(db, 'emails'), {
          email: email,
        });
        console.log('Document written with ID: ', emailDoc.id);
        setEmail('');
        setShowModal(true);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  }
  const handleCloseModal = () => setShowModal(false);
  return (
    <>
      <Container className='mt-5 text-center' fluid id='blog' >
        <h5>ARTICLES AND BLOGS</h5> 
        <p>Recent Blog articles</p>
        <Row className="justify-content-center mt-5">
          <Col xs={12} sm={12} md={4} lg={4}>
            <Carousel indicators={false}>
              <Carousel.Item>
                <img className="d-block w-100" src={working} alt="First img" />
                <p style={{fontSize:'12px', display:'flex',justifyContent:'space-between'}}><span>New Resort in Peralassery </span><span >12-4-2024</span> </p>
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={working} alt="First img" />
                <p style={{fontSize:'12px', display:'flex',justifyContent:'space-between'}}><span>New Resort in Peralassery </span><span >12-4-2024</span> </p>
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={working} alt="First img"/>
                <p style={{fontSize:'12px', display:'flex',justifyContent:'space-between'}}><span>New Resort in Peralassery </span><span >12-4-2024</span> </p>
              </Carousel.Item>      
            </Carousel>
          </Col>
        </Row> 
        <div className="mt-5 text-center">
          <h6 className='mt-5'>SUBSCRIBE TO OUR NEWSLETTER AND BLOG</h6>        
          <Form onSubmit={handleSubscribe}>
            <div className='form'>
              <Form.Control className='articleinput' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"/>
              <div className='space'></div>
              <Button className='articlebutton' type='submit'>Subscribe</Button>
            </div>
          </Form>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Email added successfully!</Modal.Body>
          </Modal>
          <p className="mt-2" >
          I agree to <a href="/privacy" target="_blank">ELK Company Privacy Policy</a> and <a href="/terms" target="_blank">Terms and Conditions</a>.

          </p>
        </div>
      </Container>
    </>   
  )
}

export default Article
