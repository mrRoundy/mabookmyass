// components/PageWrapper.tsx
'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import ConditionalFooter from './ConditionalFooter';
import VerificationBanner from './VerificationBanner';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isPromptPage = pathname === '/prompt';

  return (
    <>
      <VerificationBanner />

      {/*
        REVERSED LOGIC AS REQUESTED:
        - Now applying 'fixed' when it is NOT the prompt page.
        - Applying no class when it IS the prompt page.
      */}
      <Navbar className={isPromptPage ? '' : 'fixed top-0 left-0'} />

      {/*
        REVERSED PADDING LOGIC:
        - Now applying padding when it is NOT the prompt page.
      */}
      <main className={`flex-grow overflow-hidden ${isPromptPage ? '' : 'pt-20'}`}>
        {children}
      </main>

      <ConditionalFooter />
    </>
  );
}