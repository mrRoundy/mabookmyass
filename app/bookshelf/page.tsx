'use client';

import { useState } from 'react';
import Bookshelf from '@/components/Bookshelf';

const genres = [
    { name: "Habits", description: "Books on routines that shape success, growth, and everyday life." },
    { name: "Finance", description: "Books where money drives ambition, power, and life’s big gambles." },
    { name: "Mental Health", description: "Books exploring minds, healing, resilience, and inner journeys." },
    { name: "Leadership", description: "Guides to inspire, manage, and lead with impact." },
    { name: "Motivational", description: "Stories and strategies to unlock your full potential." },
    { name: "Physical Health", description: "Insights on wellness, fitness, and living a healthier life." },
    { name: "Time Management", description: "Techniques to boost productivity and master your schedule." },
    { name: "Communication", description: "Skills for clearer, more effective, and persuasive interaction." },
    { name: "Self-Discovery", description: "Journeys into understanding oneself and finding purpose." },
    { name: "Decision making", description: "Frameworks for making smarter, more confident choices." },
    { name: "Creativity", description: "Unlocking new ideas and fostering innovative thinking." },
    { name: "Cognitive intelligence", description: "Exploring the science of thought, learning, and the mind." },
    { name: "Behaviour", description: "Understanding the psychology behind why we do what we do." },
    { name: "Emotional Intelligence", description: "Mastering emotions for better relationships and success." },
    { name: "Innovation", description: "Blueprints for creating and implementing groundbreaking ideas." },
    { name: "Philosophy", description: "Timeless wisdom for contemplating life's biggest questions." },
    { name: "Entrepreneurship", description: "Playbooks for building, launching, and growing a business." },
];

export default function BookshelfPage() {
  const [isGenreListVisible, setIsGenreListVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('All');

  const filteredGenres = selectedGenre === 'All' 
    ? genres 
    : genres.filter(g => g.name === selectedGenre);

  return (
    <div className="bookshelf-page-layout max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="bookshelf-header">
        <h1 className="bookshelf-title">Explore Our Collection</h1>
        <p className="bookshelf-subtitle">
          Browse by genre to discover books curated to your interests. Use the filter to view a specific category.
        </p>
      </div>

      <div className="genre-toggle-container mb-6">
        <button 
          onClick={() => setIsGenreListVisible(!isGenreListVisible)}
          className={`genre-toggle-button w-11 h-11 flex items-center justify-center rounded-full border transition-colors ${isGenreListVisible ? 'bg-classic-green text-white border-classic-green' : 'bg-white border-gray-300'}`}
          aria-label="Toggle genre filter"
        >
            {/* --- CORRECT, ORIGINAL SEARCH ICON --- */}
<svg className="toggle-icon w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
        </button>
      </div>

      <div className={`genre-tags-container flex flex-wrap gap-3 overflow-hidden transition-all duration-400 ease-in-out ${isGenreListVisible ? 'max-h-96 opacity-100 mb-12' : 'max-h-0 opacity-0'}`}>
        <button 
          onClick={() => setSelectedGenre('All')}
          className={`genre-tag px-4 py-2 rounded-full text-sm font-medium border transition-colors ${selectedGenre === 'All' ? 'bg-classic-green text-white border-classic-green' : 'bg-white text-classic-green border-gray-300'}`}
        >
          All
        </button>
        {genres.map(genre => (
          <button 
            key={genre.name}
            onClick={() => setSelectedGenre(genre.name)}
            className={`genre-tag px-4 py-2 rounded-full text-sm font-medium border transition-colors ${selectedGenre === genre.name ? 'bg-classic-green text-white border-classic-green' : 'bg-white text-classic-green border-gray-300'}`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      <main id="bookshelf-main-content">
        {filteredGenres.map(genre => (
          <Bookshelf key={genre.name} genre={genre.name} description={genre.description} />
        ))}
      </main>
    </div>
  );
}