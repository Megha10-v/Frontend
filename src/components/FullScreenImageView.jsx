import React, { useState, useEffect } from 'react';
import { MdClose, MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

/**
 * FullscreenImageView Component
 * * Displays images in a full-screen overlay.
 * * Shows navigation arrows ONLY if there are multiple images.
 * * Props:
 * @param {boolean} show - Determines if the component is visible.
 * @param {function} onClose - Function to call when closing the view.
 * @param {Array} images - Array of image objects (e.g., [{image: 'url'}, ...]) or strings.
 * @param {number} initialIndex - The index of the image to start with.
 */
const FullscreenImageView = ({ show, onClose, images = [], initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Reset index when opening
  useEffect(() => {
    if (show) {
      setCurrentIndex(initialIndex);
    }
  }, [show, initialIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!show) return;
      if (event.key === 'Escape') onClose();
      if (images.length > 1) {
        if (event.key === 'ArrowRight') handleNext();
        if (event.key === 'ArrowLeft') handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [show, onClose, images.length, currentIndex]);

  if (!show || !images || images.length === 0) return null;

  // Helper to get image URL whether input is string or object
  const getImageUrl = (item) => {
    return typeof item === 'string' ? item : item.image;
  };

  const handleNext = (e) => {
    if(e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    if(e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Condition: Keep arrows only when it contains multiple images
  const showControls = images.length > 1;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <button style={styles.closeButton} onClick={onClose} aria-label="Close">
        <MdClose size={30} color="#fff" />
      </button>

      {showControls && (
        <button style={{ ...styles.navButton, ...styles.prevButton }} onClick={handlePrev}>
          <MdNavigateBefore size={50} color="#fff" />
        </button>
      )}

      <img
        src={getImageUrl(images[currentIndex])}
        alt={`View ${currentIndex + 1}`}
        style={styles.image}
        onClick={(e) => e.stopPropagation()} 
      />

      {showControls && (
        <button style={{ ...styles.navButton, ...styles.nextButton }} onClick={handleNext}>
          <MdNavigateNext size={50} color="#fff" />
        </button>
      )}
      
      {showControls && (
        <div style={styles.counter}>
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: 10000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(5px)',
    userSelect: 'none',
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    zIndex: 10002,
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.3)',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '50%',
    zIndex: 10001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.3s',
  },
  prevButton: {
    left: '20px',
  },
  nextButton: {
    right: '20px',
  },
  image: {
    maxWidth: '90%',
    maxHeight: '90%',
    objectFit: 'contain',
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
    borderRadius: '4px',
  },
  counter: {
    position: 'absolute',
    bottom: '20px',
    color: '#fff',
    fontSize: '14px',
    background: 'rgba(0,0,0,0.5)',
    padding: '5px 10px',
    borderRadius: '15px',
  }
};

export default FullscreenImageView;