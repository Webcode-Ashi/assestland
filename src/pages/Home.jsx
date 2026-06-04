import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Loader from '../components/Loader/Loader';
import useLenis from '../hooks/useLenis';
import { Hero } from '../sections/Hero/Hero';
import { TrustedBy } from '../sections/TrustedBy/TrustedBy';
import { BentoGallery } from '../sections/BentoGallery/BentoGallery';
import { FeaturedProperties } from '../sections/FeaturedProperties/FeaturedProperties';
import { AIInsights } from '../sections/AIInsights/AIInsights';
import { WhyAssetLand } from '../sections/WhyAssetLand/WhyAssetLand';
import { PropertyShowcase } from '../sections/PropertyShowcase/PropertyShowcase';
import { InvestmentInsights } from '../sections/InvestmentInsights/InvestmentInsights';
import { Testimonials } from '../sections/Testimonials/Testimonials';
import { FAQ } from '../sections/FAQ/FAQ';
import { Contact } from '../sections/Contact/Contact';
import bgVideo from '../assets/videos/background.mp4';

export const Home = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const bgVideoRef = useRef(null);

  useEffect(() => {
    if (bgVideoRef.current) {
      bgVideoRef.current.playbackRate = 0.5;
    }
  }, []);

  // Hook up Lenis smooth scrolling engine
  useLenis();

  // Scroll spy tracker using Intersection Observer
  useEffect(() => {
    const sectionIds = [
      'hero', 'gallery', 'featuredproperties', 'aiinsights',
      'investmentinsights', 'testimonials', 'faq', 'contact'
    ];

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -55% 0px', // trigger when item passes center
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Jump to location hash after the splash screen finishes
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.substring(hash.indexOf('#') + 1);
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 1800); // Syncs after Loader fades (1.6s)
      }
    }
  }, []);

  return (
    <>
      <Loader />

      {/* Global background video — fixed, behind everything */}
      <video
        ref={bgVideoRef}
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-20 pointer-events-none"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      {/* Dark overlay over background video */}
      <div className="fixed inset-0 bg-black/70 -z-10 pointer-events-none" />

      <Navbar activeSection={activeSection} />
      <main className="relative z-10">
        <Hero />
        <TrustedBy />
        <FeaturedProperties />
        <BentoGallery />
        <AIInsights />
        <WhyAssetLand />
        <PropertyShowcase />
        <InvestmentInsights />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
