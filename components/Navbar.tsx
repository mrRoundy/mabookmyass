// components/Navbar.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scrolling when the mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to reset the overflow when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="bg-classic-green text-white h-20 flex items-center px-6 md:px-12 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center relative h-full">
          
          {/* Left-side Desktop Links */}
          <div className="hidden lg:flex flex-1 justify-start items-center space-x-8">
            <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
            <Link href="/prompt" className="flex items-center hover:text-gray-300 transition-colors">
              <Image src="/image/star.png" alt="Star" width={48} height={48} className="mr-[-0.75em]" />
              <span>MaBook AI</span>
            </Link>
            <Link href="/bookshelf" className="hover:text-gray-300 transition-colors">Bookshelf</Link>
            <Link href="/why-us" className="hover:text-gray-300 transition-colors">Why Us?</Link>
          </div>

          {/* Centered Logo */}
<div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[7em] w-[7em] z-10">
  <Link href="/" className="relative h-full w-full block">
    <Image src="/image/logo.png" alt="MaBook Logo" layout="fill" objectFit="contain" />
  </Link>
</div>

          {/* Right-side Desktop Feedback & Mobile Menu Button */}
          <div className="flex flex-1 justify-end items-center">
            <Link href="/feedback" className="hidden lg:flex items-center hover:text-gray-300 transition-colors">
              <span>Feedback</span>
              <Image src="/image/likeanddislike.png" alt="Feedback Icon" width={56} height={56} className="ml-[-0.5em]" />
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-2xl z-50 font-serif">
              <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Flyout */}
      <div className={`fixed inset-0 bg-[#FDF9F6] z-40 flex flex-col text-[#173F25] font-serif transition-opacity duration-300 ease-in-out lg:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex-grow w-full max-w-md mx-auto flex flex-col justify-center">
          <Link href="/" onClick={closeMenu} className="mobile-nav-link">Home</Link>
          <Link href="/prompt" onClick={closeMenu} className="mobile-nav-link">MaBook AI</Link>
          <Link href="/bookshelf" onClick={closeMenu} className="mobile-nav-link">Bookshelf</Link>
          <Link href="/why-us" onClick={closeMenu} className="mobile-nav-link">Why Us?</Link>
          <Link href="/feedback" onClick={closeMenu} className="mobile-nav-link-highlight">Feedback</Link>
        </div>
        <div className="pb-8 flex justify-center">
          <Link href="/" onClick={closeMenu}>
            <Image src="/image/logo.png" alt="MaBook Logo" width={96} height={96} className="mx-auto mb-4" style={{ filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))' }} />
          </Link>
        </div>
      </div>
    </>
  );
}