import React from 'react';
import { Carousel } from 'react-bootstrap';


const PostCard = ({ post, onClick }) => {
  return (
    <div className="col-md-3 mb-4">
      <div className="card shadow-sm cursor-pointer" onClick={() => onClick(post)}>
       {post.ad_images && post.ad_images.length > 0 && (
          <Carousel interval={3000} indicators={false} controls={true}>
            {post.ad_images.map((imgObj, index) => (
              <Carousel.Item key={index}>
                <img
                  src={imgObj.image}
                  alt={`${post.title} - ${index + 1}`}
                  className="d-block w-100"
                  style={{ height: '300px', objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text text-muted fs-6" style={{ fontFamily: 'Arial, sans-serif' }}>
               Post ID: {post.id}
          </p>
          <p className="card-text"><strong>Category:</strong> {post.category}</p>
          <p className="card-text"><strong>Price:</strong> {post.ad_price_details[0]?.rent_price || 'N/A'} per {post.ad_price_details[0]?.rent_duration || ''}</p>
          <p className="card-text"><i className="fa-solid fa-location-dot"></i> {`${post.ad_location.locality?post.ad_location.locality+',' : ''} ${post.ad_location.district}, ${post.ad_location.state}, ${post.ad_location.country}`}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
