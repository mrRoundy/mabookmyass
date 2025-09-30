// components/PageWrapper.tsx
'use client';

import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ConditionalFooter from './ConditionalFooter';
import VerificationBanner from './VerificationBanner';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      // Don't do anything if we're at the top of the page
      if (typeof window !== 'undefined') { 
        // Hide nav if scrolling down, show if scrolling up
        if (window.scrollY > lastScrollY && window.scrollY > 100) { // Add a threshold
          setShowNav(false);
        } else {
          setShowNav(true);
        }
        // Remember current scroll position for the next move
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // Cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <>
      <VerificationBanner />

      {/* - 'sticky top-0' makes the navbar stick to the top when you scroll past it.
        - 'transition-transform' enables the animation.
        - 'translate-y-0' keeps it visible.
        - '-translate-y-full' moves it up and out of the screen.
      */}
      <Navbar className={`sticky top-0 transition-transform duration-300 ease-in-out ${showNav ? 'translate-y-0' : '-translate-y-full'}`} />

      {/* Main content no longer needs padding-top */}
      <main className={`flex-grow overflow-hidden`}>
        {children}
      </main>

      <ConditionalFooter />
    </>
  );
}