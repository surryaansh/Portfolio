import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/layout/Header.tsx';
import { LeftPanel } from './components/layout/LeftPanel.tsx';
import { RightPanel } from './components/layout/RightPanel.tsx';
import { BlendedCursor } from './components/BlendedCursor.tsx';

// The ViewTransition API is not yet in standard TS libs, so we declare it here.
declare global {
  interface Document {
    startViewTransition?(callback: () => void): ViewTransition;
  }

  interface ViewTransition {
    ready: Promise<void>;
  }
}

export default function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [relativeCursorPosition, setRelativeCursorPosition] = useState({ x: -100, y: -100 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
      
      // We still need the ref in App.tsx to pass it to the RightPanel,
      // but the calculation is now scoped to where the ref is actually used.
      if (imageContainerRef.current) {
        const rect = imageContainerRef.current.getBoundingClientRect();
        setRelativeCursorPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const interactiveElements = document.querySelectorAll('a, button');
    
    const handleLinkEnter = () => setIsHoveringLink(true);
    const handleLinkLeave = () => setIsHoveringLink(false);

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleLinkEnter);
      el.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkEnter);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  const handleThemeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!document.startViewTransition) {
      setIsDarkMode(!isDarkMode);
      return;
    }

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    setIsTransitioning(true);
    const transition = document.startViewTransition(() => {
      setIsDarkMode(prev => !prev);
    });

    transition.ready.then(() => {
      const animation = document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
      animation.finished.then(() => {
        setIsTransitioning(false);
      });
    });
  };

  return (
    <div 
      className={`min-h-screen flex flex-col font-sans px-4 md:px-16 pt-8 ${isDarkMode ? 'bg-black text-[#efeeee]' : 'bg-[#efeeee] text-black'}`}
      style={{ cursor: isTransitioning ? 'auto' : 'none' }}
    >
      <BlendedCursor 
        position={cursorPosition} 
        isHoveringLink={isHoveringLink} 
        isTransitioning={isTransitioning} 
      />
      
      <Header isDarkMode={isDarkMode} toggleDarkMode={handleThemeToggle} />

      <main className={`flex flex-col lg:flex-row flex-1 divide-y lg:divide-y-0 lg:divide-x ${isDarkMode ? 'divide-[#efeeee]' : 'divide-black'}`}>
        <LeftPanel isDarkMode={isDarkMode} />
        <RightPanel 
          ref={imageContainerRef}
          isDarkMode={isDarkMode} 
          isHoveringLink={isHoveringLink}
          relativeCursorPosition={relativeCursorPosition}
        />
      </main>
    </div>
  );
}
