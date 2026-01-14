import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import PostModal from "./PostModal";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import EmptyState from "./EmptyAd";
import NotLoggedIn from "./NotLoggedIn";
import { useGetMyAdsQuery } from "../store/services/post.service";

const MyBusiness = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  // const token = localStorage.getItem("elk_authorization_token");
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleCardClick = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };
  const handleAdDeleted = (deletedAdId) => {
    setWishlist((prev) => prev.filter((ad) => ad.ad_id !== deletedAdId));
  };

  const { data: myAds, isLoading: myAdsLoading } = useGetMyAdsQuery();

  // useEffect(() => {
  //   const fetchWishlist = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_API_BASE_URL}/api/my_ads`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setWishlist(res.data);
  //     } catch (err) {
  //       console.error("Error fetching wishlist:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (token) {
  //     fetchWishlist();
  //   } else {
  //     setLoading(false);
  //   }
  // }, [token]);

  return (
    <>
      <div className="main container py-4" style={{ minHeight: "80vh" }}>
        <h1 className="mb-4">My Ads</h1>
        {myAdsLoading ? (
          <Loader />
        ) : !isAuthenticated ? (
          <div className="d-flex flex-column justify-content-center align-items-center p-5">
            <NotLoggedIn />
          </div>
        ) : myAds.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="row">
            {myAds.map((ad) => (
              <PostCard
                key={ad.id}
                post={ad}
                onClick={handleCardClick}
                isMyAd={true}
              />
            ))}
          </div>
        )}
      </div>
      <PostModal
        show={showModal}
        isMyAd={true}
        onHide={() => setShowModal(false)}
        post={selectedPost}
        onAdDeleted={handleAdDeleted}
      />
    </>
  );
};

export default MyBusiness;
