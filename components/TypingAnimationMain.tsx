'use client';

import { useEffect, useRef } from 'react';

export default function TypingAnimationMain() {
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const quoteElement = quoteRef.current;
    if (!quoteElement) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          quoteElement.classList.add('typing-animation-main');
          observer.unobserve(quoteElement);
        }
      });
    }, { threshold: 0.8 });

    observer.observe(quoteElement);

    const handleAnimationEnd = () => {
      if (quoteElement) {
        quoteElement.style.borderRightColor = 'transparent';
      }
    };
    
    quoteElement.addEventListener('animationend', handleAnimationEnd);

    return () => {
      observer.disconnect();
      if (quoteElement) {
        quoteElement.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, []);

  return (
    <p ref={quoteRef} className="font-sans text-xl md:text-2xl mb-4">
        “A Book’s True Worth is Hidden in its Wisdom, <strong className="font-bold">NOT</strong> its Cover”
    </p>
  );
}