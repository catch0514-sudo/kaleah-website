'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface Admin {
  id: string;
  username: string;
  name: string | null;
  role: 'super_admin' | 'admin';
  is_active: boolean;
  created_at: string;
}

interface AdminContextType {
  admin: Admin | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 检查登录状态
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/auth', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setAdmin({
              id: data.user.id,
              username: data.user.username || data.user.email?.split('@')[0] || '管理员',
              name: data.user.username || null,
              role: data.user.role || 'admin',
              is_active: true,
              created_at: new Date().toISOString(),
            });
          }
        }
      } catch (error) {
        console.error('检查登录状态失败:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return { success: false, error: data.error || '登录失败' };
      }

      setAdmin(data.admin);
      return { success: true };
    } catch (error) {
      console.error('管理员登录异常:', error);
      return { success: false, error: '网络错误，请检查网络连接' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch (error) {
      console.error('登出失败:', error);
    }
    setAdmin(null);
  }, []);

  return (
    <AdminContext.Provider
      value={{
        admin,
        isLoading,
        isLoggedIn: !!admin,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
