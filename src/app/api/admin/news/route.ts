import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// 获取新闻列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    const client = getSupabaseClient();

    let query = client
      .from('news')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('获取新闻列表错误:', error);
      return NextResponse.json({ error: '获取失败' }, { status: 500 });
    }

    return NextResponse.json({
      news: data,
      total: count,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error('获取新闻列表异常:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 创建新闻
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, date, author, excerpt, image, content, tag_color } = body;

    if (!title || !category || !excerpt || !image) {
      return NextResponse.json({ error: '标题、分类、摘要和图片不能为空' }, { status: 400 });
    }

    const client = getSupabaseClient();

    const { data, error } = await client
      .from('news')
      .insert({
        title,
        category,
        date: date || new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
        author: author || '科栎雅品牌部',
        excerpt,
        image,
        content: content || '',
        tag_color: tag_color || 'bg-green-600',
      })
      .select()
      .single();

    if (error) {
      console.error('创建新闻错误:', error);
      return NextResponse.json({ error: '创建失败' }, { status: 500 });
    }

    return NextResponse.json({ success: true, news: data });
  } catch (error) {
    console.error('创建新闻异常:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 更新新闻
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: '新闻ID不能为空' }, { status: 400 });
    }

    const client = getSupabaseClient();

    // 过滤可更新的字段
    const allowedFields = ['title', 'category', 'date', 'author', 'excerpt', 'image', 'content', 'tag_color', 'is_published'];
    const filteredUpdates: Record<string, unknown> = {};
    for (const key of allowedFields) {
      if (updates[key] !== undefined) {
        filteredUpdates[key] = updates[key];
      }
    }
    filteredUpdates.updated_at = new Date().toISOString();

    const { error } = await client
      .from('news')
      .update(filteredUpdates)
      .eq('id', id);

    if (error) {
      console.error('更新新闻错误:', error);
      return NextResponse.json({ error: '更新失败' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('更新新闻异常:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 删除新闻
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: '新闻ID不能为空' }, { status: 400 });
    }

    const client = getSupabaseClient();

    const { error } = await client
      .from('news')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('删除新闻错误:', error);
      return NextResponse.json({ error: '删除失败' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除新闻异常:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
