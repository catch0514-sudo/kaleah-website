'use client';

import { useState, useEffect } from 'react';
import {
  Truck,
  Package,
  Search,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Send,
} from 'lucide-react';

interface Order {
  id: number;
  order_no: string;
  user_name: string;
  user_phone: string;
  user_address: string;
  product_name: string;
  quantity: number;
  total_amount: number;
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
  tracking_no?: string;
  created_at: string;
  remark?: string;
}

export default function ShipmentsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [trackingNo, setTrackingNo] = useState('');

  // 获取待发货订单列表（status = paid）
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
        status: 'paid', // 只获取已付款、待发货的订单
      });
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
  }, [page]);

  // 确认发货
  const handleShip = async (orderId: number) => {
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
      // 刷新列表
      fetchOrders();
      // 关闭弹窗
      setShowDetailModal(false);
      setTrackingNo('');
    } catch (error) {
      console.error('发货失败:', error);
      alert('发货失败，请重试');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock className="h-3.5 w-3.5" />待付款</span>;
      case 'paid':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><Package className="h-3.5 w-3.5" />待发货</span>;
      case 'shipped':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"><Truck className="h-3.5 w-3.5" />已发货</span>;
      case 'completed':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="h-3.5 w-3.5" />已完成</span>;
      case 'cancelled':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"><XCircle className="h-3.5 w-3.5" />已取消</span>;
      default:
        return <span className="text-gray-500">未知</span>;
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">发货管理</h1>
          <p className="text-sm text-gray-500 mt-1">管理所有已付款订单，确认发货并填写物流信息</p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4" />
          刷新
        </button>
      </div>

      {/* 搜索 */}
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
        <button
          onClick={fetchOrders}
          className="px-6 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
        >
          搜索
        </button>
      </div>

      {/* 统计信息 */}
      <div className="text-sm text-gray-500 mb-4">
        共 {total} 个待发货订单
      </div>

      {/* 订单列表 */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>暂无待发货订单</p>
          <p className="text-sm mt-1">所有已付款订单都会显示在这里</p>
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
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setTrackingNo('');
                            setShowDetailModal(true);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1 text-xs text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          发货
                        </button>
                      </div>
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

      {/* 发货弹窗 */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">确认发货</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* 订单信息 */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">订单号</span>
                  <span className="font-mono text-sm">{selectedOrder.order_no}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">收货人</span>
                  <span className="font-medium">{selectedOrder.user_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">联系电话</span>
                  <span>{selectedOrder.user_phone}</span>
                </div>
                <div>
                  <span className="text-gray-500">收货地址</span>
                  <p className="text-sm mt-1">{selectedOrder.user_address}</p>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <span className="text-gray-500">商品</span>
                  <span>{selectedOrder.product_name} × {selectedOrder.quantity}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-500">总金额</span>
                  <span className="text-emerald-600">¥{selectedOrder.total_amount.toFixed(2)}</span>
                </div>
              </div>

              {/* 物流单号输入 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">物流单号 *</label>
                <input
                  type="text"
                  value={trackingNo}
                  onChange={(e) => setTrackingNo(e.target.value)}
                  placeholder="请输入物流单号"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => handleShip(selectedOrder.id)}
                  disabled={updating || !trackingNo.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                  {updating ? '发货中...' : '确认发货'}
                </button>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
