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
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import EmptyState from './EmptyAd';
import { useSelector } from 'react-redux';
import AppHeader from './AppHeader';
import Footer from './AppFooter';
import Rental from './Rental';
import Service from './Service';

const HomeScreen = () => {
  return (
    <>
      {/* <AppHeader /> */}
      <Rental/>
      <Service/>
      {/* <Footer/> */}
    </>
  );
};

export default HomeScreen;