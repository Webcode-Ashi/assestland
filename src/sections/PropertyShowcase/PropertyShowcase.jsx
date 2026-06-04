import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';

import video1 from '../../assets/videos/video1.mp4';

export const PropertyShowcase = () => {
  const scopeRef = useGSAP(() => {
    gsap.fromTo('.showcase-fade-left',
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: scopeRef.current, start: 'top 80%' }
      }
    );

    gsap.fromTo('.showcase-fade-right',
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: scopeRef.current, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <section id="propertyshowcase" ref={scopeRef} className="py-20 relative bg-slate-950/20 border-y border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Spatial details column */}
          <div className="lg:col-span-5 space-y-6 showcase-fade-left">
            <SectionHeading
              badge="🕶️ Interactive Media"
              title="Virtual Property Showcase & Tours"
              description="Tour premium properties digitally with photorealistic 3D walkthroughs, detailed floor plans, and natural light analysis simulated throughout the day."
              align="left"
              titleGradient="purple-pink"
            />

            <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-light">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-purple-400" />
                <span>Photorealistic 8K virtual walkthroughs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-purple-400" />
                <span>Interactive floor plans & spatial blueprints</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-purple-400" />
                <span>Simulated sunlight exposure & noise insulation analysis</span>
              </li>
            </ul>

            <button className="glow-btn bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-purple-400 font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer">
              Launch Showcase Player
            </button>
          </div>

          {/* Interactive display mockup */}
          <div className="lg:col-span-7 showcase-fade-right">
            <div className="relative glass-card rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl" style={{ aspectRatio: '16/9' }}>
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-contain"
              >
                <source src={video1} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
              
              {/* Telemetry graphic frame overlay */}
              <div className="absolute inset-4 border border-slate-800/50 rounded-lg flex flex-col justify-between p-4 pointer-events-none">
                <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 uppercase tracking-widest bg-slate-950/60 py-1.5 px-3 rounded border border-slate-800/40 backdrop-blur">
                  <span>TOUR VIEW: WEST WING</span>
                  <span className="text-cyan-400 font-bold">FPS: 60.00</span>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-dashed border-cyan-500/40 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '10s' }}>
                    <div className="w-10 h-10 border border-dashed border-purple-500/40 rounded-full"></div>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="text-[10px] font-mono text-slate-350">
                    <p>FOV: 120°</p>
                    <p>ZOOM: 1.0X</p>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black px-3 py-1.5 rounded text-[10px] font-extrabold uppercase tracking-wide">
                    Live Virtual Tour
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyShowcase;
