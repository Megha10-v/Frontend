import React, { useState } from 'react';
import './Carousel.css'; 

const Carousel = ({ categories, onCategoryClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 4;

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
