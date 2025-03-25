import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Pagination.css"; 

const items = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  description:`Description for item ${i + 1}`
}));
const itemsPerPage = 10;

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
          <div className="list">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <div
                key={index}
                className="list-item loading-shimmer"
                style={{ height: '60px' }}
              />
            ))}
          </div>
        ) : (
          <motion.ul
            key={currentPage}
            className="list"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {paginatedItems.map((item, index) => (
              <motion.li
                key={item.id}
                className="list-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <div>
                  <h3>{item.name}</h3>
                  <p className="text-secondary">{item.description}</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="arrow"
                >
                  →
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
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