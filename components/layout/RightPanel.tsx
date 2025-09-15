import React, { forwardRef } from 'react';

interface RightPanelProps {
  isDarkMode: boolean;
  isHoveringLink: boolean;
  relativeCursorPosition: { x: number; y: number };
}

export const RightPanel = forwardRef<HTMLDivElement, RightPanelProps>(
  ({ isDarkMode, isHoveringLink, relativeCursorPosition }, ref) => {
    const grayTextClasses = `transition-colors duration-300 ease-in-out ${
      isDarkMode
        ? 'text-gray-400'
        : 'text-gray-600'
    }`;
  
    return (
      <div className="w-full lg:w-1/2 flex flex-col lg:pl-6 pt-8 lg:pt-0">
        <div className={`text-[10px] py-2 ${grayTextClasses}`}>
          <div className="flex justify-between">
            <span>01</span>
            <span>/01</span>
          </div>
          <span>LOGO</span>
        </div>
        <div 
          ref={ref}
          className="flex-1 relative overflow-hidden pt-2 pb-12"
        >
          {/* This is the solid cursor, only visible when inside this container */}
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
            alt="A thin sliver of a vaporwave-style sculpture."
            className="h-full w-4 object-cover"
            aria-hidden="true"
          />
        </div>
      </div>
    );
  }
);
