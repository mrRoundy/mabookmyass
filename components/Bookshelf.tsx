'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Define the structure of a Book object
interface Book {
  id: string;
  title: string;
  author: string;
  image: string;
}

// Define the props that the Bookshelf component will accept
interface BookshelfProps {
  genre: string;
  description: string;
}

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Bookshelf({ genre, description }: BookshelfProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const bookshelfRef = useRef<HTMLDivElement>(null);
  const originalBookCount = useRef(0);
  const currentIndex = useRef(0);
  const isScrolling = useRef(false);
  const scrollQueue = useRef<('next' | 'prev')[]>([]);

  useEffect(() => {
    const fetchAndSetupBooks = async () => {
      setLoading(true);
      
      const { data, error } = await supabase.rpc('get_random_books_by_genre', {
        genre_name: genre,
        book_limit: 10
      });

      if (error) {
        console.error(`Error fetching books for ${genre}:`, error);
        setBooks([]);
      } else if (data && data.length > 0) {
        originalBookCount.current = data.length;
        setBooks([...data, ...data]); 
      } else {
        setBooks([]);
      }
      setLoading(false);
    };
    fetchAndSetupBooks();
  }, [genre]);

  const updateScrollPosition = (duration: number, useTransition = true) => {
    const shelf = bookshelfRef.current;
    if (!shelf || shelf.children.length === 0) return;

    const bookElement = shelf.children[0] as HTMLElement;
    const bookWidth = bookElement.offsetWidth;
    const gap = parseFloat(window.getComputedStyle(shelf).gap);
    const scrollAmount = (bookWidth + gap) * currentIndex.current;
    
    shelf.style.transition = useTransition ? `transform ${duration}ms ease-out` : 'none';
    shelf.style.transform = `translateX(-${scrollAmount}px)`;
  };
  
  const processScrollQueue = () => {
    if (isScrolling.current || scrollQueue.current.length === 0) return;

    isScrolling.current = true;
    const direction = scrollQueue.current.shift();
    const duration = 600;

    if (direction === 'next') {
        currentIndex.current++;
        updateScrollPosition(duration);
        if (currentIndex.current >= originalBookCount.current) {
            setTimeout(() => {
                currentIndex.current = 0;
                updateScrollPosition(0, false);
            }, duration);
        }
    }

    if (direction === 'prev') {
        if (currentIndex.current <= 0) {
            currentIndex.current = originalBookCount.current;
            updateScrollPosition(0, false);
            setTimeout(() => {
                currentIndex.current--;
                updateScrollPosition(duration);
            }, 20);
        } else {
            currentIndex.current--;
            updateScrollPosition(duration);
        }
    }

    setTimeout(() => {
        isScrolling.current = false;
        processScrollQueue();
    }, duration);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    scrollQueue.current.push(direction === 'right' ? 'next' : 'prev');
    processScrollQueue();
  };

  return (
    <section className="bookshelf-section home-bookshelf-section">
      <div className="category mb-4">
        <h3 className="text-3xl font-serif text-classic-green">{genre}</h3>
        <p className="text-lg text-gray-600 max-w-2xl font-light">{description}</p>
      </div>
      <div className="bookshelf-controls-wrapper">
        <button onClick={() => handleScroll('left')} className="scroll-btn" aria-label="Scroll left" disabled={loading}>&#10094;</button>
        <div className="bookshelf-container">
          <div className="bookshelf" ref={bookshelfRef}>
            {loading ? (
              <p className="text-center w-full">Loading books...</p>
            ) : books.length > 0 ? (
              books.map((book, index) => (
                <Link href={`/book-details/${book.id}`} key={`${book.id}-${index}`} className="book-item-link">
                  <div className="book-item">
                    <div className="book-wrapper-3d">
                       <div className="book-cover-3d">
                           <img src={book.image} alt={`Cover of ${book.title}`} />
                       </div>
                       <div className="book-spine-3d">
                           <h4>{book.title}</h4>
                           {/* Added author to the spine */}
                           <p>{book.author || 'Unknown'}</p>
                       </div>
                    </div>
                    <div className="book-info">
                        <h3>{book.title}</h3>
                        <p>by {book.author || 'Unknown'}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center w-full text-gray-500">No books found for {genre}.</p>
            )}
          </div>
        </div>
        <button onClick={() => handleScroll('right')} className="scroll-btn" aria-label="Scroll right" disabled={loading}>&#10095;</button>
      </div>
    </section>
  );
}