import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Droplets, Sun, Mountain, Wind } from 'lucide-react';

export const metadata = {
  title: '生态基地',
  description: '了解科栎雅全球四大生态基地，从源头把控品质',
};

export default function BasesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - 完整展示背景图 */}
      <section className="relative w-full">
        <img
          src="/bases/hero-bg.jpg"
          alt="生态基地"
          className="w-full h-auto block"
        />
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
        {/* 文字内容 - 垂直居中 */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl text-white space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
                生态基地
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed drop-shadow-md">
                从源头把控品质，直供全球优质原产地
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 江西三清山山茶油生态园 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* 图片 */}
              <div className="space-y-4">
                <img
                  src="/bases/sanqingshan-1.jpg"
                  alt="江西三清山山茶油生态园"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src="/bases/sanqingshan-2.jpg"
                    alt="山茶油果实"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <img
                    src="/bases/sanqingshan-3.jpg"
                    alt="山茶油冷压榨工艺"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* 内容 */}
              <div className="space-y-6">
                <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                  山茶油基地
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  江西三清山山茶油生态园
                </h2>

                <div className="space-y-4">
                  <Card className="border-l-4 border-green-500">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">地理位置与环境优势</h3>
                          <p className="text-gray-600">
                            位于世界自然遗产地三清山，海拔1000米以上，空气清新，水源纯净，土壤肥沃，
                            被誉为"天然氧吧"，为油茶生长提供了绝佳的自然环境。
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-green-500">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <Mountain className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">生态与工艺</h3>
                          <p className="text-gray-600">
                            选用三十年以上油茶树，坚持油茶果保持有机生长方式，采用一级冷压榨工艺，
                            最大程度保留山茶油的天然营养成分和风味，不添加任何化学物质。
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-green-500">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <Droplets className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">产品特点</h3>
                          <p className="text-gray-600">
                            富含不饱和脂肪酸、维生素E和角鲨烯，营养价值高，烟点高，
                            适合各种烹饪方式，是健康饮食的理想选择。
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 东北松原大米基地 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* 内容 */}
              <div className="space-y-6 order-2 lg:order-1">
                <div className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold">
                  大米基地
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  东北松原大米基地
                </h2>

                <div className="space-y-4">
                  <Card className="border-l-4 border-amber-500">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">地理位置与环境优势</h3>
                          <p className="text-gray-600">
                            位于吉林省松原市，地处世界三大黑土地带之一，土壤肥沃，富含有机质。
                            四季分明，日照充足，昼夜温差大，是优质水稻的黄金产区。
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-amber-500">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <Sun className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">品种与种植</h3>
                          <p className="text-gray-600">
                            选用优质水稻品种，采用生态种植方式，灌溉水源为松花江水，
                            全程不使用化学农药和化肥，确保大米纯天然、无污染。
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-amber-500">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <Wind className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">产品特点</h3>
                          <p className="text-gray-600">
                            米粒饱满，色泽晶莹，口感绵软香甜，富含蛋白质、维生素B和多种矿物质，
                            煮出的米饭香气浓郁，是家庭餐桌的优质选择。
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* 图片 */}
              <div className="space-y-4 order-1 lg:order-2">
                <img
                  src="/bases/songyuan-1.jpg"
                  alt="东北松原大米基地"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src="/bases/songyuan-2.jpg"
                    alt="东北大米特写"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <img
                    src="/bases/songyuan-3.jpg"
                    alt="松花江灌溉稻田"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 东北古龙小米基地 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* 图片 */}
              <div className="space-y-4">
                <img
                  src="/bases/gulong-1.jpg"
                  alt="东北古龙小米基地"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src="/bases/gulong-2.jpg"
                    alt="古龙小米特写"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <img
                    src="/bases/gulong-3.jpg"
                    alt="传统小米粥"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* 内容 */}
              <div className="space-y-6">
                <div className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
                  小米基地
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  东北古龙小米基地
                </h2>

                <div className="space-y-4">
                  <Card className="border-l-4 border-yellow-500">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">地理位置与环境优势</h3>
                          <p className="text-gray-600">
                            位于吉林省古龙镇，这里是著名的小米产区，土壤为黄土与黑土混合，
                            气候干燥，日照充足，非常适合小米生长，被誉为"小米之乡"。
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-yellow-500">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <Sun className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">品种与特色</h3>
                          <p className="text-gray-600">
                            选用当地优质谷种，采用传统农耕方式，人工除草，天然灌溉，
                            不使用任何化学农药，保留了小米的天然品质和营养。
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-yellow-500">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <Droplets className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">产品特点</h3>
                          <p className="text-gray-600">
                            颗粒饱满，色泽金黄，口感醇香糯滑，富含蛋白质、膳食纤维、维生素和矿物质，
                            煮粥香甜，营养丰富，是传统的健康养生食材。
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
