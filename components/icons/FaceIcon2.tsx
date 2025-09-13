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
      <path d="M18 28 L28 24" stroke="black" strokeWidth="2" strokeLinecap="round"/>
      <path d="M46 28 L36 24" stroke="black" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 48 C 28 42, 36 42, 40 48" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
};