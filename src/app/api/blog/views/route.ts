import { NextRequest, NextResponse } from 'next/server'
import { incrementPostViews } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json()

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      )
    }

    await incrementPostViews(slug)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error incrementing views:', error)
    return NextResponse.json(
      { error: 'Failed to increment views' },
      { status: 500 }
    )
  }
}
