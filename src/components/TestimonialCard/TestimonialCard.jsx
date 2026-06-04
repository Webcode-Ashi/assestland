import React from 'react';
import { Star } from 'lucide-react';

export const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Rating stars */}
        <div className="flex text-amber-500 gap-0.5">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={14} fill="currentColor" />
          ))}
        </div>
        
        <p className="text-slate-300 text-xs sm:text-sm font-light italic leading-relaxed">
          "{testimonial.quote}"
        </p>
      </div>

      {/* Author Details */}
      <div className="flex items-center gap-3 pt-6 border-t border-slate-800/40 mt-6">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.author} 
          className="w-10 h-10 rounded-full object-cover border border-cyan-500/30"
        />
        <div>
          <h4 className="text-xs font-bold text-white">{testimonial.author}</h4>
          <p className="text-[10px] text-slate-400 font-semibold">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
