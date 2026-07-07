'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, ShoppingBag, ExternalLink } from 'lucide-react';

function ProductsContent() {
  const [activeCategory, setActiveCategory] = useState('tea-oil');

  // 购物平台数据
  const platforms = [
    { name: '淘宝', icon: '🛒', url: 'https://shop319131029.taobao.com/', color: 'from-orange-500 to-orange-600' },
    { name: '京东', icon: '📦', url: 'https://mall.jd.com/index-16881159.html', color: 'from-red-500 to-red-600' },
    { name: '抖音小店', icon: '🎵', url: 'https://haohuo.jinritemai.com/ecommerce/trade/detail/index.html?id=3764168518711509475&origin_type=604', color: 'from-pink-500 to-pink-600' },
    { name: '微信视频号小店', icon: '💬', url: 'https://store.weixin.qq.com/shop/b/2XdPL0z1xPPQEUg', color: 'from-green-500 to-green-600' },
    { name: '微店', icon: '🏪', url: 'https://k.youshop10.com/lun-qPIk', color: 'from-purple-500 to-purple-600' },
  ];

  const categories = [
    { id: 'tea-oil', name: '精品山茶油', icon: '🌿', count: '6个规格' },
    { id: 'tea-cake', name: '特色茶点', icon: '🥧', count: '9种规格' },
    { id: 'grain', name: '东北粮品', icon: '🌾', count: '5种规格' },
  ];

  // 分类背景图片映射
  const categoryBackgrounds: Record<string, string> = {
    'tea-oil': '/images/products/tea-oil.png',
    'tea-cake': '/images/products/tea-cake.png',
    'grain': '/images/products/rice.png',
  };

  const subCategories = {
    'tea-oil': [
      { id: 'all', name: '全部规格', subtitle: '六种包装，满足不同需求' },
    ],
    'tea-cake': [
      { id: 'gift-box', name: '礼盒装', subtitle: '伴手礼佳品' },
      { id: 'normal-box', name: '休闲盒装', subtitle: '家庭分享' },
      { id: 'bag', name: '袋装', subtitle: '经济实惠' },
    ],
    'grain': [
      { id: 'rice', name: '大米', subtitle: '黑土地黄金水稻带' },
      { id: 'millet', name: '小米', subtitle: '古龙特色产区' },
    ],

  };

  const products = {
    'tea-oil': [
      {
        id: 1,
        name: '三清山一级冷压榨山茶油',
        category: '精品山茶油',
        subCategory: 'all',
        price: '¥ 25.80',
        specs: '100ml · 便携装',
        description: '小容量便携装，适合尝鲜或短期使用，一级冷压榨工艺',
        features: ['一级冷压榨', '未精炼', '富含维生素E', '便携设计'],
        image: '/images/products/tea-oil.png',
      },
      {
        id: 2,
        name: '三清山一级冷压榨山茶油',
        category: '精品山茶油',
        subCategory: 'all',
        price: '¥ 79.00',
        specs: '500ml · 常规装',
        description: '采用一级冷压榨工艺，保留天然营养成分，未精炼，营养更丰富',
        features: ['一级冷压榨', '未精炼', '富含维生素E', '烟点高'],
        image: '/images/products/tea-oil.png',
      },
      {
        id: 3,
        name: '三清山有机山茶油',
        category: '精品山茶油',
        subCategory: 'all',
        price: '¥ 98.00',
        specs: '500ml · 单瓶有机礼盒',
        description: '有机认证，精美礼盒包装，适合送礼或家庭珍藏',
        features: ['有机认证', '一级冷压榨', '精美礼盒', '营养保留'],
        image: '/images/products/tea-oil.png',
      },
      {
        id: 4,
        name: '三清山有机山茶油',
        category: '精品山茶油',
        subCategory: 'all',
        price: '¥ 178.00',
        specs: '500ml × 2 · 双瓶礼盒',
        description: '双瓶礼盒装，性价比更高，适合商务馈赠或家庭长期使用',
        features: ['双瓶装', '有机认证', '精美礼盒', '送礼佳选'],
        image: '/images/products/tea-oil.png',
      },
      {
        id: 5,
        name: '三清山一级冷压榨山茶油',
        category: '精品山茶油',
        subCategory: 'all',
        price: '¥ 98.00',
        specs: '750ml · 大容量装',
        description: '大容量家庭装，适合厨房长期使用，经济实惠',
        features: ['一级冷压榨', '未精炼', '大容量装', '经济实惠'],
        image: '/images/products/tea-oil.png',
      },
      {
        id: 6,
        name: '三清山一级冷压榨山茶油',
        category: '精品山茶油',
        subCategory: 'all',
        price: '¥ 227.00',
        specs: '2L · 特大装',
        description: '超大容量装，适合商业厨房或大家庭使用，性价比最高',
        features: ['一级冷压榨', '未精炼', '超大容量', '超高性价比'],
        image: '/images/products/tea-oil.png',
      },
    ],
    'tea-cake': [
      {
        id: 10,
        name: '山茶油心茶饼 - 美庐秋桂',
        category: '特色茶点 · 礼盒装',
        subCategory: 'gift-box',
        price: '¥ 32.80',
        specs: '200g · 桂花味',
        description: '礼盒装，使用自产山茶油制作，传统工艺，桂花香味浓郁',
        features: ['礼盒包装', '桂花味', '一级冷榨山茶油制作', '净素健康'],
        image: '/images/products/tea-oil.png',
      },
      {
        id: 11,
        name: '山茶油心茶饼 - 龙崖椒香',
        category: '特色茶点 · 礼盒装',
        subCategory: 'gift-box',
        price: '¥ 32.80',
        specs: '200g · 椒盐味',
        description: '礼盒装，使用自产山茶油制作，椒盐香味，口感层次丰富',
        features: ['礼盒包装', '椒盐味', '一级冷榨山茶油制作', '净素健康'],
        image: '/images/products/tea-oil.png',
      },
      {
        id: 12,
        name: '山茶油心茶饼 - 秀峰云雾',
        category: '特色茶点 · 礼盒装',
        subCategory: 'gift-box',
        price: '¥ 32.80',
        specs: '200g · 绿茶味',
        description: '礼盒装，使用自产山茶油制作，绿茶清香，回味悠长',
        features: ['礼盒包装', '绿茶味', '一级冷榨山茶油制作', '净素健康'],
        image: '/images/products/tea-oil.png',
      },
      {
        id: 13,
        name: '山茶油心茶饼 - 三叠锦汇',
        category: '特色茶点 · 礼盒装',
        subCategory: 'gift-box',
        price: '¥ 32.80',
        specs: '200g · 什锦装（三口味）',
        description: '礼盒装，三种口味散装放到一盒，一次品尝多种风味',
        features: ['礼盒包装', '三口味混合', '一级冷榨山茶油制作', '净素健康'],
        image: '/images/products/tea-oil.png',
      },
      {
        id: 14,
        name: '山茶油心茶饼 - 美庐秋桂',
        category: '特色茶点 · 普通盒装',
        subCategory: 'normal-box',
        price: '¥ 17.90',
        specs: '118g · 桂花味',
        description: '休闲盒装，经济实惠，桂花香味，日常茶点首选',
        features: ['休闲盒装', '桂花味', '一级冷榨山茶油制作', '净素健康'],
        image: '/images/products/tea-oil.png',
      },
      {
        id: 15,
        name: '山茶油心茶饼 - 龙崖椒香',
        category: '特色茶点 · 普通盒装',
        subCategory: 'normal-box',
        price: '¥ 17.90',
        specs: '118g · 椒盐味',
        description: '普通盒装，经济实惠，椒盐香味，口感层次丰富',
        features: ['休闲盒装', '椒盐味', '一级冷榨山茶油制作', '净素健康'],
        image: '/images/products/tea-oil.png',
      },
      {
        id: 16,
        name: '山茶油心茶饼 - 桂花味',
        category: '特色茶点 · 袋装',
        subCategory: 'bag',
        price: '¥ 22.80',
        specs: '228g · 桂花味',
        description: '袋装，大容量实惠装，桂花香味，适合家庭分享',
        features: ['袋装', '净素', '桂花味', '一级冷榨山茶油制作'],
        image: '/images/products/tea-oil.png',
      },
      {
        id: 17,
        name: '山茶油心茶饼 - 绿茶味',
        category: '特色茶点 · 袋装',
        subCategory: 'bag',
        price: '¥ 22.80',
        specs: '228g · 绿茶味',
        description: '袋装，大容量实惠装，绿茶清香，适合家庭分享',
        features: ['袋装', '净素', '绿茶味', '一级冷榨山茶油制作'],
        image: '/images/products/tea-oil.png',
      },
      {
        id: 18,
        name: '九江心茶饼 - 椒盐味',
        category: '特色茶点 · 袋装',
        subCategory: 'bag',
        price: '¥ 22.80',
        specs: '228g · 椒盐味',
        description: '袋装，大容量实惠装，椒盐香味，适合家庭分享',
        features: ['袋装', '净素', '椒盐味', '一级冷榨山茶油制作'],
        image: '/images/products/tea-oil.png',
      },
    ],
    'grain': [
      {
        id: 20,
        name: '东北生态大米',
        category: '东北粮品',
        subCategory: 'rice',
        price: '¥ 68.00',
        specs: '5kg · 礼盒装',
        description: '来自东北平原黑土地黄金水稻带，米粒饱满，口感绵软香甜，精美礼盒装',
        features: ['黑土地', '礼盒包装', '颗粒饱满', '香甜可口'],
        image: '/images/products/tea-oil.png',
      },
      {
        id: 21,
        name: '东北生态大米',
        category: '东北粮品',
        subCategory: 'rice',
        price: '¥ 68.00',
        specs: '5kg · 真空装',
        description: '来自东北平原黑土地黄金水稻带，真空保鲜，新鲜度更高',
        features: ['黑土地', '真空保鲜', '颗粒饱满', '香甜可口'],
        image: '/images/products/tea-oil.png',
      },
      {
        id: 22,
        name: '东北生态大米',
        category: '东北粮品',
        subCategory: 'rice',
        price: '¥ 88.00',
        specs: '10kg · 袋装',
        description: '大容量家庭装，经济实惠，适合大家庭长期食用',
        features: ['黑土地', '大容量装', '颗粒饱满', '超高性价比'],
        image: '/images/products/tea-oil.png',
      },
      {
        id: 23,
        name: '古龙小米',
        category: '东北粮品',
        subCategory: 'millet',
        price: '¥ 25.8',
        specs: '1kg · 真空小盒装',
        description: '来自古龙特色产区，真空小盒装，口感醇香糯滑，营养丰富',
        features: ['古龙产区', '真空保鲜', '醇香糯滑', '营养丰富'],
        image: '/images/products/tea-oil.png',
      },
      {
        id: 24,
        name: '古龙小米',
        category: '东北粮品',
        subCategory: 'millet',
        price: '¥ 68',
        specs: '4kg · 礼盒装',
        description: '来自古龙特色产区，精美礼盒装，适合商务馈赠或家庭珍藏',
        features: ['古龙产区', '礼盒包装', '醇香糯滑', '营养丰富'],
        image: '/images/products/tea-oil.png',
      },
    ],

  };

  // 按子分类分组产品
  const currentProducts = products[activeCategory as keyof typeof products] || [];
  const groupedProducts = currentProducts.reduce((acc, product) => {
    const subCat = product.subCategory;
    if (!acc[subCat]) {
      acc[subCat] = [];
    }
    acc[subCat].push(product);
    return acc;
  }, {} as Record<string, typeof currentProducts>);

  return (
    <div className="flex flex-col">
      {/* Platform Links Section */}
      <section className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 border-b border-green-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-sm font-semibold text-green-700 whitespace-nowrap mr-2">
              <ShoppingBag className="inline-block h-4 w-4 mr-1" />
              官方购物平台
            </span>
            {platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 px-5 py-3 rounded-xl border-2 border-green-200 bg-white hover:border-green-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="text-xl">{platform.icon}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 transition-colors">
                  {platform.name}
                </span>
                <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-green-600 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative h-[350px] overflow-hidden">
        {/* Background Gradient - 自然色调 */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-800/85 to-emerald-900/90"></div>
        
        {/* Background Image with Overlay - 动态切换 */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
          style={{
            backgroundImage: `url('${categoryBackgrounds[activeCategory]}')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 via-transparent to-emerald-900/50"></div>
        
        {/* Decorative Elements - 自然纹理 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNHMxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')]"></div>
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              产品中心
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              三大品类，源自全球优质原产地
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Category Tabs */}
          <div className="mb-12">
            <Tabs
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-gray-100">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-6"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-3xl">{category.icon}</span>
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-xs text-gray-500">{category.count}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Products by SubCategory */}
          <div className="space-y-16">
            {subCategories[activeCategory as keyof typeof subCategories].map((sub) => {
              const subProducts = groupedProducts[sub.id] || [];
              if (subProducts.length === 0) return null;

              return (
                <div key={sub.id} className="space-y-8">
                  {/* SubCategory Title */}
                  <div className="text-center space-y-3">
                    <h2 className="text-4xl font-bold text-gray-900">{sub.name}</h2>
                    <p className="text-lg text-gray-600">{sub.subtitle}</p>
                    <div className="w-24 h-1 bg-green-600 mx-auto"></div>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {subProducts.map((product) => (
                      <Card
                        key={product.id}
                        className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-2 hover:border-green-500"
                      >
                        <CardContent className="p-0">
                          {/* Product Image */}
                          <div className="relative aspect-square overflow-hidden bg-gray-50">
                            <div
                              className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                              style={{ backgroundImage: `url('${product.image}')` }}
                            ></div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>

                            {/* Category Badge */}
                            <Badge className="absolute top-4 left-4 bg-green-600">
                              {product.category}
                            </Badge>
                          </div>

                          {/* Product Info */}
                          <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-gray-500">{product.specs}</p>
                              </div>
                              <span className="text-xl font-bold text-green-600">
                                {product.price}
                              </span>
                            </div>

                            <p className="text-sm text-gray-600 leading-relaxed">
                              {product.description}
                            </p>

                            {/* Features */}
                            <div className="flex flex-wrap gap-2">
                              {product.features.map((feature, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs border-gray-300 text-gray-600"
                                >
                                  {feature}
                                </Badge>
                              ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col space-y-3 pt-4">
                              <Link href={`/products/${product.id}`} className="w-full">
                                <Button 
                                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <ShoppingBag className="mr-2 h-4 w-4" />
                                  查看详情
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {currentProducts.length === 0 && (
            <div className="text-center py-20">
              <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-600 mb-3">暂无产品</h3>
              <p className="text-gray-500">该分类下暂无产品，请选择其他分类</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              需要批量采购或商务合作？
            </h2>
            <p className="text-lg text-gray-600">
              我们为企业和机构提供专业的批量采购服务和商务合作方案
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8">
                  联系我们
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ProductsPage() {
  return <ProductsContent />;
}
