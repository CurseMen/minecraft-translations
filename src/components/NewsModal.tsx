import React from 'react';
import NewsFeed from './NewsFeed';

interface NewsModalProps {
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ onClose }) => {
  // Close modal when clicking on the overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="news-modal-overlay" 
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="news-modal-content minecraft-card p-2">
        <div className="minecraft-card-inner p-6 h-full relative">
           <button 
            onClick={onClose} 
            className="minecraft-btn close-button"
            aria-label="Закрыть новости"
          >
            X
          </button>
          <NewsFeed />
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
