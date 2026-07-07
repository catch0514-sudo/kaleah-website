"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";

interface NewsItem {
    id: number;
    title: string;
    category: string;
    date: string;
    excerpt: string;
    image: string;
    tag_color: string;
}

interface NewsSearchProps {
    initialNews: NewsItem[];
}

export default function NewsSearch({ initialNews }: NewsSearchProps) {
    const [query, setQuery] = useState("");
    const [news, setNews] = useState<NewsItem[]>(initialNews);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // 搜索新闻
    const searchNews = useCallback(async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setNews(initialNews);
            setHasSearched(false);
            return;
        }

        setIsLoading(true);
        setHasSearched(true);

        try {
            const res = await fetch(`/api/news/search?q=${encodeURIComponent(searchQuery)}`);
            const data = await res.json();

            if (data.success) {
                setNews(data.data);
            }
        } catch (error) {
            console.error("搜索失败:", error);
        } finally {
            setIsLoading(false);
        }
    }, [initialNews]);

    // 清空搜索
    const clearSearch = () => {
        setQuery("");
        setNews(initialNews);
        setHasSearched(false);
    };

    // 提交搜索
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        searchNews(query);
    };

    // 监听输入变化，清空时自动恢复
    useEffect(() => {
        if (query === "" && hasSearched) {
            setNews(initialNews);
            setHasSearched(false);
        }
    }, [query, initialNews, hasSearched]);

    // 高亮关键词
    const highlightText = (text: string, keyword: string) => {
        if (!keyword.trim()) return text;

        const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
        const parts = text.split(regex);

        return parts.map((part, i) =>
            regex.test(part) ? (
                <mark key={i} className="bg-yellow-200/80 text-green-900 px-0.5 rounded">
                    {part}
                </mark>
            ) : (
                <span key={i}>{part}</span>
            )
        );
    };

    return (
        <div className="space-y-6">
            {/* 搜索栏 */}
            <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
                <div className="relative flex items-center">
                    <Search className="absolute left-4 h-5 w-5 text-emerald-400 pointer-events-none" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="搜索新闻标题或摘要..."
                        className="w-full pl-12 pr-24 py-3.5 rounded-full border-2 border-emerald-200 bg-white/80 backdrop-blur-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 transition-all"
                    />
                    <div className="absolute right-2 flex items-center gap-1">
                        {query && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                                title="清空搜索"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-5 py-2 rounded-full bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 disabled:opacity-50 transition-colors flex items-center gap-1.5"
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Search className="h-4 w-4" />
                            )}
                            搜索
                        </button>
                    </div>
                </div>
            </form>

            {/* 搜索结果状态 */}
            {hasSearched && (
                <div className="text-center text-sm text-gray-500">
                    {news.length > 0 ? (
                        <span>
                            找到 <strong className="text-emerald-600">{news.length}</strong> 条与
                            &ldquo;<strong className="text-emerald-700">{query}</strong>&rdquo;
                            相关的新闻
                        </span>
                    ) : (
                        <span className="text-gray-400">未找到与 &ldquo;{query}&rdquo; 相关的新闻</span>
                    )}
                </div>
            )}

            {/* 新闻列表 */}
            {news.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((item) => (
                        <a
                            key={item.id}
                            href={`/news/${item.id}`}
                            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3">
                                    <span
                                        className="px-3 py-1 text-xs font-medium text-white rounded-full"
                                        style={{ backgroundColor: item.tag_color }}
                                    >
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center text-xs text-gray-500 mb-3">
                                    <span>{item.date}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                                    {highlightText(item.title, query)}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {highlightText(item.excerpt, query)}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">📰</div>
                    <p className="text-gray-500 text-lg">
                        {hasSearched ? "未找到相关新闻" : "暂无新闻"}
                    </p>
                </div>
            )}
        </div>
    );
}
