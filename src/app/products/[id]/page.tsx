'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingBag, ExternalLink, Package, Truck, Shield } from 'lucide-react';

// 所有产品数据
const allProducts = {
  // 山茶油
  1: {
    id: 1,
    name: '三清山一级冷压榨山茶油',
    category: '精品山茶油',
    categorySlug: 'tea-oil',
    price: '¥ 25.80',
    priceNumber: 25.80,
    specs: '100ml · 便携装',
    description: '小容量便携装，适合尝鲜或短期使用，一级冷压榨工艺',
    features: ['一级冷压榨', '未精炼', '富含维生素E', '便携设计'],
    image: '/images/products/tea-oil.png',
    detail: '采用三清山优质油茶籽，通过一级冷压榨工艺精制而成。未经过精炼处理，最大程度保留了山茶油的天然营养成分，富含维生素E和不饱和脂肪酸。100ml便携装设计，适合外出携带或短期使用，是品尝纯正山茶油的理想选择。',
  },
  2: {
    id: 2,
    name: '三清山一级冷压榨山茶油',
    category: '精品山茶油',
    categorySlug: 'tea-oil',
    price: '¥ 79.00',
    priceNumber: 79.00,
    specs: '500ml · 常规装',
    description: '采用一级冷压榨工艺，保留天然营养成分，未精炼，营养更丰富',
    features: ['一级冷压榨', '未精炼', '富含维生素E', '烟点高'],
    image: '/images/products/tea-oil.png',
    detail: '500ml常规装是家庭日常烹饪的理想选择。采用三清山优质油茶籽，通过一级冷压榨工艺精制而成。高烟点特性使其适合多种烹饪方式，无论是凉拌、炒菜还是煎炸，都能为您的菜肴增添独特风味。',
  },
  3: {
    id: 3,
    name: '三清山有机山茶油',
    category: '精品山茶油',
    categorySlug: 'tea-oil',
    price: '¥ 98.00',
    priceNumber: 98.00,
    specs: '500ml · 单瓶有机礼盒',
    description: '有机认证，精美礼盒包装，适合送礼或家庭珍藏',
    features: ['有机认证', '一级冷压榨', '精美礼盒', '营养保留'],
    image: '/images/products/tea-oil.png',
    detail: '获得有机认证的高端山茶油，从油茶树种植到生产全程严格把控，确保产品纯净无污染。精美礼盒包装，彰显品质，是商务馈赠、走亲访友的理想之选。',
  },
  4: {
    id: 4,
    name: '三清山有机山茶油',
    category: '精品山茶油',
    categorySlug: 'tea-oil',
    price: '¥ 178.00',
    priceNumber: 178.00,
    specs: '500ml × 2 · 双瓶礼盒',
    description: '双瓶礼盒装，性价比更高，适合商务馈赠或家庭长期使用',
    features: ['双瓶装', '有机认证', '精美礼盒', '送礼佳选'],
    image: '/images/products/tea-oil.png',
    detail: '双瓶礼盒装，性价比更高。两瓶500ml有机山茶油组合，满足家庭长期使用需求。精美的礼盒设计，也适合作为商务馈赠的佳品。',
  },
  5: {
    id: 5,
    name: '三清山一级冷压榨山茶油',
    category: '精品山茶油',
    categorySlug: 'tea-oil',
    price: '¥ 98.00',
    priceNumber: 98.00,
    specs: '750ml · 大容量装',
    description: '大容量家庭装，适合厨房长期使用，经济实惠',
    features: ['一级冷压榨', '未精炼', '大容量装', '经济实惠'],
    image: '/images/products/tea-oil.png',
    detail: '750ml大容量装，专为家庭厨房设计。经济实惠的同时，保证了一级冷压榨的高品质。适合日常烹饪使用，让全家人都能享受纯正山茶油的美味与健康。',
  },
  6: {
    id: 6,
    name: '三清山一级冷压榨山茶油',
    category: '精品山茶油',
    categorySlug: 'tea-oil',
    price: '¥ 227.00',
    priceNumber: 227.00,
    specs: '2L · 特大装',
    description: '超大容量装，适合商业厨房或大家庭使用，性价比最高',
    features: ['一级冷压榨', '未精炼', '超大容量', '超高性价比'],
    image: '/images/products/tea-oil.png',
    detail: '2L超大容量装，性价比最高。适合商业厨房或大家庭长期使用，满足大用量需求。同样是采用一级冷压榨工艺，品质不打折，让每一道菜都充满山茶油的醇香。',
  },
  // 茶点 - 礼盒装
  10: {
    id: 10,
    name: '九江心茶饼 - 美庐秋桂',
    category: '特色茶点 · 礼盒装',
    categorySlug: 'tea-cake',
    price: '¥ 32.80',
    priceNumber: 32.80,
    specs: '200g · 桂花味',
    description: '礼盒装，使用自产山茶油制作，传统工艺，桂花香味浓郁',
    features: ['礼盒包装', '桂花味', '自产山茶油', '传统工艺'],
    image: '/images/products/tea-oil.png',
    detail: '九江心茶饼是江西传统名点，采用自产一级冷榨山茶油制作，传承百年工艺。美庐秋桂口味，以优质桂花入馅，香气扑鼻，口感酥脆，是品茗佐茶的绝佳伴侣。精美礼盒包装，送礼自用两相宜。',
  },
  11: {
    id: 11,
    name: '九江心茶饼 - 龙崖椒香',
    category: '特色茶点 · 礼盒装',
    categorySlug: 'tea-cake',
    price: '¥ 32.80',
    priceNumber: 32.80,
    specs: '200g · 椒盐味',
    description: '礼盒装，使用自产山茶油制作，椒盐香味，口感层次丰富',
    features: ['礼盒包装', '椒盐味', '自产山茶油', '传统工艺'],
    image: '/images/products/tea-oil.png',
    detail: '龙崖椒香口味，精选优质花椒与海盐调制，咸香适中，回味悠长。外皮酥脆，内馅香软，层次分明。采用自产山茶油制作，健康美味兼得。',
  },
  12: {
    id: 12,
    name: '九江心茶饼 - 秀峰云雾',
    category: '特色茶点 · 礼盒装',
    categorySlug: 'tea-cake',
    price: '¥ 32.80',
    priceNumber: 32.80,
    specs: '200g · 绿茶味',
    description: '礼盒装，使用自产山茶油制作，绿茶清香，回味悠长',
    features: ['礼盒包装', '绿茶味', '自产山茶油', '传统工艺'],
    image: '/images/products/tea-oil.png',
    detail: '秀峰云雾口味，融入庐山云雾茶精华，清新淡雅，茶香四溢。每一口都能感受到绿茶的清韵，是茶道爱好者的首选茶点。',
  },
  13: {
    id: 13,
    name: '九江心茶饼 - 三叠锦汇',
    category: '特色茶点 · 礼盒装',
    categorySlug: 'tea-cake',
    price: '¥ 32.80',
    priceNumber: 32.80,
    specs: '200g · 什锦装（三口味）',
    description: '礼盒装，三种口味散装放到一盒，一次品尝多种风味',
    features: ['礼盒包装', '三口味混合', '自产山茶油', '传统工艺'],
    image: '/images/products/tea-oil.png',
    detail: '三叠锦汇是精选三款经典口味的组合装，包含美庐秋桂、龙崖椒香、秀峰云雾三种风味。一次购买，尽享多重美味，是馈赠亲友的绝佳选择。',
  },
  // 茶点 - 普通盒装
  14: {
    id: 14,
    name: '九江心茶饼 - 美庐秋桂',
    category: '特色茶点 · 普通盒装',
    categorySlug: 'tea-cake',
    price: '¥ 17.90',
    priceNumber: 17.90,
    specs: '118g · 桂花味',
    description: '普通盒装，经济实惠，桂花香味，日常茶点首选',
    features: ['普通盒装', '桂花味', '自产山茶油', '经济实惠'],
    image: '/images/products/tea-oil.png',
    detail: '经济实惠的普通盒装，118g小包装适合个人或小家庭享用。同样的桂花香甜，同样的传统工艺，是日常茶点的实惠之选。',
  },
  15: {
    id: 15,
    name: '九江心茶饼 - 龙崖椒香',
    category: '特色茶点 · 普通盒装',
    categorySlug: 'tea-cake',
    price: '¥ 17.90',
    priceNumber: 17.90,
    specs: '118g · 椒盐味',
    description: '普通盒装，经济实惠，椒盐香味，口感层次丰富',
    features: ['普通盒装', '椒盐味', '自产山茶油', '经济实惠'],
    image: '/images/products/tea-oil.png',
    detail: '118g普通盒装，椒盐风味浓郁。适合喜欢咸香口感的消费者，是下午茶时光的美味伴侣。',
  },
  // 茶点 - 袋装
  16: {
    id: 16,
    name: '九江心茶饼 - 桂花味',
    category: '特色茶点 · 袋装',
    categorySlug: 'tea-cake',
    price: '¥ 22.80',
    priceNumber: 22.80,
    specs: '228g · 桂花味',
    description: '袋装，大容量实惠装，桂花香味，适合家庭分享',
    features: ['袋装', '大容量', '桂花味', '自产山茶油'],
    image: '/images/products/tea-oil.png',
    detail: '228g大容量袋装，桂花香气扑鼻。适合家庭分享或办公室茶歇，经济实惠的选择。',
  },
  17: {
    id: 17,
    name: '九江心茶饼 - 绿茶味',
    category: '特色茶点 · 袋装',
    categorySlug: 'tea-cake',
    price: '¥ 18.00',
    priceNumber: 18.00,
    specs: '228g · 绿茶味',
    description: '袋装，大容量实惠装，绿茶清香，适合家庭分享',
    features: ['袋装', '大容量', '绿茶味', '自产山茶油'],
    image: '/images/products/tea-oil.png',
    detail: '228g袋装绿茶味茶饼，清新淡雅，茶香悠长。大容量包装，全家共享更实惠。',
  },
  18: {
    id: 18,
    name: '九江心茶饼 - 椒盐味',
    category: '特色茶点 · 袋装',
    categorySlug: 'tea-cake',
    price: '¥ 18.00',
    priceNumber: 18.00,
    specs: '228g · 椒盐味',
    description: '袋装，大容量实惠装，椒盐香味，适合家庭分享',
    features: ['袋装', '大容量', '椒盐味', '自产山茶油'],
    image: '/images/products/tea-oil.png',
    detail: '228g袋装椒盐味茶饼，咸香可口，层次丰富。大容量实惠装，满足全家人的味蕾。',
  },
  // 东北粮品 - 大米
  20: {
    id: 20,
    name: '东北生态大米',
    category: '东北粮品',
    categorySlug: 'grain',
    price: '¥ 68.00',
    priceNumber: 68.00,
    specs: '5kg · 礼盒装',
    description: '来自东北平原黑土地黄金水稻带，米粒饱满，口感绵软香甜，精美礼盒装',
    features: ['黑土地', '礼盒包装', '颗粒饱满', '香甜可口'],
    image: '/images/products/tea-oil.png',
    detail: '源自东北平原黑土地黄金水稻带，得天独厚的地理环境造就了 exceptional 的米质。米粒晶莹剔透，煮后饭香扑鼻，口感绵软有嚼劲，回甘悠长。精美礼盒包装，送礼体面。',
  },
  21: {
    id: 21,
    name: '东北生态大米',
    category: '东北粮品',
    categorySlug: 'grain',
    price: '¥ 68.00',
    priceNumber: 68.00,
    specs: '5kg · 真空装',
    description: '来自东北平原黑土地黄金水稻带，真空保鲜，新鲜度更高',
    features: ['黑土地', '真空保鲜', '颗粒饱满', '香甜可口'],
    image: '/images/products/tea-oil.png',
    detail: '真空锁鲜包装，最大程度保持大米的新鲜度和营养成分。开袋即可闻到新米的清香，煮出的米饭粒粒分明，软糯香甜。',
  },
  22: {
    id: 22,
    name: '东北生态大米',
    category: '东北粮品',
    categorySlug: 'grain',
    price: '¥ 88.00',
    priceNumber: 88.00,
    specs: '10kg · 袋装',
    description: '大容量家庭装，经济实惠，适合大家庭长期食用',
    features: ['黑土地', '大容量装', '颗粒饱满', '超高性价比'],
    image: '/images/products/tea-oil.png',
    detail: '10kg大容量装，超高性价比。适合人口较多的家庭或食堂使用，经济实惠的同时保证品质不打折。',
  },
  // 东北粮品 - 小米
  23: {
    id: 23,
    name: '古龙小米',
    category: '东北粮品',
    categorySlug: 'grain',
    price: '¥ 25.80',
    priceNumber: 25.80,
    specs: '1kg · 真空小盒装',
    description: '来自古龙特色产区，真空小盒装，口感醇香糯滑，营养丰富',
    features: ['古龙产区', '真空保鲜', '醇香糯滑', '营养丰富'],
    image: '/images/products/tea-oil.png',
    detail: '古龙小米产自黑龙江古龙特色产区，这里独特的气候和土壤条件孕育出品质上乘的小米。米粒金黄饱满，熬粥浓稠香滑，营养丰富，是滋补养生的佳品。',
  },
  24: {
    id: 24,
    name: '古龙小米',
    category: '东北粮品',
    categorySlug: 'grain',
    price: '¥ 68.00',
    priceNumber: 68.00,
    specs: '4kg · 礼盒装',
    description: '来自古龙特色产区，精美礼盒装，适合商务馈赠或家庭珍藏',
    features: ['古龙产区', '礼盒包装', '醇香糯滑', '营养丰富'],
    image: '/images/products/tea-oil.png',
    detail: '4kg精美礼盒装古龙小米，高端大气。无论是馈赠亲友还是商务送礼，都能彰显您的品味。品质上乘，营养丰富的健康好礼。',
  },

};

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();

  const productId = parseInt(params.id as string);
  const product = allProducts[productId as keyof typeof allProducts];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">产品不存在</h1>
          <Button onClick={() => router.push('/products')}>返回产品中心</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">首页</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-green-600">产品中心</Link>
            <span>/</span>
            <Link href={`/products?category=${product.categorySlug}`} className="hover:text-green-600">{product.category}</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
              <div
                className="w-full h-full bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${product.image}')` }}
              ></div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <Badge className="w-fit mb-4 bg-green-600">{product.category}</Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-500 mb-4">{product.specs}</p>
              
              <div className="text-3xl font-bold text-green-600 mb-6">{product.price}</div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="border-green-600 text-green-600">
                    {feature}
                  </Badge>
                ))}
              </div>

              {/* Platform Links */}
              <div className="space-y-3 mb-8">
                <p className="text-sm font-medium text-gray-700">前往官方平台购买：</p>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://shop319131029.taobao.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border-2 border-orange-200 bg-orange-50 hover:bg-orange-100 hover:border-orange-400 transition-all"
                  >
                    <span className="text-lg">🛒</span>
                    <span className="text-sm font-medium text-orange-700">淘宝</span>
                    <ExternalLink className="h-3 w-3 text-orange-400" />
                  </a>
                  <a
                    href="https://mall.jd.com/index-16881159.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border-2 border-red-200 bg-red-50 hover:bg-red-100 hover:border-red-400 transition-all"
                  >
                    <span className="text-lg">📦</span>
                    <span className="text-sm font-medium text-red-700">京东</span>
                    <ExternalLink className="h-3 w-3 text-red-400" />
                  </a>
                  <a
                    href="https://store.weixin.qq.com/shop/b/2XdPL0z1xPPQEUg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border-2 border-green-200 bg-green-50 hover:bg-green-100 hover:border-green-400 transition-all"
                  >
                    <span className="text-lg">💬</span>
                    <span className="text-sm font-medium text-green-700">微信小店</span>
                    <ExternalLink className="h-3 w-3 text-green-400" />
                  </a>
                  <a
                    href="https://k.youshop10.com/lun-qPIk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border-2 border-purple-200 bg-purple-50 hover:bg-purple-100 hover:border-purple-400 transition-all"
                  >
                    <span className="text-lg">🏪</span>
                    <span className="text-sm font-medium text-purple-700">微店</span>
                    <ExternalLink className="h-3 w-3 text-purple-400" />
                  </a>
                </div>
              </div>

              {/* Service Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="flex flex-col items-center text-center">
                  <Package className="h-6 w-6 text-green-600 mb-2" />
                  <span className="text-sm text-gray-600">正品保证</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Truck className="h-6 w-6 text-green-600 mb-2" />
                  <span className="text-sm text-gray-600">全国包邮</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="h-6 w-6 text-green-600 mb-2" />
                  <span className="text-sm text-gray-600">售后无忧</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Detail */}
          <div className="border-t p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">产品详情</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{product.detail}</p>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Button variant="outline" onClick={() => router.push('/products')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回产品中心
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return <ProductDetailContent />;
}
