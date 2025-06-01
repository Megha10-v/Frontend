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
  const [cars, setCars] = useState([]);
  const [properties, setProperties] = useState([]);
  const [electronicses, setElectronicses] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem('elk_authorization_token');
  const userId = user?.user_id;
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
        const response = await axios.post(`http://localhost:3000/api/best_service_providers`, 
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
         const car_res = await axios.post(`http://localhost:3000/api/rent_category_posts`, 
          {
            ad_type: 'service',
            category: 'cleaning'
          },
          {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          }
        );
        const prop_res = await axios.post(`http://localhost:3000/api/rent_category_posts`, 
          {
            ad_type: 'service',
            category: 'electrician'
          },
          {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          }
        );
        const electro_res = await axios.post(`http://localhost:3000/api/rent_category_posts`, 
          {
            ad_type: 'service',
            category: 'carpentry'
          },
          {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          }
        );
        const bikes_res = await axios.post(`http://localhost:3000/api/rent_category_posts`, 
          {
            ad_type: 'service',
            category: 'painting'
          },
          {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          }
        );
        setCars(car_res.data.data);
        setElectronicses(electro_res.data.data);
        setBikes(bikes_res.data.data);
        setProperties(prop_res.data.data);
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
        {loading ? (
          <Loader/>
        ) : bestProvidersPosts.length > 0 ? (
          <div className="d-flex overflow-auto gap-3 scroll-row-rent" style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth', paddingBottom: '1rem' }}>
            {bestProvidersPosts.map((post) => (
              <div key={post.id} style={{ flex: '0 0 auto' }}>
                <PostCard post={post} onClick={handleCardClick} isMyAd={false}/>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
        {loading ? (
          <Loader/>
        ) : cars.length > 0 ? (
          <>
            <h3 className="ml-5 mb-4">Cleaning</h3>
            <div className="d-flex overflow-auto gap-3 scroll-row-rent" style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth', paddingBottom: '1rem' }}>
              {cars.map((post) => (
                <div key={post.id} style={{ flex: '0 0 auto' }}>
                  <PostCard post={post} onClick={handleCardClick} isMyAd={false}/>
                </div>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
        {loading ? (
          <Loader/>
        ) : properties.length > 0 ? (
          <>
          <h3 className="ml-5 mb-4">Electrician</h3>
          <div className="d-flex overflow-auto gap-3 scroll-row-rent" style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth', paddingBottom: '1rem' }}>
            {properties.map((post) => (
              <div key={post.id} style={{ flex: '0 0 auto' }}>
                <PostCard post={post} onClick={handleCardClick} isMyAd={false}/>
              </div>
            ))}
          </div>
          </>
        ) : (
          <></>
        )}
        {loading ? (
          <Loader/>
        ) : electronicses.length > 0 ? (
          <>
            <h3 className="ml-5 mb-4">Carpentry</h3>
            <div className="d-flex overflow-auto gap-3 scroll-row-rent" style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth', paddingBottom: '1rem' }}>
              {electronicses.map((post) => (
                <div key={post.id} style={{ flex: '0 0 auto' }}>
                  <PostCard post={post} onClick={handleCardClick} isMyAd={false}/>
                </div>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
        {loading ? (
          <Loader/>
        ) : bikes.length > 0 ? (
          <>
            <h3 className="ml-5 mb-4">Painting</h3>
            <div className="d-flex overflow-auto gap-3 scroll-row-rent" style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth', paddingBottom: '1rem' }}>
              {bikes.map((post) => (
                <div key={post.id} style={{ flex: '0 0 auto' }}>
                  <PostCard post={post} onClick={handleCardClick} isMyAd={false}/>
                </div>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      <PostModal isMyAd={false} show={showModal} onHide={() => setShowModal(false)} post={selectedPost} />
    </div>
  );
}

export default Service;