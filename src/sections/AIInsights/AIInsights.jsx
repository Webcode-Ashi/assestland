import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';

/* ── Ring data ── */
const rings = [
  { label: 'Overall Score',  value: 94, color: '#06b6d4', track: 'rgba(6,182,212,0.08)',   r: 155, stroke: 12 },
  { label: 'Confidence',     value: 88, color: '#3b82f6', track: 'rgba(59,130,246,0.08)',  r: 133, stroke: 11 },
  { label: 'Risk Level',     value: 72, color: '#8b5cf6', track: 'rgba(139,92,246,0.08)',  r: 113, stroke: 10 },
  { label: 'Market Trend',   value: 85, color: '#0ea5e9', track: 'rgba(14,165,233,0.08)',  r: 95,  stroke: 9  },
  { label: 'Location Value', value: 91, color: '#6366f1', track: 'rgba(99,102,241,0.08)',  r: 78,  stroke: 8  },
  { label: 'Demand Index',   value: 78, color: '#22d3ee', track: 'rgba(34,211,238,0.08)',  r: 63,  stroke: 7  },
  { label: 'Rental Yield',   value: 83, color: '#38bdf8', track: 'rgba(56,189,248,0.08)',  r: 50,  stroke: 6  },
  { label: 'Appreciation',   value: 76, color: '#818cf8', track: 'rgba(129,140,248,0.08)', r: 38,  stroke: 5  },
];

const CX = 180;
const CY = 180;

function ringDash(r, value) {
  const circ = 2 * Math.PI * r;
  return { circ, dash: (value / 100) * circ };
}

