import { Carousel } from 'react-bootstrap';
import dayjs from 'dayjs';
import { MdDeleteForever } from "react-icons/md";

// Removed the outer grid div from here
const PostCard = ({ post, onClick, isMyAd, onDeleteAd }) => {
  // Ensure post and nested properties exist before accessing them
  const createdAt = post?.createdAt;
  const adImages = post?.ad_images;
  const adPriceDetails = post?.ad_price_details?.[0]; // Access the first price detail safely
  const adLocation = post?.ad_location;
  const postTitle = post?.title || 'Untitled Ad'; // Provide default title

  // Format date safely
  const postDateTime = createdAt ? dayjs(createdAt).format('MMM D, YYYY [at] h:mm A') : 'Date not available';

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent opening the modal
    if (onDeleteAd && post?.ad_id) { // Check if function and id exist
        onDeleteAd(post.ad_id);
    } else {
        console.error("onDeleteAd function or post.ad_id is missing");
    }
  };

  // The card itself is now the root element returned by the component
  return (
      <div className="card shadow-sm" style={{ borderRadius: '10px', width: '250px', maxWidth: '250px', position: 'relative', marginBottom: '1rem' }}>

        {/* Conditional delete button */}
        {isMyAd && onDeleteAd && (
          <button
            onClick={handleDelete}
            style={{
              position: 'absolute', top: '5px', left: '5px', zIndex: '10',
              background: 'rgba(255, 255, 255, 0.7)', border: 'none', borderRadius: '50%',
              width: '30px', height: '30px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer', padding: 0
            }}
            aria-label="Delete ad"
          >
            <MdDeleteForever color="#dc3545" size={20} />
          </button>
        )}

        {/* Carousel */}
        {adImages && adImages.length > 0 ? (
          <Carousel
            interval={null} indicators={false} controls={adImages.length > 1}
            style={{ borderRadius: '10px 10px 0 0', overflow: 'hidden' }}
          >
            {adImages.map((imgObj, index) => (
              <Carousel.Item key={index}>
                <img
                  src={imgObj?.image} alt={`${postTitle} - ${index + 1}`} className="d-block w-100"
                  style={{ objectFit: 'cover', width: '100%', height: '150px', cursor: 'pointer' }}
                  onClick={() => onClick(post)}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div
            style={{ height: '150px', backgroundColor: '#e9ecef', cursor: 'pointer', borderRadius: '10px 10px 0 0' }}
            onClick={() => onClick(post)}
            className="d-flex align-items-center justify-content-center text-muted small"
          >
            No Image
          </div>
        )}
        {/* Card Body */}
        <div className="card-body p-2 d-flex flex-column" style={{ cursor: 'pointer' }} onClick={() => onClick(post)}>
          <h6 className="card-title post-title mb-1">{postTitle}</h6>
          <div className="d-flex flex-column" style={{ fontSize: '0.8rem' }}>
            <span className="card-text text-truncate mb-1">
                ₹{adPriceDetails?.rent_price ?? 'N/A'} per {adPriceDetails?.rent_duration || 'unit'}
            </span>
            <span className="card-text text-truncate mb-1">
              <i className="fa-solid fa-location-dot me-1"></i>
              {[
                  adLocation?.locality, adLocation?.place, adLocation?.district,
              ].filter(Boolean).join(', ') || 'Location unspecified'}
            </span>
            <span className="card-text text-muted small mt-auto">{postDateTime}</span>
          </div>
        </div>
      </div>
  );
};

export default PostCard;