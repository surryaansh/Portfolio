
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
      fill="#FF4D4D"
    >
      <g transform="rotate(-15 60 60)">
        <path 
          d="M60 10 L75 45 L110 60 L75 75 L60 110 L45 75 L10 60 L45 45 Z" 
          transform="translate(5, -5)"
        />
        <path 
          d="M60 10 L75 45 L110 60 L75 75 L60 110 L45 75 L10 60 L45 45 Z"
          transform="translate(-5, 5)"
        />
      </g>
    </svg>
  );
};
