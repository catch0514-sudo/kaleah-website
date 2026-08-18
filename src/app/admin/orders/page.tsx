'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useSession } from 'next-auth/react';

type OrderStatus = 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';

interface Order {
  id: number;
  order_no: string;
  user_name: string;
  user_phone: string;
  user_address: string;
  product_name: string;
  product_sku: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  status: OrderStatus;
  tracking_no: string | null;
  remark: string | null;
  created_at: string;
  updated_at: string;
}

const statusOptions: { value: OrderStatus | 'all'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'pending', label: '待付款' },
  { value: 'paid', label: '已付款' },
  { value: 'shipped', label: '已发货' },
  { value: 'completed', label: '已完成' },
  { value: 'cancelled', label: '已取消' },
];

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function OrdersPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [updating, setUpdating] = useState<number | null>(null);
  const [trackingModal, setTrackingModal] = useState<{ orderId: number; trackingNo: string } | null>(null);

  const pageSize = 20;

  // 检查管理员权限
  useEffect(() => {
    if (sessionStatus === 'loading') return;
    if (!session || session.user?.role !== 'admin') {
      router.push('/admin/login');
    }
  }, [session, sessionStatus, router]);

  // 加载订单数据
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });
      if (selectedStatus !== 'all') {
        params.append('status', selectedStatus);
      }

      const res = await fetch(`/api/admin/orders?${params.toString()}`);
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/admin/login');
          return;
        }
        throw new Error('获取订单失败');
      }
      const data = await res.json();
      setOrders(data.data || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('加载订单失败:', error);
      alert('加载订单失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      fetchOrders();
    }
  }, [page, selectedStatus, session]);

  // 更新订单状态
  const updateOrderStatus = async (orderId: number, newStatus: OrderStatus) => {
    if (!confirm(`确定要将订单状态更新为“${statusOptions.find(s => s.value === newStatus)?.label}”吗？`)) {
      return;
    }

    setUpdating(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error('更新状态失败');
      }

      // 刷新列表
      await fetchOrders();
      alert('状态更新成功');
    } catch (error) {
      console.error('更新状态失败:', error);
      alert('更新状态失败，请重试');
    } finally {
      setUpdating(null);
    }
  };

  // 确认发货
  const confirmShip = async (orderId: number, trackingNo: string) => {
    if (!trackingNo.trim()) {
      alert('请输入物流单号');
      return;
    }

    setUpdating(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: 'shipped', 
          tracking_no: trackingNo.trim(),
          updated_at: new Date().toISOString()
        }),
      });

      if (!res.ok) {
        throw new Error('发货确认失败');
      }

      setTrackingModal(null);
      await fetchOrders();
      alert('发货确认成功');
    } catch (error) {
      console.error('发货确认失败:', error);
      alert('发货确认失败，请重试');
    } finally {
      setUpdating(null);
    }
  };

  // 格式化日期
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (sessionStatus === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">订单管理</h1>
        <div className="flex items-center gap-4">
          <label className="text-sm text-gray-600">状态筛选：</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as OrderStatus | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 订单列表 */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">收货信息</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">商品</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金额</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">创建时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  暂无订单数据
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                    {order.order_no}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div>{order.user_name}</div>
                    <div className="text-xs text-gray-400">{order.user_phone}</div>
                    <div className="text-xs text-gray-400 truncate max-w-xs">{order.user_address}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div>{order.product_name}</div>
                    <div className="text-xs text-gray-400">x{order.quantity}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    ¥{order.total_amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[order.status]}`}>
                      {statusOptions.find(s => s.value === order.status)?.label || order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex flex-wrap gap-1">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'paid')}
                          disabled={updating === order.id}
                          className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                          确认付款
                        </button>
                      )}
                      {order.status === 'paid' && (
                        <button
                          onClick={() => setTrackingModal({ orderId: order.id, trackingNo: order.tracking_no || '' })}
                          disabled={updating === order.id}
                          className="px-2 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
                        >
                          发货
                        </button>
                      )}
                      {order.status === 'shipped' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          disabled={updating === order.id}
                          className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                        >
                          完成
                        </button>
                      )}
                      {(order.status === 'pending' || order.status === 'paid') && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          disabled={updating === order.id}
                          className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                        >
                          取消
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      {total > pageSize && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            共 {total} 条记录，第 {page} / {Math.ceil(total / pageSize)} 页
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 hover:bg-gray-50"
            >
              上一页
            </button>
            <button
              onClick={() => setPage(Math.min(Math.ceil(total / pageSize), page + 1))}
              disabled={page >= Math.ceil(total / pageSize)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 hover:bg-gray-50"
            >
              下一页
            </button>
          </div>
        </div>
      )}

      {/* 发货弹窗 */}
      {trackingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">确认发货</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">物流单号</label>
              <input
                type="text"
                value={trackingModal.trackingNo}
                onChange={(e) => setTrackingModal({ ...trackingModal, trackingNo: e.target.value })}
                placeholder="请输入物流单号"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setTrackingModal(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={() => confirmShip(trackingModal.orderId, trackingModal.trackingNo)}
                disabled={updating === trackingModal.orderId}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                确认发货
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
