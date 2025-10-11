import { Carousel } from 'react-bootstrap';
import dayjs from 'dayjs';
// Removed: import DeleteIcon from '@mui/icons-material/Delete'; 

const PostCard = ({ post, onClick, isMyAd, onDeleteAd }) => {
  const postDateTime = dayjs(post.createdAt).format('MMM D, YYYY [at] h:mm A');

  // Removed: handleDelete function as the button is moved

  return (
    <div className={isMyAd ? "col-6 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center" : ""}>
      <div className="card shadow-sm" style={{ borderRadius: '10px', maxWidth: '250px', position: 'relative' }}>
        {/* Removed: Delete button JSX */}
        {post.ad_images && post.ad_images.length > 0 ? (
          <Carousel interval={null} indicators={false} controls={true}>
            {post.ad_images.map((imgObj, index) => (
              <Carousel.Item key={index}>
                <img
                  src={imgObj.image}
                  alt={`${post.title} - ${index + 1}`}
                  className="d-block w-100"
                  style={{ objectFit: 'cover', width: '100%', borderRadius: '10px 10px 0 0', height: '150px', cursor: 'pointer' }}
                  onClick={() => onClick(post)}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div 
            style={{ height: '150px', backgroundColor: '#f8f9fa', cursor: 'pointer', borderRadius: '10px 10px 0 0' }} 
            onClick={() => onClick(post)} 
            className="d-flex align-items-center justify-content-center text-muted"
          >
            No Image
          </div>
        )}
        <div className="card-body p-2 d-flex flex-column" style={{ cursor: 'pointer' }} onClick={() => onClick(post)}>
          <h6 className="card-title post-title">{post.title}</h6>
          <div className="d-flex flex-column text-truncate" style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <span className="card-text me-2">₹{post.ad_price_details[0]?.rent_price || 'N/A'} per {post.ad_price_details[0]?.rent_duration || ''}</span>
            <span className="card-text text-truncate">
              <i className="fa-solid fa-location-dot me-1"></i>
              {`${post.ad_location.locality ? post.ad_location.locality + ',' : ''} ${post.ad_location.place ? post.ad_location.place + ',' : ''} ${post.ad_location.district ? post.ad_location.district + ',' : ''} ${post.ad_location.state ? post.ad_location.state + ',' : ''} ${post.ad_location.country ? post.ad_location.country : ''}`}
            </span>
            <span className="card-text text-muted small mt-1">{postDateTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;