'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import useEmblaCarousel from 'embla-carousel-react';

// --- (Interfaces and Supabase client setup remain the same) ---
interface Book {
  id: string;
  title: string;
  author: string;
  image: string;
}
interface BookshelfProps {
  genre: string;
  description: string;
}
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Bookshelf({ genre, description }: BookshelfProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // --- THIS IS THE CHANGE ---
  // Added dragFree: true to enable inertia-based scrolling.
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true });
  // --- END OF CHANGE ---

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_random_books_by_genre', {
        genre_name: genre,
        book_limit: 15
      });

      if (error) {
        console.error(`Error fetching books for ${genre}:`, error);
        setBooks([]);
      } else if (data && data.length > 0) {
        if (data.length < 10) {
          setBooks([...data, ...data, ...data]);
        } else {
          setBooks(data);
        }
      } else {
        setBooks([]);
      }
      setLoading(false);
    };
    fetchBooks();
  }, [genre]);


  return (
    <section className="bookshelf-section home-bookshelf-section">
      <div className="category mb-4">
        <h3 className="text-3xl font-serif text-classic-green">{genre}</h3>
        <p className="text-lg text-gray-600 max-w-2xl font-light">{description}</p>
      </div>

      <div className="bookshelf-controls-wrapper">
        <button onClick={scrollPrev} className="scroll-btn" aria-label="Scroll left">&#10094;</button>
        
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {loading ? (
                <div className="embla__slide"><p>Loading...</p></div>
            ) : books.length > 0 ? (
                books.map((book, index) => (
                  <div className="embla__slide" key={`${book.id}-${index}`}>
                    <Link href={`/book-details/${book.id}`} className="book-item-link">
                      <div className="book-item">
                        <div className="book-wrapper-3d">
                           <div className="book-cover-3d">
                               <img src={book.image} alt={`Cover of ${book.title}`} />
                           </div>
                           <div className="book-spine-3d">
                               <h4>{book.title}</h4>
                               <p>{book.author || 'Unknown'}</p>
                           </div>
                        </div>
                        <div className="book-info">
                            <h3>{book.title}</h3>
                            <p>by {book.author || 'Unknown'}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
            ) : (
                <div className="embla__slide"><p>No books found.</p></div>
            )}
          </div>
        </div>

        <button onClick={scrollNext} className="scroll-btn" aria-label="Scroll right">&#10095;</button>
      </div>
    </section>
  );
}