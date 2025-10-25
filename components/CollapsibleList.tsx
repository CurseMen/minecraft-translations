import React, { useState } from 'react';

interface CollapsibleListProps {
  title: string;
  items: string[];
}

const CollapsibleList: React.FC<CollapsibleListProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="minecraft-collapsible-container">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="minecraft-collapsible-header text-lg"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
      </button>
      {isOpen && (
        <ul className="minecraft-collapsible-content">
          {items.map((item, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CollapsibleList;