// app/book-details/[id]/page.tsx

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Define the structure of our Book data with TypeScript
interface Book {
  id: number;
  title: string;
  author: string;
  image?: string;
  'sub-genre'?: string;
  synopsis?: string;
}

// This function fetches the data for a single book on the server
async function fetchBookDetails(id: string): Promise<Book | null> {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from('filtered_books')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
  
  return data;
}


// The main page component
export default async function BookDetailsPage({ params }: { params: { id: string } }) {
  const book = await fetchBookDetails(params.id);

  // If no book is found, show the Next.js 404 page
  if (!book) {
    notFound();
  }

  return (
    <div className="bg-[#FDF9F6]">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="book-details-layout">
          
          <div className="book-cover-container md:sticky top-28 self-start">
            <Image
              src={book.image || '/image/placeholder.png'} // Use a placeholder if no image
              alt={`Cover of ${book.title}`}
              width={300}
              height={450}
              className="w-full h-auto rounded-lg shadow-lg"
              priority // Prioritize loading the book cover image
            />
          </div>

          <div className="book-info-container">
            <h1 className="book-title text-4xl md:text-5xl font-bold font-serif text-classic-green mb-2">
              {book.title}
            </h1>
            <h2 className="book-author text-xl md:text-2xl italic text-gray-600 mb-6">
              by {book.author || 'Unknown Author'}
            </h2>

            <div className="book-meta border-l-4 border-yellow-700/50 pl-4 mb-8">
              <p><strong>Genre:</strong> <span className="font-normal">Self-improvement</span></p>
              <p><strong>Sub-genre:</strong> <span className="font-normal">{book['sub-genre'] || 'Not specified'}</span></p>
            </div>
            
            <h3 className="synopsis-title text-2xl font-serif text-classic-green border-b pb-2 mb-4">
              Synopsis
            </h3>
            <p className="book-synopsis text-base leading-relaxed text-gray-800">
              {book.synopsis || 'Synopsis not available.'}
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}