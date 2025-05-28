import React from 'react';
import Carousel from './Carousel';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cleaning from '../assets/ic_cleaning_service.png';
import repairing from '../assets/ic_repairing_service.png';
import painting from '../assets/ic_painting_service.png';
import plumbing from '../assets/ic_plumbing_service.png';
import electricain from '../assets/ic_electrician_service.png';
import carpentry from '../assets/ic_carpentry_service.png';
import laundry from '../assets/ic_laudery_service.png';
import salon from '../assets/ic_saloon_service.png'
import PostCard from './PostCard';
import PostModal from './PostModal';
// import { useCookies } from "react-cookie";
import axios from "axios";
import Loader from './Loader';
import EmptyState from './EmptyAd';

const Service = () => {
  const serviceCategories = [
    { id: 1, title: 'Cleaning', image: cleaning  },
    { id: 2, title: 'Repairing', image: repairing },
    { id: 3, title: 'Painting', image: painting },
    { id: 4, title: 'Plumbing', image: plumbing },
    { id: 5, title: 'Electrician', image: electricain },
    { id: 6, title: 'Carpentry', image: carpentry },
    { id: 7, title: 'Laundry', image: laundry },
    { id: 8, title: 'Salon', image: salon },
  ];
  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.auth)

  const handleCategoryClick = (category) => {
    const path = `/services/${category.title.toLowerCase()}`;
    navigate(path);
  };

  const [bestProvidersPosts, setBestProvidersPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // const [cookies] = useCookies(["elk_authorization_token"]);

  // const token = cookies.elk_authorization_token;
  const token = localStorage.getItem('elk_authorization_token');
  const userId = user?.user_id;
  // const userId = localStorage.getItem('elk_user_id');
  const [loading, setLoading] = useState(true);
  let body = {}
  if(token){      
    body = { page: 1, user_id: userId }
  }else{
    body = { page: 1 }
  }
  useEffect(() => {
    const fetchBestProviders = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/best_service_providers`, 
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setBestProvidersPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching best service providers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestProviders();
  }, [token], user);

  const handleCardClick = (post) => {
      setSelectedPost(post);
      setShowModal(true);
  };
  return (
    <div className="container p-4" style={{ minHeight: "80vh" }}>
      <Carousel categories={serviceCategories} onCategoryClick={handleCategoryClick}/>
      <h3 className="ml-5 mb-4">Best Service Providers</h3>
      <div className="row">
        {loading ? (
          <Loader/>
        ) : bestProvidersPosts.length > 0 ? (
          bestProvidersPosts.map((post) => (
            <PostCard key={post.id} post={post} onClick={handleCardClick} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
      <PostModal isMyAd={false} show={showModal} onHide={() => setShowModal(false)} post={selectedPost} />
    </div>
  );
}

export default Service;