import React from 'react';
import { LightningIcon } from './components/icons/LightningIcon';
import { FaceIcon1 } from './components/icons/FaceIcon1'; // Smirk
import { FaceIcon2 } from './components/icons/FaceIcon2'; // Angry
import { FaceIcon3 } from './components/icons/FaceIcon3'; // Neutral

export default function App() {
  return (
    <div className="bg-[#efeeee] min-h-screen flex flex-col font-sans px-16 pt-8 text-black">
      {/* Top Bar */}
      <header className="flex justify-between items-center py-4 border-b border-black">
        <div className="flex items-center gap-2">
          <LightningIcon className="h-6 text-red-600" />
          <span className="font-bold text-red-600 tracking-wide">SURYANSH // SINGH</span>
        </div>
        <nav className="flex gap-8 text-lg">
          <a href="#" className="hover:underline">PROJECTS</a>
          <a href="#" className="hover:underline">SKILLS</a>
          <a href="#" className="hover:underline">LET'S CONNECT</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 divide-x divide-black">
        {/* Left Side */}
        <div className="w-1/2 flex flex-col">
          <div className="flex justify-between text-xs text-gray-500 p-4">
            <span>00 TITLE</span>
            <span>/00</span>
          </div>
          <div className="flex-1 flex flex-col justify-between p-12">
            {/* Top content block */}
            <div>
              <h1 className="text-5xl font-light leading-tight mb-6 text-left">
                FROM MERN TO WEB3 <br /> ALWAYS EXPLORING.
              </h1>

              {/* Emoji Row */}
              <div className="flex items-center justify-start gap-4 mb-10">
                <span className="flex items-center gap-1">
                  <LightningIcon className="w-6 h-6" />
                  <FaceIcon1 className="w-10 h-10" />
                </span>
                <span className="flex items-center gap-1">
                  <LightningIcon className="w-6 h-6" />
                  <FaceIcon2 className="w-10 h-10" />
                </span>
                <span className="flex items-center gap-1">
                  <LightningIcon className="w-6 h-6" />
                  <FaceIcon3 className="w-10 h-10" />
                </span>
              </div>
            </div>
            
            {/* Bottom content block */}
            <div className="flex justify-end">
              <p className="text-gray-600 max-w-md text-sm leading-relaxed text-left">
                Not just another portfolio, this is my journey in code. From MERN apps to blockchain platforms powered by smart contracts, this journey is about continuous growth, learning, and building technology with purpose.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 flex flex-col">
          <div className="flex justify-between text-xs text-gray-500 p-4">
            <span>01 LOGO</span>
            <span>/01</span>
          </div>
          <div className="flex-1 flex justify-end items-end p-12">
             <LightningIcon className="w-40 h-40 object-contain text-red-600 flex-shrink-0" />
          </div>
        </div>
      </main>
    </div>
  );
}
