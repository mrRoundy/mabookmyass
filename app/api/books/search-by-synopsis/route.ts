import { NextResponse } from 'next/server';

// Define a type for the book data, noting the synopsis property
interface BookWithSynopsis {
  id: number;
  author: string;
  title: string;
  synopsis: string;
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

    // Construct the Supabase query for the 'synopsis' column
    const genreFilter = genres.map(genre => `sub-genre.ilike.*${encodeURIComponent(genre)}*`).join(',');
    const query = `select=id,author,title,synopsis,sub-genre&synopsis=not.is.null&or=(${genreFilter})&limit=200`;
    const url = `${SUPABASE_URL}/rest/v1/${tableName}?${query}`;

    let response = await fetch(url, {
      headers: {
        'apikey': SUPABASE_KEY!,
        'Authorization': `Bearer ${SUPABASE_KEY!}`,
      },
    });

    // Fallback logic if the initial detailed query fails
    if (!response.ok) {
        const fallbackQuery = `select=id,author,title,synopsis,sub-genre&synopsis=not.is.null&limit=500`;
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

    const books: BookWithSynopsis[] = await response.json();

    // Server-side filtering and validation for synopsis
    const filteredBooks = books.filter(book => {
        if (!book.title || !book.author || !book.synopsis || !book['sub-genre']) return false;
        if (book.synopsis.trim().length <= 10) return false;

        const bookGenres = book['sub-genre'].toLowerCase();
        return genres.some(genre => bookGenres.includes(genre.toLowerCase()));
    });

    return NextResponse.json(filteredBooks);

  } catch (error) {
    console.error('Books search by synopsis error:', error);
    return NextResponse.json({ error: 'Internal server error during books search by synopsis' }, { status: 500 });
  }
}