
import React from 'react';

interface IconProps {
  className?: string;
}

export const FaceIcon2: React.FC<IconProps> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="32" cy="32" r="30" stroke="black" strokeWidth="2"/>
      <path d="M20 30L28 26" stroke="black" strokeWidth="2" strokeLinecap="round"/>
      <path d="M44 30L36 26" stroke="black" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 44C26 40 30 40 32 42C34 40 38 40 40 44" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
