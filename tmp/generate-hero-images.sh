#!/bin/bash

# 批量生成首页轮播图

echo "开始生成首页轮播图..."

# 生成轮播图 1 - 品牌形象
echo -e "\n[1/6] 生成品牌形象轮播图..."
curl -X POST http://localhost:5000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "高端生态食品品牌形象展示，\"科栎雅 KALEAH\"品牌名称，展示山茶油、大米、葡萄酒、茶点、小米等优质农产品，自然绿色调，专业商业摄影风格，4K超高清，光线柔和，构图优美，简洁大气",
    "size": "2K"
  }' \
  2>&1 | grep -o '"imageUrl":"[^"]*"' | cut -d'"' -f4 > /tmp/slide1.txt

sleep 2

# 生成轮播图 2 - 山茶油
echo "[2/6] 生成山茶油轮播图..."
curl -X POST http://localhost:5000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "三清山山茶油产品展示，清澈的金黄色山茶油在精致玻璃瓶中，背景是三清山绿色山脉自然风光，绿色调为主，高品质商业摄影，4K超高清，光线明亮，产品突出",
    "size": "2K"
  }' \
  2>&1 | grep -o '"imageUrl":"[^"]*"' | cut -d'"' -f4 > /tmp/slide2.txt

sleep 2

# 生成轮播图 3 - 大米
echo "[3/6] 生成大米轮播图..."
curl -X POST http://localhost:5000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "东北生态大米产品展示，晶莹剔透的有机大米，背景是东北黑土地稻田和金色稻穗，自然光线，专业商业摄影，4K超高清，质感细腻，展现生态农业",
    "size": "2K"
  }' \
  2>&1 | grep -o '"imageUrl":"[^"]*"' | cut -d'"' -f4 > /tmp/slide3.txt

sleep 2

# 生成轮播图 4 - 葡萄酒
echo "[4/6] 生成葡萄酒轮播图..."
curl -X POST http://localhost:5000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "澳大利亚猎人谷葡萄酒展示，高端红酒瓶优雅摆放，背景是葡萄园和酒庄建筑，温暖色调，专业商业摄影，4K超高清，优雅奢华，展现国际品质",
    "size": "2K"
  }' \
  2>&1 | grep -o '"imageUrl":"[^"]*"' | cut -d'"' -f4 > /tmp/slide4.txt

sleep 2

# 生成轮播图 5 - 茶点
echo "[5/6] 生成茶点轮播图..."
curl -X POST http://localhost:5000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "九江心茶饼传统茶点展示，精致的圆形茶饼堆叠摆放，传统工艺质感，暖色调，专业商业摄影，4K超高清，诱人食欲，展现传统美食文化",
    "size": "2K"
  }' \
  2>&1 | grep -o '"imageUrl":"[^"]*"' | cut -d'"' -f4 > /tmp/slide5.txt

sleep 2

# 生成轮播图 6 - 小米
echo "[6/6] 生成小米轮播图..."
curl -X POST http://localhost:5000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "古龙小米特色产品展示，金黄色小米粒，传统陶瓷容器盛放，展现原生态特色，自然光线，专业商业摄影，4K超高清，颗粒分明，健康养生感",
    "size": "2K"
  }' \
  2>&1 | grep -o '"imageUrl":"[^"]*"' | cut -d'"' -f4 > /tmp/slide6.txt

echo -e "\n========== 生成完成 =========="
echo "轮播图 1: $(cat /tmp/slide1.txt)"
echo "轮播图 2: $(cat /tmp/slide2.txt)"
echo "轮播图 3: $(cat /tmp/slide3.txt)"
echo "轮播图 4: $(cat /tmp/slide4.txt)"
echo "轮播图 5: $(cat /tmp/slide5.txt)"
echo "轮播图 6: $(cat /tmp/slide6.txt)"
