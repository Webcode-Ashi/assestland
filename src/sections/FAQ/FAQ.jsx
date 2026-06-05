import React, { useState } from 'react';
import { faqData } from '../../data/faq';
import FAQAccordion from '../../components/FAQAccordion/FAQAccordion';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { useGSAP } from '../../hooks/useGSAP';
import gsap from 'gsap';
import { HelpCircle } from 'lucide-react';

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const scopeRef = useGSAP(() => {
    gsap.fromTo('.faq-item-anim',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scopeRef.current,
          start: 'top 85%'
        }
      }
    );
  }, []);

  return (
    <section id="faq" ref={scopeRef} className="py-16 sm:py-20 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          badge="FAQ Support Center"
          icon={HelpCircle}
          title="Frequently Asked Questions"
          description="Everything you need to know about the AssetLand platform and investment methodology."
          align="center"
          className="mb-12"
        />

        {/* Collapsible lists */}
        <div className="space-y-4">
          {faqData.map((qa, index) => (
            <div key={index} className="faq-item-anim">
              <FAQAccordion
                faq={qa}
                isOpen={openIdx === index}
                onToggle={() => setOpenIdx(openIdx === index ? -1 : index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
