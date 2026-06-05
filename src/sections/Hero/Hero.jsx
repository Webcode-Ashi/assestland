import React, { useRef, useEffect } from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';
import videoBg from '../../assets/videos/video3.mp4';
import video4 from '../../assets/videos/video4.mp4';

export const Hero = () => {
  const video4Ref = useRef(null);
  const bgVideoRef = useRef(null);

  const scopeRef = useGSAP(() => {
    gsap.fromTo('.animate-hero-item',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.18, ease: 'power4.out', delay: 0.3 }
    );
  }, []);

  /* Force background video to always loop and never stop */
  useEffect(() => {
    const vid = bgVideoRef.current;
    if (!vid) return;
    vid.loop = true;
    vid.play().catch(() => {});

    const onEnded = () => { vid.currentTime = 0; vid.play().catch(() => {}); };
    const onPause = () => { vid.play().catch(() => {}); };
    vid.addEventListener('ended', onEnded);
    vid.addEventListener('pause', onPause);
    return () => {
      vid.removeEventListener('ended', onEnded);
      vid.removeEventListener('pause', onPause);
    };
  }, []);

  /* Force video to always loop and never stop */
  useEffect(() => {
    const vid = video4Ref.current;
    if (!vid) return;
    vid.loop = true;
    vid.play().catch(() => {});

    const onEnded = () => { vid.currentTime = 0; vid.play().catch(() => {}); };
    const onPause = () => { vid.play().catch(() => {}); };
    vid.addEventListener('ended', onEnded);
    vid.addEventListener('pause', onPause);
    return () => {
      vid.removeEventListener('ended', onEnded);
      vid.removeEventListener('pause', onPause);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={scopeRef}
      className="relative min-h-screen flex items-center pt-14 pb-12 overflow-hidden"
    >
      {/* Video Background */}
      <video
        ref={bgVideoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20"
      >
        <source src={videoBg} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 -z-10" />

      {/* Glow blobs */}
      <div className="absolute top-1/3 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Text Content */}
          <div className="w-full lg:col-span-6 text-center pt-10 lg:text-left space-y-5 sm:space-y-6">

            {/* Badge */}
            

            {/* Heading */}
            <h1 className="animate-hero-item font-heading text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Assetland
              <br />
              <span className="text-gradient-cyan-blue">- Creating Real Wealth with AI</span>
            </h1>

            {/* Description */}
            <p className="animate-hero-item text-slate-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Maximize yields, track market cycles, and invest in institutional-grade properties with real-time data-driven appraisals.
            </p>

            {/* CTA Buttons */}
            <div className="animate-hero-item flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={() => document.getElementById('featuredproperties')?.scrollIntoView({ behavior: 'smooth' })}
                className="glow-btn bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold px-6 py-3 rounded-xl text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-colors"
              >
                Explore Properties
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="glow-btn bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-white font-bold px-6 py-3 rounded-xl text-sm uppercase tracking-wider transition-all"
              >
                Get Consultation
              </button>
            </div>

            {/* Stats */}
            <div className="animate-hero-item grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-slate-700/50 max-w-sm mx-auto lg:mx-0">
              {[
                { val: '$1.8B+', label: 'Volume Traded' },
                { val: '12,500+', label: 'Active Investors' },
                { val: '11.4%', label: 'Avg. Net Yield' },
              ].map((s, i) => (
                <div key={i} className="text-center lg:text-left">
                  <p className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-white">{s.val}</p>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 tracking-wider uppercase font-semibold mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Video Mockup */}
          <div className="w-full lg:col-span-6 animate-hero-item flex justify-center items-center">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full overflow-hidden rounded-2xl">
              <div className="absolute inset-0 rounded-2xl bg-cyan-500/10 blur-2xl scale-110" />
              <video
                ref={video4Ref}
                autoPlay
                muted
                loop
                playsInline
                className="relative w-full h-[220px] sm:h-[320px] md:h-[400px] lg:h-[480px] xl:h-[520px] object-contain mix-blend-screen drop-shadow-2xl"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pctX = ((e.clientX - rect.left) / rect.width)  * 100;
                  const pctY = ((e.clientY - rect.top)  / rect.height) * 100;
                  e.currentTarget.style.transformOrigin = `${pctX}% ${pctY}%`;
                  gsap.to(e.currentTarget, { scale: 1.18, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
                }}
              >
                <source src={video4} type="video/mp4" />
              </video>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50">
        <span className="text-[10px] text-slate-400 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
