import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// 获取已发布的新闻列表（公开API）
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');

    const client = getSupabaseClient();

    const { data, error } = await client
      .from('news')
      .select('id, title, category, date, excerpt, image, tag_color')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('获取新闻列表错误:', error);
      return NextResponse.json({ error: '获取失败' }, { status: 500 });
    }

    return NextResponse.json({ news: data });
  } catch (error) {
    console.error('获取新闻列表异常:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
