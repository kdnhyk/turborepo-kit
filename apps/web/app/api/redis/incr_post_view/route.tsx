import { getUserId } from '@/utils/supabase/dynamic-prefetch'
import { incrPostViewCount } from '@repo/api/redis'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const user_id = await getUserId()
    if (!user_id) {
      return NextResponse.json({ status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const post_id = searchParams.get('id')
    console.log('post_id', post_id)

    if (!post_id) {
      return NextResponse.json(
        { status: 400 }, // 400 Bad Request
      )
    }

    await incrPostViewCount(post_id, user_id)

    return NextResponse.json({ status: 200 })
  } catch (error) {
    return NextResponse.json({ status: 500 })
  }
}
