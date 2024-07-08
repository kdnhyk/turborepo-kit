import { getPostViewCount } from '@repo/api/redis'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const post_id = searchParams.get('id')

    if (!post_id) {
      return NextResponse.json(
        { error: 'Missing post id' },
        { status: 400 }, // 400 Bad Request
      )
    }

    const count = await getPostViewCount(post_id)

    return NextResponse.json(count, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      { status: 500 },
    )
  }
}
