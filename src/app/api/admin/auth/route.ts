// src/app/api/admin/auth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET: 检查登录状态
export async function GET(request: NextRequest) {
  const session = request.cookies.get('admin_session')?.value;
  if (!session) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }
  try {
    const supabase = getSupabaseClient();
    const { data: user, error } = await supabase
      .from('profiles')
      .select('*, auth_users!inner(email)')
      .eq('user_id', session)
      .single();
    if (error || !user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 401 });
    }
    return NextResponse.json({ 
      user: { 
        id: user.user_id, 
        email: user.auth_users?.email,
        role: user.role,
        username: user.username,
      } 
    });
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// POST: 登录
export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  if (!username || !password) {
    return NextResponse.json({ error: '请提供用户名和密码' }, { status: 400 });
  }
  try {
    const supabase = getSupabaseClient();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });
    if (authError || !authData.user) {
      return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
    }
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', authData.user.id)
      .single();
    if (profileError || !profile || profile.role !== 'admin') {
      await supabase.auth.signOut();
      return NextResponse.json({ error: '您没有管理员权限' }, { status: 403 });
    }
    const response = NextResponse.json({
      success: true,
      admin: {
        id: authData.user.id,
        email: authData.user.email,
        username: authData.user.email?.split('@')[0] || '管理员',
        role: profile.role,
        is_active: true,
        created_at: authData.user.created_at,
      },
    });
    response.cookies.set('admin_session', authData.user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return response;
  } catch {
    return NextResponse.json({ error: '服务器错误，请稍后重试' }, { status: 500 });
  }
}

// DELETE: 登出
export async function DELETE(request: NextRequest) {
  const supabase = getSupabaseClient();
  await supabase.auth.signOut();
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_session');
  return response;
}
