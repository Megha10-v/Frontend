import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppHeader from "./AppHeader";
import Footer from "./AppFooter";
import axios from "axios";
// import { useCookies } from "react-cookie";
import PostCard from "./PostCard";
import PostModal from "./PostModal";
import Loader from "./Loader";

const MyWishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [cookies] = useCookies(["elk_authorization_token"]);
  // const token = cookies.elk_authorization_token;
  const token = localStorage.getItem('elk_authorization_token');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleCardClick = (post) => {      
      setSelectedPost(post);
      setShowModal(true);
  };
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/user_wishlists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist(res.data);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchWishlist();
    } else {
      setLoading(false); // No token = no API call
    }
  }, [token]);

  return (
    <>
      <AppHeader />
      <div className="main container py-4" style={{ minHeight: "80vh" }}>
        <h1 className="mb-4">My Wishlist</h1>
        {loading ? (
          <Loader/>
        ) : !token ? (
          <p>Please login to view your wishlist.</p>
        ) : wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div className="row">
            {wishlist.map((ad) => (
              <PostCard key={ad.id} post={ad} onClick={handleCardClick} />
            ))}
          </div>
        )}
      </div>
      <Footer />
      <PostModal show={showModal} onHide={() => setShowModal(false)} post={selectedPost} />
    </>
  );
};

export default MyWishList;
