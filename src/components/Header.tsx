import React from 'react';

interface HeaderProps {
  onNewsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewsClick }) => {
  return (
    <header className="w-full max-w-7xl text-center py-6 md:py-8 mb-6 flex justify-between items-center">
      <div className="flex items-center gap-4 md:gap-6">
        <a href="#" className="text-4xl md:text-5xl text-white text-shadow-dark uppercase tracking-wider flex items-center gap-4" style={{ textDecoration: 'none' }}>
          <svg className="h-10 w-10 md:h-12 md:w-12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M4 6 L2 6 L2 12 L4 12 L4 10 L8 10 L8 12 L10 12 L10 6 L8 6 L8 4 L4 4 L4 6 Z M8 4 L12 4 L12 0 L8 0 L8 4 Z M0 4 L4 4 L4 0 L0 0 L0 4 Z" />
          </svg>
          Scriptora
        </a>
        <a
          href="https://boosty.to/scriptora/donate"
          target="_blank"
          rel="noopener noreferrer"
          className="minecraft-btn minecraft-btn-support px-3 py-2 text-xs md:text-sm"
        >
          Поддержать автора
        </a>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={onNewsClick} className="minecraft-btn px-4 py-3 text-sm md:text-base">
          Новости
        </button>
        <a 
          href="https://t.me/Scriptora" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="minecraft-btn minecraft-btn-telegram p-3" 
          aria-label="Telegram-канал"
          title="Telegram-канал"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.3 1.36.17 1.15.94l-2.66 12.57c-.28 1.13-1.04 1.4-1.74.88L14.4 16.1l-4.1 3.95c-.47.44-1.28.21-1.52-.3z"/>
          </svg>
        </a>
      </div>
    </header>
  );
};

export default Header;
