import React from 'react';

export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  type = 'button',
  disabled = false,
  icon
}) => {
  const baseStyle = "glow-btn font-extrabold py-3 px-6 rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-md";
  
  const variants = {
    primary: "bg-cyan-500 hover:bg-cyan-600 text-black shadow-cyan-500/25",
    orange: "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/20",
    secondary: "bg-slate-900/60 hover:bg-slate-800 border border-slate-805 hover:border-cyan-500/40 text-cyan-400",
    flat: "bg-transparent text-slate-350 hover:text-white border border-transparent hover:bg-slate-900/40"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant] || variants.primary} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
