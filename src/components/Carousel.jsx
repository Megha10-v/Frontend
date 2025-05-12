import React, { useState, useEffect } from 'react';
import './Carousel.css'; 

const Carousel = ({ categories, onCategoryClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const itemsPerPage = 4;
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  function getItemsPerPage() {
    const width = window.innerWidth;
    if (width < 576) return 1;      // Mobile
    if (width < 768) return 2;      // Small tablets
    if (width < 992) return 3;      // Tablets
    return 4;                       // Desktops
  }

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setCurrentSlide(0); // reset slide to avoid overflow
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    if (currentSlide < Math.ceil(categories.length / itemsPerPage) - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const startIndex = currentSlide * itemsPerPage;
  const visibleCategories = categories.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="carousel-container">
      <button onClick={prevSlide} className="carousel-button">‹</button>
      <div className="carousel">
        <div className="carousel-track">
          {visibleCategories.map((category) => (
            <div key={category.id} className="image-container" style={{ cursor: 'pointer' }} onClick={() => onCategoryClick(category)}>
              <img src={category.image} alt={category.title} className="circle-image" />
              <p style={{ fontSize: '13px' }}>{category.title}</p>
            </div>
          ))}
        </div>
      </div>
      <button onClick={nextSlide} className="carousel-button">›</button>
    </div>
  );
};

export default Carousel;
