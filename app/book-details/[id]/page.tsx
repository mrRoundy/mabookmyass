// app/book-details/[id]/page.tsx

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Book {
  id: number;
  title: string;
  author: string;
  image?: string;
  'sub-genre'?: string;
  synopsis?: string;
  highlights?: string;
}

async function fetchBookDetails(id: string): Promise<Book | null> {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from('filtered_books')
    .select('id, title, author, image, "sub-genre", synopsis, highlights')
    .eq('id', id)
    .single();
  if (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
  return data;
}

const parseHighlights = (highlightsText: string | undefined | null): string[] => {
    if (!highlightsText) return [];
    const regex = /(["“])(.*?)(["”])/g;
    const matches = Array.from(highlightsText.matchAll(regex));
    return matches.length > 0 ? matches.map(match => match[2].trim()) : [highlightsText.trim()];
};

export default async function BookDetailsPage({ params }: { params: { id: string } }) {
  const book = await fetchBookDetails(params.id);

  if (!book) {
    notFound();
  }

  const highlights = parseHighlights(book.highlights);
  const primaryGenre = "Self-improvement";

  return (
    <div className="bg-[#FCF9F6] py-8">
      {/* CHANGED: max-w-[960px] is now max-w-6xl */}
      <div className="book-details-wrapper container max-w-7xl mx-auto">
        <header className="book-hero-section">
          <div className="grid md:grid-cols-[272px_1fr] gap-8 items-center">
            <div className="book-hero-cover">
              <Image
                src={book.image || '/image/placeholder.png'}
                alt={`Cover of ${book.title}`}
                width={272}
                height={408}
                className="w-full h-auto mx-auto md:mx-0 rounded-lg shadow-2xl"
                priority
              />
            </div>
            <div className="book-hero-info text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-2 text-classic-green">
                {book.title}
              </h1>
              <h2 className="text-xl md:text-2xl italic text-gray-600 mb-6">
                by {book.author || 'Unknown Author'}
              </h2>
              {primaryGenre && (
                <p className="genre-display-text">
                  <span className="font-semibold">Genre:</span> {primaryGenre}
                </p>
              )}
            </div>
          </div>
        </header>

        <main>
          <div className="book-content-box">
              <section className="mb-12">
                <h3 className="content-section-title">Synopsis</h3>
                <p className="book-synopsis text-lg leading-relaxed text-gray-700">
                  {book.synopsis || 'Synopsis not available.'}
                </p>
              </section>

              {highlights.length > 0 && (
                <section>
                  <h3 className="content-section-title">Key Highlights</h3>
                  <div className="space-y-8">
                    {highlights.map((highlight, index) => (
                      <div key={index} className="highlight-card">
                        <span className="highlight-quote-icon">“</span>
                        <p className="highlight-text">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
          </div>
        </main>
      </div>
    </div>
  );
}