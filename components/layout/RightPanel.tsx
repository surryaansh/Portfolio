import React, { forwardRef, useEffect, useRef } from 'react';
import { FilledLightningIcon } from '../icons/FilledLightningIcon.tsx';

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
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const isReadyToPaint = useRef(false);

    // Effect for setting up the canvas, loading the image, and handling resize
    useEffect(() => {
      const canvas = canvasRef.current;
      const container = (ref as React.RefObject<HTMLDivElement>)?.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      const setupCanvas = () => {
        isReadyToPaint.current = false;
        const dpr = window.devicePixelRatio || 1;
        const rect = container.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        ctx.scale(dpr, dpr);
        
        ctx.fillStyle = isDarkMode ? '#000000' : '#efeeee';
        ctx.fillRect(0, 0, rect.width, rect.height);

        if (!imageRef.current) {
          const img = new Image();
          img.src = '/vaporwave-david.png';
          img.onload = () => {
            imageRef.current = img;
            isReadyToPaint.current = true;
          };
        } else {
          isReadyToPaint.current = true;
        }
      };
      
      setupCanvas();

      const resizeObserver = new ResizeObserver(setupCanvas);
      resizeObserver.observe(container);

      return () => resizeObserver.disconnect();
    }, [isDarkMode, ref]);

    // Effect for painting on the canvas when the cursor moves
    useEffect(() => {
      if (!isReadyToPaint.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const image = imageRef.current;
      
      if (!ctx || !image || !canvas) return;

      const brushRadius = (isHoveringLink ? 60 : 40) / (2 * (window.devicePixelRatio || 1));
      const { x, y } = relativeCursorPosition;

      if (x < -brushRadius || y < -brushRadius) return; // Don't draw if cursor is way outside

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(image, 0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.restore();
    }, [relativeCursorPosition, isHoveringLink]);
  
    return (
      <div className="w-full lg:w-12 flex flex-col lg:pl-6 pt-8 lg:pt-0">
        <div className={`flex justify-between text-[10px] py-2 ${grayTextClasses}`}>
          <span>01 LOGO</span>
          <span>/01</span>
        </div>
        <div 
          ref={ref}
          className="flex-1 relative overflow-hidden px-2 pt-0 pb-12 lg:px-0"
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
          <canvas 
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            aria-label="An interactive canvas. Move your mouse to reveal an artwork."
          />
          <FilledLightningIcon 
            className="absolute bottom-12 right-6 md:bottom-20 md:right-[5%] text-[#FF4500] w-28 h-28 md:w-[9.409rem] md:h-[9.409rem] pointer-events-none"
            style={{ mixBlendMode: 'normal' }}
          />
        </div>
      </div>
    );
  }
);
