import React, { useState, useEffect } from 'react';
import { LightningIcon } from './components/icons/LightningIcon';
import { FaceIcon1 } from './components/icons/FaceIcon1'; // Smirk
import { FaceIcon2 } from './components/icons/FaceIcon2'; // Angry
import { FaceIcon3 } from './components/icons/FaceIcon3'; // Neutral

export default function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const interactiveElements = document.querySelectorAll('a, button');
    const specialTextElements = document.querySelectorAll('.gray-text');
    
    const handleLinkEnter = () => setIsHoveringLink(true);
    const handleLinkLeave = () => setIsHoveringLink(false);

    const handleSpecialTextEnter = (event: Event) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.style.color = 'black';
      }
    };
    const handleSpecialTextLeave = (event: Event) => {
      if (event.currentTarget instanceof HTMLElement) {
        event.currentTarget.style.color = '';
      }
    };

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleLinkEnter);
      el.addEventListener('mouseleave', handleLinkLeave);
    });

    specialTextElements.forEach(el => {
      el.addEventListener('mouseenter', handleSpecialTextEnter);
      el.addEventListener('mouseleave', handleSpecialTextLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkEnter);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
      specialTextElements.forEach(el => {
        el.removeEventListener('mouseenter', handleSpecialTextEnter);
        el.removeEventListener('mouseleave', handleSpecialTextLeave);
      });
    };
  }, []);

  const cursorSize = isHoveringLink ? 60 : 40;

  return (
    <div 
      className="bg-[#efeeee] min-h-screen flex flex-col font-sans px-16 pt-8 text-black"
      style={{ cursor: 'none' }}
      >
        <div
            style={{
                position: 'fixed',
                top: cursorPosition.y,
                left: cursorPosition.x,
                width: `${cursorSize}px`,
                height: `${cursorSize}px`,
                borderRadius: '50%',
                pointerEvents: 'none',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
                transition: 'width 0.2s ease, height 0.2s ease',
                backgroundColor: 'white',
                mixBlendMode: 'difference',
            }}
            aria-hidden="true"
        />
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
        <div className="w-1/2 flex flex-col pr-8">
          <div className="flex justify-between text-xs text-gray-600 py-4 gray-text transition-colors duration-300 ease-in-out">
            <span>00 TITLE</span>
            <span>/00</span>
          </div>
          <div className="flex-1 flex flex-col justify-between py-12">
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
              <p className="text-gray-600 max-w-md text-sm leading-relaxed text-left gray-text transition-colors duration-300 ease-in-out">
                Not just another portfolio, this is my journey in code. From MERN apps to blockchain platforms powered by smart contracts, this journey is about continuous growth, learning, and building technology with purpose.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 flex flex-col pl-8">
          <div className="flex justify-between text-xs text-gray-600 py-4 gray-text transition-colors duration-300 ease-in-out">
            <span>01 LOGO</span>
            <span>/01</span>
          </div>
          <div className="flex-1 flex justify-end items-end py-12">
             <LightningIcon className="w-40 h-40 object-contain text-red-600 flex-shrink-0" />
          </div>
        </div>
      </main>
    </div>
  );
}
