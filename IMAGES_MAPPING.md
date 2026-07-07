# 🖼️ 轮播图图片对应关系

## 📊 快速查看表

| 序号 | 轮播图位置 | 文件名 | 原始文件 | 主题 | 大小 |
|:----:|-----------|--------|----------|------|------|
| 1 | 第1张 | slide1-brand.png | assets/01.png | 品牌形象 | 1.7M |
| 2 | 第2张 | slide2-teaoil.png | assets/产品展示-山茶油.png | 山茶油 | 5.3M |
| 3 | 第3张 | slide3-rice.png | assets/产品展示-东北大米.png | 大米 | 6.4M |
| 4 | 第4张 | slide4-wine.png | assets/产品展示-Mercer Wines.png | 葡萄酒 | 4.6M |
| 5 | 第5张 | slide5-teacake.png | assets/产品展示-山茶油茶饼.png | 茶饼 | 5.0M |
| 6 | 第6张 | slide6-millet.png | assets/产品展示-东北古龙小米.png | 小米 | 5.6M |

---

## 🎨 轮播图详细信息

### 📌 第1张轮播图 - 品牌形象

```
文件名：slide1-brand.png
原始文件：assets/01.png
大小：1.7M
用途：展示科栎雅品牌形象
```

**显示文字**：
- 标题：源自天然
- 副标题：臻于品质
- 描述：科栎雅专注于精选全球优质原产地生态食品，传递健康生活理念

---

### 📌 第2张轮播图 - 山茶油

```
文件名：slide2-teaoil.png
原始文件：assets/产品展示-山茶油.png
大小：5.3M
用途：展示三清山山茶油产品
```

**显示文字**：
- 标题：三清山山茶油
- 副标题：一级冷压榨
- 描述：来自世界自然遗产地，纯净天然，营养丰富

---

### 📌 第3张轮播图 - 大米

```
文件名：slide3-rice.png
原始文件：assets/产品展示-东北大米.png
大小：6.4M
用途：展示东北生态大米产品
```

**显示文字**：
- 标题：东北生态大米
- 副标题：黑土地直供
- 描述：来自东北平原黄金水稻带，口感绵软香甜

---

### 📌 第4张轮播图 - 葡萄酒

```
文件名：slide4-wine.png
原始文件：assets/产品展示-Mercer Wines.png
大小：4.6M
用途：展示澳大利亚葡萄酒产品
```

**显示文字**：
- 标题：澳大利亚葡萄酒
- 副标题：猎人谷精选
- 描述：Mercer Wines 优质酒庄，品味自然风土

---

### 📌 第5张轮播图 - 茶饼

```
文件名：slide5-teacake.png
原始文件：assets/产品展示-山茶油茶饼.png
大小：5.0M
用途：展示九江心茶饼产品
```

**显示文字**：
- 标题：特色茶点
- 副标题：九江心茶饼
- 描述：传统工艺制作，使用自产山茶油，酥脆香甜，回味无穷

---

### 📌 第6张轮播图 - 小米

```
文件名：slide6-millet.png
原始文件：assets/产品展示-东北古龙小米.png
大小：5.6M
用途：展示古龙小米产品
```

**显示文字**：
- 标题：古龙小米
- 副标题：醇香糯滑
- 描述：来自古龙特色产区，营养丰富，传统健康养生食材

---

## 📂 目录结构图

```
项目根目录/
│
├── assets/                          # 原始图片位置
│   ├── 01.png                      → slide1-brand.png
│   ├── 产品展示-Mercer Wines.png    → slide4-wine.png
│   ├── 产品展示-东北古龙小米.png    → slide6-millet.png
│   ├── 产品展示-东北大米.png        → slide3-rice.png
│   ├── 产品展示-山茶油.png          → slide2-teaoil.png
│   └── 产品展示-山茶油茶饼.png      → slide5-teacake.png
│
├── public/
│   └── images/
│       └── hero/                   # 轮播图图片（实际使用）
│           ├── slide1-brand.png    ✅ 第1张
│           ├── slide2-teaoil.png   ✅ 第2张
│           ├── slide3-rice.png     ✅ 第3张
│           ├── slide4-wine.png     ✅ 第4张
│           ├── slide5-teacake.png  ✅ 第5张
│           └── slide6-millet.png   ✅ 第6张
│
└── src/
    └── components/
        └── hero-carousel.tsx       # 轮播图组件
```

---

## 🔗 图片映射关系

```
assets/01.png ──────────────────→ slide1-brand.png  ────→ 第1张（品牌形象）
                                                              ↓
assets/产品展示-山茶油.png ────────→ slide2-teaoil.png ────→ 第2张（山茶油）
                                                              ↓
assets/产品展示-东北大米.png ──────→ slide3-rice.png ──────→ 第3张（大米）
                                                              ↓
assets/产品展示-Mercer Wines.png ──→ slide4-wine.png ──────→ 第4张（葡萄酒）
                                                              ↓
assets/产品展示-山茶油茶饼.png ────→ slide5-teacake.png ───→ 第5张（茶饼）
                                                              ↓
assets/产品展示-东北古龙小米.png ─→ slide6-millet.png ────→ 第6张（小米）
```

---

## 💡 如何单独查看每张图片

### 方法1：直接访问URL

在浏览器中打开以下链接查看单张图片：

```
http://localhost:5000/images/hero/slide1-brand.png
http://localhost:5000/images/hero/slide2-teaoil.png
http://localhost:5000/images/hero/slide3-rice.png
http://localhost:5000/images/hero/slide4-wine.png
http://localhost:5000/images/hero/slide5-teacake.png
http://localhost:5000/images/hero/slide6-millet.png
```

### 方法2：使用命令行查看

```bash
# 查看文件信息
ls -lh public/images/hero/

# 查看文件大小统计
du -sh public/images/hero/
```

---

## 🔧 如何修改轮播图顺序

如果需要调整轮播图的显示顺序，修改 `src/components/hero-carousel.tsx`：

```typescript
const slides: SlideData[] = [
  {
    id: 1,  // 👈 改变这个数字来调整顺序
    image: "url('/images/hero/slide1-brand.png')",
    // ...
  },
  // ...
];
```

**注意**：
- `id` 必须唯一且递增
- 改变 `id` 不会影响轮播顺序
- 轮播顺序由数组中的位置决定
- 要调整顺序，只需移动数组元素的位置

---

## 📐 图片尺寸建议

如果将来需要制作新图片，建议使用以下规格：

| 用途 | 宽度 | 高度 | 比例 | 格式 | 大小 |
|------|------|------|------|------|------|
| 轮播图 | 1920px | 1080px | 16:9 | PNG/JPG | < 2MB |

**当前图片**：均为 PNG 格式，大小 1.7M - 6.4M

---

## ✅ 验证清单

- [x] 所有6张图片已复制到 public/images/hero/
- [x] 文件名已重命名为便于管理的英文名
- [x] 轮播图组件已更新使用新图片
- [x] 所有图片路径正确
- [x] TypeScript 类型检查通过
- [x] 服务正常运行

---

## 🎯 总结

| 项目 | 状态 |
|------|------|
| 图片替换 | ✅ 完成 |
| 文件重命名 | ✅ 完成 |
| 组件更新 | ✅ 完成 |
| 类型检查 | ✅ 通过 |
| 服务运行 | ✅ 正常 |

**现在访问 http://localhost:5000 即可看到6张真实产品轮播图！** 🎉

---

**最后更新**：刚刚完成
