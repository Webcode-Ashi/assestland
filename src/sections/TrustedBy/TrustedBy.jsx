import React from 'react';
import { Landmark } from 'lucide-react';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';

export const TrustedBy = () => {
  const partners = [
    { name: 'Apex Capital', logo: 'APEX' },
    { name: 'Vertex Partners', logo: 'VERTEX' },
    { name: 'Nova Group', logo: 'NOVA' },
    { name: 'Zenith Holdings', logo: 'ZENITH' },
    { name: 'Horizon Fund', logo: 'HORIZON' }
  ];

  const scopeRef = useGSAP(() => {
    gsap.fromTo('.trusted-logo',
      { opacity: 0, scale: 0.85 },
      {
        opacity: 0.65,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: scopeRef.current,
          start: 'top 90%'
        }
      }
    );
  }, []);

  return (
    <section 
      id="trustedby" 
      ref={scopeRef}
      className="py-12 border-y border-slate-800/40 bg-slate-950/40 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
          Trusted by the World's Leading Real Estate Capital & Institutional Funds
        </p>
        
        {/* Partners list row */}
        <div className="overflow-hidden relative w-full">
          <div className="flex justify-around items-center gap-6 flex-wrap justify-center">
            {partners.map((partner, index) => (
              <div 
                key={index} 
                className="trusted-logo flex items-center gap-2 filter grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 opacity-60 cursor-pointer"
              >
                <Landmark size={20} className="text-cyan-400" />
                <span className="font-heading font-extrabold text-base sm:text-lg tracking-wider text-slate-200">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
