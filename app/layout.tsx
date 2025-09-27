// app/layout.tsx

import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Navbar from '@/components/Navbar';
import ConditionalFooter from '@/components/ConditionalFooter';
import { AuthProvider } from '@/context/AuthContext';
import VerificationBanner from '@/components/VerificationBanner';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  weight: ['300', '400', '600', '700'] 
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: 'normal',
  variable: '--font-playfair-display',
});

export const metadata: Metadata = {
  title: 'MaBook - Book Recommendations',
  description: 'AI-Powered Book Discovery That Solves Your Problems',
  icons: {
    icon: '/image/websitelogo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth h-full">
      <body className={`${inter.variable} ${playfairDisplay.variable} font-sans bg-classic-cream flex flex-col min-h-full`}>
        <AuthProvider>
            
          <div className="orientation-lock-overlay">
            <svg className="w-24 h-24 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18h3m-3-18v18" />
            </svg>
            <h2 className="text-2xl font-serif font-bold mb-2">Please Rotate Your Device</h2>
            <p>This experience is best viewed in portrait mode.</p>
          </div>
          
          <VerificationBanner />
          <Navbar />
          <main className="flex-grow overflow-hidden">{children}</main>
          <ConditionalFooter />

        </AuthProvider>
      </body>
    </html>
  );
}