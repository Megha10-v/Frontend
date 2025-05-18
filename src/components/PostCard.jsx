import React from 'react';
import { Carousel } from 'react-bootstrap';


const PostCard = ({ post, onClick }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center" style={{maxWidth:'100%'}}>
      <div className="card shadow-sm cursor-pointer" onClick={() => onClick(post)} style={{borderRadius:'10px',maxWidth:'300px'}}>
       {post.ad_images && post.ad_images.length > 0 && (
          <Carousel interval={3000} indicators={false} controls={true}>
            {post.ad_images.map((imgObj, index) => (
              <Carousel.Item key={index}>
                <img
                  src={imgObj.image}
                  alt={`${post.title} - ${index + 1}`}
                  className="d-block w-100"
                  style={{ height: '200px', objectFit: 'cover', width: '100%',borderRadius:'10px' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
        <div className="card-body p-2">
          <h5 className="card-title fs-6">{post.title}</h5>
          <p className="card-text text-muted fs-6 fs-md-4" style={{ fontFamily: 'Arial, sans-serif' }}>
               Post ID: {post.id}
          </p>
          <p className="card-text"><strong>Category:</strong> {post.category}</p>
          <p className="card-text"><strong>Price:</strong> ₹{post.ad_price_details[0]?.rent_price || 'N/A'} per {post.ad_price_details[0]?.rent_duration || ''}</p>
          <p className="card-text"><i className="fa-solid fa-location-dot"></i> {`${post.ad_location.locality?post.ad_location.locality+',' : ''} ${post.ad_location.place?post.ad_location.place+',' : ''} ${post.ad_location.district?post.ad_location.district+',' : ''} ${post.ad_location.state?post.ad_location.state+',' : ''} ${post.ad_location.country?post.ad_location.country : ''}`}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
