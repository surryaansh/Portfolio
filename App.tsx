import React from 'react';
import { LogoIcon } from './components/icons/LogoIcon';
import { LargeLogoIcon } from './components/icons/LargeLogoIcon';
import { SparkleIcon } from './components/icons/SparkleIcon';
import { FaceIcon1 } from './components/icons/FaceIcon1'; // Smirk
import { FaceIcon2 } from './components/icons/FaceIcon2'; // Angry
import { FaceIcon3 } from './components/icons/FaceIcon3'; // Neutral

const App: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-black">
        <div className="flex items-center gap-2">
          <LogoIcon className="h-6 text-red-600" />
          <span className="font-bold text-red-600 tracking-wide">HASHIRA</span>
        </div>
        <nav className="flex gap-8 text-lg">
          <a href="#" className="hover:underline">WORK</a>
          <a href="#" className="hover:underline">CAREERS</a>
          <a href="#" className="hover:underline">CONTACT</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 divide-x divide-black">
        {/* Left Side */}
        <div className="w-1/2 flex flex-col p-12">
          <div>
            <h1 className="text-5xl font-light leading-tight mb-6">
              WE’RE SHAPING <br /> WEB3 AND AI.
            </h1>

            {/* Emoji Row */}
            <div className="flex items-center gap-4 mb-10">
              <span className="flex items-center gap-1">
                <SparkleIcon className="w-6 h-6" />
                <FaceIcon1 className="w-10 h-10" />
              </span>
              <span className="flex items-center gap-1">
                <SparkleIcon className="w-6 h-6" />
                <FaceIcon2 className="w-10 h-10" />
              </span>
              <span className="flex items-center gap-1">
                <SparkleIcon className="w-6 h-6" />
                <FaceIcon3 className="w-10 h-10" />
              </span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 flex flex-col justify-end p-12">
           <div className="flex justify-between items-end gap-4">
              <p className="text-gray-600 max-w-md text-sm leading-relaxed">
                Not with frameworks, but with first principles and fresh architecture. Everything we touch is engineered with care and real-world pressure in mind. Because deep tech deserves deep work.
              </p>
              <LargeLogoIcon className="w-40 h-40 object-contain text-red-600 flex-shrink-0" />
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;
