import React from 'react';

interface IconProps {
  className?: string;
}

export const FaceIcon3: React.FC<IconProps> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="32" cy="32" r="30" stroke="black" strokeWidth="2"/>
      <path d="M22 32 H 26" stroke="black" strokeWidth="2" strokeLinecap="round"/>
      <path d="M38 32 H 42" stroke="black" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 44 H 40" stroke="black" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
};