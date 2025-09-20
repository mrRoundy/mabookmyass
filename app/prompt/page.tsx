'use client';

import { useState, useEffect, Suspense, FormEvent, ChangeEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import TypingAnimationPrompt from '@/components/TypingAnimationPrompt';

// Define the structure of a Recommendation object
interface Recommendation {
  id: string;
  title: string;
  author: string;
  highlight: string;
}

function PromptComponent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('highlights');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Your handleSearch logic and other functions remain here...
  const handleSearch = async (currentQuery = query, currentSearchType = searchType) => {
    // Search logic is unchanged
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  // THIS IS THE NEW FUNCTION
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
    // Reset the height to allow it to shrink
    e.target.style.height = 'auto';
    // Set the height to the scroll height to make it expand
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  useEffect(() => {
    const queryFromUrl = searchParams.get('query');
    const searchTypeFromUrl = searchParams.get('searchType');
    if (queryFromUrl) {
      setQuery(queryFromUrl);
      if (searchTypeFromUrl) setSearchType(searchTypeFromUrl);
    }
  }, [searchParams]);

  return (
    <main className="flex-grow flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-classic-cream px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center text-classic-green mb-10 max-w-2xl mx-auto">
    <TypingAnimationPrompt />
    <h2 className="font-serif text-5xl md:text-6xl font-bold uppercase tracking-wide">
        Begin by Asking...
    </h2>
</div>
        
        <form onSubmit={handleSubmit} className="mb-8">
            <div className="search-box-container">
                <textarea
                    className="search-input w-full flex-grow bg-transparent text-classic-green placeholder-neutral-500 text-base leading-relaxed focus:outline-none resize-none overflow-y-hidden"
                    value={query}
                    onChange={handleTextareaChange} // Use the new handler here
                    placeholder="Ask me anything about books you'd like to read..."
                    rows={1}
                />
                <div className="search-options-row">
                    <div className="flex items-center space-x-2">
                        <button type="button" onClick={() => setSearchType('highlights')} className={`search-option-btn ${searchType === 'highlights' ? 'active' : ''}`}>By Highlights</button>
                        <button type="button" onClick={() => setSearchType('synopsis')} className={`search-option-btn ${searchType === 'synopsis' ? 'active' : ''}`}>By Synopsis</button>
                    </div>
                    <button type="submit" disabled={isLoading || !query.trim()} className="send-btn flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                </div>
            </div>
        </form>

        {/* Loading, Error, and Results sections are unchanged... */}
      </div>
    </main>
  );
}

// Suspense wrapper remains unchanged
export default function PromptPage() {
    return (
        <Suspense fallback={<div className="text-center p-12">Loading page...</div>}>
            <PromptComponent />
        </Suspense>
    );
}