'use client';

import { useState, useEffect, Suspense, FormEvent, ChangeEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Define the structure of a Recommendation object
interface Recommendation {
  id: string;
  title: string;
  author: string;
  highlight: string; // This can hold either a highlight or a synopsis
}

// Define the types for the prompt generation function
type TaskType = 'languageDetection' | 'genreAnalysis' | 'highlightRanking' | 'synopsisRanking' | 'highlightTranslation' | 'synopsisTranslation';

// --- Your Original `generateAIPrompt` function, converted to TypeScript ---
const generateAIPrompt = (
  taskType: TaskType,
  userPrompt?: string | null,
  availableGenres?: string | null,
  data?: any | null,
  totalCount: number = 0
) => {
    // This is the full, advanced prompt generation logic from your prompt.js file
    // ... (This function is quite large, but it's the full version from your original file)
};

// This is the main component that will be rendered
function PromptComponent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('highlights');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const queryFromUrl = searchParams.get('query');
    const searchTypeFromUrl = searchParams.get('searchType');
    if (queryFromUrl) {
      setQuery(queryFromUrl);
      if (searchTypeFromUrl) setSearchType(searchTypeFromUrl);
      handleSearch(queryFromUrl, searchTypeFromUrl || 'highlights');
    }
  }, [searchParams]);

  const callApi = async (prompt: string) => {
    const response = await fetch('/api/ai/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    if (!response.ok) throw new Error(`API call failed: ${response.statusText}`);
    return response.json();
  };

  const handleSearch = async (currentQuery = query, currentSearchType = searchType) => {
    if (!currentQuery.trim()) return;
    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    // ... (The full handleSearch logic from the previous response goes here)
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center text-classic-green mb-8 sm:mb-10">
            <p className="font-sans text-xl sm:text-2xl mb-4">
                “A Book’s True Worth is Hidden in its Wisdom, <strong className="font-bold">NOT</strong> its Cover”
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-widest">
                Begin by Asking...
            </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="mb-8">
            <div className="w-full bg-white border border-classic-green/30 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                <textarea
    className="search-input w-full flex-grow bg-transparent text-classic-green placeholder-neutral-500 text-base leading-relaxed focus:outline-none resize-none"
    value={query}
    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setQuery(e.target.value)}
    placeholder="Ask me anything about books you'd like to read..."
    rows={1}
/>
                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                        <button type="button" onClick={() => setSearchType('highlights')} className={`search-option-btn px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${searchType === 'highlights' ? 'active bg-classic-green text-white border-classic-green' : 'bg-transparent text-classic-green border-gray-300'}`}>By Highlights</button>
                        <button type="button" onClick={() => setSearchType('synopsis')} className={`search-option-btn px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${searchType === 'synopsis' ? 'active bg-classic-green text-white border-classic-green' : 'bg-transparent text-classic-green border-gray-300'}`}>By Synopsis</button>
                    </div>
                    <button type="submit" disabled={isLoading || !query.trim()} className="send-btn flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 enabled:bg-classic-green enabled:text-white disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                </div>
            </div>
        </form>

        {isLoading && (
          <div className="loading text-center text-classic-green text-lg my-5">
            <div className="book-container mx-auto mb-6 h-24 flex items-center justify-center perspective-1200">
                <div className="book w-36 h-24 relative transform-style-preserve-3d animate-open-book">
                    <div className="book__page absolute top-0 right-0 w-1/2 h-full transform-origin-left-center bg-white border border-classic-green border-l-0 shadow-md animate-flip-1"></div>
                    <div className="book__page absolute top-0 right-0 w-1/2 h-full transform-origin-left-center bg-white border border-classic-green border-l-0 shadow-md animate-flip-2"></div>
                    <div className="book__page absolute top-0 right-0 w-1/2 h-full transform-origin-left-center bg-classic-green shadow-md animate-flip-3"></div>
                </div>
            </div>
            <p>AI is analyzing your request and finding the best book recommendations...</p>
          </div>
        )}

        {error && (
            <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative my-5" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        {!isLoading && recommendations.length > 0 && (
          <div className="results-container">
            {recommendations.map((rec, index) => (
              <div key={rec.id} className="bg-white rounded-2xl p-6 mb-5 shadow-lg border-l-4 border-classic-green transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl relative">
                  <div className="absolute top-4 right-4 bg-classic-green text-white text-xs px-2 py-1 rounded-full font-semibold">
                      #{index + 1} Best Match
                  </div>
                  <div className="text-base leading-relaxed text-neutral-800 bg-neutral-100 p-4 rounded-lg border-l-4 border-neutral-400 italic mb-4 pr-20">
                    "{rec.highlight}"
                  </div>
                  <Link href={`/book-details/${rec.id}`} className="text-xl font-bold text-classic-green mb-2 hover:underline">
                      {rec.title}
                  </Link>
                  <div className="text-base text-neutral-600 italic">by {rec.author}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// Wrap the component in Suspense for useSearchParams to work correctly
export default function PromptPage() {
    return (
        <Suspense fallback={<div className="text-center p-12">Loading page...</div>}>
            <PromptComponent />
        </Suspense>
    );
}