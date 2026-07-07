# 科栎雅网站开发指南

## 📁 项目目录结构

```
/workspace/projects/
│
├── src/
│   ├── app/                          # 页面和路由目录
│   │   ├── about/                    # 关于我们页面
│   │   │   └── page.tsx
│   │   ├── bases/                    # 生态基地页面
│   │   │   └── page.tsx
│   │   ├── contact/                  # 联系我们页面
│   │   │   └── page.tsx
│   │   ├── news/                     # 新闻模块
│   │   │   ├── page.tsx             # 新闻列表
│   │   │   └── [id]/                # 新闻详情（动态路由）
│   │   │       └── page.tsx
│   │   ├── products/                 # 产品中心页面
│   │   │   └── page.tsx
│   │   ├── layout.tsx                # 全局布局
│   │   ├── page.tsx                  # 首页 ⭐
│   │   ├── globals.css               # 全局样式
│   │   └── favicon.ico               # 网站图标
│   │
│   ├── components/                   # 组件目录 ⭐
│   │   ├── hero-carousel.tsx         # 轮播图组件 ⭐⭐⭐（需要替换图片的文件）
│   │   ├── navigation.tsx            # 导航栏组件
│   │   ├── footer.tsx                # 页脚组件
│   │   └── ui/                       # shadcn/ui 组件库
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       └── ...                   # 其他UI组件
│   │
│   ├── lib/                          # 工具函数
│   │   └── utils.ts
│   │
│   └── hooks/                        # 自定义 hooks
│       └── use-mobile.ts
│
├── public/                           # 静态资源目录 ⭐
│   ├── file.svg
│   ├── globe.svg
│   └── ...                          # 可以在这里放置本地图片
│
├── .coze                             # 项目配置文件
├── package.json                      # 项目依赖
├── tsconfig.json                     # TypeScript配置
└── tailwind.config.ts                # Tailwind CSS配置
```

## 🖼️ 如何替换轮播图图片

### 方法一：直接修改轮播图组件（推荐）

**文件位置**: `src/components/hero-carousel.tsx`

**步骤**:

1. **打开文件**
   ```bash
   code src/components/hero-carousel.tsx
   ```

2. **找到幻灯片数据**（第8-30行）
   ```typescript
   const slides: SlideData[] = [
     {
       id: 1,
       image: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&q=80')", // 👈 替换这个URL
       title: '源自天然',
       subtitle: '臻于品质',
       description: '科栎雅专注于精选全球优质原产地生态食品，传递健康生活理念',
     },
     {
       id: 2,
       image: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')", // 👈 替换这个URL
       title: '三清山山茶油',
       subtitle: '一级冷压榨',
       description: '来自世界自然遗产地，纯净天然，营养丰富',
     },
     {
       id: 3,
       image: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80')", // 👈 替换这个URL
       title: '东北生态大米',
       subtitle: '黑土地直供',
       description: '来自东北平原黄金水稻带，口感绵软香甜',
     },
     {
       id: 4,
       image: "url('https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=80')", // 👈 替换这个URL
       title: '澳大利亚葡萄酒',
       subtitle: '猎人谷精选',
       description: 'Mercer Wines 优质酒庄，品味自然风土',
     },
   ];
   ```

3. **替换图片URL**

   **选项A: 使用在线图片URL**
   ```typescript
   image: "url('https://your-image-url.com/image.jpg')",
   ```

   **选项B: 使用本地图片**

   1. 将图片放入 `public/` 目录，例如：`public/slide1.jpg`
   2. 修改代码：
   ```typescript
   image: "url('/slide1.jpg')",
   ```

   **选项C: 使用对象存储URL**
   ```typescript
   image: "url('https://your-bucket.oss.com/slide1.jpg')",
   ```

4. **保存文件**

   修改后保存，网站会自动热更新，无需重启！

---

### 方法二：使用本地图片文件夹

**步骤**:

1. **创建图片文件夹**
   ```bash
   mkdir -p public/images/hero
   ```

2. **放入图片**
   ```
   public/images/hero/
   ├── slide1.jpg    # 第一张图片
   ├── slide2.jpg    # 第二张图片
   ├── slide3.jpg    # 第三张图片
   └── slide4.jpg    # 第四张图片
   ```

3. **修改组件代码**

   打开 `src/components/hero-carousel.tsx`，修改图片路径：

   ```typescript
   const slides: SlideData[] = [
     {
       id: 1,
       image: "url('/images/hero/slide1.jpg')",  // 本地路径
       title: '源自天然',
       subtitle: '臻于品质',
       description: '科栎雅专注于精选全球优质原产地生态食品，传递健康生活理念',
     },
     {
       id: 2,
       image: "url('/images/hero/slide2.jpg')",  // 本地路径
       title: '三清山山茶油',
       subtitle: '一级冷压榨',
       description: '来自世界自然遗产地，纯净天然，营养丰富',
     },
     {
       id: 3,
       image: "url('/images/hero/slide3.jpg')",  // 本地路径
       title: '东北生态大米',
       subtitle: '黑土地直供',
       description: '来自东北平原黄金水稻带，口感绵软香甜',
     },
     {
       id: 4,
       image: "url('/images/hero/slide4.jpg')",  // 本地路径
       title: '澳大利亚葡萄酒',
       subtitle: '猎人谷精选',
       description: 'Mercer Wines 优质酒庄，品味自然风土',
     },
   ];
   ```

