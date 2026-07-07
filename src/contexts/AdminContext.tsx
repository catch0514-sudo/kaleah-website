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

const ADMIN_STORAGE_KEY = 'kaleah_admin';

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedAdmin = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (savedAdmin) {
      try {
        const adminData = JSON.parse(savedAdmin);
        setAdmin(adminData);
      } catch {
        localStorage.removeItem(ADMIN_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return { success: false, error: data.error || '登录失败' };
      }

      const adminData: Admin = data.admin;
      setAdmin(adminData);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminData));
      return { success: true };
    } catch (error) {
      console.error('管理员登录异常:', error);
      return { success: false, error: '网络错误，请检查网络连接' };
    }
  }, []);

  const logout = useCallback(() => {
    setAdmin(null);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
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
