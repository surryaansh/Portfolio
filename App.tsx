import React, { useState, useEffect, useRef } from 'react';
import { LightningIcon } from './components/icons/LightningIcon.tsx';
import { ReactIcon } from './components/icons/ReactIcon.tsx';
import { NodeJsIcon } from './components/icons/NodeJsIcon.tsx';
import { EthIcon } from './components/icons/EthIcon.tsx';
import { DarkModeToggle } from './components/DarkModeToggle.tsx';
import { FilledLightningIcon } from './components/icons/FilledLightningIcon.tsx';

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
  const [applyCursorFadeIn, setApplyCursorFadeIn] = useState(false);
  
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This effect handles the fade-in animation for the custom cursor
    // when it reappears after a theme transition.
    if (!isTransitioning) {
      // We use a short timeout to ensure the cursor element is mounted with
      // initial opacity 0 before we apply the state to transition it to opacity 1.
      const timer = setTimeout(() => {
        setApplyCursorFadeIn(true);
      }, 10); // A minimal delay is enough for the DOM to update.
      return () => {
        clearTimeout(timer);
        setApplyCursorFadeIn(false); // Reset on cleanup
      };
    }
  }, [isTransitioning]);
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
      
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
    // Fallback for browsers that don't support the API
    if (!document.startViewTransition) {
      setIsDarkMode(!isDarkMode);
      return;
    }

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    // Animate from the center of the button
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Calculate the radius to cover the entire screen
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    setIsTransitioning(true);
    // Start the transition
    const transition = document.startViewTransition(() => {
      setIsDarkMode(prev => !prev);
    });

    // Wait for the new DOM to be ready
    transition.ready.then(() => {
      // Animate the reveal effect
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
          // Specify the pseudo-element to animate
          pseudoElement: '::view-transition-new(root)',
        }
      );
      // When animation is done, re-enable custom cursor
      animation.finished.then(() => {
        setIsTransitioning(false);
      });
    });
  };

  const grayTextClasses = `transition-colors duration-300 ease-in-out ${
    isDarkMode
      ? 'text-gray-400'
      : 'text-gray-600'
  }`;

  return (
    <div 
      className={`min-h-screen flex flex-col font-sans px-4 md:px-16 pt-8 ${isDarkMode ? 'bg-black text-[#efeeee]' : 'bg-[#efeeee] text-black'}`}
      style={{ cursor: isTransitioning ? 'auto' : 'none' }}
      >
        <div className="hidden lg:block">
          {!isTransitioning && (
              <div
                  style={{
                    position: 'fixed',
                    top: cursorPosition.y,
                    left: cursorPosition.x,
                    width: `${isHoveringLink ? 60 : 40}px`,
                    height: `${isHoveringLink ? 60 : 40}px`,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999,
                    transition: 'width 0.2s ease, height 0.2s ease, opacity 0.5s ease-in-out',
                    opacity: applyCursorFadeIn ? 1 : 0,
                    backgroundColor: 'white',
                    mixBlendMode: 'difference',
                  }}
                  aria-hidden="true"
              />
          )}
        </div>
      {/* Top Bar */}
      <header className={`flex flex-col md:flex-row justify-between items-center py-4 border-b ${isDarkMode ? 'border-[#efeeee]' : 'border-black'}`}>
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="flex items-center gap-2">
            <LightningIcon className="h-6 text-[#FF4500]" />
            <span className="text-xl font-extrabold italic text-[#FF4500] tracking-wide">SURYANSH // SINGH</span>
          </div>
          <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={handleThemeToggle} />
        </div>
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-lg">
          <a href="#" className="transition-opacity duration-200">PROJECTS</a>
          <a href="#" className="transition-opacity duration-200">SKILLS</a>
          <a href="#" className="transition-opacity duration-200">LET'S CONNECT</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className={`flex flex-col lg:flex-row flex-1 divide-y lg:divide-y-0 lg:divide-x ${isDarkMode ? 'divide-[#efeeee]' : 'divide-black'}`}>
        {/* Left Side */}
        <div className="w-full lg:w-1/2 flex flex-col lg:pr-6 pb-8 lg:pb-0">
          <div className={`flex justify-between text-[10px] py-1 ${grayTextClasses}`}>
            <span>00 TITLE</span>
            <span>/00</span>
          </div>
          <div className="flex-1 flex flex-col pt-8 pb-12">
            {/* Top content block */}
            <div className="mb-auto">
              <h1 className="text-4xl md:text-5xl font-light leading-tight mb-6 text-center lg:text-left">
                FROM MERN TO WEB3 <br /> ALWAYS EXPLORING.
              </h1>

              {/* Emoji Row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
                <LightningIcon className="w-6 h-6 transition-transform duration-300 ease-in-out hover:scale-125" />
                <ReactIcon className="w-10 h-10 transition-transform duration-300 ease-in-out hover:scale-125" />
                <LightningIcon className="w-6 h-6 transition-transform duration-300 ease-in-out hover:scale-125" />
                <NodeJsIcon className="w-10 h-10 transition-transform duration-300 ease-in-out hover:scale-125" />
                <LightningIcon className="w-6 h-6 transition-transform duration-300 ease-in-out hover:scale-125" />
                <EthIcon className="w-[2.625rem] h-[2.625rem] transition-transform duration-300 ease-in-out hover:scale-125" />
              </div>
            </div>
            
            {/* Bottom content block */}
            <div className="flex justify-center lg:justify-end mb-12">
              <p 
                className={`max-w-md leading-relaxed text-center lg:text-left ${grayTextClasses}`}
                style={{ fontSize: '1.0153rem' }}
              >
                Not just another portfolio, this is my journey in code. From MERN apps to blockchain platforms powered by smart contracts, this journey is about continuous growth, learning, and building technology with purpose.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 flex flex-col lg:pl-6 pt-8 lg:pt-0">
          <div className={`flex justify-between text-[10px] py-1 ${grayTextClasses}`}>
            <span>01 LOGO</span>
            <span>/01</span>
          </div>
          <div 
            ref={imageContainerRef}
            className="flex-1 relative overflow-hidden px-2 pt-0 pb-12 lg:px-0"
          >
            <div
              className="hidden lg:block"
              style={{
                position: 'absolute',
                top: relativeCursorPosition.y,
                left: relativeCursorPosition.x,
                width: `${isHoveringLink ? 60 : 40}px`,
                height: `${isHoveringLink ? 60 : 40}px`,
                backgroundColor: isDarkMode ? 'white' : 'black',
                borderRadius: '50%',
                pointerEvents: 'none',
                transform: 'translate(-50%, -50%)',
                zIndex: 10000,
                transition: 'width 0.2s ease, height 0.2s ease',
              }}
              aria-hidden="true"
            />
            <img 
                src="/vaporwave-david.png"
                alt="Vaporwave style statue of David wearing a glowing crown and glasses."
                className="w-full h-full object-cover"
            />
            <FilledLightningIcon 
              className="absolute bottom-12 right-6 md:bottom-20 md:right-[5%] text-[#FF4500] w-28 h-28 md:w-[9.409rem] md:h-[9.409rem]"
              style={{ mixBlendMode: 'normal' }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
