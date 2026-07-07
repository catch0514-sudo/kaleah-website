import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// 管理员登录
export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: '用户名和密码不能为空' }, { status: 400 });
    }

    const client = getSupabaseClient();

    const { data, error } = await client
      .from('admins')
      .select('id, username, name, role, is_active, created_at')
      .eq('username', username)
      .eq('password', password)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      admin: data,
    });
  } catch (error) {
    console.error('管理员登录异常:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 初始化超级管理员（仅当没有管理员时）
export async function GET() {
  try {
    const client = getSupabaseClient();

    // 检查是否已有管理员
    const { data: existingAdmins } = await client
      .from('admins')
      .select('id')
      .limit(1);

    if (existingAdmins && existingAdmins.length > 0) {
      return NextResponse.json({ message: '管理员已存在' });
    }

    // 创建默认超级管理员
    const { data, error } = await client
      .from('admins')
      .insert({
        username: 'admin',
        password: 'admin123',
        name: '超级管理员',
        role: 'super_admin',
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error('创建默认管理员错误:', error);
      return NextResponse.json({ error: '初始化失败' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: '默认管理员已创建',
      admin: { username: 'admin', password: 'admin123' },
    });
  } catch (error) {
    console.error('初始化管理员异常:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
