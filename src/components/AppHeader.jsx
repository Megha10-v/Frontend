import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Image, Container, Button, NavDropdown, Form } from 'react-bootstrap';
import logo from '../assets/logo3.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../store/slices/authSlice';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';

function AppHeader() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const location = useLocation();
  const token1 = localStorage.getItem('elk_authorization_token');
  const [unsavedAd, setUnsavedAd] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleContinue = () => {
    setShowModal(false);
    navigate(`/post-ad`);
  };

  const handleDiscard = () => {
    setShowModal(false);
    navigate('/home');
  };
  useEffect(() => {    
    const fetchAd = async () => {      
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/get_recent_unsaved_ad`, { 
          headers: {
              'authorization': `Bearer ${token1}`,
              'Content-Type': 'application/json'
          }
        });
        setUnsavedAd(response.data);
      } catch (error) {
        console.log(error);     
      }
    };
    if (token1){
      fetchAd();
      console.log(user)
    }
  }, [token1]);


  const handleLogout = () => {
    localStorage.removeItem('elk_authorization_token');
    localStorage.removeItem('elk_is_admin');
    localStorage.removeItem('elk_user_id');
    dispatch(clearUser)
    navigate('/home');
    window.location.reload();
  };
  
  return (
    <>
      <Navbar expand="lg" style={{backgroundColor: "#FFDA3F", marginBottom: window.innerWidth <= 768?'0px':"20px"}}>
        <Container>
          <Navbar.Brand href="/" className="align-items-center">
            <Image src={logo} style={{ width: '100%', height: '70px',width:"70px", border: 'none' }} />
          </Navbar.Brand>
          <div className="w-100 my-2 order-3 order-lg-0 d-flex justify-content-center">
            <Form
              className="d-flex w-100 w-lg-50"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/search/${searchTerm}`);
              }}
            >
              <Form.Control
                type="search"
                placeholder="Search ads..."
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: '15px',maxWidth: '500px',width: '100%' }}
              />
            </Form>
          </div>
          {/* <Form className="d-flex flex-grow-1 my-2 my-lg-0 mx-lg-3" onSubmit={(e) => { e.preventDefault(); navigate(`/search/${searchTerm}`); }}>
            <Form.Control
              type="search"
              placeholder="Search ads..."
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderRadius: '15px'}}
            />
          </Form> */}
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" style={{ zIndex: '1000' }}>
            <Nav className="ms-auto d-flex flex-row flex-nowrap align-items-center gap-3 justify-content-end w-100">
              {location.pathname !== '/post-ad' && (
                <Button
                  className="d-flex align-items-center"
                  style={{
                    gap: '10px',
                    borderRadius: '15px',
                    backgroundColor: '#4FBBB4',
                    borderColor: '#4FBBB4',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={() =>
                    !token1
                      ? navigate('/login')
                      : Object.keys(unsavedAd).length !== 0
                      ? setShowModal(true)
                      : navigate('/post-ad')
                  }
                >
                  <i className="bi bi-plus-circle"></i> Place Your Ad
                </Button>
              )}

              {token1 && (
                <>
                  <ChatIcon
                    onClick={() => navigate('/chat')}
                    fontSize="large"
                    sx={{ color: '#4FBBB4', cursor: 'pointer' }}
                  />
                  <FavoriteBorderIcon
                    onClick={() => navigate('/mywishlist')}
                    fontSize="large"
                    sx={{ color: '#4FBBB4', cursor: 'pointer' }}
                  />
                </>
              )}

              {token1 ? (
               
                <NavDropdown
                  title={<span style={{ color: 'white' }}>{user?.name || 'My Account'}</span>}
                  id="basic-nav-dropdown"
                  style={{
                    border: '2px solid #4FBBB4',
                    borderRadius: '8px',
                    padding: '0 2px',
                  }}
                >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Button
                  style={{
                    all: 'unset',
                    color: '#FFFFFF',
                    margin: '0px 20px',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate('/login')}
                >
                  <strong>Login</strong>
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
          {/* <Navbar.Collapse id="navbar-nav" style={{ zIndex: '1000' }}> 
            <Nav className ='ms-auto d-flex align-items-center flex-wrap gap-2 justify-content-end'>
              {location.pathname !== '/post-ad' && (
                <Button
                  className="ms-2 d-flex align-items-center"
                  style={{ gap: '10px', borderRadius: '15px', backgroundColor: '#4FBBB4', borderColor: '#4FBBB4', whiteSpace: 'nowrap' }}
                  onClick={() => !token1?navigate('/login') : (Object.keys(unsavedAd).length !== 0)? setShowModal(true) : navigate('/post-ad')
                  }>
                  <i className="bi bi-plus-circle"></i> Place Your Ad
                </Button>
                )
              }
              {
                token1 ? (
                  <>
                    <ChatIcon onClick={()=>navigate('/chat')} fontSize="large" sx={{ color: '#4FBBB4', margin: "0 20px", cursor: 'pointer' }}/>
                    <FavoriteBorderIcon onClick={()=>navigate('/mywishlist')} fontSize="large" sx={{ color: '#4FBBB4', marginRight: "20px", cursor: 'pointer' }}/>
                  </>
                ) : (
                  <></>
                )
              }
              {token1 ? (
                <NavDropdown
                  title={<span style={{ color: "white"}}>{user?.name || "My Account"}</span>}
                  id="basic-nav-dropdown"
                  style={{
                    border: "2px solid #4FBBB4",
                    borderRadius: "8px",
                    padding: "0 2px",
                  }}
                >
                  <NavDropdown.Item href="/profile" >Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
                ) : (
                  <Button style={{ all: "unset", color:'#FFFFFF', border:'2px black', margin:"0px 20px", cursor:'pointer' }} onClick={() => navigate('/login')}>
                      <strong>Login</strong>
                  </Button>
                )
              }
            </Nav>
          </Navbar.Collapse> */}
        </Container>
        {showModal && unsavedAd && (
          <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
           <div className="modal-dialog modal-dialog-centered modal-sm modal-md modal-lg" role="document">

              <div className="modal-content rounded-3 shadow">
                <div className="modal-header">
                  <h5 className="modal-title">Continue Editing?</h5>
                </div>
                <div className="modal-body">
                  <p>You have an unsaved ad: <strong>{unsavedAd.title}</strong>.</p>
                  <p>Would you like to continue editing it or discard and go back to home?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-success" onClick={handleContinue}>Continue Editing</button>
                  <button className="btn btn-secondary" onClick={handleDiscard}>Discard & Go Home</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Navbar>
    </>
  );
}

export default AppHeader;
