import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import PostModal from "./PostModal";
import Loader from "./Loader";
import { useSelector } from 'react-redux';
import EmptyState from "./EmptyAd";
import NotLoggedIn from "./NotLoggedIn";
// import Footer from "./AppFooter"; // Or Footer.jsx depending on your setup
import Footer from "./Footer";

const MyBusiness = () =>{
    const [wishlist, setWishlist] = useState([]); // Consider renaming state to myAds for clarity
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('elk_authorization_token');
    const { isAuthenticated } = useSelector(state => state.auth);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleCardClick = (post) => {
        setSelectedPost(post);
        setShowModal(true);
    };

    const handleDeleteAd = async (adId) => {
      // Keep confirmation inside the function called by the modal
      const confirmDelete = window.confirm("Are you sure you want to delete this ad?");
      if (!confirmDelete) return;

      setLoading(true); // Show loader during deletion
      try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/delete-ad?id=${adId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Update the list by filtering out the deleted ad
        setWishlist(prevAds => prevAds.filter(ad => ad.ad_id !== adId));
        setShowModal(false); // Close the modal after successful deletion
        alert("Ad deleted successfully."); // Give feedback
      } catch (err) {
        console.error("Error deleting ad:", err.response?.data || err.message);
        alert("Failed to delete ad. Please try again.");
      } finally {
        setLoading(false); // Hide loader
      }
    };

    useEffect(() => {
      const fetchMyAds = async () => { // Renamed function
        setLoading(true); // Ensure loading is true at the start
        try {
          const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/my_ads`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setWishlist(res.data); // Update state with fetched ads
        } catch (err) {
          console.error("Error fetching my ads:", err);
          setWishlist([]); // Set to empty array on error
        } finally {
          setLoading(false);
        }
      };

      if (token) {
        fetchMyAds();
      } else {
        setLoading(false); // Stop loading if not authenticated
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
              <PostCard
                  key={ad.id || ad.ad_id} // Use ad_id as fallback key
                  post={ad}
                  onClick={handleCardClick}
                  isMyAd={true} // Still identify it as "my ad"
                  // onDeleteAd={handleDeleteAd} // <-- REMOVED this prop from PostCard
               />
            ))}
          </div>
        )}
      </div>
      {/* --- Pass onDeleteAd ONLY to the Modal --- */}
      <PostModal
          show={showModal}
          isMyAd={true} // Tell modal it's "my ad"
          onHide={() => setShowModal(false)}
          post={selectedPost}
          onDeleteAd={handleDeleteAd} // Pass the delete handler here
      />
      {/* --- End Change --- */}
      <Footer />
    </>)
}


export default MyBusiness;