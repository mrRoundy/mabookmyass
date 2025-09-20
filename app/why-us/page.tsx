'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function WhyUsPage() {
  // This hook replaces the inline script for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.15
    });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Cleanup observer on component unmount
    return () => revealElements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <main className="overflow-x-hidden">
      <section className="min-h-screen flex items-center bg-[#FDF9F6]">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6 text-[#173F25]">
              <svg className="w-16 h-16 icon-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-[#173F25] leading-tight mb-4">Discover Reads That Truly Resonate.</h2>
            <p className="text-lg md:text-xl text-[#173F25]/70">
              You invest your time, hoping for a story that connects, only to find it wasn't for you. The problem isn't the book—it's the flawed system of discovery.
            </p>
          </div>
        </div>
      </section>
      
      <hr className="border-t border-[#173F25]/10"/>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-sm font-semibold uppercase text-[#173F25]/60 tracking-wider">The Flaw in Modern Discovery</h3>
            <h2 className="text-4xl md:text-5xl font-bold text-[#173F25] mt-2 mb-6">Why Recommendations Fail.</h2>
            <p className="text-lg text-[#173F25]/70 mb-16">
              Bias is a systematic error leading to irrelevant outcomes. In the world of books, it's the hidden force pushing you towards the popular, not the perfect fit.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="bg-white border border-[#173F25]/10 p-8 rounded-lg text-center reveal">
              <h4 className="text-2xl font-bold text-[#173F25] mb-2">Paid Promotions</h4>
              <p className="text-[#173F25]/70">Recommendations influenced by marketing budgets, not genuine merit or relevance to you.</p>
            </div>
            <div className="bg-white border border-[#173F25]/10 p-8 rounded-lg text-center reveal" style={{ transitionDelay: '200ms' }}>
              <h4 className="text-2xl font-bold text-[#173F25] mb-2">Mismatched Tastes</h4>
              <p className="text-[#173F25]/70">Suggestions based on a reviewer's personal taste, which rarely aligns perfectly with your own.</p>
            </div>
            <div className="bg-white border border-[#173F25]/10 p-8 rounded-lg text-center reveal" style={{ transitionDelay: '400ms' }}>
              <h4 className="text-2xl font-bold text-[#173F25] mb-2">Flawed Algorithms</h4>
              <p className="text-[#173F25]/70">Systems designed to show you what's popular, not what's profoundly right for you.</p>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-t border-[#173F25]/10"/>
      
      <section className="py-20 bg-[#FDF9F6]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left reveal">
              <h3 className="text-sm font-semibold uppercase text-[#173F25]/60 tracking-wider">Our Solution</h3>
              <h2 className="text-4xl md:text-5xl font-bold text-[#173F25] mt-2 mb-6">We Look Inside the Story.</h2>
              <p className="text-lg text-[#173F25]/70 mb-8">
                Instead of relying on biased ratings and reviews, Mabook analyzes the heart of the book itself. We extract key themes and highlights, allowing the author's true voice to guide your decision.
              </p>
              <ul className="space-y-4 text-left">
                  <li className="flex items-start">
                      <svg className="w-6 h-6 text-[#173F25] mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span><strong className="font-semibold text-[#173F25]">Evaluate content objectively,</strong> based on the actual words on the page.</span>
                  </li>
                  <li className="flex items-start">
                      <svg className="w-6 h-6 text-[#173F25] mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span><strong className="font-semibold text-[#173F25]">Make informed decisions,</strong> free from the influence of external noise and hype.</span>
                  </li>
                  <li className="flex items-start">
                      <svg className="w-6 h-6 text-[#173F25] mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span><strong className="font-semibold text-[#173F25]">Finally find books</strong> that align perfectly with your unique expectations.</span>
                  </li>
              </ul>
            </div>
            <div className="flex justify-center items-center h-96 reveal group" style={{ transitionDelay: '200ms' }}>
              <div className="new-book-container">
                  <div className="new-book-content">
                      <h3 className="font-bold text-3xl font-serif">Mabook Way</h3>
                      <p className="mt-2 text-sm text-[#173F25]/70">Powered by the book's own words and content.</p>
                  </div>
                  <div className="new-book-cover">
                      <h3 className="text-white font-bold text-3xl font-serif">Old Way</h3>
                      <p className="text-xs text-[#FDF9F6]/50 mt-2">Opinions, ratings, and guesswork.</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-t border-[#173F25]/10"/>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
           <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-[#173F25] mb-4">Fairer, heller(and fuck you ucup), Faster, More Authentic.</h2>
              <p className="text-lg text-[#173F25]/70 mb-16">
                 By focusing on what's <strong className="font-semibold text-[#173F25]">inside of ziziy</strong> the book, we deliver a recommendation experience you can finally trust.
              </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
               <div className="text-center reveal p-6">
                  <h4 className="text-2xl font-bold mb-2">Find Your Perfect Match</h4>
                  <p className="text-[#173F25]/70">Discover books that fit your specific needs and interests, whether for learning, leisure, or inspiration.</p>
              </div>
               <div className="text-center reveal p-6" style={{ transitionDelay: '200ms' }}>
                  <h4 className="text-2xl font-bold mb-2">Unlock Deeper Knowledge</h4>
                  <p className="text-[#173F25]/70">Use our platform for self-development, to expand your expertise, or to find your next source of inspiration.</p>
              </div>
               <div className="text-center reveal p-6" style={{ transitionDelay: '400ms' }}>
                  <h4 className="text-2xl font-bold mb-2">Experience True Transparency</h4>
                  <p className="text-[#173F25]/70">Get fairer, more honest, and deeply relevant recommendations that honor your unique perspective.</p>
              </div>
          </div>
        </div>
      </section>

      <section className="bg-[#173F25] text-white">
        <div className="container mx-auto px-6 py-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#FDF9F6] font-serif">Your Next Great Read is Waiting.</h2>
            <p className="text-lg md:text-xl text-[#FDF9F6]/70 mb-10 max-w-2xl mx-auto">Stop wasting time on bad recommendations. Start discovering books that will truly change your life.</p>
            <Link href="/prompt" className="bg-white text-[#173F25] font-bold py-4 px-10 rounded-md text-lg hover:bg-[#FDF9F6] transform hover:scale-105 transition-all duration-300 shadow-xl">
                Find My Perfect Read
            </Link>
        </div>
      </section>
      <div className="h-16 bg-[#FDF9F6]"></div> 
    </main>
  );
}