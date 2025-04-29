import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import PostCard from './PostCard';
import PostModal from './PostModal';
import axios from 'axios';
import car from '../assets/home_cate_cars.png';
import property from '../assets/home_cate_properties.png';
import electronics from '../assets/home_cate_electronics.png';
import tools from '../assets/home_cate_tools.png';
import furniture from '../assets/home_cate_furniture.png';
import bike from '../assets/home_cate_bikes.png';
import clothes from '../assets/home_cate_clothes.png';
import helicopter from '../assets/home_cate_helicopter.png';
// import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import EmptyState from './EmptyAd';
import { useSelector } from 'react-redux';

const Rental = () => {
  const rentalCategories = [
    { id: 1, title: 'Cars', image: car },
    { id: 2, title: 'Properties', image: property },
    { id: 3, title: 'Electronics', image: electronics },
    { id: 4, title: 'Tools', image: tools },
    { id: 5, title: 'Furniture', image: furniture },
    { id: 6, title: 'Bikes', image: bike },
    { id: 7, title: 'Clothes', image: clothes },
    { id: 8, title: 'Helicopter', image: helicopter },
  ];

  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ads, setAds] = useState([]);
  const token = localStorage.getItem('elk_authorization_token');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleCategoryClick = (category) => {
    const path = `/rental/${category.title.toLowerCase()}`;
    navigate(path);
  };
  const userId = localStorage.getItem('elk_user_id');
  let body = {}
  if(token){
    console.log(userId);
    
    body = { page: 1, id: userId }
  }else{
    body = { page: 1 }
  }
  const fetchRecommendedPosts = async (token) => {    
    try {
      const response = await axios.post(`https://api.elkcompany.online/api/recomented_posts`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching recommended posts:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => {
    fetchRecommendedPosts(token)
      .then(data => {
        setAds(data.data);
      })
      .catch(error => {
        console.error("Failed to fetch ads:", error);
      });
  }, [token]);

  const handleCardClick = (post) => {
    setSelectedPost(post);    
    setShowModal(true);
  };

  return (
    <div className="container p-4" style={{ minHeight: "80vh" }}>
      <Carousel categories={rentalCategories} onCategoryClick={handleCategoryClick}/>
      <h3 className="ml-5 mb-4">Recommended Posts</h3>
      <div className="row">
        {loading ? (
          <Loader/>
        ) : ads.length > 0 ? (
          ads.map((post) => (
            <PostCard key={post.id} post={post} onClick={handleCardClick} />
          ))
        ) : (
          <EmptyState />
          // <p>No recommended posts available.</p>
        )}
      </div>

      <PostModal show={showModal} onHide={() => setShowModal(false)} post={selectedPost} />
    </div>
  );
};

export default Rental;