---

## 🚀 如何运行项目

### 方式一：使用 VS Code（推荐）

1. **打开项目文件夹**
   ```bash
   cd /workspace/projects
   code .
   ```

2. **打开终端**
   - 快捷键：`Ctrl + ~`（波浪号）
   - 或菜单：`终端` → `新建终端`

3. **启动开发服务器**
   ```bash
   coze dev
   ```

4. **访问网站**
   - 打开浏览器访问：**http://localhost:5000**

5. **修改代码**
   - 修改任何代码文件后，浏览器会自动刷新（热更新）
   - 无需重启服务器！

---

### 方式二：使用命令行

```bash
# 进入项目目录
cd /workspace/projects

# 启动开发服务器
coze dev

# 访问 http://localhost:5000
```

---

### 方式三：查看当前运行状态

```bash
# 检查端口是否被占用
ss -tuln | grep 5000

# 如果显示有服务在运行，直接访问即可
# 如果没有运行，执行：
coze dev
```

---

## 🎨 轮播图功能说明

### 当前实现的功能

- ✅ **4张图片自动轮播**：每5秒自动切换
- ✅ **手动切换**：左右箭头按钮
- ✅ **指示器**：底部圆点指示当前图片
- ✅ **点击切换**：点击指示器直接跳转
- ✅ **平滑过渡**：淡入淡出动画效果
- ✅ **响应式设计**：适配不同屏幕尺寸
- ✅ **触摸支持**：支持移动端滑动（可扩展）

### 可调整的参数

在 `src/components/hero-carousel.tsx` 中可以修改：

```typescript
// 修改轮播间隔（毫秒）
useEffect(() => {
  const timer = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, 5000); // 👈 修改这个值，例如 3000 = 3秒，10000 = 10秒
  return () => clearInterval(timer);
}, []);

// 修改轮播图高度
<section className="relative h-[600px] md:h-[700px] overflow-hidden">
  // 👈 h-[600px] = 移动端高度
  // 👈 md:h-[700px] = 桌面端高度
```

---

## 📝 其他页面的图片替换

### 产品中心图片

**文件位置**: `src/app/products/page.tsx`

找到产品数据中的 `image` 字段并替换：

```typescript
const products = {
  'tea-oil': [
    {
      id: 1,
      name: '三清山一级冷压榨山茶油',
      image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&q=80', // 👈 替换这里
      // ...
    },
  ],
  // ...
};
```

### 生态基地图片

**文件位置**: `src/app/bases/page.tsx`

找到 `backgroundImage` 样式并替换：

```typescript
<div
  className="h-80 rounded-2xl bg-cover bg-center"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80')", // 👈 替换这里
  }}
></div>
```

### 新闻页面图片

**文件位置**: `src/app/news/page.tsx`

找到新闻数据中的 `image` 字段并替换：

```typescript
const news = [
  {
    id: 1,
    title: '科栎雅三清山山茶油荣获国际有机认证',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', // 👈 替换这里
    // ...
  },
];
```

---

## 🔍 图片尺寸建议

为了获得最佳显示效果，建议使用以下图片尺寸：

| 位置 | 宽度 | 高度 | 格式 | 文件大小 |
|------|------|------|------|----------|
| 轮播图 | 1920px | 1080px | JPG/PNG | < 500KB |
| 产品图片 | 600px | 600px | JPG/PNG | < 200KB |
| 基地图片 | 800px | 600px | JPG/PNG | < 300KB |
| 新闻图片 | 800px | 500px | JPG/PNG | < 250KB |

**建议**:
- 使用 JPG 格式适合照片类图片
- 使用 PNG 格式适合图标和透明背景图片
- 压缩图片以减少加载时间

---

## 🛠️ 常用命令

```bash
# 开发模式（支持热更新）
coze dev

# 构建生产版本
coze build

# 启动生产服务器
coze start

# 安装依赖
pnpm install

# 添加新依赖
pnpm add <package-name>

# 移除依赖
pnpm remove <package-name>

# 类型检查
npx tsc --noEmit
```

---

## ❓ 常见问题

### Q1: 修改图片后没有更新？

**A**: 刷新浏览器页面（Ctrl + F5 强制刷新），或者检查图片路径是否正确。

### Q2: 图片加载失败？

**A**:
- 检查图片URL是否正确
- 如果是本地图片，确保文件在 `public/` 目录下
- 检查图片格式是否支持（JPG, PNG, GIF, WebP）

### Q3: 如何调整轮播速度？

**A**: 修改 `src/components/hero-carousel.tsx` 中的 `5000`（5秒）为其他值。

### Q4: 如何添加更多轮播图片？

**A**: 在 `slides` 数组中添加更多对象，最多建议6-8张。

---

## 📞 技术支持

如有问题，请检查：
1. 终端是否有错误信息
2. 浏览器控制台（F12）是否有错误
3. 确保所有依赖已安装：`pnpm install`

---

**祝您使用愉快！** 🎉
