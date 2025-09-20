'use client';

import { useEffect, useRef } from 'react';

export default function TypingAnimation() {
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const quoteElement = quoteRef.current;
    if (!quoteElement) return;

    // This observer will trigger the animation when the element is 80% visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          quoteElement.classList.add('typing-animation');
          observer.unobserve(quoteElement); // Ensure the animation only runs once
        }
      });
    }, { threshold: 0.8 });

    observer.observe(quoteElement);

    // This function removes the blinking cursor after the animation finishes
    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName === 'typing' && quoteElement) {
        quoteElement.style.borderRightColor = 'transparent';
      }
    };
    
    quoteElement.addEventListener('animationend', handleAnimationEnd);

    // Cleanup function to prevent memory leaks
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