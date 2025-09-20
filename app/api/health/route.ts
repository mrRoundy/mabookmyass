import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check for the presence of each required environment variable
    const hasGroqKey1 = !!process.env.GROQ_API_KEY_1;
    const hasGroqKey2 = !!process.env.GROQ_API_KEY_2;
    const hasSupabaseUrl = !!process.env.SUPABASE_URL;
    const hasSupabaseKey = !!process.env.SUPABASE_KEY;

    // Return a JSON response with the health status and environment variable checks
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      env: {
        hasGroqKey1,
        hasGroqKey2,
        hasSupabaseUrl,
        hasSupabaseKey,
      },
    });
  } catch (error) {
    // Log any unexpected errors during the health check
    console.error('Health check error:', error);
    
    // Return a generic server error response
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: 'An internal error occurred during the health check.',
      },
      { status: 500 }
    );
  }
}