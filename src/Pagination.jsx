import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Pagination.css"; 

// Updated items array with image URLs (using placeholder images)
const items = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`,
  image: `https://picsum.photos/300/300?random=${i + 1}` // Random placeholder images
}));
const itemsPerPage = 12; // Changed to 12 for better grid layout (3x4 or 4x3)

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsLoading(false);
    }, 500);
  };

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Auto-scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="container">
      <h1 className="header">Modern Pagination</h1>
      
      <div className="pagination-controls">
        <button
          className="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
        >
          ← Previous
        </button>
        
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>

        <select
          className="page-select"
          value={currentPage}
          onChange={(e) => handlePageChange(Number(e.target.value))}
          disabled={isLoading}
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <button
          className="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
        >
          Next →
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <div className="grid-container">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <div
                key={index}
                className="grid-item loading-shimmer"
              />
            ))}
          </div>
        ) : (
          <motion.div
            key={currentPage}
            className="grid-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {paginatedItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="grid-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="item-image-container">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="item-image"
                    loading="lazy"
                  />
                </div>
                <div className="item-content">
                  <h3>{item.name}</h3>
                  <p className="text-secondary">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pagination-controls">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`button ${currentPage === index + 1 ? 'active-page' : ''}`}
            onClick={() => handlePageChange(index + 1)}
            disabled={isLoading}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;