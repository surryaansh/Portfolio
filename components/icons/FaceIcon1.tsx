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
      <path d="M20 30 C22 28 26 28 28 30" stroke="black" strokeWidth="2" strokeLinecap="round"/>
      <path d="M36 30 L44 30" stroke="black" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 44 Q 32 42 40 46" stroke="black" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  );
};