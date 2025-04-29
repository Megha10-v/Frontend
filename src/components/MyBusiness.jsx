import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useCookies } from "react-cookie";
import PostCard from "./PostCard";
import PostModal from "./PostModal";
import Loader from "./Loader";
import { useSelector } from 'react-redux';
import EmptyState from "./EmptyAd";
import NotLoggedIn from "./NotLoggedIn";

const MyBusiness = () =>{
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [cookies] = useCookies(["elk_authorization_token"]);
    // const token = cookies.elk_authorization_token;
    const token = localStorage.getItem('elk_authorization_token');
    const { isAuthenticated } = useSelector(state => state.auth);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleCardClick = (post) => {
        setSelectedPost(post);
        setShowModal(true);
    };
    useEffect(() => {
      const fetchWishlist = async () => {
        try {
          const res = await axios.get("https://api.elkcompany.online/api/my_ads", {
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
        setLoading(false);
      }
    }, [token]);

    return( <>
      <div className="main container py-4" style={{ minHeight: "80vh" }}>
        <h1 className="mb-4">My Ads</h1>
        {loading ? (
          <Loader/>
        ) : !isAuthenticated ? (
          <div className="d-flex flex-column justify-content-center align-items-center p-5" >
            <NotLoggedIn />
          </div>
        ) : wishlist.length === 0 ? (
            <EmptyState />
        ) : (
          <div className="row">
            {wishlist.map((ad) => (
              <PostCard key={ad.id} post={ad} onClick={handleCardClick} />
            ))}
          </div>
        )}
      </div>
      <PostModal show={showModal} onHide={() => setShowModal(false)} post={selectedPost} />
    </>)
}


export default MyBusiness;