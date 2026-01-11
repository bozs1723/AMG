
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", showText = true, light = false }) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* SVG Logo Graphic mimicking the provided image */}
      <div className="relative w-12 h-12 flex-shrink-0">
        {/* The Medical Cross */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-4 bg-[#3498db] rounded-sm shadow-sm"></div>
          <div className="absolute w-4 h-full bg-[#3498db] rounded-sm shadow-sm"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[85%] h-3 bg-[#e74c3c] rounded-sm"></div>
          <div className="absolute w-3 h-[85%] bg-[#e74c3c] rounded-sm"></div>
        </div>
        {/* Heart & Globe Overlay (Simplified representation) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-white/20 stroke-white/80" strokeWidth="1">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div className="absolute">
             <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#3498db] fill-none stroke-current" strokeWidth="2">
               <circle cx="12" cy="12" r="10" />
               <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
             </svg>
          </div>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-baseline space-x-1">
            <span className={`font-black text-xl tracking-tight leading-none ${light ? 'text-white' : 'text-[#0a1d4a]'}`}>ASIA MEDICARE</span>
            <span className={`font-black text-xl tracking-tight leading-none ${light ? 'text-white/90' : 'text-[#0a1d4a]'}`}>GROUP</span>
          </div>
          <span className={`text-[10px] font-bold tracking-[0.15em] leading-none mt-1 ${light ? 'text-white/70' : 'text-[#3498db]'}`}>
            KING OF MEDICAL TOURISM
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
