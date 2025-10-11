import React, { useEffect, useState, useRef } from 'react';
import { Navbar, Nav, Image, Container, Button, NavDropdown, Form, ListGroup } from 'react-bootstrap';
import logo from '../assets/logo3.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../store/slices/authSlice';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';

// A mock list of potential search terms. In a real app, this would come from a server.
const MOCK_SUGGESTIONS = [
  'Honda CB Unicorn 2014',
  'Vintage Car',
  'CAR RENTALS',
  'baby pink colour lehenga',
  'sound box',
  'safety helmet',
  'Cleaning Service',
  'Electrician',
  'Property for Rent',
  'Tools for Hire',
];


function AppHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const location = useLocation();
  const token1 = localStorage.getItem('elk_authorization_token');
  const [unsavedAd, setUnsavedAd] = useState({});
  const [showModal, setShowModal] = useState(false);

  // States for search and suggestions
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchWrapperRef = useRef(null); // To detect clicks outside the search area

  // This effect filters suggestions based on user input
  useEffect(() => {
    // We use a timeout to avoid searching on every single keystroke (this is called "debouncing")
    const handler = setTimeout(() => {
      if (searchTerm) {
        const filteredSuggestions = MOCK_SUGGESTIONS.filter(suggestion =>
          suggestion.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 250); // Wait 250ms after the user stops typing

    return () => {
      clearTimeout(handler); // Cleanup the timeout
    };
  }, [searchTerm]);

  // This effect closes the suggestions when you click outside of the search bar
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchWrapperRef]);

  const handleSearchSubmit = (term) => {
    if (!term.trim()) return; // Don't search if the term is empty
    setSearchTerm(term);
    setShowSuggestions(false);
    navigate(`/search/${term}`);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearchSubmit(suggestion);
  };

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
          headers: { authorization: `Bearer ${token1}`, 'Content-Type': 'application/json' }
        });
        setUnsavedAd(response.data);
      } catch (error) {
        //
      }
    };
    if (token1){
      fetchAd();
    }
  }, [token1]);

  const handleLogout = () => {
    localStorage.removeItem('elk_authorization_token');
    dispatch(clearUser());
    navigate('/home');
    window.location.reload();
  };
  
  return (
    <>
      <Navbar 
        expand="lg" 
        sticky="top"
        className={'navbar-scrolled'}
        style={{
          backgroundColor: "#FFDA3F",
          zIndex: 1020,
          padding: '0.5rem 0' /* Added padding to make header taller */
        }}
      >
        <Container>
          <Navbar.Brand href="/home" style={{ marginLeft: '-30px' }}>
            <Image 
              src={logo} 
              style={{ 
                height: '80px', /* Increased logo size */
                width: '80px',
              }} 
            />
          </Navbar.Brand>
          
          {/* We wrap the search bar and suggestions in a div to handle outside clicks */}
          <div ref={searchWrapperRef} className="w-100 my-2 order-3 order-lg-0 d-flex justify-content-center position-relative">
            <Form
              className="d-flex w-100 w-lg-50"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchSubmit(searchTerm);
              }}
            >
              <Form.Control
                type="search"
                placeholder="Search ads..."
                className="me-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                autoComplete="off" // Disable browser's default autocomplete
                style={{ borderRadius: '15px', maxWidth: '500px', width: '100%' }}
              />
            </Form>

            {/* Conditionally render the suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <ListGroup className="search-suggestions">
                {suggestions.map((suggestion, index) => (
                  <ListGroup.Item
                    key={index}
                    action
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto d-flex align-items-center gap-3">
              
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
                  style={{ all: 'unset', color: '#FFFFFF', margin: '0px 20px', cursor: 'pointer' }}
                  onClick={() => navigate('/login')}
                >
                  <strong>Login</strong>
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
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