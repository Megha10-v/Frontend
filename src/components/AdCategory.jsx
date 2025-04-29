import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppHeader from "./AppHeader";
import Footer from "./AppFooter";
import axios from "axios";
// import { useCookies } from "react-cookie";
import PostCard from "./PostCard";
import PostModal from "./PostModal";
import Loader from "./Loader";
import EmptyState from "./EmptyAd";

const AdCategory = ({category,type}) => {
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
    const userId = localStorage.getItem('elk_user_id');
    let body = {}
    if(token){      
      body = { ad_type: type, category: category.title, user_id: userId }
    }else{
      body = { ad_type: type, category: category.title }
    }
    useEffect(() => {
        const fetchWishlist = async () => {
          try {
              const res = await axios.post("https://api.elkcompany.online/api/rent_category_posts", 
                {
                  ad_type: type,
                  category: category.title
                },
                {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
                }
              );            
              setWishlist(res.data.data);
          } catch (err) {
              console.error("Error fetching wishlist:", err);
          } finally {
              setLoading(false);
          }
        };

        // if (token) {
        fetchWishlist();
        // } else {
        setLoading(false);
        // }
    }, [token, category.title, type]);

  return (
    <>
      <AppHeader />
      <div className="main container py-4" style={{ minHeight: "80vh" }}>
        <h1 className="mb-4" style={{textTransform:'capitalize'}}>{category.title}</h1>
        {loading ? (
          <Loader/>
        ) : wishlist.length === 0 ? (
          <EmptyState/>
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

export default AdCategory;
