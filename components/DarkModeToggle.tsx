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
      className={`relative inline-flex items-center h-8 rounded-full w-16 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDarkMode ? 'bg-gray-700 focus:ring-red-600' : 'bg-gray-300 focus:ring-black'}`}
    >
      <SunIcon className={`absolute left-2 w-4 h-4 text-yellow-500 transition-opacity duration-300 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`} />
      <MoonIcon className={`absolute right-2 w-4 h-4 text-blue-300 transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`} />
      <span
        className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ${isDarkMode ? 'translate-x-9' : 'translate-x-1'}`}
      />
    </button>
  );
};
