'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Eye, EyeOff, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';

type PageState = 'loading' | 'ready' | 'submitting' | 'success' | 'error';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [state, setState] = useState<PageState>('loading');

  useEffect(() => {
    const initSession = async () => {
      try {
        // Supabase 重置密码回调会在 URL hash 中携带 access_token 和 refresh_token
        const hash = window.location.hash;
        if (!hash || hash.length < 2) {
          setError('缺少重置令牌，请重新从邮件中的链接进入');
          setState('error');
          return;
        }

        // 解析 hash 参数: #access_token=xxx&token_type=bearer&expires_in=3600&refresh_token=xxx&type=recovery
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (!accessToken || !refreshToken) {
          setError('重置令牌无效或已过期，请重新申请密码重置');
          setState('error');
          return;
        }

        // 使用令牌设置会话
        const supabase = getSupabaseClient();
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (sessionError) {
          setError(`令牌验证失败: ${sessionError.message}`);
          setState('error');
          return;
        }

        // 清除 URL 中的 hash 参数（安全考虑）
        window.history.replaceState(null, '', window.location.pathname);
        setState('ready');
      } catch (err) {
        console.error('initSession error:', err);
        setError('初始化失败，请重新从邮件中的链接进入');
        setState('error');
      }
    };

    initSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 客户端校验
    if (password.length < 6) {
      setError('密码长度至少为 6 位');
      return;
    }
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    setState('submitting');

    try {
      const supabase = getSupabaseClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(`密码重置失败: ${updateError.message}`);
        setState('ready');
        return;
      }

      // 登出当前会话（可选，但推荐）
      await supabase.auth.signOut();
      setState('success');

      // 3秒后跳转到登录页
      setTimeout(() => {
        router.push('/admin/login');
      }, 3000);
    } catch (err) {
      console.error('updateUser error:', err);
      setError('网络异常，请稍后重试');
      setState('ready');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-amber-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">重置密码</CardTitle>
          <p className="text-sm text-gray-500 mt-2">请输入您的新密码</p>
        </CardHeader>
        <CardContent>
          {/* 加载中 */}
          {state === 'loading' && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-sm text-gray-500">正在验证重置令牌...</p>
            </div>
          )}

          {/* 错误状态（令牌无效等） */}
          {state === 'error' && (
            <div className="text-center py-4">
              <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <p className="text-sm text-red-600 mb-6">{error}</p>
              <Link href="/forgot-password">
                <Button className="bg-green-600 hover:bg-green-700">
                  重新申请重置
                </Button>
              </Link>
              <div className="mt-4">
                <Link
                  href="/admin/login"
                  className="text-sm text-green-600 hover:text-green-700 inline-flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  返回登录
                </Link>
              </div>
            </div>
          )}

          {/* 成功状态 */}
          {state === 'success' && (
            <div className="text-center py-4">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                密码已重置成功
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                正在跳转到登录页面...
              </p>
              <Link href="/admin/login">
                <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                  立即登录
                </Button>
              </Link>
            </div>
          )}

          {/* 表单状态 */}
          {(state === 'ready' || state === 'submitting') && (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    新密码
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="请输入新密码（至少6位）"
                      required
                      autoFocus
                      className="pl-10 pr-10"
                      minLength={6}
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    确认新密码
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirm ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="请再次输入新密码"
                      required
                      className="pl-10 pr-10"
                      minLength={6}
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={state === 'submitting'}
                >
                  {state === 'submitting' ? (
                    <span className="flex items-center">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                      重置中...
                    </span>
                  ) : (
                    '确认重置密码'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/admin/login"
                  className="text-sm text-green-600 hover:text-green-700 inline-flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  返回登录
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
