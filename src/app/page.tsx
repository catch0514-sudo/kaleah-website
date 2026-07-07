'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ArrowRight, Globe, Calendar, MapPin, Leaf } from 'lucide-react';
import HeroCarousel from '@/components/hero-carousel';

const TreeGrowth = dynamic(() => import('@/components/TreeGrowth'), { ssr: false });

interface NewsItem {
    id: number;
    title: string;
    category: string;
    date: string;
    excerpt: string;
    image: string;
    tag_color: string;
}

const STATIC_NEWS: NewsItem[] = [
    {
        id: 1,
        title: '科栎雅与三清山茶油合作社达成战略合作',
        category: '企业动态',
        date: '2025-10-30',
        excerpt: '科栎雅正式与江西三清山茶油种植合作社签署战略合作协议，共同推进山茶油产业标准化、品牌化发展。',
        image: '/bases/sanqingshan-2.jpg',
        tag_color: 'bg-green-500',
    },
    {
        id: 2,
        title: '科栎雅东北粮品基地喜获丰收',
        category: '产地直击',
        date: '2025-10-14',
        excerpt: '科栎雅位于东北平原的粮品基地迎来丰收季，黑土地孕育的优质大米与小米即将上市。',
        image: '/bases/songyuan-1.jpg',
        tag_color: 'bg-amber-500',
    },
    {
        id: 3,
        title: '科栎雅推出全新茶点系列，传承庐山工艺',
        category: '新品发布',
        date: '2025-10-30',
        excerpt: '全新山茶油心茶饼系列正式上线，采用庐山传统工艺精制，融合现代健康理念。',
        image: '/images/products/tea-cake.png',
        tag_color: 'bg-orange-500',
    },
];

// ---------- 产品场景图配置 ----------
const PRODUCT_SCENES = {
    'tea-oil': 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=600&q=80', // 油茶林
    'tea-cake': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80', // 茶园
    'grain': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80', // 稻田
};

// ---------- 装饰性分隔符 ----------
function SectionDivider() {
    return (
        <div className="relative h-16 overflow-hidden">
            <svg
                className="absolute bottom-0 w-full h-16 text-emerald-100/40"
                viewBox="0 0 1440 64"
                preserveAspectRatio="none"
                fill="currentColor"
            >
                <path d="M0,32 C240,0 480,48 720,32 C960,16 1200,48 1440,32 L1440,64 L0,64 Z" />
            </svg>
            <svg
                className="absolute bottom-0 w-full h-16 text-emerald-200/30"
                viewBox="0 0 1440 64"
                preserveAspectRatio="none"
                fill="currentColor"
            >
                <path d="M0,48 C360,16 720,64 1080,40 C1260,28 1380,44 1440,48 L1440,64 L0,64 Z" />
            </svg>
            {/* 装饰叶片 */}
            <div className="absolute left-1/4 -bottom-1 text-emerald-400/30 transform -translate-x-1/2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8 6 4 12 6 16c1.5 3 4.5 4 6 2 1.5 2 4.5 1 6-2 2-4 0-10-6-14z" />
                </svg>
            </div>
            <div className="absolute left-1/2 -bottom-1 text-emerald-300/25 transform -translate-x-1/2 rotate-12">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8 6 4 12 6 16c1.5 3 4.5 4 6 2 1.5 2 4.5 1 6-2 2-4 0-10-6-14z" />
                </svg>
            </div>
            <div className="absolute right-1/4 -bottom-1 text-emerald-400/30 transform translate-x-1/2 -rotate-6">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8 6 4 12 6 16c1.5 3 4.5 4 6 2 1.5 2 4.5 1 6-2 2-4 0-10-6-14z" />
                </svg>
            </div>
        </div>
    );
}

