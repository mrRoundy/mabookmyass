// app/api/analyze/route.ts

import { NextResponse } from 'next/server';

// --- NEW: API Key Rotation Logic ---
// This brings the key rotation from your old API into the new one.
const groqApiKeys = [process.env.GROQ_API_KEY_1, process.env.GROQ_API_KEY_2].filter(Boolean);
let apiKeyIndex = 0;

function getNextApiKey() {
    if (groqApiKeys.length === 0) {
        throw new Error("No GROQ API keys found in environment variables.");
    }
    const key = groqApiKeys[apiKeyIndex];
    apiKeyIndex = (apiKeyIndex + 1) % groqApiKeys.length;
    return key;
}
// --- END NEW ---

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Invalid prompt provided' }, { status: 400 });
    }

    const selectedApiKey = getNextApiKey(); // Get the next key for this request

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${selectedApiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // --- UPDATED MODEL AND PARAMETERS ---
            model: 'meta-llama/llama-4-scout-17b-16e-instruct', // Correct model name
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.3,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            response_format: { type: "json_object" } // Crucial for getting a JSON response
            // --- END OF UPDATES ---
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Groq API error:', response.status, errorText);
        return NextResponse.json({ error: 'AI analysis failed' }, { status: 500 });
    }

    const data = await response.json();
    
    // Check if the response structure is as expected
    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
        console.error('Unexpected Groq API response structure:', data);
        return NextResponse.json({ error: 'AI returned an invalid response format' }, { status: 500 });
    }
    
    const content = data.choices[0].message.content.trim();

    // It's safer to parse inside a try-catch block
    try {
        const parsedContent = JSON.parse(content);
        return NextResponse.json(parsedContent);
    } catch (parseError) {
        console.error('Failed to parse JSON from AI response:', content);
        return NextResponse.json({ error: 'AI returned malformed JSON' }, { status: 500 });
    }

  } catch (error) {
    console.error('AI analyze error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}