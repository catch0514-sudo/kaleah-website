'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Newspaper,
  Eye,
  EyeOff,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface News {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  content: string;
  tag_color: string;
  is_published: boolean;
  created_at: string;
}

const categories = [
  { value: '产品获奖', label: '产品获奖', color: 'bg-green-600' },
  { value: '行业活动', label: '行业活动', color: 'bg-blue-600' },
  { value: '基地实况', label: '基地实况', color: 'bg-orange-600' },
  { value: '健康食谱', label: '健康食谱', color: 'bg-purple-600' },
  { value: '品牌故事', label: '品牌故事', color: 'bg-amber-600' },
];

export default function NewsManagement() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');
  
  // Dialog states
  const [showDialog, setShowDialog] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '产品获奖',
    date: '',
    author: '科栎雅品牌部',
    excerpt: '',
    image: '',
    content: '',
    tag_color: 'bg-green-600',
  });

  useEffect(() => {
    fetchNews();
  }, [search, filterCategory]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (filterCategory && filterCategory !== 'all') params.append('category', filterCategory);
      
      const res = await fetch(`/api/admin/news?${params.toString()}`);
      const data = await res.json();
      setNews(data.news || []);
    } catch (error) {
      console.error('获取新闻列表错误:', error);
    }
    setLoading(false);
  };

  const openCreateDialog = () => {
    setEditingNews(null);
    setFormData({
      title: '',
      category: '产品获奖',
      date: new Date().toISOString().slice(0, 16),
      author: '科栎雅品牌部',
      excerpt: '',
      image: '',
      content: '',
      tag_color: 'bg-green-600',
    });
    setShowDialog(true);
  };

  const openEditDialog = (item: News) => {
    setEditingNews(item);
    // 兼容不同的日期格式，转为 datetime-local 可识别的格式
    let dateValue = item.date;
    if (dateValue && !dateValue.includes('T')) {
      // 如果是中文日期格式（如 "2026年3月20日"），转为 ISO
      try {
        const parsed = new Date(dateValue.replace('年', '/').replace('月', '/').replace('日', ''));
        if (!isNaN(parsed.getTime())) {
          dateValue = parsed.toISOString().slice(0, 16);
        }
      } catch {
        dateValue = new Date().toISOString().slice(0, 16);
      }
    }
    setFormData({
      title: item.title,
      category: item.category,
      date: dateValue,
      author: item.author,
      excerpt: item.excerpt,
      image: item.image,
      content: item.content || '',
      tag_color: item.tag_color,
    });
    setShowDialog(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.excerpt || !formData.image) {
      alert('请填写标题、摘要和图片');
      return;
    }

    try {
      if (editingNews) {
        // 更新
        const res = await fetch('/api/admin/news', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingNews.id, ...formData }),
        });
        const data = await res.json();
        if (data.success) {
          setShowDialog(false);
          fetchNews();
        } else {
          alert('更新失败');
        }
      } else {
        // 创建
        const res = await fetch('/api/admin/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
          setShowDialog(false);
          fetchNews();
        } else {
          alert('创建失败');
        }
      }
    } catch (error) {
      console.error('保存新闻错误:', error);
      alert('保存失败');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/news?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setDeleteConfirm(null);
        fetchNews();
      } else {
        alert('删除失败');
      }
    } catch (error) {
      console.error('删除新闻错误:', error);
      alert('删除失败');
    }
  };

  const togglePublish = async (item: News) => {
    try {
      const res = await fetch('/api/admin/news', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: item.id,
          is_published: !item.is_published,
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchNews();
      }
    } catch (error) {
      console.error('更新状态错误:', error);
    }
  };

  const handleCategoryChange = (value: string) => {
    const category = categories.find(c => c.value === value);
    setFormData({
      ...formData,
      category: value,
      tag_color: category?.color || 'bg-green-600',
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">新闻管理</h1>
          <p className="text-gray-500">管理品牌动态内容</p>
        </div>
        <Button onClick={openCreateDialog} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          发布新闻
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索新闻标题或摘要..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="全部分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分类</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-gray-400" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-36">
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date_desc">
                    <span className="flex items-center gap-2"><ArrowDown className="h-3 w-3" />最新优先</span>
                  </SelectItem>
                  <SelectItem value="date_asc">
                    <span className="flex items-center gap-2"><ArrowUp className="h-3 w-3" />最旧优先</span>
                  </SelectItem>
                  <SelectItem value="title_asc">标题 A-Z</SelectItem>
                  <SelectItem value="title_desc">标题 Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* News List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          </div>
        ) : news.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              <Newspaper className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>暂无新闻数据</p>
            </CardContent>
          </Card>
        ) : (
          [...news].sort((a, b) => {
            switch (sortBy) {
              case 'date_desc':
                // 按时间降序（最新优先）- 默认
                return new Date(b.date || b.created_at).getTime() - new Date(a.date || a.created_at).getTime();
              case 'date_asc':
                // 按时间升序（最旧优先）
                return new Date(a.date || a.created_at).getTime() - new Date(b.date || b.created_at).getTime();
              case 'title_asc':
                return a.title.localeCompare(b.title, 'zh-CN');
              case 'title_desc':
                return b.title.localeCompare(a.title, 'zh-CN');
              default:
                return 0;
            }
          }).map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-48 h-32 md:h-auto flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={item.tag_color}>{item.category}</Badge>
                          {!item.is_published && (
                            <Badge variant="outline" className="text-gray-500">
                              <EyeOff className="h-3 w-3 mr-1" />
                              未发布
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-2">{item.excerpt}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{item.date.replace('T', ' ').substring(0, 16)}</span>
                          <span className="mx-2">·</span>
                          <span>{item.author}</span>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePublish(item)}
                          title={item.is_published ? '隐藏' : '发布'}
                        >
                          {item.is_published ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => setDeleteConfirm(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingNews ? '编辑新闻' : '发布新闻'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">标题 *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="请输入新闻标题"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">分类 *</label>
                <Select value={formData.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">发布时间</label>
                <Input
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">作者</label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="作者名称"
                />
              </div>
              
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">摘要 *</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="请输入新闻摘要"
                  className="w-full px-3 py-2 border rounded-md min-h-[80px]"
                />
              </div>
              
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">图片路径 *</label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/news/xxx.jpg"
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="预览"
                    className="mt-2 h-32 object-cover rounded"
                  />
                )}
              </div>
              
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">正文内容 (支持HTML)</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="<p>正文内容...</p>"
                  className="w-full px-3 py-2 border rounded-md min-h-[200px] font-mono text-sm"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              取消
            </Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              {editingNews ? '保存' : '发布'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
          </DialogHeader>
          <p className="py-4">确定要删除这篇新闻吗？此操作不可撤销。</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              取消
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            >
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
