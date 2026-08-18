import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  // 1. 验证管理员身份
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '20');
  const search = searchParams.get('search') || '';
  const start = (page - 1) * pageSize;

  const supabase = getSupabaseClient();

  // 2. 构建查询 - 从 profiles 表联查 auth.users 的 email
  let query = supabase
    .from('profiles')
    .select(`
      user_id,
      username,
      phone,
      address,
      role,
      is_active,
      created_at,
      updated_at,
      auth_users!inner (
        email
      )
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(start, start + pageSize - 1);

  // 如果有搜索关键词
  if (search) {
    query = query.or(
      `username.ilike.%${search}%,phone.ilike.%${search}%,auth_users.email.ilike.%${search}%`
    );
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('查询用户失败:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 3. 格式化数据
  const formattedData = (data || []).map((item: any) => ({
    user_id: item.user_id,
    username: item.username,
    phone: item.phone,
    address: item.address,
    role: item.role,
    is_active: item.is_active,
    created_at: item.created_at,
    updated_at: item.updated_at,
    email: item.auth_users?.email || null,
  }));

  return NextResponse.json({
    data: formattedData,
    total: count || 0,
    page,
    pageSize,
  });
}
