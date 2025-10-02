// components/PageWrapper.tsx
'use client';

import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ConditionalFooter from './ConditionalFooter';
import VerificationBanner from './VerificationBanner';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [keyInput, setKeyInput] = useState<string[]>([]);
  const [overlayState, setOverlayState] = useState(0);

  useEffect(() => {
    const debug_seq = 'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a'.split(',');
    
    const keyHandler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const updatedInput = [...keyInput, e.key].slice(-debug_seq.length);
      setKeyInput(updatedInput);

      if (updatedInput.join(',') === debug_seq.join(',')) {
        setOverlayState(1);
      }
    };

    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [keyInput]);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') { 
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setShowNav(false);
        } else {
          setShowNav(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <>
      <VerificationBanner />

      <Navbar className={`sticky top-0 transition-transform duration-300 ease-in-out ${showNav ? 'translate-y-0' : '-translate-y-full'}`} />

      <main className={`flex-grow overflow-hidden`}>
        {children}
      </main>

      <ConditionalFooter />
      
      {overlayState === 1 && (
        <div 
          className="motion-fallback-overlay"
          onClick={() => setOverlayState(2)}
        >
          <div className="mfo-content">
            <h1 className="mfo-header">[ RENDER_MODE_ERR ]</h1>
            <p className="mfo-text">// Motion compatibility issue detected.</p>
            <p className="mfo-text">// Displaying legacy content...</p>
            <button className="mfo-button" onClick={(e) => { e.stopPropagation(); setOverlayState(2); }}>
              [ VIEW_DETAILS ]
            </button>
          </div>
        </div>
      )}

      {overlayState === 2 && (
        <div
          className="mfo-secondary-view"
          onClick={() => setOverlayState(0)}
        >
          <div className="mfo-secondary-content">
            <h2 className="mfo-secondary-header">out team :)</h2>
            <div className="flex flex-col space-y-4">
              <div className="mfo-secondary-entry">
                <p className="mfo-entry-name">Ucups</p>
                <p className="mfo-entry-role">// The perfectionist</p>
              </div>
              <div className="mfo-secondary-entry">
                <p className="mfo-entry-name">Ziziy</p>
                <p className="mfo-entry-role">// The femboy</p>
              </div>
              <div className="mfo-secondary-entry">
                <p className="mfo-entry-name">pandot</p>
                <p className="mfo-entry-role">// The anomaly it self</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}