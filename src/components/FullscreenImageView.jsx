import React, { useState, useEffect } from 'react';
import './PostModal.css';

const FullscreenImageView = ({ images, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  // Function to go to the next image
  const handleNext = (e) => {
    e.stopPropagation(); // Prevents the overlay from closing
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous image
  const handlePrev = (e) => {
    e.stopPropagation(); // Prevents the overlay from closing
    setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };

  // Effect to handle keyboard navigation (left/right arrows)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (images.length > 1) { // Only allow arrow navigation if there's more than one image
        if (e.key === 'ArrowRight') {
          handleNext(e);
        } else if (e.key === 'ArrowLeft') {
          handlePrev(e);
        }
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [images, currentIndex]); // Rerun effect if images or index change

  return (
    <div className="fullscreen-image-view" onClick={onClose}>
      {images.length > 1 && (
        <button className="nav-button prev-button" onClick={handlePrev}>
          &lt;
        </button>
      )}
      
      {/* Image container */}
      <div className="fullscreen-image-container">
        <img
          src={images[currentIndex]}
          alt="Fullscreen"
          className="fullscreen-image"
          onClick={(e) => e.stopPropagation()} // Prevent closing when image is clicked
        />
      </div>

      {images.length > 1 && (
        <button className="nav-button next-button" onClick={handleNext}>
          &gt;
        </button>
      )}
    </div>
  );
};

export default FullscreenImageView;