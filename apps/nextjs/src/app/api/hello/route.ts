import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const pythonApiUrl =
    process.env.PYTHON_API_URL || 'http://localhost:8000';

  try {
    const res = await fetch(`${pythonApiUrl}/hello`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `FastAPI returned ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      {
        error: 'Failed to reach FastAPI service',
        detail: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 502 }
    );
  }
}
