
import React from 'react';

interface IconProps {
  className?: string;
}

export const SparkleIcon: React.FC<IconProps> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 0L13.4142 10.5858L24 12L13.4142 13.4142L12 24L10.5858 13.4142L0 12L10.5858 10.5858L12 0Z" fill="black"/>
    </svg>
  );
};
