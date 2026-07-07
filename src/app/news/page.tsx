import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Leaf } from "lucide-react";
import Image from "next/image";
import { getSupabaseClient } from "@/storage/database/supabase-client";
import NewsSearch from "@/components/news-search";

export const metadata = {
    title: "品牌动态",
    description: "关注科栎雅品牌资讯、企业动态与健康生活指南"
};

interface NewsItem {
    id: number;
    title: string;
    category: string;
    date: string;
    excerpt: string;
    image: string;
    tag_color: string;
}

async function getNews(): Promise<NewsItem[]> {
    try {
        const client = getSupabaseClient();

        const { data, error } = await client
            .from("news")
            .select("id, title, category, date, excerpt, image, tag_color")
            .eq("is_published", true)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("获取新闻失败:", error);
            return [];
        }

        // 📌 格式化日期，去掉 "T"
        const formattedData = (data || []).map(item => ({
            ...item,
            date: item.date ? item.date.split('T')[0] : item.date,
        }));

        return formattedData;
    } catch (error) {
        console.error("获取新闻失败:", error);
        return [];
    }
}

export default async function NewsPage() {
    const news = await getNews();

    return (
        <div className="flex flex-col">
            {}
            <section
                className="relative h-[400px] overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-emerald-600">
                {}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className="relative w-[600px] h-[600px]">
                        <Image
                            src="/logo.png"
                            alt="KALEAH Logo"
                            fill
                            className="object-contain"
                            priority />
                    </div>
                </div>
                {}
                <div
                    className="absolute inset-0 bg-gradient-to-r from-green-900/50 via-transparent to-emerald-900/30"></div>
                {}
                <div className="relative container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-3xl text-white space-y-6">
                        <h1 className="text-5xl md:text-6xl font-bold leading-tight drop-shadow-lg">品牌动态</h1>
                        <p className="text-xl text-white/90 leading-relaxed">关注科栎雅品牌资讯、企业动态与健康生活指南
                                        </p>
                    </div>
                </div>
            </section>
            {}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <NewsSearch initialNews={news} />
                    </div>
                </div>
            </section>
            {}
            <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <div
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto">
                            <Leaf className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">订阅我们的资讯
                                        </h2>
                        <p className="text-lg text-gray-600">第一时间获取科栎雅最新动态、产品优惠和健康食谱分享
                                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="请输入您的邮箱地址"
                                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200" />
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">订阅
                                              </button>
                        </div>
                        <p className="text-sm text-gray-500">我们承诺保护您的隐私，不会向第三方泄露您的邮箱地址
                                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}