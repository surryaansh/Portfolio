
import React from 'react';

interface IconProps {
  className?: string;
}

export const FaceIcon1: React.FC<IconProps> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="32" cy="32" r="30" stroke="black" strokeWidth="2"/>
      <path d="M20 28C22 24 26 24 28 28" stroke="black" strokeWidth="2" strokeLinecap="round"/>
      <path d="M44 28C42 24 38 24 36 28" stroke="black" strokeWidth="2" strokeLinecap="round"/>
      <line x1="24" y1="42" x2="40" y2="42" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
};
