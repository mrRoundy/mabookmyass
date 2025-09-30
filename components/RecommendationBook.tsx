// components/RecommendationBook.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// ... (interfaces and component props remain the same) ...
interface Recommendation {
  id: string;
  title: string;
  author: string;
  highlight: string;
}

interface RecommendationBookProps {
    recommendations: Recommendation[];
    currentIndex: number;
    isFlipping: boolean;
    onNext: () => void;
    onPrev: () => void;
    setIsFlipping: (isFlipping: boolean) => void;
}


export default function RecommendationBook({ recommendations, currentIndex, isFlipping, onNext, onPrev, setIsFlipping }: RecommendationBookProps) {
    // ... (button logic remains the same) ...
    const isFirstPage = currentIndex === 1;
    const isLastPage = currentIndex === recommendations.length;

    const prevButtonClasses = isFlipping
        ? 'opacity-0 pointer-events-none' 
        : isFirstPage
            ? 'opacity-30'
            : 'opacity-100';

    const nextButtonClasses = isFlipping
        ? 'opacity-0 pointer-events-none'
        : isLastPage
            ? 'opacity-30'
            : 'opacity-100';

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-[1440px] aspect-[12/7] relative">
                
                <div className="book-cover-hardcover absolute w-full h-full bg-[#173F25] rounded-lg shadow-2xl p-2 md:p-3 relative">
                    
                    <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d', perspective: '3000px' }}>
                        
                        <div className="absolute w-full h-full bg-white rounded-md shadow-lg border border-gray-200 transform translate-y-2 translate-x-1"></div>
                        <div className="absolute w-full h-full bg-white rounded-md shadow-lg border border-gray-200 transform translate-y-1"></div>
                        
                        <div className="absolute w-full h-full bg-white rounded-md shadow-xl flex z-0 border border-gray-300">
                            <div className="w-1/2 h-full bg-gray-50 rounded-l-md"></div>
                            <div className="w-1/2 h-full bg-gray-50 rounded-r-md"></div>
                        </div>
                        
                        <div className="page-gradient-overlay z-10"></div>

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
                                
                                <div className="absolute w-full h-full bg-white rounded-l-md flex flex-col items-center justify-center text-center p-6 md:p-10 relative" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
                                    
                                    <div className="flipped-page-gradient-overlay"></div>
                                    <div className="absolute w-full h-full bg-gradient-to-l from-black/10 via-transparent to-transparent pointer-events-none"></div>

                                    <div className="absolute top-12 left-12 md:left-16 text-8xl text-[#173F25] font-serif z-0">“</div>
                                    <div className="absolute bottom-[-0.5rem] right-12 md:right-16 text-8xl text-[#173F25] font-serif z-[6]">”</div>
                                    
                                    <div className="relative z-10 px-12 md:px-16">
                                        <Link 
                                            href={`/book-details/${rec.id}`}
                                            className="font-lustria inline-block text-lg md:text-2xl leading-relaxed text-gray-800 py-4 cursor-pointer transition-transform duration-300 ease-out hover:scale-105"
                                            aria-label="View book details for this quote"
                                        >
                                            {rec.highlight}
                                        </Link>
                                    </div>

                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                
                {/* Navigation Buttons */}
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