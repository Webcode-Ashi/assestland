import React from 'react';
import { Brain, Shield, TrendingUp, Landmark, Star } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';

export const WhyAssetLand = () => {
  const cards = [
    {
      icon: <Brain size={24} className="text-cyan-400" />,
      title: "Real-Time Market Valuation",
      desc: "Instantly process municipal indexes, commercial investments, and local transaction histories for immediate property appraisals."
    },
    {
      icon: <Landmark size={24} className="text-blue-400" />,
      title: "Fractional Ownership Pools",
      desc: "Gain exposure to prime real estate with fractionated pools. Lower barrier, diversified assets, higher liquidity."
    },
    {
      icon: <Shield size={24} className="text-purple-400" />,
      title: "Smart Contract Closings",
      desc: "Complete purchases, distribute dividends, and manage legal titles transparently via verified blockchain ledgers."
    },
    {
      icon: <TrendingUp size={24} className="text-orange-400" />,
      title: "Predictive Market Indicators",
      desc: "Stay ahead of micro-market gentrification, zoning transitions, and commercial growth hubs before they are public."
    }
  ];

  const scopeRef = useGSAP(() => {
    gsap.fromTo('.why-card',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scopeRef.current,
          start: 'top 80%'
        }
      }
    );
  }, []);

  return (
    <section id="whyassetland" ref={scopeRef} className="py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Core Advantages"
          icon={Star}
          title="Why Choose AssetLand?"
          description="Traditional real estate is outdated. Invest inside a technology ecosystem built for yield optimization."
          align="center"
          className="mb-10 sm:mb-16"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div 
              key={idx}
              className="why-card glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center">
                  {card.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-white">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAssetLand;
