import { NextResponse } from 'next/server';

// Define a type for the book data we expect from Supabase
interface Book {
  id: number;
  author: string;
  title: string;
  highlights: string;
  'sub-genre': string;
}

export async function POST(request: Request) {
  try {
    const { genres } = await request.json();

    if (!Array.isArray(genres) || genres.length === 0) {
      return NextResponse.json({ error: 'Invalid genres provided' }, { status: 400 });
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_KEY;
    const tableName = 'filtered_books';

    // Construct the Supabase query
    const genreFilter = genres.map(genre => `sub-genre.ilike.*${encodeURIComponent(genre)}*`).join(',');
    const query = `select=id,author,title,highlights,sub-genre&highlights=not.is.null&or=(${genreFilter})&limit=200`;
    const url = `${SUPABASE_URL}/rest/v1/${tableName}?${query}`;

    let response = await fetch(url, {
      headers: {
        'apikey': SUPABASE_KEY!,
        'Authorization': `Bearer ${SUPABASE_KEY!}`,
      },
    });

    // Fallback logic if the initial detailed query fails
    if (!response.ok) {
        const fallbackQuery = `select=id,author,title,highlights,sub-genre&highlights=not.is.null&limit=500`;
        const fallbackUrl = `${SUPABASE_URL}/rest/v1/${tableName}?${fallbackQuery}`;
        response = await fetch(fallbackUrl, {
             headers: {
                'apikey': SUPABASE_KEY!,
                'Authorization': `Bearer ${SUPABASE_KEY!}`,
            },
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
        }
    }

    const books: Book[] = await response.json();

    // Server-side filtering and validation
    const filteredBooks = books.filter(book => {
        if (!book.title || !book.author || !book.highlights || !book['sub-genre']) return false;
        if (book.highlights.trim().length <= 10) return false;
        
        const bookGenres = book['sub-genre'].toLowerCase();
        return genres.some(genre => bookGenres.includes(genre.toLowerCase()));
    });

    return NextResponse.json(filteredBooks);

  } catch (error) {
    console.error('Books search error:', error);
    return NextResponse.json({ error: 'Internal server error during books search' }, { status: 500 });
  }
}