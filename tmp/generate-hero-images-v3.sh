#!/bin/bash

# 生成轮播图v3

echo "开始生成轮播图v3..."

# 生成轮播图 1 - 三清山山脉
echo -e "\n[1/4] 生成三清山山脉图片..."
curl -X POST http://localhost:5000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "江西三清山山脉壮观景观，云雾缭绕的峰峦叠嶂，青翠欲滴的原始森林，世界自然遗产地，绿色自然风光，专业风光摄影，4K超高清，光线穿透云层，层次分明，纯净无文字",
    "size": "2K"
  }' \
  2>&1 | grep -o '"imageUrl":"[^"]*"' | cut -d'"' -f4 > /tmp/slide1-v3.txt

sleep 2

# 生成轮播图 2 - 山茶油从山巅流下
echo "[2/4] 生成山茶油从山巅流下..."
curl -X POST http://localhost:5000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "金黄色山茶油从三清山山巅缓缓流下，与绿色山峦完美融合，天然山茶油流淌在岩石和青苔上，体现山茶油与自然高山的结合，绿色调为主，商业摄影风格，4K超高清，纯净无文字，无包装无瓶子",
    "size": "2K"
  }' \
  2>&1 | grep -o '"imageUrl":"[^"]*"' | cut -d'"' -f4 > /tmp/slide2-v3.txt

sleep 2

# 生成轮播图 4 - 庐山古籍历史风
echo "[3/4] 生成庐山古籍历史风..."
curl -X POST http://localhost:5000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "庐山风光，古籍历史风格，展现庐山的深厚历史文化底蕴，古建筑与山水相映，古老茶饼文化传承，水墨画风格，泛黄古籍质感，传统中国画意境，4K超高清，艺术感强烈，体现历史悠久，纯净无文字",
    "size": "2K"
  }' \
  2>&1 | grep -o '"imageUrl":"[^"]*"' | cut -d'"' -f4 > /tmp/slide4-v3.txt

sleep 2

# 生成轮播图 6 - 澳大利亚葡萄园
echo "[4/4] 生成澳大利亚葡萄园..."
curl -X POST http://localhost:5000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "澳大利亚猎人谷葡萄园广阔景观，绿色葡萄藤蔓延起伏，远山蓝天，阳光透过葡萄叶，展现世界级葡萄酒产区风貌，专业风光摄影，4K超高清，自然光线，纯净无文字，展现国际品质",
    "size": "2K"
  }' \
  2>&1 | grep -o '"imageUrl":"[^"]*"' | cut -d'"' -f4 > /tmp/slide6-v3.txt

echo -e "\n========== 生成完成 =========="
echo "轮播图 1（三清山山脉）: $(cat /tmp/slide1-v3.txt)"
echo "轮播图 2（山茶油流下）: $(cat /tmp/slide2-v3.txt)"
echo "轮播图 4（庐山古籍）: $(cat /tmp/slide4-v3.txt)"
echo "轮播图 6（葡萄园）: $(cat /tmp/slide6-v3.txt)"
