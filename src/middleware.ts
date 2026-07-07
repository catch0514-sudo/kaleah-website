import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 已登录访问登录页 → 重定向到新闻管理
  // 通过检查 next-auth.session-token cookie 判断登录状态
  const hasSession = req.cookies.has('next-auth.session-token') || 
                     req.cookies.has('__Secure-next-auth.session-token');

  if (pathname === '/admin/login' && hasSession) {
    return NextResponse.redirect(new URL('/admin/news', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/login'],
};
