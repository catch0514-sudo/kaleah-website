import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSupabaseClient } from '@/storage/database/supabase-client';

interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  content: string;
  tag_color: string;
}

interface RelatedNewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  tag_color: string;
}

// 获取新闻详情 - 直接查询数据库
async function getNewsById(id: string): Promise<NewsItem | null> {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('news')
      .select('*')
      .eq('id', id)
      .eq('is_published', true)
      .single();

    if (error || !data) {
      return null;
    }
    return data;
  } catch (error) {
    console.error('获取新闻详情失败:', error);
    return null;
  }
}

// 获取相关新闻 - 直接查询数据库
async function getRelatedNews(currentId: string): Promise<RelatedNewsItem[]> {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('news')
      .select('id, title, category, date, excerpt, image, tag_color')
      .eq('is_published', true)
      .neq('id', parseInt(currentId))
      .order('created_at', { ascending: false })
      .limit(2);

    if (error) {
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('获取相关新闻失败:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const newsItem = await getNewsById(id);
  if (!newsItem) {
    return {
      title: '新闻未找到',
      description: '该新闻不存在',
    };
  }
  return {
    title: newsItem.title,
    description: newsItem.excerpt,
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const newsItem = await getNewsById(id);
  
  if (!newsItem) {
    notFound();
  }

  const relatedNews = await getRelatedNews(id);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <Link href="/news">
            <Button variant="ghost" className="mb-6 text-green-600 hover:text-green-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回新闻列表
            </Button>
          </Link>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <Card className="p-8 mb-8">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-6">
                  <Badge className={newsItem.tag_color}>{newsItem.category}</Badge>
                  <div className="flex items-center space-x-4 text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{newsItem.date}</span>
                    </div>
                    <span className="text-sm">·</span>
                    <span className="text-sm">{newsItem.author}</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {newsItem.title}
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed">
                  {newsItem.excerpt}
                </p>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <div className="mb-8 rounded-2xl overflow-hidden">
              <img
                src={newsItem.image}
                alt={newsItem.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Article Body */}
            <Card className="p-8 md:p-12">
              <CardContent className="p-0">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: newsItem.content || '' }}
                />
              </CardContent>
            </Card>

            {/* Share Section */}
            <Card className="p-6 mt-8">
              <CardContent className="p-0">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <span className="font-semibold">分享到：</span>
                    <Button variant="outline" size="sm" className="ml-2">
                      微信
                    </Button>
                    <Button variant="outline" size="sm">
                      微博
                    </Button>
                    <Button variant="outline" size="sm">
                      抖音
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Articles */}
            {relatedNews.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">相关文章</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedNews.map((item) => (
                    <Link key={item.id} href={`/news/${item.id}`}>
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <CardContent className="p-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <div className="p-6">
                            <Badge className={`${item.tag_color} mb-3`}>{item.category}</Badge>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {item.excerpt}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
