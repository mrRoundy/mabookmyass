import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Invalid prompt provided' }, { status: 400 });
    }

    // Your logic to call the Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY_1}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'meta-llama/Llama-3-8b-chat-hf',
            messages: [{ role: 'user', content: prompt }],
            // ... other options
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Groq API error:', response.status, errorText);
        return NextResponse.json({ error: 'AI analysis failed' }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices[0].message.content.trim();
    const parsedContent = JSON.parse(content);

    return NextResponse.json(parsedContent);
  } catch (error) {
    console.error('AI analyze error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}