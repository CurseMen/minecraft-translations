import React from 'react';
import { news } from '../data/news';

const NewsFeed: React.FC = () => {
  const sortedNews = [...news].sort((a, b) => b.id - a.id);

  return (
    <div className="h-full">
      <h2 className="text-2xl uppercase text-black text-center mb-4" style={{ textShadow: '2px 2px 0 #ffffff90' }}>
        Новости
      </h2>
      <div className="space-y-4">
        {sortedNews.map((item) => (
          <div key={item.id} className="border-b-4 border-stone-500 pb-2 last:border-b-0">
            <p className="text-stone-600 text-xs mb-1">{item.date}</p>
            <p 
              className="text-stone-800 text-sm"
              dangerouslySetInnerHTML={{ __html: item.content }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;