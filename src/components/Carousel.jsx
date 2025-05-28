import  { useState, useEffect, useRef } from 'react';
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

  const scrollContainerRef = useRef(null);
  const scrollAmount = 200; // pixels per scroll

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setCurrentSlide(0); // reset slide to avoid overflow
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="carousel-container">
      <button onClick={scrollLeft} className="carousel-button">‹</button>
      <div className="carousel-scroll" ref={scrollContainerRef}>
        {categories.map((category) => (
          <div key={category.id} className="image-container" onClick={() => onCategoryClick(category)} style={{ cursor: 'pointer' }}>
            <img src={category.image} alt={category.title} className="circle-image" />
            <p style={{ fontSize: '13px' }}>{category.title}</p>
          </div>
        ))}
      </div>
      <button onClick={scrollRight} className="carousel-button">›</button>
    </div>
  );
};

export default Carousel;
