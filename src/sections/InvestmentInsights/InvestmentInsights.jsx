import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Clock, Award } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import video2 from '../../assets/videos/video2.mp4';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: TrendingUp,
    label: 'Avg. Asset Appreciation',
    value: '+14.2%',
    sub: 'Year over Year',
    color: 'text-cyan-400',
    border: 'border-cyan-500/20',
    bg: 'bg-cyan-500/5',
    desc: 'Exceeds standard residential indexes by 4.8% annually.',
  },
  {
    icon: Award,
    label: 'Yield Success Rate',
    value: '91.8%',
    sub: 'Target Hit Rate',
    color: 'text-purple-400',
    border: 'border-purple-500/20',
    bg: 'bg-purple-500/5',
    desc: 'Assets meeting or beating initial net cashflow projections.',
  },
  {
    icon: Clock,
    label: 'Average Exit Time',
    value: '24',
    sub: 'Days to Liquidate',
    color: 'text-orange-400',
    border: 'border-orange-500/20',
    bg: 'bg-orange-500/5',
    desc: 'Active secondary market ensures prompt capital liquidity.',
  },
];

export const InvestmentInsights = () => {
  const sectionRef  = useRef(null);
  const videoRef    = useRef(null);
  const containerRef = useRef(null);

  /* Stat cards + video box scroll animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ii-card',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );
      gsap.fromTo('.ii-video',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Cursor-based zoom + pan on video */
  useEffect(() => {
    const container = containerRef.current;
    const video     = videoRef.current;
    if (!container || !video) return;

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      // Normalised -1 to +1
      const dx = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2);
      const dy = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2);

      gsap.to(video, {
        x: dx * 18,       // left/right pan max 18px
        y: dy * 12,       // up/down pan max 12px
        scale: 1.08,      // zoom in
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onLeave = () => {
      gsap.to(video, {
        x: 0, y: 0, scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    container.addEventListener('mousemove',  onMove);
    container.addEventListener('mouseleave', onLeave);
    return () => {
      container.removeEventListener('mousemove',  onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} id="investmentinsights" className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeading
          badge="📈 Yield Metrics"
          title="Investment Analytics & Trends"
          description="Live historical metrics demonstrating the performance advantage of AssetLand recommended purchases."
          align="center"
          className="mb-10 sm:mb-14"
        />

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className={`ii-card glass-card rounded-2xl p-5 border ${s.border}`}>
                <div className={`w-10 h-10 rounded-xl ${s.bg} border ${s.border} flex items-center justify-center mb-4`}>
                  <Icon size={18} className={s.color} />
                </div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{s.label}</p>
                <div className="flex items-end gap-2 mb-1">
                  <span className={`font-heading text-3xl sm:text-4xl font-black ${s.color}`}>{s.value}</span>
                  <span className="text-slate-500 text-xs font-semibold mb-1">{s.sub}</span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Video Section */}
        <div className="ii-video glass-card rounded-2xl border border-slate-800/40 overflow-hidden">
          {/* Video container — cursor effect applied here */}
          <div
            ref={containerRef}
            className="relative w-full overflow-hidden cursor-none"
            style={{ aspectRatio: '16/9' }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ willChange: 'transform', imageRendering: 'high-quality' }}
            >
              <source src={video2} type="video/mp4" />
            </video>

            {/* Subtle dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

            {/* Top-left label */}
            <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
                Live Market View
              </span>
            </div>

            {/* Corner accent lines */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-cyan-500/60 pointer-events-none rounded-tl" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-cyan-500/60 pointer-events-none rounded-tr" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-cyan-500/60 pointer-events-none rounded-bl" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-cyan-500/60 pointer-events-none rounded-br" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default InvestmentInsights;
