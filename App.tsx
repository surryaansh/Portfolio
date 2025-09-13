import React from 'react';
import { LogoIcon } from './components/icons/LogoIcon';
import { LargeLogoIcon } from './components/icons/LargeLogoIcon';
import { PlusIcon } from './components/icons/PlusIcon';
import { FaceIcon1 } from './components/icons/FaceIcon1';
import { FaceIcon2 } from './components/icons/FaceIcon2';

const App: React.FC = () => {
  return (
    <div className="bg-[#F3F3F3] text-black min-h-screen flex flex-col p-4 sm:p-6 md:p-8 font-light">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between md:items-center w-full pb-4">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <LogoIcon className="w-8 h-8" />
          <span className="text-2xl font-normal tracking-[0.3em]">HASHIRA</span>
        </div>
        <nav className="flex items-center space-x-6 sm:space-x-8 text-sm sm:text-base font-normal tracking-[0.25em]">
          <a href="#" className="hover:text-[#FF4D4D] transition-colors">WORK</a>
          <a href="#" className="hover:text-[#FF4D4D] transition-colors">CAREERS</a>
          <a href="#" className="hover:text-[#FF4D4D] transition-colors">CONTACT</a>
        </nav>
      </header>

      {/* Main Content Grid */}
      <main className="flex-grow w-full grid grid-cols-1 lg:grid-cols-2 border-y border-black">
        {/* Left Column */}
        <div className="flex flex-col justify-between p-4 sm:p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-black min-h-[70vh] lg:min-h-0">
          <div className="flex justify-between items-center text-xs tracking-widest">
            <span>00 TITLE</span>
            <span>/00</span>
          </div>
          
          <div className="my-16">
            <h1 className="text-5xl sm:text-6xl md:text-7xl leading-tight tracking-wider font-normal">
              WE'RE SHAPING
              <br />
              WEB3 AND AI.
            </h1>
            <div className="flex items-center space-x-4 mt-8">
              <PlusIcon className="w-8 h-8" />
              <FaceIcon1 className="w-12 h-12" />
              <PlusIcon className="w-8 h-8" />
              <FaceIcon2 className="w-12 h-12" />
              <PlusIcon className="w-8 h-8" />
              <FaceIcon1 className="w-12 h-12" />
            </div>
          </div>
          
          <p className="text-base sm:text-lg max-w-md leading-relaxed">
            Not with frameworks, but with first principles and fresh architecture. Everything we touch is engineered with care and real-world pressure in mind. Because deep tech deserves deep work.
          </p>
        </div>

        {/* Right Column */}
        <div className="relative flex flex-col justify-between p-4 sm:p-6 md:p-8 min-h-[50vh] lg:min-h-0">
           <div className="flex justify-between items-center text-xs tracking-widest">
            <span>01 LOGO</span>
            <span className="self-end">/01</span>
          </div>
          
          <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 md:bottom-16 md:right-16">
            <LargeLogoIcon className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;