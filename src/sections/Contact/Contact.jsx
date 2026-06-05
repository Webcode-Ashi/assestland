import React, { useState } from 'react';
import { Mail, Phone, MapPin as MapPinIcon, CheckCircle2, ArrowRight, Send } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', budget: ' ₹50k', msg: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', budget: ' ₹50k', msg: '' });
    }, 4500);
  };

  const scopeRef = useGSAP(() => {
    gsap.fromTo('.contact-fade-left',
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: scopeRef.current, start: 'top 80%' }
      }
    );

    gsap.fromTo('.contact-fade-right',
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: scopeRef.current, start: 'top 80%' }
      }
    );
  }, []);

  return (
    <section id="contact" ref={scopeRef} className="py-16 sm:py-20 relative bg-slate-950/20 border-t border-slate-800/40">
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Details list left */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 contact-fade-left">
            <div className="space-y-6">
              <SectionHeading
                badge="Reach Out"
                icon={Send}
                title="Start Your Property Investment Journey"
                description="Request a comprehensive demo of our investment dashboard or speak directly with our capital allocation advisors."
                align="left"
              />
            </div>

            {/* details card widgets */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800/40">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-505 font-bold uppercase tracking-wider">Email Inquiry</p>
                  <a href="mailto:contact@diintech.com" className="text-xs sm:text-sm font-bold text-white hover:text-cyan-400 transition-colors">contact@diintech.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800/40">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-550 font-bold uppercase tracking-wider">Direct Hotline</p>
                  <a href="tel:+918147540362" className="text-xs sm:text-sm font-bold text-white hover:text-cyan-400 transition-colors">+91 8147540362</a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800/40">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <MapPinIcon size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Global Headquarters</p>
                  <p className="text-xs sm:text-sm font-bold text-white">C-116, Sector-2, Noida, Uttar Pradesh – 201301, India </p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} AssetLand Technologies Inc. All rights reserved. Registered under Securities real-estate division.
            </p>
          </div>

          {/* Form input right */}
          <div className="lg:col-span-7 contact-fade-right">
            <div className="glass-card rounded-2xl p-6 sm:p-8 h-full relative flex flex-col justify-center">
              
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 mx-auto animate-bounce">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white">Inquiry Received Successfully!</h3>
                  <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto">
                    An AssetLand capital advisor will review your target budget and email you the dashboard demo link within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-heading font-extrabold text-lg text-white mb-2">Request Consultation</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full glass-input rounded-xl px-4 py-3 text-xs sm:text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full glass-input rounded-xl px-4 py-3 text-xs sm:text-sm text-white"
                      />
                    </div>
                  </div>

                  <div>
  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
    Investment Capital Goal
  </label>

  <select
    value={formData.budget}
    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
    className="w-full rounded-xl px-4 py-3 text-xs sm:text-sm
               text-slate-300 bg-[#121826]
               border border-slate-700 outline none
               focus:outline-none focus:border-blue-500"
  >
    <option value="₹50,000" className="bg-black text-white">
       ₹50,000
    </option>

    <option value="₹50,000 - ₹250,000" className="bg-black text-white">
      ₹50,000 - ₹250,000
    </option>

    <option value="₹250,000 - ₹1,000,000" className="bg-black text-white">
      ₹250,000 - ₹1,000,000
    </option>

    <option value="₹1,000,000+" className="bg-black text-white">
      ₹1,000,000+
    </option>
  </select>
</div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Custom Requirements (Optional)</label>
                    <textarea 
                      rows="4" 
                      placeholder="Tell us about your target yields, geographic interests, or asset preference..."
                      value={formData.msg}
                      onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                      className="w-full glass-input rounded-xl px-4 py-3 text-xs sm:text-sm text-white resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full glow-btn bg-cyan-500 hover:bg-cyan-600 text-black font-extrabold py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
                  >
                    Send Valuation Request
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
