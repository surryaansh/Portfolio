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
      <path d="M20 32C22 36 26 36 28 32" stroke="black" strokeWidth="2" strokeLinecap="round"/>
      <path d="M44 32C42 36 38 36 36 32" stroke="black" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 44C26 42 28 44 32 42C36 44 38 42 40 44" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
};