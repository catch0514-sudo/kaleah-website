import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // 1. 验证管理员身份
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { username, phone, address, role, is_active } = await request.json();
  const supabase = getSupabaseClient();

  // 2. 更新 profiles 表
  const updateData: any = { updated_at: new Date().toISOString() };
  if (username !== undefined) updateData.username = username;
  if (phone !== undefined) updateData.phone = phone;
  if (address !== undefined) updateData.address = address;
  if (role !== undefined) updateData.role = role;
  if (is_active !== undefined) updateData.is_active = is_active;

  const { data, error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('user_id', params.id)
    .select()
    .single();

  if (error) {
    console.error('更新用户失败:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
