// app/layout.tsx

import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Navbar from '@/components/Navbar';
import ConditionalFooter from '@/components/ConditionalFooter'; // Import the new component
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
        <Navbar />
        <main className="flex-grow">{children}</main>
        <ConditionalFooter /> {/* Use the new conditional component here */}
      </body>
    </html>
  );
}