/* ── 3D Circular Dashboard ── */
function CircularDashboard() {
  const [hovered, setHovered]   = useState(null);
  const [tooltip, setTooltip]   = useState({ x: 0, y: 0 });
  const wrapRef   = useRef(null);
  const svgRef    = useRef(null);
  const ringRefs  = useRef([]);
  const orbitRef  = useRef(null);

  /* Entrance — rings draw in */
  useEffect(() => {
    rings.forEach((ring, i) => {
      const el = ringRefs.current[i];
      if (!el) return;
      const { circ, dash } = ringDash(ring.r, ring.value);
      gsap.set(el, { strokeDasharray: circ, strokeDashoffset: circ });
      gsap.to(el, {
        strokeDashoffset: circ - dash,
        duration: 1.4,
        delay: 0.2 + i * 0.15,
        ease: 'power3.out',
      });
    });

    /* Slow continuous rotation of orbit ring */
    if (orbitRef.current) {
      gsap.to(orbitRef.current, {
        rotation: 360,
        transformOrigin: `${CX}px ${CY}px`,
        duration: 18,
        ease: 'none',
        repeat: -1,
      });
    }
  }, []);

  /* Parallax on mousemove */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
      const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
      gsap.to(svgRef.current, {
        x: dx * 10, y: dy * 8,
        rotateX: -dy * 6, rotateY: dx * 6,
        transformPerspective: 800,
        duration: 0.5, ease: 'power2.out', overwrite: 'auto',
      });
    };
    const onLeave = () => {
      gsap.to(svgRef.current, {
        x: 0, y: 0, rotateX: 0, rotateY: 0,
        duration: 0.8, ease: 'power3.out', overwrite: 'auto',
      });
    };
    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    return () => {
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const handleHover = useCallback((i, e) => {
    setHovered(i);
    const rect = wrapRef.current?.getBoundingClientRect();
    if (rect) setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    /* Ring lift */
    const el = ringRefs.current[i];
    if (el) gsap.to(el, { strokeWidth: rings[i].stroke + 4, duration: 0.25, ease: 'power2.out' });
  }, []);

  const handleUnhover = useCallback((i) => {
    setHovered(null);
    const el = ringRefs.current[i];
    if (el) gsap.to(el, { strokeWidth: rings[i].stroke, duration: 0.3, ease: 'power2.out' });
  }, []);

  return (
    <div ref={wrapRef} className="relative flex flex-col items-center select-none">

      {/* SVG */}
      <div ref={svgRef} style={{ transformStyle: 'preserve-3d' }}>
        <svg
          viewBox="0 0 360 360"
          className="w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] drop-shadow-2xl"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {rings.map((ring, i) => (
              <filter key={i} id={`glow${i}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            ))}
            <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#06b6d4" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0b0f19" stopOpacity="0.9" />
            </radialGradient>
          </defs>

          {/* Center glow */}
          <circle cx={CX} cy={CY} r="32" fill="url(#centerGrad)" />
          <circle cx={CX} cy={CY} r="24" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.3" />

          {/* Center score text */}
          <text x={CX} y={CY - 6} textAnchor="middle" fontSize="18" fontWeight="800" fill="#06b6d4" fontFamily="monospace">94%</text>
          <text x={CX} y={CY + 10} textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="monospace" letterSpacing="1">SCORE</text>

          {/* Orbit ring */}
          <g ref={orbitRef}>
            <circle cx={CX} cy={CY} r="170" fill="none" stroke="#06b6d4" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="6 10" />
            {/* Orbital nodes */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const nx = CX + 170 * Math.cos(rad);
              const ny = CY + 170 * Math.sin(rad);
              return <circle key={i} cx={nx} cy={ny} r="3.5" fill="#06b6d4" opacity="0.5" />;
            })}
          </g>

          {/* Background track rings */}
          {rings.map((ring, i) => (
            <circle
              key={`track-${i}`}
              cx={CX} cy={CY} r={ring.r}
              fill="none"
              stroke="#1e293b"
              strokeWidth={ring.stroke}
            />
          ))}

          {/* Animated fill rings */}
          {rings.map((ring, i) => {
            const { circ } = ringDash(ring.r, ring.value);
            return (
              <circle
                key={`ring-${i}`}
                ref={el => ringRefs.current[i] = el}
                cx={CX} cy={CY} r={ring.r}
                fill="none"
                stroke={ring.color}
                strokeWidth={ring.stroke}
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={circ}
                transform={`rotate(-90 ${CX} ${CY})`}
                filter={`url(#glow${i})`}
                style={{ cursor: 'pointer', transition: 'filter 0.2s' }}
                onMouseEnter={(e) => handleHover(i, e)}
                onMouseLeave={() => handleUnhover(i)}
              />
            );
          })}
        </svg>
      </div>

      {/* Tooltip */}
      {hovered !== null && (
        <div
          className="absolute pointer-events-none z-20 glass-card rounded-xl px-3 py-2 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
          style={{ left: tooltip.x + 12, top: tooltip.y - 40, minWidth: '130px' }}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">{rings[hovered].label}</p>
          <p className="text-white font-black text-lg font-heading leading-none mt-0.5">{rings[hovered].value}%</p>
        </div>
      )}
    </div>
  );
}

/* ── Main Section ── */
export const AIInsights = () => {
  const scopeRef = useGSAP(() => {
    gsap.fromTo('.ai-fade-left',
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: scopeRef.current, start: 'top 80%' } }
    );
    gsap.fromTo('.ai-fade-right',
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: scopeRef.current, start: 'top 80%' } }
    );
  }, []);

  return (
    <section id="aiinsights" ref={scopeRef} className="py-20 relative border-y border-slate-800/40">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left — Text */}
          <div className="lg:col-span-6 space-y-6 ai-fade-left">
            <SectionHeading
              badge="🔮 Predictive Models"
              title="Institutional-Grade Investment Analysis"
              description="Our advanced models analyze thousands of local data points—including municipal zoning plans, transit developments, localized rental demand, and macroeconomic trends—to project returns with institutional-grade precision."
              align="left"
              titleGradient="cyan-blue"
            />
            <div className="space-y-4 pt-4 border-t border-slate-800/60">
              {[
                { title: 'Dynamic Asset Appraisals',          desc: 'Valuation indexes recalculate daily with live regional transaction data.' },
                { title: 'Appreciation Confidence Intervals', desc: 'Yield statistics include risk bands simulated across multiple economic cycles.' },
                { title: 'Multi-Layer Risk Scoring',          desc: 'Six-dimensional ring model surfaces hidden risk factors before you commit capital.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={12} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 3D Circular Dashboard */}
          <div className="lg:col-span-6 ai-fade-right flex justify-center items-center">
            <CircularDashboard />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AIInsights;
