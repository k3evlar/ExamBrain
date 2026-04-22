import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Set standard file size limit (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF files are allowed.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size too large. Maximum limit is 10MB.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text using pdf-parse
    const data = await pdf(buffer);
    const extractedText = data.text;

    if (!extractedText.trim()) {
      return NextResponse.json(
        { error: 'No text could be extracted from this PDF.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured.' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Extract all questions from this exam paper.
Return JSON format:
[
  {
    "question_number": "",
    "question_text": "",
    "marks": ""
  }
]

Text:
${extractedText}`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    // Sanitize response to extract JSON cleanly
    responseText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();

    let structuredOutput;
    try {
      structuredOutput = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse model output as JSON:', responseText);
      return NextResponse.json(
        { error: 'Model failed to return valid JSON format', rawOutput: responseText },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: structuredOutput,
      pages: data.numpages
    });


  } catch (error: any) {
    console.error('Error parsing PDF:', error);
    return NextResponse.json(
      { error: 'Failed to extract text from PDF', details: error.message },
      { status: 500 }
    );
  }
}
