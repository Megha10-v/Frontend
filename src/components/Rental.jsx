import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";
import PostCard from "./PostCard";
import PostModal from "./PostModal";
import axios from "axios";
import car from "../assets/home_cate_cars.png";
import property from "../assets/home_cate_properties.png";
import electronics from "../assets/home_cate_electronics.png";
import tools from "../assets/home_cate_tools.png";
import furniture from "../assets/home_cate_furniture.png";
import bike from "../assets/home_cate_bikes.png";
import clothes from "../assets/home_cate_clothes.png";
import helicopter from "../assets/home_cate_helicopter.png";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import EmptyState from "./EmptyAd";
import { useSelector } from "react-redux";
import {
  useRecommendedPostQuery,
  useGetRentCategoryPostQuery,
} from "../store/services/post.service";

const Rental = () => {
  const rentalCategories = [
    { id: 1, title: "Car", image: car },
    { id: 2, title: "Property", image: property },
    { id: 3, title: "Electronics", image: electronics },
    { id: 4, title: "Tools", image: tools },
    { id: 5, title: "Furniture", image: furniture },
    { id: 6, title: "Bike", image: bike },
    { id: 7, title: "Clothes", image: clothes },
    { id: 8, title: "Helicopter", image: helicopter },
  ];

  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // const [ads, setAds] = useState([]);
  // const [cars, setCars] = useState([]);
  // const [properties, setProperties] = useState([]);
  // const [electronicses, setElectronicses] = useState([]);
  // const [bikes, setBikes] = useState([]);
  // const token = localStorage.getItem('elk_authorization_token');
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const handleCategoryClick = (category) => {
    const path = `/rental/${category.title.toLowerCase()}`;
    navigate(path);
  };

  const [location, setLocation] = React.useState(null);

  React.useEffect(() => {
    if (!token && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("Location access denied or unavailable", error);
        }
      );
    }
  }, [token]);

  const recommendedPayload = React.useMemo(() => {
    if (token) {
      return { page: 1, id: user?.user_id };
    }

    if (location) {
      return {
        page: 1,
        latitude: location.latitude,
        longitude: location.longitude,
      };
    }

    return { page: 1 };
  }, [token, user?.user_id, location]);

  const { data: recommendedData, isLoading: recommendedLoading } =
    useRecommendedPostQuery(recommendedPayload);

  const { data: carsData, isLoading: carsLoading } =
    useGetRentCategoryPostQuery({ category: "car" });

  const { data: propertyData, isLoading: propertyLoading } =
    useGetRentCategoryPostQuery({ category: "property" });

  const { data: electronicsData, isLoading: electronicsLoading } =
    useGetRentCategoryPostQuery({ category: "electronics" });

  const { data: bikesData, isLoading: bikesLoading } =
    useGetRentCategoryPostQuery({ category: "bike" });

  const ads = recommendedData?.data ?? [];
  const cars = carsData?.data ?? [];
  const properties = propertyData?.data ?? [];
  const electronicses = electronicsData?.data ?? [];
  const bikes = bikesData?.data ?? [];

  const loading =
    recommendedLoading ||
    carsLoading ||
    propertyLoading ||
    electronicsLoading ||
    bikesLoading;

  // useEffect(() => {
  //   const fetchAds = async () => {
  //     let requestBody = { page: 1 };

  //     if (token) {
  //       const userId = user?.user_id;
  //       requestBody.id = userId;
  //     } else {
  //       if (navigator.geolocation) {
  //         try {
  //           const position = await new Promise((resolve, reject) => {
  //             navigator.geolocation.getCurrentPosition(resolve, reject);
  //           });
  //           requestBody.latitude = position.coords.latitude;
  //           requestBody.longitude = position.coords.longitude;
  //         } catch (error) {
  //           console.warn('Location access denied or unavailable', error);
  //         }
  //       }
  //     }

  //     try {
  //       const response = await axios.post(
  //         `${process.env.REACT_APP_API_BASE_URL}/api/recomented_posts`,
  //         requestBody,
  //         {
  //           headers: token ? { Authorization: `Bearer ${token}` } : {},
  //         }
  //       );
  //       const car_res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/rent_category_posts`,
  //         {
  //           ad_type: 'rent',
  //           category: 'car'
  //         },
  //         {
  //           headers: {
  //               Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       const prop_res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/rent_category_posts`,
  //         {
  //           ad_type: 'rent',
  //           category: 'property'
  //         },
  //         {
  //           headers: {
  //               Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       const electro_res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/rent_category_posts`,
  //         {
  //           ad_type: 'rent',
  //           category: 'electronics'
  //         },
  //         {
  //           headers: {
  //               Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       const bikes_res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/rent_category_posts`,
  //         {
  //           ad_type: 'rent',
  //           category: 'bike'
  //         },
  //         {
  //           headers: {
  //               Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setCars(car_res.data.data);
  //       setElectronicses(electro_res.data.data);
  //       setBikes(bikes_res.data.data);
  //       setProperties(prop_res.data.data);
  //       setAds(response.data.data);
  //     } catch (error) {
  //       console.error('Failed to fetch ads:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchAds();
  // }, [token, user]);

  const handleCardClick = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  return (
    <>
      <div className="container" style={{ minHeight: "80vh" }}>
        <Carousel
          categories={rentalCategories}
          onCategoryClick={handleCategoryClick}
        />
        <h3 className="ml-5 mb-4">Recommended Posts</h3>
        {loading ? (
          <Loader />
        ) : ads.length > 0 ? (
          <div
            className="d-flex overflow-auto gap-3 scroll-row-rent"
            style={{
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
              paddingBottom: "1rem",
            }}
          >
            {ads.map((post) => (
              <div key={post.id} style={{ flex: "0 0 auto" }}>
                <PostCard
                  post={post}
                  onClick={handleCardClick}
                  isMyAd={false}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
        {loading ? (
          <Loader />
        ) : cars.length > 0 ? (
          <>
            <h3 className="ml-5 mb-4">Cars</h3>
            <div
              className="d-flex overflow-auto gap-3 scroll-row-rent"
              style={{
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
                paddingBottom: "1rem",
              }}
            >
              {cars.map((post) => (
                <div key={post.id} style={{ flex: "0 0 auto" }}>
                  <PostCard
                    post={post}
                    onClick={handleCardClick}
                    isMyAd={false}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
        {loading ? (
          <Loader />
        ) : properties.length > 0 ? (
          <>
            <h3 className="ml-5 mb-4">Properties</h3>
            <div
              className="d-flex overflow-auto gap-3 scroll-row-rent"
              style={{
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
                paddingBottom: "1rem",
              }}
            >
              {properties.map((post) => (
                <div key={post.id} style={{ flex: "0 0 auto" }}>
                  <PostCard
                    post={post}
                    onClick={handleCardClick}
                    isMyAd={false}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
        {loading ? (
          <Loader />
        ) : electronicses.length > 0 ? (
          <>
            <h3 className="ml-5 mb-4">Electronics</h3>
            <div
              className="d-flex overflow-auto gap-3 scroll-row-rent"
              style={{
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
                paddingBottom: "1rem",
              }}
            >
              {electronicses.map((post) => (
                <div key={post.id} style={{ flex: "0 0 auto" }}>
                  <PostCard
                    post={post}
                    onClick={handleCardClick}
                    isMyAd={false}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
        {loading ? (
          <Loader />
        ) : bikes.length > 0 ? (
          <>
            <h3 className="ml-5 mb-4">Bikes</h3>
            <div
              className="d-flex overflow-auto gap-3 scroll-row-rent"
              style={{
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
                paddingBottom: "1rem",
              }}
            >
              {bikes.map((post) => (
                <div key={post.id} style={{ flex: "0 0 auto" }}>
                  <PostCard
                    post={post}
                    onClick={handleCardClick}
                    isMyAd={false}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
        <PostModal
          isMyAd={false}
          show={showModal}
          onHide={() => setShowModal(false)}
          post={selectedPost}
        />
      </div>
    </>
  );
};

export default Rental;
