import React from 'react';

interface AppFooterProps {
  className?: string;
}

export const AppFooter: React.FC<AppFooterProps> = ({ className = '' }) => {
  return (
    <footer className={`text-center py-3.5 px-4 text-xs text-[#7C8880] ${className}`}>
      <p className="whitespace-nowrap tracking-wide">
        Made by Melanie F., a CC Parent. Not affiliated with Classical Conversations.
      </p>
    </footer>
  );
};
