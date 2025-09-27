// components/RecommendationBook.tsx

'use client';

import { motion } from 'framer-motion';

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
                                <div className="absolute w-full h-full bg-white rounded-l-md flex flex-col items-center justify-center text-center p-6 md:p-10 font-serif" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
                                    <div className="absolute w-full h-full bg-gradient-to-l from-black/10 via-transparent to-transparent pointer-events-none"></div>
                                    <div className="relative z-10">
                                        <div className="absolute -top-16 -left-8 text-8xl text-classic-green font-serif">“</div>
                                        <p className="text-lg md:text-2xl leading-relaxed text-gray-800 px-8">
                                            {rec.highlight}
                                        </p>
                                        <div className="absolute -bottom-25 -right-8 text-8xl text-classic-green font-serif">”</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                
                {/* --- NAVIGATION BUTTONS CONTAINER (POSITIONED ON THE LEFT) --- */}
                <div className={`absolute top-1/2 -translate-y-1/2 left-6 z-50 flex items-center space-x-[38rem] transition-opacity duration-200 ${isFlipping ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    {/* Previous Button */}
                    <button
                        onClick={onPrev}
                        disabled={isFirstPage}
                        aria-label="Previous page"
                        className="scroll-btn pointer-events-auto disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        &#10094;
                    </button>
                    
                    {/* Next Button */}
                    <button
                        onClick={onNext}
                        disabled={isLastPage}
                        aria-label="Next page"
                        className="scroll-btn pointer-events-auto disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        &#10095;
                    </button>
                </div>
            </div>
        </div>
    );
}