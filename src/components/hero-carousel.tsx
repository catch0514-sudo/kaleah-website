'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideData {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    image: "url('/carousel/tea-oil.jpg')",
    title: '山茶油',
    subtitle: '液体黄金，营养满格',
    description: '79.5%油酸的天然守护，为全家餐桌锁住健康本味。',
  },
  {
    id: 2,
    image: "url('/carousel/northeast-rice.jpg')",
    title: '东北生态大米',
    subtitle: '黑土赐予的稻香传奇',
    description: '每一粒米，都承载着北纬45°黑土地3000年沉积的肥沃底气。',
  },
  {
    id: 3,
    image: "url('/carousel/gulong-millet.jpg')",
    title: '古龙小米',
    subtitle: '千年传承，醇厚回甘',
    description: '从春耕到秋收，我们用一整个季节的耐心，熬一碗金黄。',
  },
  {
    id: 4,
    image: "url('/carousel/tea-cake.jpg')",
    title: '山茶油心茶饼',
    subtitle: '七十二时辰匠心淬炼',
    description: '庐山古韵，传统茶饼，传承千年的美味文化',
  },

];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 每5秒切换一次

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* 轮播图片容器 */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* 背景图片 */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: slide.image }}
            ></div>
          </div>
        ))}
      </div>

      {/* 内容容器 */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl space-y-6">
          {/* 添加文字阴影和背景 */}
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-gray-900">
              {slides[currentSlide].title}
              <br />
              <span className="text-green-600">{slides[currentSlide].subtitle}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mt-6">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-wrap gap-4 pt-4 mt-8">
              <Link href="/products">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8">
                  探索产品
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 px-8"
                >
                  了解我们
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 左右导航按钮 */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full transition-all duration-300 shadow-lg"
        aria-label="上一张"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full transition-all duration-300 shadow-lg"
        aria-label="下一张"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* 轮播指示器 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-green-600 scale-125' : 'bg-white/80 hover:bg-white'
            }`}
            aria-label={`切换到第${index + 1}张`}
          />
        ))}
      </div>
    </section>
  );
}
