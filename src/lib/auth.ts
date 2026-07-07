import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// 硬编码管理员账号（兜底测试方案，生产环境应删除）
const FALLBACK_ADMIN = {
  id: 'fallback-admin-001',
  name: '超级管理员',
  email: 'admin',
  role: 'super_admin' as const,
};

const FALLBACK_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: '账号', type: 'text' },
        password: { label: '密码', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.warn('[NextAuth] authorize: 缺少账号或密码');
          return null;
        }

        // ---------- 兜底方案：硬编码管理员 ----------
        // 当 Supabase 不可用时，允许使用硬编码账号登录
        if (
          credentials.email === FALLBACK_CREDENTIALS.username &&
          credentials.password === FALLBACK_CREDENTIALS.password
        ) {
          console.log('[NextAuth] authorize: 使用硬编码管理员登录');
          return FALLBACK_ADMIN;
        }

        // ---------- Supabase 数据库验证 ----------
        try {
          const client = getSupabaseClient();

          // 检查 Supabase 是否已配置
          if (!client) {
            console.warn('[NextAuth] authorize: Supabase 客户端未配置，回退到硬编码');
            return null; // 兜底方案已在上方处理
          }

          const { data, error } = await client
            .from('admins')
            .select('id, username, name, role, is_active, created_at')
            .eq('username', credentials.email)
            .eq('password', credentials.password)
            .eq('is_active', true)
            .single();

          if (error) {
            console.error('[NextAuth] authorize: Supabase 查询错误:', error.message);
            return null;
          }

          if (!data) {
            console.warn('[NextAuth] authorize: 未找到匹配的管理员');
            return null;
          }

          console.log(`[NextAuth] authorize: 管理员 ${data.username} 登录成功`);
          return {
            id: data.id,
            name: data.name || data.username,
            email: data.username,
            role: data.role,
          };
        } catch (err) {
          console.error('[NextAuth] authorize: 异常:', err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role: string }).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role: string }).role = token.role as string;
        (session.user as { id: string }).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'kaleah-admin-secret-key-change-in-production',
  debug: true,
};

export default NextAuth(authOptions);