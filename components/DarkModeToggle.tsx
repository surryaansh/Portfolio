import React from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? 'Activate light mode' : 'Activate dark mode'}
      className={`relative inline-flex items-center h-7 w-14 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isDarkMode 
          ? 'bg-gray-700 focus:ring-red-600 focus:ring-offset-black' 
          : 'bg-gray-300 focus:ring-black focus:ring-offset-[#efeeee]'
      }`}
    >
      {/* Moon icon is on the left, visible in dark mode */}
      <MoonIcon className={`absolute left-2 w-4 h-4 text-blue-300 transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Sun icon is on the right, visible in light mode */}
      <SunIcon className={`absolute right-2 w-4 h-4 text-yellow-500 transition-opacity duration-300 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`} />
      
      {/* Sliding thumb */}
      <span
        aria-hidden="true"
        className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${
          isDarkMode ? 'translate-x-[26px]' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
};
