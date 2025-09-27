// components/Navbar.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext'; // Step 1: Import the useAuth hook
import { auth } from '@/lib/firebase'; // Import auth for signout
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuth(); // Step 2: Get user from the context
  const router = useRouter();

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsDropdownOpen(false); // Close dropdown on logout
      router.push('/'); // Redirect to home after logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  // Component for the user icon and dropdown
  const AuthLinks = () => {
    if (user) {
      // User is logged in
      return (
        <div className="relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            {/* Logged-in User Icon (Filled) */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
              <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 text-black">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      );
    } else {
      // User is logged out
      return (
        <Link href="/login" className="p-2 rounded-full hover:bg-white/10 transition-colors">
          {/* Logged-out User Icon (Outline) */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Link>
      );
    }
  };


  return (
    <>
      <nav className="bg-classic-green text-white h-20 flex items-center px-6 md:px-12 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center relative h-full">
          
          <div className="hidden lg:flex justify-start items-center space-x-8">
            <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
            <Link href="/prompt" className="flex items-center hover:text-gray-300 transition-colors">
              <Image src="/image/star.png" alt="Star" width={48} height={48} className="mr-[-0.75em]" />
              <span>MaBook AI</span>
            </Link>
            <Link href="/bookshelf" className="hover:text-gray-300 transition-colors">Bookshelf</Link>
            <Link href="/why-us" className="hover:text-gray-300 transition-colors">Why Us?</Link>
          </div>

          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[5.5em] w-[5.5em] md:h-[7em] md:w-[7em] z-10">
            <Link href="/" className="relative h-full w-full block">
              <Image 
                src="/image/logo.png" 
                alt="MaBook Logo" 
                fill
                sizes="(max-width: 768px) 5.5em, 7em"
                style={{ objectFit: 'contain' }}
              />
            </Link>
          </div>

          <div className="flex justify-end items-center">
            <div className="hidden lg:flex items-center space-x-6">
                 <Link href="/feedback" className="flex items-center hover:text-gray-300 transition-colors">
                    <span>Feedback</span>
                    <Image src="/image/likeanddislike.png" alt="Feedback Icon" width={56} height={56} className="ml-[-0.5em]" />
                 </Link>
                 {/* Step 3: Render the new AuthLinks component */}
                 <AuthLinks />
            </div>
           
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white z-50 p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path className={`transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                <path className={`absolute transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

        </div>
      </nav>

      <div className={`fixed inset-0 bg-[#FDF9F6] z-40 flex flex-col text-[#173F25] font-serif lg:hidden
        transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex-grow w-full max-w-md mx-auto flex flex-col justify-center">
          <Link href="/" onClick={closeMenu} className="mobile-nav-link">Home</Link>
          <Link href="/prompt" onClick={closeMenu} className="mobile-nav-link">MaBook AI</Link>
          <Link href="/bookshelf" onClick={closeMenu} className="mobile-nav-link">Bookshelf</Link>
          <Link href="/why-us" onClick={closeMenu} className="mobile-nav-link">Why Us?</Link>
          {/* Step 4: Update mobile menu */}
          {user ? (
            <button onClick={() => { handleLogout(); closeMenu(); }} className="mobile-nav-link text-left">Logout</button>
          ) : (
            <Link href="/login" onClick={closeMenu} className="mobile-nav-link">Login</Link>
          )}
          <Link href="/feedback" onClick={closeMenu} className="mobile-nav-link-highlight">Feedback</Link>
        </div>
        <div className="pb-8 flex justify-center">
          <Link href="/" onClick={closeMenu}>
            <Image 
              src="/image/logo.png" 
              alt="MaBook Logo" 
              width={96} 
              height={96} 
              className="mx-auto mb-4" 
              style={{ filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))' }} 
            />
          </Link>
        </div>
      </div>
    </>
  );
}