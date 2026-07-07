# 科栎雅（KALEAH）官方网站

## 🚀 快速开始

### 一键启动
```bash
./START_GUIDE.sh
```

### 手动启动
```bash
cd /workspace/projects
coze dev
```

访问网站：**http://localhost:5000**

---

## 📖 项目结构

```
src/
├── app/                    # 页面
│   ├── page.tsx           # 首页 ⭐
│   ├── about/             # 关于我们
│   ├── bases/             # 生态基地
│   ├── products/          # 产品中心
│   ├── news/              # 品牌故事
│   └── contact/           # 联系我们
├── components/
│   ├── hero-carousel.tsx  # 轮播图组件 ⭐⭐⭐
│   ├── navigation.tsx     # 导航栏
│   └── footer.tsx         # 页脚
└── lib/                   # 工具函数
```

---

## 🖼️ 替换轮播图图片（6张）

**位置**：`src/components/hero-carousel.tsx`

**当前配置**：6张轮播图（可扩展到更多）

**步骤**：

1. 打开文件
   ```bash
   code src/components/hero-carousel.tsx
   ```

2. 找到第 8-45 行的 `slides` 数组

3. 替换图片URL
   ```typescript
   const slides: SlideData[] = [
     {
       id: 1,
       image: "url('YOUR_IMAGE_URL')",  // 👈 替换这里
       title: '源自天然',
       subtitle: '臻于品质',
       description: '科栎雅专注于精选全球优质原产地生态食品',
     },
     // ... 其他5张图片
   ];
   ```

4. 保存文件，浏览器会自动刷新！

**图片支持**：
- ✅ 在线URL：`https://example.com/image.jpg`
- ✅ 本地图片：`/images/slide1.jpg`（放在 `public/` 目录）
- ✅ 对象存储：`https://bucket.oss.com/image.jpg`

---

## 🎨 轮播图功能

- ✅ **6张图片**自动轮播（每5秒）
- ✅ 左右箭头手动切换
- ✅ 底部指示器点击切换
- ✅ 平滑淡入淡出效果
- ✅ 完全响应式设计

**调整速度**：在 `hero-carousel.tsx` 中修改 `5000`（毫秒）

---

## 📝 其他页面图片替换

### 产品中心
`src/app/products/page.tsx` → 修改产品数据中的 `image` 字段

### 生态基地
`src/app/bases/page.tsx` → 修改 `backgroundImage` 样式

### 新闻页面
`src/app/news/page.tsx` → 修改新闻数据中的 `image` 字段

---

## 🛠️ 常用命令

```bash
coze dev          # 启动开发服务器
coze build        # 构建生产版本
coze start        # 启动生产服务器
pnpm install      # 安装依赖
npx tsc --noEmit  # 类型检查
```

---

## 📖 详细文档

查看完整指南：`PROJECT_GUIDE.md`

---

## 💡 开发提示

1. **热更新**：修改代码后浏览器会自动刷新，无需重启
2. **端口**：默认运行在 5000 端口
3. **图片尺寸**：建议轮播图 1920x1080px，产品图片 600x600px
4. **VS Code**：使用 `code .` 打开项目

---

## ❓ 常见问题

### 修改图片后不更新？
- 刷新浏览器（Ctrl + F5）
- 检查图片路径是否正确

### 如何调整轮播速度？
修改 `hero-carousel.tsx` 中的 `5000`（毫秒）

### 添加更多轮播图片？
在 `slides` 数组中添加更多对象

---

## 🌐 技术栈

- Next.js 16 (App Router)
- TypeScript 5
- Tailwind CSS 4
- shadcn/ui

---

**祝您使用愉快！** 🎉
