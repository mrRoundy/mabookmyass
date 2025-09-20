'use client';

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';

// Define the types for the props this component accepts
interface NavItem {
  href: string;
  label: string;
}

interface PolicyPageLayoutProps {
  navItems: NavItem[];
  pageTitle: string;
  children: ReactNode;
}

export default function PolicyPageLayout({ navItems, pageTitle, children }: PolicyPageLayoutProps) {
  const [activeSection, setActiveSection] = useState(navItems[0]?.href.substring(1) || '');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.href.substring(1)));
      // Offset helps highlight the link when the section title is closer to the center of the screen
      const scrollPosition = window.scrollY + (window.innerHeight / 2);

      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <div className="bg-[#FDF9F6]">
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="inline-block bg-[#173F25] text-white font-serif text-4xl md:text-6xl py-5 px-10 rounded-full -mb-16 relative z-10">
          {pageTitle}
        </h1>
      </div>

      <div className="container policy-layout max-w-6xl mx-auto grid md:grid-cols-[220px_1fr] gap-12 p-8 md:p-12 bg-white rounded-lg shadow-lg mt-8">
        <aside className="policy-sidebar md:sticky top-28 self-start">
          <div className="sidebar-box bg-[#FDF9F6] border-2 border-gray-200 rounded-lg overflow-hidden">
            <h3 className="sidebar-box-title font-bold text-[#173F25] p-3 border-b border-gray-200">
              On this page
            </h3>
            <nav>
              <ul className="p-4 space-y-2">
                {navItems.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-2 text-sm rounded-md border-l-4 transition-colors ${
                        activeSection === item.href.substring(1)
                          ? 'border-classic-green bg-green-50 text-classic-green font-bold'
                          : 'border-transparent text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
        
        <main className="policy-content">
          {children}
        </main>
      </div>
    </div>
  );
}