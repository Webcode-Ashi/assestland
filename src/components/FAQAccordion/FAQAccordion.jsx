import React from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQAccordion = ({ faq, isOpen, onToggle }) => {
  return (
    <div className="glass-card rounded-xl overflow-hidden border border-slate-800/40 faq-transition">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer"
      >
        <span>{faq.q}</span>
        <ChevronDown 
          size={16} 
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} 
        />
      </button>

      <div className={`faq-transition ${
        isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
      } overflow-hidden`}>
        <div className="p-5 pt-0 border-t border-slate-800/20 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
          {faq.a}
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
