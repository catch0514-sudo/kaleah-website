import { Card, CardContent } from '@/components/ui/card';
import { Shield, CheckCircle, Target, Heart, Leaf, Award } from 'lucide-react';

export const metadata = {
  title: '关于我们',
  description: '了解科栎雅(KALEAH)的品牌故事、使命愿景与核心价值观',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/about/hero.jpg')",
            }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight drop-shadow-lg">
              关于我们
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed drop-shadow-md">
              专注生态食品，传递健康生活理念
            </p>
          </div>
        </div>
      </section>

      {/* 品牌故事 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 text-green-600 mb-8">
              <Heart className="h-8 w-8" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                品牌故事
              </h2>
            </div>

            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                <strong className="text-gray-900">科栎雅（KALEAH）</strong>的创立源于对自然与品质的执着追求。
                在探索全球优质食品原产地的过程中，我们发现了三清山那片纯净的油茶林、东北平原肥沃的黑土地
                以及江西古龙镇的特色小米。这些自然馈赠的珍宝，激发了我们要将它们带给每一位追求健康生活的消费者的愿景。
              </p>

              <p>
                <strong className="text-gray-900">"科"代表科学与匠心</strong>，
                我们坚持传统工艺与现代科技的结合，确保每一款产品都保持最纯粹的品质。
                <strong className="text-gray-900">"栎"象征自然与坚韧</strong>，
                如栎树般扎根大地，汲取自然精华。
                <strong className="text-gray-900">"雅"寓意优雅生活</strong>，
                我们不仅提供优质食品，更致力于传递一种优雅、健康、自然的生活方式。
              </p>

              <p>
                科栎雅不仅仅是一个品牌，更是一种生活态度的象征。我们相信，真正的品质来自源头，
                真正的健康源于自然。每一件产品，都承载着我们对品质的承诺和对消费者的责任。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 使命与愿景 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-3 text-green-600 mb-4">
                <Target className="h-8 w-8" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  使命与愿景
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 使命 */}
              <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">企业使命</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    致力于为消费者提供纯净、健康、可溯源的优质食品，让每一位消费者都能享受到原产地直供的天然美味，
                    推动生态食品产业的发展，为人类健康事业贡献力量。
                  </p>
                </CardContent>
              </Card>

              {/* 愿景 */}
              <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <Award className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">企业愿景</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    成为中国生态食品行业的领军品牌，在全球优质原产地建立稳定的生产基地，
                    树立"科栎雅=优质生态食品"的品牌认知，成为消费者心中值得信赖的健康生活伙伴。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 核心价值观 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-3 text-green-600 mb-4">
                <Leaf className="h-8 w-8" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  核心价值观
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-6">
                    <Leaf className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">原生态</h3>
                  <p className="text-gray-600 text-sm">
                    坚持原产地直供，确保产品来源于纯净的自然环境
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-6">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">纯物理工艺</h3>
                  <p className="text-gray-600 text-sm">
                    采用传统物理工艺，保留产品天然营养与风味
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">直供</h3>
                  <p className="text-gray-600 text-sm">
                    从原产地直接供应到消费者手中，减少中间环节
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-6">
                    <Heart className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">匠心</h3>
                  <p className="text-gray-600 text-sm">
                    以匠心精神对待每一个生产环节，追求极致品质
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 品质承诺 */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-3 text-green-600 mb-4">
                <Shield className="h-8 w-8" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  品质承诺
                </h2>
              </div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                从源头到餐桌，我们全程把控质量，为您提供最值得信赖的生态食品
              </p>
            </div>

            <div className="space-y-6">
              <Card className="border-l-4 border-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        种植环节：精选良种，生态种植
                      </h3>
                      <p className="text-gray-600">
                        我们在每个基地都选用优质品种，采用传统生态种植方式，不使用化学农药和化肥，
                        确保作物在纯净的自然环境中生长。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        采收环节：人工挑选，及时采收
                      </h3>
                      <p className="text-gray-600">
                        采用人工方式进行采收和初选，确保每一批次原料都达到最佳采收标准，
                        最大程度保留产品的天然营养。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        加工环节：传统工艺，物理压榨
                      </h3>
                      <p className="text-gray-600">
                        采用传统物理工艺进行加工，如山茶油的冷压榨工艺，最大程度保留产品的天然营养成分和风味，
                        不添加任何化学物质。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        包装环节：环保包装，安全卫生
                      </h3>
                      <p className="text-gray-600">
                        选用环保、食品级包装材料，确保产品在运输和储存过程中的安全与卫生，
                        同时体现对环境保护的责任。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        质检环节：严格检测，全程可溯
                      </h3>
                      <p className="text-gray-600">
                        每一批次产品都经过严格的质量检测，建立完整的溯源系统，
                        消费者可以通过产品编码追溯产品的生产全过程。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
