import React, { useEffect, useState } from 'react';
import logoSymbol from '../../assets/logo/logo_symbol.png';

export const Loader = () => {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Start fading out slightly before unmounting
    const fadeTimer = setTimeout(() => setFade(true), 1200);
    const removeTimer = setTimeout(() => setVisible(false), 1600);
    
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#0b0f19] flex flex-col items-center justify-center transition-all duration-500 ${
      fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      <div className="relative flex items-center justify-center">
        {/* Orbit animation ring */}
        <div className="w-24 h-24 rounded-full border border-dashed border-cyan-500/25 animate-spin absolute" style={{ animationDuration: '6s' }}></div>
        <div className="w-20 h-20 rounded-full border border-cyan-500/40 animate-pulse absolute"></div>
        <div className="w-16 h-16 rounded-full bg-slate-900 border border-cyan-400/60 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          <img src={logoSymbol} alt="AL Logo" className="w-8 h-8 object-contain animate-glow-glow" />
        </div>
      </div>
      
      <p className="mt-6 font-heading text-xs font-bold tracking-widest text-slate-400 uppercase animate-pulse">
        Initializing AI Data Core...
      </p>
    </div>
  );
};

export default Loader;
