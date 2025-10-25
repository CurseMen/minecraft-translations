import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-5xl mt-12 md:mt-20 text-center">
      <p className="text-stone-400 text-xs mb-2">
        &copy; {new Date().getFullYear()} Scriptora. Все права защищены.
      </p>
    </footer>
  );
};

export default Footer;
