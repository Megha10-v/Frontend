import React, { useEffect, useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useCookies } from "react-cookie";
import Loader from './Loader';

const PostModal = ({ show, onHide, post }) => {  
  const { isAuthenticated,user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [adDetails, setAdDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [cookies] = useCookies(["elk_authorization_token"]);
  // const token = cookies.elk_authorization_token;
  const token = localStorage.getItem('elk_authorization_token');
  const [error, setError] = useState(false);
  const userId = localStorage.getItem('elk_user_id');
  
  const getAdDetails = async (adId, token) => {
    let body = {}
    if(token){      
      body = { ad_id: adId, user_id: userId }
    }else{
      body = { ad_id: adId }
    }
    try {
      setLoading(true)
      setError(false);
      const response = await axios.post(
        'http://localhost:3000/api/get_ad_details',
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setLoading(false)
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error('Failed to fetch ad details:', error.response?.data || error.message);
      return null;
    }
  };

  useEffect(() => {
    if (!post?.ad_id) return;
    const fetchAd = async () => {
      try {
        const data = await getAdDetails(post.ad_id, token);
        if (data) setAdDetails(data);
      } catch (err) {
      }
    };
    fetchAd();
  }, [post?.ad_id,token]);

  const toggleWishlist = async () => {
    if (!adDetails || !token) return;
  
    const url = adDetails.wishListed
      ? 'http://localhost:3000/api/remove_wishlist'
      : 'http://localhost:3000/api/add_to_wishlist';
  
    try {
      await axios.post(
        url,
        { ad_id: adDetails.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert('Wishlist updated');
      setAdDetails(prev => ({
        ...prev,
        wishListed: !prev.wishListed
      }));
    } catch (error) {
      console.error('Wishlist update error:', error.response?.data || error.message);
    }
  };
  

  if (loading) return <Loader/>;
  if (error) {
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Failed to load ad details. Please try again later.
        </Modal.Body>
      </Modal>
    );
  }
  if(!adDetails) return null;
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{adDetails.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {adDetails.ad_images && adDetails.ad_images.length > 1 ? (
          <Carousel>
            {adDetails.ad_images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  src={image.image}
                  alt={`${index + 1}`}
                  className="d-block w-100"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <img
            src={adDetails.ad_images[0]?.image}
            alt={adDetails.title}
            className="img-fluid rounded mb-3"
            style={{ height: '250px', objectFit: 'cover' }}
          />
        )}


        <p className="card-text text-muted fs-6" style={{ fontFamily: 'Arial, sans-serif' }}>
          Post ID: {adDetails.id}
        </p>
        <p><strong>Category:</strong> {adDetails.category} </p>
        <p><strong>Description:</strong> {adDetails.description}</p>
        <p><strong>Price:</strong> {adDetails.ad_price_details[0]?.rent_price || 'N/A'} per {adDetails.ad_price_details[0]?.rent_duration || ''}</p>
        <p><i className="fa-solid fa-location-dot"></i> {`${adDetails.ad_location.locality?adDetails.ad_location.locality+',' : ''} ${adDetails.ad_location.district}, ${adDetails.ad_location.state}, ${adDetails.ad_location.country}`}</p>
        <div className="d-flex justify-content-between mt-3">

            {!isAuthenticated?(<button
            style={{
                border: 'none', 
                backgroundColor: 'transparent', 
                padding: '0',
                cursor: 'pointer'}} >
            <i className={"fa-regular fa-heart"}></i>
            </button>):(<button
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                padding: '0',
                cursor: 'pointer'
              }}
              onClick={() => {
                if (!isAuthenticated) {
                  navigate('/login');
                } else {
                  toggleWishlist();
                }
              }}
            >
              <i className={adDetails.wishListed ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
            </button>
            )}

  
            <div className="d-flex ml-auto">
                {isAuthenticated?(<Button 
                    style={{ borderRadius: '15px', backgroundColor: '#4FBBB4', borderColor: '#4FBBB4' }} onClick={()=>navigate(`/user-profile/${adDetails.user_id}`)}>
                    View Profile
                </Button>): (<Button 
                    style={{ borderRadius: '15px', backgroundColor: '#4FBBB4', borderColor: '#4FBBB4' }}
                    onClick={() => navigate('/login')}>
                    View Profile
                </Button>)}
                {/* {isAuthenticated?(<Button
                    className="ms-2"
                    style={{ backgroundColor: '#fdd77f', borderColor: '#fdd77f', borderRadius: '15px' }}  onClick={()=>navigate(`/user-profile/${adDetails.user_id}`)}>
                    View Contact
                </Button>):<Button
                    className="ms-2"
                    style={{ backgroundColor: '#fdd77f', borderColor: '#fdd77f', borderRadius: '15px' }}
                    onClick={() => navigate('/login')}>
                    View Contact
                </Button>}                */}
            </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PostModal;
