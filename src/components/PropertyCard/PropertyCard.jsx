import React from 'react';
import { MapPin, BedDouble, Bath, Square, TrendingUp, ArrowRight } from 'lucide-react';

export const PropertyCard = ({ property }) => {
  return (
    <div className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col group">
      
      {/* Visual Overlay */}
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
        
        {/* Top float badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide rounded-md bg-cyan-500 text-black shadow-md">
            SCORE: {property.aiScore}
          </span>
          <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide rounded-md bg-purple-600 text-white shadow-md">
            {property.aiTag}
          </span>
        </div>

        {/* Price & Appreciation overlays */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <span className="font-heading text-2xl font-black text-white">{property.price}</span>
          <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
            <TrendingUp size={14} />
            {property.aiYield}
          </span>
        </div>
      </div>

      {/* Details pane */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="font-heading text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-200">
            {property.title}
          </h3>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <MapPin size={12} className="text-cyan-550" />
            {property.location}
          </p>
          
          <div className="flex items-center gap-4 py-4 border-y border-slate-800/40 text-xs text-slate-350">
            <span className="flex items-center gap-1"><BedDouble size={14} className="text-slate-500" /> {property.beds} Beds</span>
            <span className="flex items-center gap-1"><Bath size={14} className="text-slate-500" /> {property.baths} Baths</span>
            <span className="flex items-center gap-1"><Square size={12} className="text-slate-500" /> {property.size}</span>
          </div>
        </div>

        <div className="pt-5 mt-auto">
          <button className="w-full bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wide transition-all duration-300 cursor-pointer flex items-center justify-center gap-2">
            Request Valuation Report
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default PropertyCard;