// ---------- 主页面 ----------
export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading && <TreeGrowth />}

            <div
                className={`flex flex-col transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'
                    }`}
            >
                <HeroCarousel />

                {/* 最新动态 */}
                <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-stone-50/50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 text-emerald-600 mb-4">
                                <span className="h-px w-8 bg-emerald-300"></span>
                                <span className="text-sm font-semibold uppercase tracking-wider">News & Updates</span>
                                <span className="h-px w-8 bg-emerald-300"></span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                科栎雅最新动态
                            </h2>
                            <p className="text-lg text-gray-600">
                                关注科栎雅品牌资讯与行业动态
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {STATIC_NEWS.length === 0 ? (
                                <div className="col-span-3 text-center py-16 text-gray-500">
                                    <p className="text-lg">暂无最新动态</p>
                                </div>
                            ) : (
                                STATIC_NEWS.map((item) => (
                                    <Link key={item.id} href={`/news/${item.id}`}>
                                        <Card className="group hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 overflow-hidden border-0 shadow-md">
                                            <CardContent className="p-0">
                                                <div className="relative h-48 overflow-hidden">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                                                    <Badge className={`absolute top-4 left-4 ${item.tag_color}`}>
                                                        {item.category}
                                                    </Badge>
                                                </div>
                                                <div className="p-6">
                                                    <div className="flex items-center text-sm text-gray-500 mb-3">
                                                        <Calendar className="h-4 w-4 mr-2" />
                                                        <span>{item.date}</span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm leading-relaxed">
                                                        {item.excerpt}
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))
                            )}
                        </div>

                        <div className="text-center mt-12">
                            <Link href="/news">
                                <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 rounded-full transition-all duration-300 hover:shadow-md">
                                    查看更多动态
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 分隔符 */}
                <SectionDivider />

                {/* 品牌理念 - 带氛围背景图 */}
                <section className="py-20 relative overflow-hidden">
                    {/* 氛围背景图 */}
                    <div
                        className="absolute inset-0 opacity-[0.08] bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=2000&q=60')",
                            backgroundSize: 'cover',
                        }}
                    ></div>
                    {/* 渐变遮罩 */}
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/30 via-white/90 to-white"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center space-y-8">
                            <div className="inline-block">
                                <div className="flex items-center justify-center space-x-2 text-emerald-600 mb-4">
                                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                    </svg>
                                    <span className="text-sm font-semibold uppercase tracking-wider">自然 · 健康 · 品质</span>
                                </div>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                                科栎雅品牌理念
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                                科栎雅（KALEAH）致力于精选全球优质原产地生态食品，
                                从三清山的山茶油到东北平原的黑土地大米，
                                再到江西古龙镇的特色小米，我们坚持源头把控品质，
                                为消费者提供纯净、健康、可溯源的优质食品，传递自然健康的生活理念。
                            </p>
                            {/* 装饰性品牌价值标签 */}
                            <div className="flex flex-wrap justify-center gap-3 pt-4">
                                {['纯净原产地', '有机种植', '传统工艺', '可溯源'].map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-100"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 插入的居中图片 - 使用 fill 模式 */}
                <div className="relative w-full h-[400px] md:h-[500px]">
                    <Image
                        src="/about/hero.jpg"
                        alt="科栎雅品牌形象"
                        fill
                        className="object-cover rounded-2xl"
                    />
                </div>

                {/* 核心产品展示 */}
                <section className="py-20 bg-gradient-to-b from-stone-50/20 via-white to-gray-50/50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 text-emerald-600 mb-4">
                                <span className="h-px w-8 bg-emerald-300"></span>
                                <span className="text-sm font-semibold uppercase tracking-wider">Core Products</span>
                                <span className="h-px w-8 bg-emerald-300"></span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                核心产品
                            </h2>
                            <p className="text-lg text-gray-600">
                                三大品类，源自全球优质原产地
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {/* 精品山茶油 */}
                            <Link href="/products?category=tea-oil">
                                <Card className="group hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500 overflow-hidden cursor-pointer border-2 border-transparent hover:border-emerald-300 h-full bg-white/80 backdrop-blur-sm">
                                    <CardContent className="p-0">
                                        <div className="relative">
                                            <div
                                                className="h-48 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                                style={{
                                                    backgroundImage: `url('/images/products/tea-oil.png')`,
                                                }}
                                            ></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 via-emerald-900/10 to-transparent"></div>
                                            {/* 产地标签 */}
                                            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-emerald-700 shadow-sm">
                                                <MapPin className="h-3 w-3" />
                                                江西 · 三清山
                                            </div>
                                        </div>
                                        <div className="p-6 text-center">
                                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center mx-auto mb-4 overflow-hidden ring-2 ring-emerald-100 shadow-md">
                                                <Image src="/icon-oil.png" alt="精品山茶油" width={72} height={72} className="object-cover" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">精品山茶油</h3>
                                            <p className="text-gray-500 text-sm mb-4">
                                                三清山一级冷压榨纯山茶油
                                            </p>
                                            <div className="flex items-center justify-center text-emerald-600 font-semibold text-sm">
                                                了解更多 <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>

                            {/* 山茶油心茶饼 */}
                            <Link href="/products?category=tea-cake">
                                <Card className="group hover:shadow-2xl hover:shadow-amber-100/50 transition-all duration-500 overflow-hidden cursor-pointer border-2 border-transparent hover:border-amber-300 h-full bg-white/80 backdrop-blur-sm">
                                    <CardContent className="p-0">
                                        <div className="relative">
                                            <div
                                                className="h-48 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                                style={{
                                                    backgroundImage: `url('/images/products/tea-cake.png')`,
                                                }}
                                            ></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 via-amber-900/10 to-transparent"></div>
                                            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-amber-700 shadow-sm">
                                                <MapPin className="h-3 w-3" />
                                                江西 · 庐山
                                            </div>
                                        </div>
                                        <div className="p-6 text-center">
                                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center mx-auto mb-4 overflow-hidden ring-2 ring-amber-100 shadow-md">
                                                <Image src="/icon-teacake.png" alt="山茶油心茶饼" width={72} height={72} className="object-cover" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">山茶油心茶饼</h3>
                                            <p className="text-gray-500 text-sm mb-4">
                                                庐山茶点，传统工艺
                                            </p>
                                            <div className="flex items-center justify-center text-emerald-600 font-semibold text-sm">
                                                了解更多 <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>

                            {/* 东北粮品 */}
                            <Link href="/products?category=grain">
                                <Card className="group hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-300 h-full bg-white/80 backdrop-blur-sm">
                                    <CardContent className="p-0">
                                        <div className="relative">
                                            <div
                                                className="h-48 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                                style={{
                                                    backgroundImage: `url('/images/products/rice.png')`,
                                                }}
                                            ></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-blue-900/10 to-transparent"></div>
                                            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-blue-700 shadow-sm">
                                                <MapPin className="h-3 w-3" />
                                                东北 · 松嫩平原
                                            </div>
                                        </div>
                                        <div className="p-6 text-center">
                                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center mx-auto mb-4 overflow-hidden ring-2 ring-blue-100 shadow-md">
                                                <Image src="/icon-grain.png" alt="东北粮品" width={72} height={72} className="object-cover" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">东北粮品</h3>
                                            <p className="text-gray-500 text-sm mb-4">
                                                松原大米 · 古龙小米
                                            </p>
                                            <div className="flex items-center justify-center text-emerald-600 font-semibold text-sm">
                                                了解更多 <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 微店分销邀请 */}
                <section className="py-20 bg-gradient-to-b from-emerald-50/30 via-white to-stone-50/20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg shadow-emerald-100/30 border border-emerald-100/50 overflow-hidden">
                            <div className="flex flex-col md:flex-row items-center">
                                {/* 左侧文案 */}
                                <div className="flex-1 p-8 md:p-12">
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                        成为微店分销伙伴
                                    </h2>
                                    <p className="text-lg text-emerald-600 font-semibold mb-4">
                                        分享健康，收获成长
                                    </p>
                                    <p className="text-gray-600 leading-relaxed mb-8">
                                        加入科栎雅微店分销计划，零成本创业，轻松分享优质生态食品，赚取专属佣金。
                                    </p>
                                    <a
                                        href="https://k.youshop10.com/lun-qPIk"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-emerald-200 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-300 hover:-translate-y-0.5">
                                            立即查看
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </a>
                                </div>

                                {/* 右侧二维码 */}
                                <div className="flex-1 p-8 md:p-12 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50/50 to-teal-50/30">
                                    <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-md border-4 border-white mb-4">
                                        <Image
                                            src="/bases/微店qr.jpg"
                                            alt="微店分销二维码"
                                            width={192}
                                            height={192}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium">扫码加入分销</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 分隔符 */}
                <SectionDivider />

                {/* 生态基地亮点 */}
                <section className="py-20 bg-gradient-to-b from-white via-stone-50/30 to-gray-50/50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 text-emerald-600 mb-4">
                                <span className="h-px w-8 bg-emerald-300"></span>
                                <span className="text-sm font-semibold uppercase tracking-wider">Eco Bases</span>
                                <span className="h-px w-8 bg-emerald-300"></span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                生态基地
                            </h2>
                            <p className="text-lg text-gray-600">
                                从源头把控品质，直供全球优质原产地
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {/* 江西三清山 */}
                            <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                                <div
                                    className="h-72 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: "url('/bases/scy.jpg')",
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                {/* 原产地标记 */}
                                <div className="absolute top-4 right-4">
                                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/90 backdrop-blur-sm text-white rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg">
                                        <Leaf className="h-3 w-3" />
                                        原产地直供
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Globe className="h-5 w-5 text-emerald-400" />
                                        <span className="text-xs text-emerald-300 font-medium uppercase tracking-wider">世界自然遗产地</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">江西三清山</h3>
                                    <p className="text-sm text-gray-200 leading-relaxed">纯净油茶林，一级冷压榨工艺</p>
                                </div>
                            </div>

                            {/* 东北平原 */}
                            <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                                <div
                                    className="h-72 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: "url('/bases/dm.jpg')",
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute top-4 right-4">
                                    <span className="inline-flex items-center gap-1.5 bg-amber-500/90 backdrop-blur-sm text-white rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg">
                                        <Leaf className="h-3 w-3" />
                                        黄金水稻带
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Globe className="h-5 w-5 text-amber-400" />
                                        <span className="text-xs text-amber-300 font-medium uppercase tracking-wider">世界三大黑土带</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">东北平原</h3>
                                    <p className="text-sm text-gray-200 leading-relaxed">黑土地优质粮品，松原大米</p>
                                </div>
                            </div>

                            {/* 古龙小米 */}
                            <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                                <div
                                    className="h-72 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: "url('/bases/xm.jpg')",
                                    }}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute top-4 right-4">
                                    <span className="inline-flex items-center gap-1.5 bg-orange-500/90 backdrop-blur-sm text-white rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg">
                                        <Leaf className="h-3 w-3" />
                                        特色产区
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Globe className="h-5 w-5 text-orange-400" />
                                        <span className="text-xs text-orange-300 font-medium uppercase tracking-wider">江西古龙镇</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">古龙小米</h3>
                                    <p className="text-sm text-gray-200 leading-relaxed">特色产区，醇香糯滑</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            <Link href="/bases">
                                <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 rounded-full transition-all duration-300 hover:shadow-md">
                                    探索所有基地
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}