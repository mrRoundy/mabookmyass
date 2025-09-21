'use client';

import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

// Array of quotes to be randomly selected
const quotes = [
  "“A Book’s True Worth is Hidden in its Wisdom, NOT its Cover”",
  "“Within The Right Pages Lies the Answer you've been Searching for.”",
  "“A Great Book is a Conversation That Shapes your Future.”",
  "“Discovering a Good Book is Like Finding a New Path on a Familiar Journey.”",
  "“The Best Stories Don't Just Entertain, They Build a Better you.”"
];

export default function TypingAnimationPrompt() {
    const [currentQuote, setCurrentQuote] = useState('');

    // This effect runs once when the component loads
    useEffect(() => {
        // Select a random quote from the array
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setCurrentQuote(quotes[randomIndex]);
    }, []); // The empty array ensures this runs only once on mount

    return (
        <div className="font-sans text-[20px] md:text-[22px] leading-relaxed mb-4 h-[81px] md:h-[52px]">
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