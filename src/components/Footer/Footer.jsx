import React from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaLandmark, FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import logoSymbol from '../../assets/logo/logo_symbol.png';
import logoText from '../../assets/logo/logo_text.png';

export const Footer = () => {
  const scrollSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 mb-12">
          
          {/* Logo brand info column */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollSection('hero')}>
              <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-lg bg-slate-900/40 p-1 border border-cyan-500/30">
                <img 
                  src={logoSymbol} 
                  alt="AL Symbol" 
                  className="w-full h-full object-contain animate-glow-glow" 
                />
              </div>
              <img 
                src={logoText} 
                alt="ASSETLAND" 
                className="h-5 sm:h-6 object-contain brightness-110 tracking-wider" 
              />
            </div>
            <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              AssetLand bridges data-driven market appraisals and fractional investment pools, unlocking prime commercial and residential yield streams.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors">
                <FaXTwitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors">
                <FaLinkedinIn size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors">
                <FaGithub size={14} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li><button onClick={() => scrollSection('hero')} className="hover:text-cyan-400 transition-colors cursor-pointer">Hero Home</button></li>
              <li><button onClick={() => scrollSection('featuredproperties')} className="hover:text-cyan-400 transition-colors cursor-pointer">Featured Properties</button></li>
              <li><button onClick={() => scrollSection('aiinsights')} className="hover:text-cyan-400 transition-colors cursor-pointer">Market Insights</button></li>
              <li><button onClick={() => scrollSection('investmentinsights')} className="hover:text-cyan-400 transition-colors cursor-pointer">Yield Performance</button></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact & Support</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <FiMail size={14} className="text-cyan-400" />
                <a href="mailto:contact@diintech.com" className="hover:text-cyan-450">contact@diintech.com</a>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone size={14} className="text-cyan-400" />
                <a href="tel:+918147540362" className="hover:text-cyan-450">+91 8147540362</a>
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>C-116, Sector-2, Noida, Uttar Pradesh – 201301, India </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} AssetLand Technologies Inc. Built in accordance with digital security standards.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/50 w-screen relative left-1/2 -translate-x-1/2 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-[14px] sm:text-xs text-slate-400 font-semibold flex items-center justify-center gap-2">
              
              All images are for display purposes. Contact us for actual photos and details.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;