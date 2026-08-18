'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Truck,
  Users,
  Newspaper,
  ArrowRight,
} from 'lucide-react';
import { getSupabaseClient } from '@/storage/database/supabase-client';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalUsers: 0,
    totalNews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const supabase = getSupabaseClient();

        const [{ count: orderCount }, { count: pendingCount }, { count: userCount }, { count: newsCount }] =
          await Promise.all([
            supabase.from('orders').select('*', { count: 'exact', head: true }),
            supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'paid'),
            supabase.from('profiles').select('*', { count: 'exact', head: true }),
            supabase.from('news').select('*', { count: 'exact', head: true }),
          ]);

        setStats({
          totalOrders: orderCount || 0,
          pendingOrders: pendingCount || 0,
          totalUsers: userCount || 0,
          totalNews: newsCount || 0,
        });
      } catch (error) {
        console.error('获取统计数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: '订单总数', value: stats.totalOrders, icon: ShoppingBag, link: '/admin/orders', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: '待发货', value: stats.pendingOrders, icon: Truck, link: '/admin/shipments', color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: '用户总数', value: stats.totalUsers, icon: Users, link: '/admin/users', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: '新闻总数', value: stats.totalNews, icon: Newspaper, link: '/admin/news', color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const quickLinks = [
    { title: '订单管理', description: '查看和管理所有订单', icon: ShoppingBag, link: '/admin/orders' },
    { title: '发货管理', description: '处理待发货订单', icon: Truck, link: '/admin/shipments' },
    { title: '用户管理', description: '管理注册用户', icon: Users, link: '/admin/users' },
    { title: '新闻管理', description: '发布和管理新闻', icon: Newspaper, link: '/admin/news' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">仪表盘</h1>
        <p className="text-sm text-gray-500 mt-1">科栎雅后台管理概览</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.link}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{card.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${card.bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <h2 className="text-lg font-bold text-gray-900 mb-4">快速入口</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.title} href={link.link}>
              <div className="bg-white rounded-xl border-2 border-gray-100 p-5 hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{link.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{link.description}</p>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-50 rounded-lg">
                    <Icon className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <div className="flex items-center text-sm text-emerald-600 mt-3 hover:text-emerald-700">
                  进入管理
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
