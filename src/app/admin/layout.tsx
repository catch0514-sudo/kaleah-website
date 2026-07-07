'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { SessionProvider, signOut } from 'next-auth/react';
import { AdminProvider, useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { 
  Newspaper,
  LogOut,
  Shield,
  User
} from 'lucide-react';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { admin, isLoading, isLoggedIn, logout } = useAdmin();

  const isLoginPage = pathname === '/admin/login' || pathname === '/admin';

  useEffect(() => {
    if (!isLoading && !isLoggedIn && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [isLoading, isLoggedIn, isLoginPage, router]);

  // 登录页直接渲染
  if (isLoginPage) {
    return <>{children}</>;
  }

  // AdminContext 初始化中
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  // 未登录
  if (!isLoggedIn || !admin) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
    } catch {
      // NextAuth 登出失败不影响整体流程
    }
    logout();
    router.push('/admin/login');
  };

  const menuItems = [
    { name: '新闻管理', href: '/admin/news', icon: Newspaper },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-xl font-bold">科栎雅</div>
            <Shield className="h-5 w-5 text-emerald-500" />
          </Link>
          <p className="text-xs text-gray-400 mt-1">管理后台</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-emerald-700 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-400">
            <User className="h-4 w-4" />
            <span>{admin.name || admin.username}</span>
            <span className="px-2 py-0.5 bg-emerald-700 text-white text-xs rounded-full">
              {admin.role === 'super_admin' ? '超管' : '管理员'}
            </span>
          </div>
          <Button
            variant="ghost"
            className="w-full mt-2 text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            退出登录
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </AdminProvider>
    </SessionProvider>
  );
}
