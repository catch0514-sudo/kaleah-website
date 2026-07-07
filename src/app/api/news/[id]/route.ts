import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// 获取单篇新闻详情（公开API）
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = getSupabaseClient();

    const { data, error } = await client
      .from('news')
      .select('*')
      .eq('id', id)
      .eq('is_published', true)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: '新闻不存在' }, { status: 404 });
    }

    return NextResponse.json({ news: data });
  } catch (error) {
    console.error('获取新闻详情异常:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
