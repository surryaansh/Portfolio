import React from 'react';

interface IconProps {
  className?: string;
}

export const LargeLogoIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
    >
      <path d="M106.94,50.83,81.47,43.35,93.42,19.5,69.17,29,59.29,5.17,50.83,29,26.58,19.5,38.53,43.35,13.06,50.83,38.53,58.31,26.58,82.16,50.83,72.66,59.29,96.49,69.17,72.66,93.42,82.16,81.47,58.31Z" />
    </svg>
  );
};