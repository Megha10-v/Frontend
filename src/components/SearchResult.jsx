import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppHeader from "./AppHeader";
import Footer from "./AppFooter";
import axios from "axios";
import PostCard from "./PostCard";
import PostModal from "./PostModal";
import Loader from "./Loader";
import EmptyState from "./EmptyAd";
import { useParams } from 'react-router-dom';

const SearchResult = () => {
    const [ads, setads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleCardClick = (post) => {
        setSelectedPost(post);
        setShowModal(true);
    };
    const { query } = useParams();
    useEffect(() => {
        const fetchads = async () => {
          setLoading(true)
          try {
              const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/search_ad`, 
                {
                  keyword: query
                }
              );            
              setads(res.data.data);
              
          } catch (err) {
            //
          } finally {
              setLoading(false);
          }
        };        
        fetchads();
    }, [query]);

  return (
    <>
      <AppHeader />
      <div className="main container py-4" style={{ minHeight: "80vh" }}>
        <h1 className="mb-4" style={{textTransform:'capitalize'}}>Search result of {query}</h1>
        {loading ? (
          <Loader/>
        ) : ads.length === 0 ? (
          <EmptyState/>
        ) : (
          <div className="row">
            {ads.map((ad) => (
                <PostCard key={ad.id} post={ad} onClick={handleCardClick} isMyAd={true}/>
            ))}
          </div>
        )}
      </div>
      <Footer />
      <PostModal isMyAd={false} show={showModal} onHide={() => setShowModal(false)} post={selectedPost} />
    </>
  );
};

export default SearchResult;
