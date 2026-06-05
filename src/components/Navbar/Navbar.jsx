import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import logoSymbol from '../../assets/logo/logo_symbol.png';
import logoText from '../../assets/logo/logo_text.png';

const menuItems = [
  { id: 'hero',               name: 'Home'       },
  { id: 'featuredproperties', name: 'Properties' },
  { id: 'aiinsights',         name: 'Insights'   },
  { id: 'investmentinsights', name: 'Investment' },
  { id: 'testimonials',       name: 'Reviews'    },
  { id: 'faq',                name: 'FAQ'        },
  { id: 'contact',            name: 'Contact'    },
];

export const Navbar = ({ activeSection }) => {
  const [isOpen,     setIsOpen]     = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setIsOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const scrollTo = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    setTimeout(() => {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }, 50);
    window.history.pushState(null, '', `#${id}`);
  };

  return (
    <>
      {/* ── Floating pill navbar ── */}
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl transition-all duration-300"
      >
        <div
          className={`flex items-center justify-between px-4 sm:px-4 py-2.5 rounded-2xl border transition-all duration-300 ${
            isScrolled
              ? 'bg-slate-950/90 backdrop-blur-xl border-cyan-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
              : 'bg-slate-900/60 backdrop-blur-md border-slate-800/50'
          }`}
        >
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer flex-shrink-0"
            onClick={() => scrollTo('hero')}
          >
            <img src={logoSymbol} alt="AL" className="w-10 h-10 object-contain animate-glow-glow" />
            <img src={logoText} alt="ASSETLAND" className="hidden sm:block h-5 sm:h-6 object-contain brightness-110" />
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-2.5 xl:px-3 py-1.5 text-[11px] xl:text-xs font-bold tracking-widest uppercase transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                  activeSection === item.id ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
                )}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={() => scrollTo('contact')}
            className="hidden lg:block glow-btn bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer flex-shrink-0"
          >
            Get Quote
          </button>

          {/* Hamburger */}
          <button
            className="lg:hidden text-slate-300 hover:text-white p-1.5 rounded-xl transition-colors cursor-pointer"
            onClick={() => setIsOpen(p => !p)}
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile drawer — drops below pill */}
        <div className={`lg:hidden absolute top-[calc(100%+0.5rem)] left-0 right-0 transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}>
          <div className="bg-slate-900/98 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-3 grid grid-cols-2 gap-1.5">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white border border-slate-800/40'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="px-3 pb-3">
              <button
                onClick={() => scrollTo('contact')}
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Get Free Quote
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
};

export default Navbar;
