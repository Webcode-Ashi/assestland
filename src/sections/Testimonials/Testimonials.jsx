import React from 'react';
import { testimonialsData } from '../../data/testimonials';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';
import { Users } from 'lucide-react';

export const Testimonials = () => {
  const scopeRef = useGSAP(() => {
    gsap.fromTo('.testimonial-card-anim',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scopeRef.current,
          start: 'top 80%'
        }
      }
    );
  }, []);

  return (
    <section id="testimonials" ref={scopeRef} className="py-16 sm:py-20 relative bg-slate-950/20 border-y border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Success Stories"
          icon={Users}
          title="Trusted by Modern Investors"
          description="Read how funds and individual investors are shifting their real estate pipelines onto AssetLand."
          align="center"
          className="mb-10 sm:mb-16"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsData.map((rev) => (
            <div key={rev.id} className="testimonial-card-anim">
              <TestimonialCard testimonial={rev} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
