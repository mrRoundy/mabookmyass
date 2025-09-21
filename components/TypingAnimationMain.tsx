'use client';

import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

// Array of quotes to be randomly selected
const quotes = [
  "“A Book’s True Worth is Hidden in its Wisdom, NOT its Cover”",
  "“Within the right pages lies the answer you've been searching for.”",
  "“A great book is a conversation that shapes your future.”",
  "“Discovering a good book is like finding a new path on a familiar journey.”",
  "“The best stories don't just entertain; they build a better you.”"
];

export default function TypingAnimationMain() {
  const [currentQuote, setCurrentQuote] = useState('');

  // This effect runs once when the component loads
  useEffect(() => {
    // Select a random quote from the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }, []); // The empty array ensures this runs only once on mount

  return (
    <div className="font-sans text-xl md:text-2xl mb-4 h-[84px] md:h-[56px]">
      {/* Only render the animation if a quote has been selected */}
      {currentQuote && (
        <TypeAnimation
          cursor={false}
          sequence={[
            1000,
            currentQuote,
            (el) => el?.classList.add('blinking'),
          ]}
          wrapper="p"
          speed={55}
          className="solid-cursor"
          repeat={0}
        />
      )}
    </div>
  );
}