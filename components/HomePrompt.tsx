'use client';

import { useState, FormEvent, ChangeEvent, KeyboardEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePrompt() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('highlights');
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if Enter is pressed without the Shift key
    if (e.key === 'Enter' && !e.shiftKey) {
      // Prevent the default action (adding a new line)
      e.preventDefault();
      // Trigger the form submission
      formRef.current?.requestSubmit();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const params = new URLSearchParams({ query, searchType });
      router.push(`/prompt?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
        <div className="w-full bg-white border border-classic-green/30 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
            <textarea
                className="search-input font-sans w-full flex-grow bg-transparent text-classic-green placeholder-neutral-500 text-base leading-relaxed focus:outline-none overflow-y-hidden"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about books you'd like to read..."
                rows={1}
            />
            <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2">
                    <button
                        type="button"
                        onClick={() => setSearchType('highlights')}
                        className={`search-option-btn font-sans ${searchType === 'highlights' ? 'active' : ''}`}
                    >
                        By Highlights
                    </button>
                    <button
                        type="button"
                        onClick={() => setSearchType('synopsis')}
                        className={`search-option-btn font-sans ${searchType === 'synopsis' ? 'active' : ''}`}
                    >
                        By Synopsis
                    </button>
                </div>
                <button
                    type="submit"
                    disabled={!query.trim()}
                    className="send-btn flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 enabled:bg-classic-green enabled:text-white disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </button>
            </div>
        </div>
    </form>
  );
}