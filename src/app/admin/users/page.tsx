'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  User,
  Mail,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
  Edit,
  Save,
  X,
} from 'lucide-react';

interface Profile {
  user_id: string;
  username: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // 从 auth.users 联查的字段
  email?: string;
  auth_created_at?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [updating, setUpdating] = useState(false);

  // 获取用户列表
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
      });
      if (searchKeyword) {
        params.append('search', searchKeyword);
      }

      const res = await fetch(`/api/admin/users?${params.toString()}`);
      if (!res.ok) throw new Error('获取用户列表失败');
      const data = await res.json();
      setUsers(data.data || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('获取用户列表失败:', error);
      alert('获取用户列表失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  // 更新用户
  const updateUser = async (userId: string, updates: Partial<Profile>) => {
    if (updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('更新用户失败');
      await res.json();
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error('更新用户失败:', error);
      alert('更新用户失败，请重试');
    } finally {
      setUpdating(false);
    }
  };

  // 切换用户状态（启用/禁用）
  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    if (!confirm(`确定要${currentStatus ? '禁用' : '启用'}该用户吗？`)) return;
    await updateUser(userId, { is_active: !currentStatus });
  };

  // 切换用户角色
  const toggleUserRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!confirm(`确定要将该用户角色改为“${newRole === 'admin' ? '管理员' : '普通用户'}”吗？`)) return;
    await updateUser(userId, { role: newRole as 'user' | 'admin' });
  };

  const getRoleBadge = (role: string) => {
    if (role === 'admin') {
      return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"><Shield className="h-3.5 w-3.5" />管理员</span>;
    }
    return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"><User className="h-3.5 w-3.5" />普通用户</span>;
  };

  const getStatusBadge = (isActive: boolean) => {
    if (isActive) {
      return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"><CheckCircle className="h-3.5 w-3.5" />已启用</span>;
    }
    return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700"><XCircle className="h-3.5 w-3.5" />已禁用</span>;
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">用户管理</h1>
          <p className="text-sm text-gray-500 mt-1">管理所有注册用户，查看用户信息，管理角色和状态</p>
        </div>
        <button
          onClick={fetchUsers}
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
            placeholder="搜索用户名、邮箱、手机号..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchUsers()}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          onClick={fetchUsers}
          className="px-6 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
        >
          搜索
        </button>
      </div>

      {/* 统计信息 */}
      <div className="text-sm text-gray-500 mb-4">共 {total} 个用户</div>

      {/* 用户列表 */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>暂无用户</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">用户</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">邮箱</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">角色</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">状态</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">注册时间</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-600">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user.user_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-sm">
                          {(user.username || user.email || 'U').charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-700">{user.username || '未设置'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{user.email || '-'}</td>
                    <td className="px-4 py-3">{getRoleBadge(user.role)}</td>
                    <td className="px-4 py-3">{getStatusBadge(user.is_active)}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {user.created_at ? new Date(user.created_at).toLocaleString('zh-CN') : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="编辑用户"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => toggleUserRole(user.user_id, user.role)}
                          className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title={user.role === 'admin' ? '降级为普通用户' : '升级为管理员'}
                        >
                          <Shield className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => toggleUserStatus(user.user_id, user.is_active)}
                          className={`p-1.5 rounded-lg transition-colors ${user.is_active ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
                          title={user.is_active ? '禁用用户' : '启用用户'}
                        >
                          {user.is_active ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
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

      {/* 编辑用户弹窗 */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">编辑用户</h3>
              <button
                onClick={() => setEditingUser(null)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                <input
                  type="text"
                  value={editingUser.username || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="请输入用户名"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">手机号</label>
                <input
                  type="text"
                  value={editingUser.phone || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="请输入手机号"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">地址</label>
                <input
                  type="text"
                  value={editingUser.address || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="请输入地址"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">角色</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as 'user' | 'admin' })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="user">普通用户</option>
                  <option value="admin">管理员</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
                <select
                  value={editingUser.is_active ? 'active' : 'inactive'}
                  onChange={(e) => setEditingUser({ ...editingUser, is_active: e.target.value === 'active' })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="active">已启用</option>
                  <option value="inactive">已禁用</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => updateUser(editingUser.user_id, {
                    username: editingUser.username,
                    phone: editingUser.phone,
                    address: editingUser.address,
                    role: editingUser.role,
                    is_active: editingUser.is_active,
                  })}
                  disabled={updating}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {updating ? '保存中...' : '保存'}
                </button>
                <button
                  onClick={() => setEditingUser(null)}
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
