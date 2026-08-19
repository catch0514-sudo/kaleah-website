'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSupabaseClient } from '@/storage/database/supabase-client';
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Package,
  RefreshCw,
} from 'lucide-react';

// 订单状态配置
const STATUS_CONFIG = {
  pending: { label: '待付款', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  paid: { label: '已付款', color: 'bg-blue-100 text-blue-800', icon: Package },
  shipped: { label: '已发货', color: 'bg-purple-100 text-purple-800', icon: Truck },
  completed: { label: '已完成', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { label: '已取消', color: 'bg-gray-100 text-gray-800', icon: XCircle },
};

interface Order {
  id: number;
  order_no: string;
  user_name: string;
  user_phone: string;
  user_address: string;
  product_name: string;
  quantity: number;
  total_amount: number;
  status: keyof typeof STATUS_CONFIG;
  created_at: string;
  remark?: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  const router = useRouter();

  // 获取订单列表
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
      });
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      if (searchKeyword) {
        params.append('search', searchKeyword);
      }

      const res = await fetch(`/api/admin/orders?${params.toString()}`);
      if (!res.ok) throw new Error('获取订单失败');
      const data = await res.json();
      setOrders(data.data || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('获取订单失败:', error);
      alert('获取订单列表失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter]);

  // 更新订单状态
  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    if (updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('更新状态失败');
      await res.json();
      fetchOrders();
      setShowDetailModal(false);
    } catch (error) {
      console.error('更新状态失败:', error);
      alert('更新状态失败，请重试');
    } finally {
      setUpdating(false);
    }
  };

  // 确认发货
  const handleShip = async (orderId: number, trackingNo: string) => {
    if (!trackingNo.trim()) {
      alert('请输入物流单号');
      return;
    }
    if (updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/ship`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tracking_no: trackingNo }),
      });
      if (!res.ok) throw new Error('发货失败');
      await res.json();
      fetchOrders();
      setShowDetailModal(false);
    } catch (error) {
      console.error('发货失败:', error);
      alert('发货失败，请重试');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: keyof typeof STATUS_CONFIG) => {
    const config = STATUS_CONFIG[status];
    if (!config) return <span className="text-gray-500">未知</span>;
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="h-3.5 w-3.5" />
        {config.label}
      </span>
    );
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">订单管理</h1>
          <p className="text-sm text-gray-500 mt-1">管理所有订单，查看订单详情，更新订单状态</p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4" />
          刷新
        </button>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="搜索订单号、收货人、商品名..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchOrders()}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">全部状态</option>
            <option value="pending">待付款</option>
            <option value="paid">已付款</option>
            <option value="shipped">已发货</option>
            <option value="completed">已完成</option>
            <option value="cancelled">已取消</option>
          </select>
        </div>

        <button
          onClick={fetchOrders}
          className="px-6 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
        >
          搜索
        </button>
      </div>

      {/* 统计信息 */}
      <div className="text-sm text-gray-500 mb-4">共 {total} 个订单</div>

      {/* 订单列表 */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>暂无订单</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">订单号</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">收货人</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">商品</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">数量</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">金额</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">状态</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">下单时间</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-600">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-700">{order.order_no}</td>
                    <td className="px-4 py-3 font-medium text-gray-700">{order.user_name}</td>
                    <td className="px-4 py-3 text-gray-600 max-w-[150px] truncate">{order.product_name}</td>
                    <td className="px-4 py-3 text-gray-600">{order.quantity}</td>
                    <td className="px-4 py-3 font-semibold text-emerald-600">¥{order.total_amount.toFixed(2)}</td>
                    <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(order.created_at).toLocaleString('zh-CN')}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowDetailModal(true);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 text-xs text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        查看
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-500">第 {page} / {totalPages} 页</div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="p-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="p-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 订单详情弹窗 */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">订单详情</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400">订单号</p>
                  <p className="font-mono text-sm">{selectedOrder.order_no}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">状态</p>
                  <p>{getStatusBadge(selectedOrder.status)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">收货人</p>
                  <p className="font-medium">{selectedOrder.user_name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">联系电话</p>
                  <p>{selectedOrder.user_phone}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400">收货地址</p>
                <p className="text-sm">{selectedOrder.user_address}</p>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-400 mb-2">商品信息</p>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <div>
                    <p className="font-medium">{selectedOrder.product_name}</p>
                    <p className="text-sm text-gray-500">数量：{selectedOrder.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">单价</p>
                    <p>¥{(selectedOrder.total_amount / selectedOrder.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-500">总金额</span>
                  <span className="text-xl font-bold text-emerald-600">¥{selectedOrder.total_amount.toFixed(2)}</span>
                </div>
              </div>

              {selectedOrder.remark && (
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-400">备注</p>
                  <p className="text-sm text-gray-600">{selectedOrder.remark}</p>
                </div>
              )}

              <div className="border-t border-gray-100 pt-4 flex flex-wrap gap-2">
                {selectedOrder.status === 'pending' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'paid')}
                    disabled={updating}
                    className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    标记为已付款
                  </button>
                )}
                {selectedOrder.status === 'paid' && (
                  <button
                    onClick={() => {
                      const trackingNo = prompt('请输入物流单号：');
                      if (trackingNo !== null) {
                        handleShip(selectedOrder.id, trackingNo);
                      }
                    }}
                    disabled={updating}
                    className="px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                  >
                    确认发货
                  </button>
                )}
                {selectedOrder.status === 'shipped' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}
                    disabled={updating}
                    className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    标记为已完成
                  </button>
                )}
                {(selectedOrder.status === 'pending' || selectedOrder.status === 'paid') && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                    disabled={updating}
                    className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    取消订单
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
