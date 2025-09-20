'use client';

import { useEffect, useRef } from 'react';

export default function TypingAnimationPrompt() {
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const quoteElement = quoteRef.current;
    if (!quoteElement) return;

    quoteElement.classList.add('typing-animation-prompt');

    const handleAnimationEnd = (event: AnimationEvent) => {
        if (event.animationName.startsWith('typing')) {
            if (quoteElement) {
                quoteElement.style.borderRightColor = 'transparent';
            }
        }
    };
    
    quoteElement.addEventListener('animationend', handleAnimationEnd);

    return () => {
      if (quoteElement) {
        quoteElement.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, []);

  return (
    <p ref={quoteRef} className="font-sans text-[20px] md:text-[22px] leading-relaxed mb-4">
        “A Book’s True Worth is Hidden in its Wisdom, <strong className="font-bold">NOT</strong> its Cover”
    </p>
  );
}