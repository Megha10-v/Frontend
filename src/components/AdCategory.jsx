import  { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppHeader from "./AppHeader";
import Footer from "./AppFooter";
import axios from "axios";
import PostCard from "./PostCard";
import PostModal from "./PostModal";
import Loader from "./Loader";
import EmptyState from "./EmptyAd";
import { useSelector } from "react-redux";
import { useGetRentCategoryListQuery } from "../store/services/post.service";

const AdCategory = ({category,type}) => {
    const {user} = useSelector((state) => state.auth)
    const token = localStorage.getItem('elk_authorization_token');
    const [selectedPost, setSelectedPost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleCardClick = (post) => {
        setSelectedPost(post);
        setShowModal(true);
    };
    const {data: adList, isLoading: adListLoading} = useGetRentCategoryListQuery({
                ad_type: type,
                category: category.title
              });

  return (
    <>
      <AppHeader isChat={false} />
      <div className="main container py-4" style={{ minHeight: "80vh" }}>
        <h1 className="mb-4" style={{textTransform:'capitalize'}}>{category.title}</h1>
        {adListLoading ? (
          <Loader/>
        ) : adList?.data?.length === 0 ? (
          <EmptyState/>
        ) : (
          <div className="row g-4">
            {adList?.data?.map((ad) => (
                <PostCard key={ad.id} post={ad} onClick={handleCardClick} isMyAd={false}/>
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
