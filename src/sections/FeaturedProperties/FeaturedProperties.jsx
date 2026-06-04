import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { propertiesData } from '../../data/properties';
import { MapPin, BedDouble, Bath, Square, TrendingUp, ArrowRight, Filter } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

/* ── Paper-fold ScrollTrigger reveal ── */
function PropCard({ p, index }) {
  const cardRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap) return;

    gsap.set(wrap, { opacity: 0, y: 40 });

    const st = ScrollTrigger.create({
      trigger: card,
      start: 'top 86%',
      once: true,
      onEnter: () => {
        gsap.to(wrap, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          delay: index * 0.13,
          ease: 'power3.out',
          clearProps: 'all',
        });
      },
    });

    return () => st.kill();
  }, [index]);

  return (
    <div ref={cardRef}>
      <div
        ref={wrapRef}
        className="group glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col cursor-pointer"
      >
        {/* Image */}
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#06b6d4,#3b82f6)', boxShadow: '0 2px 10px rgba(6,182,212,0.4)' }}>
              {p.tag}
            </span>
          </div>
          <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-semibold text-white"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
            {p.type}
          </span>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <span className="font-heading text-2xl font-black text-white">{p.price}</span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold text-cyan-400"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
              ROI {p.roi}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-200">
              {p.title}
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <MapPin size={13} className="text-cyan-500" /> {p.location}
            </p>

            <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-800/40">
              {[
                { Icon: BedDouble, label: `${p.beds} Beds` },
                { Icon: Bath,      label: `${p.baths} Baths` },
                { Icon: Square,    label: p.area },
              ].map(({ Icon, label }, i) => (
                <div key={i} className="text-center py-2 rounded-xl"
                  style={{ background: 'rgba(6,182,212,0.04)', border: '1px solid rgba(6,182,212,0.07)' }}>
                  <Icon size={15} className="text-cyan-500 mx-auto mb-0.5" />
                  <span className="text-[10px] font-semibold text-slate-400">{label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Net Yield</span>
              <span className="text-sm font-extrabold text-cyan-400 flex items-center gap-1">
                <TrendingUp size={13} /> {p.aiYield}
              </span>
            </div>
          </div>

          <button className="mt-5 w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black hover:border-transparent transition-all duration-300">
            View Details <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── FeaturedProperties ── */
export const FeaturedProperties = () => {
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef(null);

  const filters = [
    { id: 'all',    label: 'All Assets' },
    { id: 'yield',  label: 'High Yield' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'metro',  label: 'Metro Deals' },
  ];

  const filtered = filter === 'all'
    ? propertiesData
    : propertiesData.filter(p => p.category === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.fp-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.fp-header', start: 'top 88%', once: true },
        }
      );
      gsap.fromTo('.fp-filter-btn',
        { opacity: 0, x: 16 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out',
          scrollTrigger: { trigger: '.fp-header', start: 'top 88%', once: true },
        }
      );
      gsap.fromTo('.fp-cta',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.fp-cta', start: 'top 92%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="featuredproperties" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="fp-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            badge="🔥 Premium Selections"
            title="Featured Properties"
            description="Compare hand-picked assets currently trading below average market valuation benchmarks."
            align="left"
          />
          <div className="flex flex-wrap gap-2 self-start md:self-auto">
            {filters.map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`fp-filter-btn flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 cursor-pointer ${
                  filter === tab.id
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25 border border-transparent'
                    : 'text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/10'
                }`}
              >
                <Filter size={11} /> {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((prop, i) => (
            <PropCard key={prop.id} p={prop} index={i} />
          ))}
        </div>

        <div className="fp-cta text-center mt-12">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="glow-btn inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold px-8 py-3.5 rounded-xl text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-colors cursor-pointer"
          >
            View All Properties <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
