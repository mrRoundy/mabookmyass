// app/page.tsx

'use client';

import Link from 'next/link';
import BookCarousel from '@/components/BookCarousel';
import HomePrompt from '@/components/HomePrompt';
import Bookshelf from '@/components/Bookshelf';
import TypingAnimationMain from '@/components/TypingAnimationMain';

export default function HomePage() {
  return (
    <div className="page-container">
      <header className="hero-banner">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="font-serif">MaBook</h1>
            <p className="font-serif text-[28px] md:text-[34px] leading-tight text-[#504646] mb-12 max-w-3xl mx-auto">
              AI-Powered Book Discovery That Solves Your Problems, Not Someone Else’s Opinions
            </p>
          </div>
          <div className="hero-books px-4 md:px-0">
            <BookCarousel />
          </div>
        </div>
      </header>

      <main>
        <section className="search-section">
            <div className="text-center text-classic-green mb-10">
              <TypingAnimationMain />
              <h2 className="font-serif text-3xl md:text-[42.6px] font-bold uppercase tracking-widest md:whitespace-nowrap">
                  Begin by Asking...
              </h2>
            </div>
            <div className="max-w-4xl mx-auto w-full">
                <HomePrompt />
            </div>
        </section>

        <section className="recommendations">
            <div className="recommendation-header">
                <h2 className="font-serif">Book recommendation</h2>
            </div>
            
            <div>
                <Bookshelf 
                    genre="Finance" 
                    description="Books where money drives ambition, power, and life’s big gambles." 
                />
                <Bookshelf 
                    genre="Mental Health" 
                    description="Books exploring minds, healing, resilience, and inner journeys." 
                />
                <Bookshelf 
                    genre="Habits" 
                    description="Books on routines that shape success, growth, and everyday life." 
                />
            </div>
        </section>

        <section className="cta-section">
            <Link href="/prompt" className="cta-button">
                Discover Your Perfect Book
            </Link>
            <p className="cta-text">
                Share what you're interested in, what challenges you're facing, or what goals you want to achieve. Our AI will recommend the perfect books for you.
            </p>
        </section>
      </main>
    </div>
  );
}