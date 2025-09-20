'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

// Define the structure of a Book object
interface Book {
  image: string;
  title: string;
}

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function BookCarousel() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1); // Start with the first actual book
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch books from Supabase when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('filtered_books')
        .select('image, title')
        .order('id', { ascending: true })
        .limit(10);

      if (error) {
        console.error('Failed to fetch books for carousel:', error);
      } else if (data) {
        // Create clones for infinite scroll effect
        const clonesStart = data.slice(-1); // Clone the last item
        const clonesEnd = data.slice(0, 1); // Clone the first item
        setBooks([...clonesStart, ...data, ...clonesEnd]);
      }
      setLoading(false);
    };

    fetchBooks();
  }, []);
  
  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }, 2000);
  }, []);

  const stopAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  
  // Effect to handle the infinite scroll logic
  useEffect(() => {
    if (!carouselRef.current) return;

    if (currentIndex === 0) {
      // If we're at the first clone (left side), jump to the real last item
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.transition = 'none';
          setCurrentIndex(books.length - 2);
          // Re-enable transition after the jump
          setTimeout(() => {
            if(carouselRef.current) carouselRef.current.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
          }, 50);
        }
      }, 800);
    }

    if (currentIndex === books.length - 1) {
      // If we're at the last clone (right side), jump to the real first item
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.transition = 'none';
          setCurrentIndex(1);
          // Re-enable transition after the jump
          setTimeout(() => {
            if(carouselRef.current) carouselRef.current.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
          }, 50);
        }
      }, 800);
    }
  }, [currentIndex, books.length]);

  // Start auto-scroll when books are loaded
  useEffect(() => {
    if (books.length > 0) {
      startAutoScroll();
    }
    return () => stopAutoScroll(); // Cleanup on unmount
  }, [books.length, startAutoScroll]);


  if (loading) {
    return (
      <div className="carousel-container h-[280px] flex items-center justify-center">
        <div className="carousel-loading text-gray-700">Loading books...</div>
      </div>
    );
  }

  return (
    <div 
      className="carousel-container w-[640px] overflow-hidden relative"
      style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)' }}
      onMouseEnter={stopAutoScroll}
      onMouseLeave={startAutoScroll}
    >
      <div
        ref={carouselRef}
        className="book-carousel flex"
        style={{
          transform: `translateX(calc(-${currentIndex * 220}px + 50% - 110px))`, // Center the active item
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {books.map((book, index) => (
          <div
            key={index}
            className={`book-item flex-shrink-0 w-[200px] mx-[10px] transition-all duration-500 ease-in-out ${currentIndex === index ? 'active' : 'side'}`}
          >
            <img
              src={book.image}
              alt={book.title || 'Book cover'}
              className="w-full h-auto max-h-[280px] object-contain rounded-lg shadow-lg transition-all duration-500 ease-in-out"
              style={{
                transform: currentIndex === index ? 'scale(1.15)' : 'scale(0.85)',
                opacity: currentIndex === index ? 1 : 0.7,
                boxShadow: currentIndex === index ? '0 8px 25px rgba(0, 0, 0, 0.3)' : '0 4px 15px rgba(0, 0, 0, 0.2)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}