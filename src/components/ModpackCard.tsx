import React from 'react';
import { Modpack } from '../types';

interface ModpackCardProps {
  modpack: Modpack;
  downloadCount: number | 'loading' | 'error' | undefined;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.707a1 1 0 011.414 0L9 11.086V3a1 1 0 112 0v8.086l1.293-1.379a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const ModpackCard: React.FC<ModpackCardProps> = ({ modpack, downloadCount }) => {
  const renderCount = () => {
    if (downloadCount === 'loading') return '...';
    if (downloadCount === 'error') return 'Ошибка';
    if (typeof downloadCount === 'number') return downloadCount.toLocaleString('ru-RU');
    return null;
  };

  const handleCardClick = () => {
    window.location.hash = `#${modpack.id}`;
  };
  
  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation to detail page
    window.open(modpack.downloadUrl, '_blank', 'noopener,noreferrer');
  };

  const isRecentlyUpdated = () => {
    if (!modpack.lastUpdated) return false;
    const updateDate = new Date(modpack.lastUpdated);
    const today = new Date();
    
    // Reset time part to compare dates only
    updateDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = today.getTime() - updateDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays >= 0 && diffDays <= 7;
  };

  return (
    <div className="minecraft-card p-2 flex flex-col" onClick={handleCardClick}>
      <div className="minecraft-card-inner p-4 flex flex-col h-full">
        <div className="relative">
          <img 
            src={modpack.imageUrl} 
            alt={modpack.title}
            className="w-full h-40 object-cover border-4 border-stone-900" 
          />
          {modpack.isOutdated ? (
            <div className="outdated-badge absolute top-2 left-2 text-xs px-2 py-1 rounded">
              Неактуален
            </div>
          ) : isRecentlyUpdated() && (
            <div className="update-badge absolute top-2 left-2 text-white text-xs px-2 py-1 rounded">
              Обновлено!
            </div>
          )}
          {renderCount() && (
            <div className="download-badge absolute bottom-2 right-2 text-white text-xs px-2 py-1 rounded flex items-center">
              <DownloadIcon />
              <span>{renderCount()}</span>
            </div>
          )}
        </div>

        <h2 className="text-2xl mt-4 uppercase text-black" style={{ textShadow: '2px 2px 0 #ffffff90' }}>
          {modpack.title}
        </h2>
        <p className="text-stone-600 text-sm mt-1 mb-4">
          Версия: {modpack.version}
          <span className="mx-2 text-stone-400">|</span>
          MC: {modpack.minecraftVersion}
        </p>
        <span className="text-stone-600 text-sm mt-1 mb-4">
        Последнее обновление перевода: {modpack.lastUpdated}
        </span>
        <p className="text-stone-800 text-base flex-grow mb-6">
          {modpack.description}
        </p>
        <button
          onClick={handleDownloadClick}
          className="minecraft-btn w-full text-center py-3 text-lg uppercase mt-auto"
        >
          Скачать
        </button>
      </div>
    </div>
  );
};

export default ModpackCard;
