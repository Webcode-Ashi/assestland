import React from 'react';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { ArrowUpRight, LayoutGrid } from 'lucide-react';

// Import local assets
import img1 from '../../assets/images/img1.png';
import img2 from '../../assets/images/img2.png';
import img3 from '../../assets/images/img3.png';
import img4 from '../../assets/images/img4.png';
import img5 from '../../assets/images/img5.png';
import img6 from '../../assets/images/img6.png';

const galleryData = [
  { id: 1, image: img1, title: "Summit Plaza Complex",       category: "Commercial",    price: "$12,450,000", yield: "+14.2% Yield", desc: "A premium Grade-A office complex in the central business district, delivering consistent rental yields.",                                                                                             gridClass: "md:col-span-1 md:row-span-1" },
  { id: 2, image: img2, title: "Pacific Heights Villa",       category: "Residential",   price: "$8,900,000",  yield: "+9.8% Yield",  desc: "An architecturally stunning residential estate featuring floor-to-ceiling glass, infinity pool, and panoramic ocean views.",                                                       gridClass: "md:col-span-1 md:row-span-2" },
  { id: 3, image: img3, title: "Vanguard Logistics Park",     category: "Industrial",    price: "$18,200,000", yield: "+16.5% Yield", desc: "State-of-the-art distribution center strategically located near major transit corridors with automated logistics integrations.",                                              gridClass: "md:col-span-1 md:row-span-1" },
  { id: 4, image: img4, title: "Metropolitan Arts Gallery",   category: "Commercial",    price: "$5,300,000",  yield: "+11.4% Yield", desc: "A boutique cultural commercial venue hosting high-value exhibitions and private auctions in the arts district.",                                                         gridClass: "md:col-span-1 md:row-span-1" },
  { id: 5, image: img5, title: "Metro Tech Park",             category: "Industrial",    price: "$24,500,000", yield: "+15.8% Yield", desc: "A fully leased modern industrial facility optimized for advanced manufacturing and regional distribution.",                                                          gridClass: "md:col-span-1 md:row-span-2" },
  { id: 6, image: img6, title: "Aura Hilltop Retreat",        category: "Luxury Estate", price: "$14,800,000", yield: "+10.5% Yield", desc: "A high-end luxury resort property featuring eco-conscious modern architecture, private helipads, and stunning valley views.",                                      gridClass: "md:col-span-2 md:row-span-1" },
];

export const BentoGallery = () => {
  const scopeRef = useGSAP(() => {

    // 1. Cards entrance — each from different direction for dynamic feel
    const directions = [
      { x: -80, y: 0   },
      { x:   0, y: 80  },
      { x:  80, y: 0   },
      { x: -80, y: 0   },
      { x:   0, y: 80  },
      { x:  80, y: -60 },
    ];

    gsap.utils.toArray('.bento-card-anim').forEach((card, i) => {
      const dir = directions[i] || { x: 0, y: 60 };
      gsap.fromTo(card,
        { x: dir.x, y: dir.y, opacity: 0, scale: 0.88, rotateZ: i % 2 === 0 ? -2 : 2 },
        {
          x: 0, y: 0, opacity: 1, scale: 1, rotateZ: 0,
          duration: 0.9,
          delay: i * 0.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: scopeRef.current, start: 'top 78%', once: true },
        }
      );
    });

    // 2. Hover interactions
    const cards = gsap.utils.toArray('.bento-card');
    cards.forEach((card) => {
      const img     = card.querySelector('.bento-img');
      const overlay = card.querySelector('.bento-overlay');
      const content = card.querySelector('.bento-content');
      const frame   = card.querySelector('.bento-frame');

      const hoverTl = gsap.timeline({ paused: true });
      hoverTl
        .to(overlay, { opacity: 1,  duration: 0.3, ease: 'none' }, 0)
        .to(content, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.05)
        .to(frame,   { opacity: 1,  duration: 0.25, ease: 'none' }, 0);

      card.addEventListener('mouseenter', () => hoverTl.play());

      card.addEventListener('mouseleave', () => {
        hoverTl.reverse();
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
        // Reset zoom
        gsap.to(img, { scale: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x  = e.clientX - rect.left;
        const y  = e.clientY - rect.top;
        const xc = rect.width  / 2;
        const yc = rect.height / 2;

        // 3D tilt
        gsap.to(card, {
          rotateX: -((y - yc) / yc) * 7,
          rotateY:  ((x - xc) / xc) * 7,
          transformPerspective: 1000,
          duration: 0.35, ease: 'power2.out',
        });

        // Cursor-position zoom — only that spot zooms
        const pctX = (x / rect.width)  * 100;
        const pctY = (y / rect.height) * 100;
        img.style.transformOrigin = `${pctX}% ${pctY}%`;
        gsap.to(img, {
          scale: 1.5,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    });
  }, []);

  return (
    <section id="gallery" ref={scopeRef} className="py-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full bg-cyan-500/5 blur-[140px] pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <SectionHeading
          badge="Portfolio Gallery"
          icon={LayoutGrid}
          title="Interactive Bento Gallery"
          description="Explore high-liquidity digital real estate assets. Hover over any node to view real-time valuation metrics."
          align="center"
          className="mb-16"
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" style={{ gridAutoRows: '260px' }}>
          {galleryData.map((item) => (
            <div
              key={item.id}
              className={`bento-card bento-card-anim relative rounded-3xl overflow-hidden glass-card cursor-pointer border border-slate-800/40 select-none group ${item.gridClass}`}
              style={{ transformStyle: 'preserve-3d', minHeight: '260px' }}
            >
              {/* Image Container with zoom */}
              <div className="w-full h-full relative overflow-hidden pointer-events-none">
                <img
                  src={item.image}
                  alt={item.title}
                  className="bento-img w-full h-full object-cover scale-100 transition-transform duration-300"
                />
              </div>

              {/* Animated frame corners */}
              <div className="bento-frame absolute inset-0 pointer-events-none opacity-0" style={{ zIndex: 10 }}>
                {/* top-left */}
                <span className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg" />
                {/* top-right */}
                <span className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg" />
                {/* bottom-left */}
                <span className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg" />
                {/* bottom-right */}
                <span className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-400 rounded-br-lg" />
                {/* center scan line */}
                <span className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              </div>

              {/* Ambient overlay - initially transparent */}
              <div className="bento-overlay absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent opacity-0 pointer-events-none" />

              {/* Card Content - initially hidden or slid down */}
              <div className="bento-content absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end translate-y-6 opacity-0 pointer-events-none">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-800/40">
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold text-emerald-400">
                    {item.yield}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-1.5 flex items-center justify-between">
                  {item.title}
                  <ArrowUpRight size={18} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </h3>
                <p className="text-[11px] text-slate-300 leading-relaxed font-light mb-3 line-clamp-2">
                  {item.desc}
                </p>
                <div className="pt-2 border-t border-slate-850 flex items-center justify-between">
                  <span className="text-slate-400 text-[9px] uppercase tracking-wider font-semibold">Asset Value</span>
                  <span className="text-white text-sm font-bold">{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGallery;
