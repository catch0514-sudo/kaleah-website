'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KeyRound, ArrowLeft, Mail, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = getSupabaseClient();
      const redirectTo = `${window.location.origin}/reset-password`;

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (resetError) {
        setError(resetError.message === 'User not found'
          ? '该邮箱未注册'
          : `发送失败: ${resetError.message}`);
      } else {
        setSent(true);
      }
    } catch (err) {
      setError('网络异常，请稍后重试');
      console.error('resetPasswordForEmail error:', err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-amber-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
            <KeyRound className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">忘记密码</CardTitle>
          <p className="text-sm text-gray-500 mt-2">
            输入您的注册邮箱，我们将发送密码重置链接
          </p>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                重置邮件已发送
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                请查收邮箱 <span className="font-medium text-gray-700">{email}</span>，
                点击邮件中的链接完成密码重置。如未收到，请检查垃圾邮件文件夹。
              </p>
              <Link href="/admin/login">
                <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  返回登录
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    注册邮箱
                  </label>
                  <div className="relative">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="请输入注册邮箱"
                      required
                      autoFocus
                      className="pl-10"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                      发送中...
                    </span>
                  ) : (
                    '发送重置链接'
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
