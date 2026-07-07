#!/bin/bash

# 生成科栎雅品牌故事背景图片

echo "开始生成科栎雅品牌背景图片..."

curl -X POST http://localhost:5000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "科栎雅KALEAH品牌形象，高端生态食品企业，展示山茶油、大米、葡萄酒、茶点等优质农产品，自然绿色调，专业商业摄影风格，纯净自然，优雅健康，体现生态食品企业的品质与专业感，光线柔和，构图优美，简洁大气，纯净无文字无标签",
    "size": "2K"
  }' \
  2>&1 | grep -o '"imageUrl":"[^"]*"' | cut -d'"' -f4 > /tmp/about-hero.txt

echo -e "\n========== 生成完成 =========="
echo "科栎雅品牌背景图: $(cat /tmp/about-hero.txt)"
