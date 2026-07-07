import { createClient, SupabaseClient } from '@supabase/supabase-js';

interface SupabaseCredentials {
  url: string;
  anonKey: string;
}

/**
 * 获取 Supabase 凭据
 * - 使用 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
function getSupabaseCredentials(): SupabaseCredentials {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!url || !anonKey) {
    console.warn('Supabase credentials not configured');
  }

  return { url, anonKey };
}

// 客户端单例
let browserClient: SupabaseClient | null = null;

/**
 * 获取 Supabase 客户端
 * - 可在服务端和客户端使用
 * - 自动检测环境并使用正确的配置
 */
function getSupabaseClient(token?: string): SupabaseClient {
  const { url, anonKey } = getSupabaseCredentials();

  // 带认证令牌的客户端（每次创建新实例）
  if (token) {
    return createClient(url, anonKey, {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
      db: { timeout: 60000 },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  // 复用客户端实例（提高性能）
  if (!browserClient) {
    browserClient = createClient(url, anonKey, {
      db: { timeout: 60000 },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return browserClient;
}

export { getSupabaseCredentials, getSupabaseClient };
