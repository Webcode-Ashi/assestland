import React from 'react';

export const SectionHeading = ({ 
  badge, 
  title, 
  titleGradient = 'cyan-blue', // 'cyan-blue' | 'purple-pink' | 'none'
  description,
  align = 'center', // 'center' | 'left'
  className = ''
}) => {
  const containerAlign = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const descAlign = align === 'center' ? 'mx-auto' : '';
  
  const gradients = {
    'cyan-blue': 'text-gradient-cyan-blue',
    'purple-pink': 'text-gradient-purple-purple',
    'none': 'text-white'
  };

  return (
    <div className={`space-y-3 ${containerAlign} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
          {badge}
        </div>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl font-extrabold leading-tight">
        {titleGradient !== 'none' ? (
          <>
            {title.split(' ').slice(0, -2).join(' ')} <span className={gradients[titleGradient] || gradients['cyan-blue']}>{title.split(' ').slice(-2).join(' ')}</span>
          </>
        ) : title}
      </h2>
      {description && (
        <p className={`text-slate-400 font-light text-xs sm:text-sm max-w-xl ${descAlign}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
