'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

// Define constants for book item widths for different screen sizes
const DESKTOP_ITEM_WIDTH = 220; // Corresponds to w-[200px] and mx-[10px]
const MOBILE_ITEM_WIDTH = 170;  // Corresponds to 150px width and mx-[10px]

// Define the structure of a Book object
interface Book {
  id: string;
  image: string;
  title: string;
}

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function BookCarousel() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [itemWidth, setItemWidth] = useState(DESKTOP_ITEM_WIDTH);

  // Effect to set the correct item width based on screen size
  useEffect(() => {
    const handleResize = () => {
      setItemWidth(window.innerWidth < 768 ? MOBILE_ITEM_WIDTH : DESKTOP_ITEM_WIDTH);
    };
    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('filtered_books')
        .select('id, image, title')
        .order('id', { ascending: true })
        .limit(10);

      if (error) {
        console.error('Failed to fetch books for carousel:', error);
      } else if (data) {
        const clonesStart = data.slice(-1);
        const clonesEnd = data.slice(0, 1);
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
  
  useEffect(() => {
    if (!carouselRef.current) return;
    if (currentIndex === 0) {
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.transition = 'none';
          setCurrentIndex(books.length - 2);
          setTimeout(() => {
            if(carouselRef.current) carouselRef.current.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
          }, 50);
        }
      }, 800);
    }
    if (currentIndex === books.length - 1) {
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.transition = 'none';
          setCurrentIndex(1);
          setTimeout(() => {
            if(carouselRef.current) carouselRef.current.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
          }, 50);
        }
      }, 800);
    }
  }, [currentIndex, books.length]);

  useEffect(() => {
    if (books.length > 0) {
      startAutoScroll();
    }
    return () => stopAutoScroll();
  }, [books.length, startAutoScroll]);


  if (loading) {
    return (
      <div className="carousel-container h-[280px] flex items-center justify-center">
        <div className="carousel-loading text-gray-700">Loading books...</div>
      </div>
    );
  }

  // --- UPDATED: Simplified and corrected transform logic ---
  const transformStyle = `translateX(calc(-${currentIndex * itemWidth}px + 50% - ${itemWidth / 2}px))`;

  return (
    <div 
      className="carousel-container w-full max-w-[640px] overflow-hidden relative"
      style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)' }}
      onMouseEnter={stopAutoScroll}
      onMouseLeave={startAutoScroll}
    >
      <div
        ref={carouselRef}
        className="book-carousel flex items-center"
        style={{
          transform: transformStyle, // Use the updated style
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {books.map((book, index) => (
          <Link 
            href={`/book-details/${book.id}`} 
            key={`${book.id}-${index}`} 
            className="book-item"
            aria-label={`View details for ${book.title}`}
          >
            <div
              className={`w-full h-full ${currentIndex === index ? 'active' : 'side'}`}
            >
              <img
                src={book.image}
                alt={book.title || 'Book cover'}
                className="w-full rounded-lg shadow-lg transition-all duration-500 ease-in-out"
                style={{
                  transform: currentIndex === index ? 'scale(1.15)' : 'scale(0.85)',
                  opacity: currentIndex === index ? 1 : 0.7,
                  boxShadow: currentIndex === index ? '0 8px 25px rgba(0, 0, 0, 0.3)' : '0 4px 15px rgba(0, 0, 0, 0.2)',
                }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}