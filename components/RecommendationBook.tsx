// components/RecommendationBook.tsx

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// --- Type Definitions ---
interface Recommendation {
  id: string;
  title: string;
  author: string;
  highlight: string;
}

// --- Props for the Main Component ---
interface RecommendationBookProps {
    recommendations: Recommendation[];
    currentIndex: number;
    isFlipping: boolean;
    onNext: () => void;
    onPrev: () => void;
    setIsFlipping: (isFlipping: boolean) => void;
}

// --- The Main Component ---
export default function RecommendationBook({ recommendations, currentIndex, isFlipping, onNext, onPrev, setIsFlipping }: RecommendationBookProps) {
    const isFirstPage = currentIndex === 1;
    const isLastPage = currentIndex === recommendations.length;

    // --- NEW: Explicit class logic for button visibility ---
    const prevButtonClasses = isFlipping
        ? 'opacity-0 pointer-events-none' // 1. Fading out during flip
        : isFirstPage
            ? 'opacity-30' // 2. Faded but visible when disabled
            : 'opacity-100'; // 3. Fully visible when enabled

    const nextButtonClasses = isFlipping
        ? 'opacity-0 pointer-events-none'
        : isLastPage
            ? 'opacity-30'
            : 'opacity-100';

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-[1440px] aspect-[12/7] relative">
                
                {/* --- Hardcover Base --- */}
                <div className="absolute w-full h-full bg-[#173F25] rounded-lg shadow-2xl p-2 md:p-3">
                    <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d', perspective: '3000px' }}>
                        
                        {/* Page Stacking Effect & Static Pages */}
                        <div className="absolute w-full h-full bg-white rounded-md shadow-lg border border-gray-200 transform translate-y-2 translate-x-1"></div>
                        <div className="absolute w-full h-full bg-white rounded-md shadow-lg border border-gray-200 transform translate-y-1"></div>
                        <div className="absolute w-full h-full bg-white rounded-md shadow-xl flex z-0 border border-gray-300">
                            <div className="w-1/2 h-full bg-gray-50 rounded-l-md"></div>
                            <div className="w-1/2 h-full bg-gray-50 rounded-r-md"></div>
                        </div>
                        
                        {/* Spine Shadow */}
                        <div className="absolute w-24 h-full left-1/2 -translate-x-1/2 flex z-20 pointer-events-none">
                            <div className="w-full h-full bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
                            <div className="w-full h-full bg-gradient-to-l from-transparent via-black/10 to-transparent"></div>
                        </div>

                        {/* Flippable Pages */}
                        {recommendations.map((rec, index) => (
                            <motion.div
                                key={rec.id}
                                className="absolute w-1/2 h-full right-0"
                                style={{
                                    transformOrigin: 'left center',
                                    transformStyle: 'preserve-3d',
                                    zIndex: currentIndex - 1 === index ? 30 : (currentIndex > index ? index : recommendations.length - index),
                                }}
                                animate={{
                                    rotateY: currentIndex > index ? -180 : 0,
                                }}
                                transition={{ duration: 0.9, ease: 'easeInOut' }}
                                onAnimationStart={() => setIsFlipping(true)}
                                onAnimationComplete={() => setIsFlipping(false)}
                            >
                                <div className="absolute w-full h-full bg-white rounded-r-md" style={{ backfaceVisibility: 'hidden' }}>
                                    <div className="absolute w-full h-full bg-gradient-to-r from-black/10 via-transparent to-transparent pointer-events-none"></div>
                                </div>
                                <div className="absolute w-full h-full bg-white rounded-l-md flex flex-col items-center justify-center text-center p-6 md:p-10" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
                                    <div className="absolute w-full h-full bg-gradient-to-l from-black/10 via-transparent to-transparent pointer-events-none"></div>
                                    <div className="relative z-10">
                                        <div className="absolute -top-16 -left-8 text-8xl text-classic-green font-serif">“</div>
                                        <Link 
                                            href={`/book-details/${rec.id}`}
                                            className="group font-lustria relative inline-block text-lg md:text-2xl leading-relaxed text-gray-800 px-8 py-4 cursor-pointer"
                                            aria-label="View book details for this quote"
                                        >
                                            {rec.highlight}
                                            <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#173F25] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center"></span>
                                        </Link>
                                        <div className="absolute -bottom-25 -right-8 text-8xl text-classic-green font-serif">”</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                
                {/* --- NAVIGATION BUTTONS (Now positioned independently) --- */}
                <button
                    onClick={onPrev}
                    disabled={isFirstPage || isFlipping}
                    aria-label="Previous page"
                    className={`scroll-btn absolute top-1/2 -translate-y-1/2 left-6 z-50 disabled:cursor-not-allowed transition-opacity duration-300 ${prevButtonClasses}`}
                >
                    &#10094;
                </button>
                
                <button
                    onClick={onNext}
                    disabled={isLastPage || isFlipping}
                    aria-label="Next page"
                    className={`scroll-btn absolute top-1/2 -translate-y-1/2 right-[45.78rem] z-50 disabled:cursor-not-allowed transition-opacity duration-300 ${nextButtonClasses}`}
                >
                    &#10095;
                </button>
            </div>
        </div>
    );
}