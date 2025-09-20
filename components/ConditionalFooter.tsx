'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();

  // If the user is on the prompt page, do not render the footer
  if (pathname === '/prompt') {
    return null;
  }

  // Otherwise, render the footer
  return <Footer />;
}