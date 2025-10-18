import React, { useEffect, useState, useRef } from 'react';
import { Navbar, Nav, Image, Container, Button, NavDropdown, Form, ListGroup } from 'react-bootstrap';
import logo from '../assets/logo3.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../store/slices/authSlice';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HistoryIcon from '@mui/icons-material/History';
import axios from 'axios';

const MOCK_SUGGESTIONS = [
  'Honda CB Unicorn 2014', 'Vintage Car', 'CAR RENTALS', 'baby pink colour lehenga',
  'sound box', 'safety helmet', 'Cleaning Service', 'Electrician', 'Property for Rent',
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

  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const searchWrapperRef = useRef(null);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(storedHistory);
  }, []);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        const filteredSuggestions = MOCK_SUGGESTIONS.filter(suggestion =>
          suggestion.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        // Don't hide suggestions here, so history can be shown
      }
    }, 250);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchWrapperRef]);

  const handleSearchSubmit = (term) => {
    if (!term.trim()) return;

    // Update search history
    const newHistory = [term, ...searchHistory.filter(item => item.toLowerCase() !== term.toLowerCase())].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    
    setSearchTerm(term);
    setShowSuggestions(false);
    navigate(`/search/${term}`);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearchSubmit(suggestion);
  };
  
  const handleClearHistory = (e) => {
    e.stopPropagation();
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
    setShowSuggestions(false);
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
          padding: '0.5rem 0'
        }}
      >
        <Container>
          <Navbar.Brand href="/home" style={{ marginLeft: '-30px' }}>
            <Image 
              src={logo} 
              style={{ 
                height: '80px',
                width: '80px',
              }} 
            />
          </Navbar.Brand>
          
          <div 
            ref={searchWrapperRef} 
            className="my-2 order-3 order-lg-0 position-relative mx-auto" 
            style={{ width: '100%', maxWidth: '500px' }}
          >
            <Form
              className="d-flex w-100"
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
                autoComplete="off"
                style={{ borderRadius: '15px', width: '100%' }}
              />
            </Form>

            {showSuggestions && (
              <ListGroup className="search-suggestions">
                {searchTerm.length === 0 && searchHistory.length > 0 && (
                  <>
                    <ListGroup.Item className="history-header">
                      <span>Recent Searches</span>
                      <button className="clear-history-btn" onClick={handleClearHistory}>Clear</button>
                    </ListGroup.Item>
                    {searchHistory.map((item, index) => (
                      <ListGroup.Item
                        key={`history-${index}`}
                        action
                        onClick={() => handleSuggestionClick(item)}
                        className="history-item"
                      >
                        <HistoryIcon className="history-icon" />
                        {item}
                      </ListGroup.Item>
                    ))}
                  </>
                )}

                {searchTerm.length > 0 && suggestions.length > 0 && (
                  suggestions.map((suggestion, index) => (
                    <ListGroup.Item
                      key={`suggestion-${index}`}
                      action
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </ListGroup.Item>
                  ))
                )}
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
                  {location.pathname !== '/chat' && (
                    <ChatIcon
                      onClick={() => navigate('/chat')}
                      fontSize="large"
                      sx={{ color: '#4FBBB4', cursor: 'pointer' }}
                    />
                  )}
                  {location.pathname !== '/mywishlist' && (
                    <FavoriteBorderIcon
                      onClick={() => navigate('/mywishlist')}
                      fontSize="large"
                      sx={{ color: '#4FBBB4', cursor: 'pointer' }}
                    />
                  )}
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