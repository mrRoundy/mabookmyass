// components/TypingAnimation.tsx
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

interface TypingAnimationProps {
    className?: string; // Allow parent to pass in custom classes
}

export default function TypingAnimation({ className }: TypingAnimationProps) {
    const [currentQuote, setCurrentQuote] = useState('');

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setCurrentQuote(quotes[randomIndex]);
    }, []);

    // Use a default class string and append any passed-in classes
    const defaultClasses = "font-sans text-[20px] md:text-[22px] leading-relaxed mb-4 flex items-center justify-center text-center";
    
    return (
        <div className={`${defaultClasses} ${className || ''}`}>
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