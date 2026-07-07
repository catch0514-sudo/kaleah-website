# 🎯 轮播图优化完成 - 操作指南

## ✅ 已完成的工作

1. ✅ 创建了专业的轮播图组件（支持6张图片）
2. ✅ 实现自动轮播（每5秒切换）
3. ✅ 添加左右箭头导航
4. ✅ 添加底部指示器（点击可跳转）
5. ✅ 平滑的淡入淡出动画效果
6. ✅ 完全响应式设计
7. ✅ 集成到首页并测试通过

---

## 📂 关键文件位置

### 需要替换图片的文件

```
src/components/hero-carousel.tsx  ⭐⭐⭐ 轮播图图片
```

### 其他可能需要修改图片的文件

```
src/app/products/page.tsx        产品图片
src/app/bases/page.tsx           生态基地图片
src/app/news/page.tsx            新闻图片
```

---

## 🚀 如何运行项目

### 方法一：使用快速启动脚本（最简单）

```bash
cd /workspace/projects
./START_GUIDE.sh
```

然后访问：**http://localhost:5000**

---

### 方法二：使用 VS Code

1. **打开项目**
   ```bash
   cd /workspace/projects
   code .
   ```

2. **打开终端**
   - 快捷键：`Ctrl + ~`

3. **启动服务**
   ```bash
   coze dev
   ```

4. **访问网站**
   - 浏览器打开：http://localhost:5000

---

### 方法三：命令行

```bash
cd /workspace/projects
coze dev
```

访问：**http://localhost:5000**

---

## 🖼️ 如何替换轮播图图片

### 步骤详解

#### 1️⃣ 打开轮播图组件文件

在 VS Code 中打开：
```bash
code src/components/hero-carousel.tsx
```

#### 2️⃣ 找到图片数据位置

**文件位置**：`src/components/hero-carousel.tsx`

**行号**：第 8-45 行

**代码示例**（共6张图片）：
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
  {
    id: 5,
    image: "url('https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1920&q=80')", // 👈 替换这个URL
    title: '特色茶点',
    subtitle: '九江心茶饼',
    description: '传统工艺制作，使用自产山茶油，酥脆香甜，回味无穷',
  },
  {
    id: 6,
    image: "url('https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1920&q=80')", // 👈 替换这个URL
    title: '古龙小米',
    subtitle: '醇香糯滑',
    description: '来自古龙特色产区，营养丰富，传统健康养生食材',
  },
];
```

#### 3️⃣ 替换图片URL

**选项 A：使用在线图片URL**

```typescript
image: "url('https://your-domain.com/image.jpg')",
```

**选项 B：使用本地图片**

1. 将图片放到 `public/` 目录，例如：`public/slide1.jpg`
2. 修改代码：
```typescript
image: "url('/slide1.jpg')",
```

**选项 C：使用对象存储**

```typescript
image: "url('https://your-bucket.oss-cn-region.aliyuncs.com/image.jpg')",
```

#### 4️⃣ 保存文件

修改完成后保存文件（Ctrl + S），浏览器会自动刷新，无需重启服务器！

---

## 🎨 轮播图图片尺寸建议

为了获得最佳显示效果，建议使用以下规格：

| 属性 | 推荐值 |
|------|--------|
| 宽度 | 1920px |
| 高度 | 1080px |
| 格式 | JPG 或 PNG |
| 文件大小 | < 500KB |
| 比例 | 16:9 |

**图片命名建议**：
- `slide1.jpg` - 品牌形象
- `slide2.jpg` - 山茶油产品
- `slide3.jpg` - 大米产品
- `slide4.jpg` - 葡萄酒产品
- `slide5.jpg` - 茶点产品
- `slide6.jpg` - 小米产品

---

## ⚙️ 轮播图配置调整

### 修改轮播速度

**文件**：`src/components/hero-carousel.tsx`

**位置**：第 34 行

```typescript
useEffect(() => {
  const timer = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, 5000); // 👈 修改这个值（毫秒）
  // 3000 = 3秒
  // 5000 = 5秒
  // 10000 = 10秒
  return () => clearInterval(timer);
}, []);
```

### 修改轮播图高度

**文件**：`src/components/hero-carousel.tsx`

**位置**：第 71 行

```typescript
<section className="relative h-[600px] md:h-[700px] overflow-hidden">
  // h-[600px] = 移动端高度
  // md:h-[700px] = 桌面端高度
</section>
```

---

## 📝 修改文字内容

在 `src/components/hero-carousel.tsx` 中，每个幻灯片都有以下可修改的字段：

```typescript
{
  id: 1,
  image: "...",                    // 图片URL
  title: '源自天然',                // 主标题
  subtitle: '臻于品质',             // 副标题
  description: '科栎雅...',        // 描述文字
}
```

---

## 🌐 访问网站

启动后访问以下地址：

- **本地**：http://localhost:5000
- **首页**：http://localhost:5000
- **关于我们**：http://localhost:5000/about
- **生态基地**：http://localhost:5000/bases
- **产品中心**：http://localhost:5000/products
- **品牌故事**：http://localhost:5000/news
- **联系我们**：http://localhost:5000/contact

---

## 📚 相关文档

- **完整指南**：`PROJECT_GUIDE.md`
- **快速启动**：`README.md`
- **启动脚本**：`START_GUIDE.sh`

---

## 🔍 测试验证

### 检查服务是否运行

```bash
# 检查端口
ss -tuln | grep 5000

# 或使用curl测试
curl -I http://localhost:5000
```

### 检查类型错误

```bash
npx tsc --noEmit
```

---

## ❓ 常见问题

### Q1: 修改图片后没有更新？

**解决方案**：
1. 刷新浏览器（Ctrl + F5 强制刷新）
2. 检查图片URL是否正确
3. 查看浏览器控制台（F12）是否有错误

### Q2: 轮播图不自动切换？

**解决方案**：
1. 检查浏览器是否启用了JavaScript
2. 检查控制台是否有错误
3. 确认文件已保存

### Q3: 如何添加更多轮播图片？

**解决方案**：
在 `slides` 数组中添加更多对象：

```typescript
{
  id: 7,  // 注意：id 需要唯一且递增
  image: "url('YOUR_IMAGE')",
  title: '新标题',
  subtitle: '新副标题',
  description: '新描述',
}
```

**注意**：
- id 必须唯一
- 建议保持图片数量在 6-10 张之间，过多会影响加载速度
- 可以根据需要调整轮播速度

### Q4: 图片加载慢？

**解决方案**：
1. 压缩图片文件大小
2. 使用CDN加速
3. 使用WebP格式

---

## 🎉 完成！

现在您可以：

1. ✅ 访问 http://localhost:5000 查看网站
2. ✅ 编辑 `src/components/hero-carousel.tsx` 替换图片
3. ✅ 修改文字内容
4. ✅ 调整轮播速度
5. ✅ 添加更多图片

**热更新已启用**：修改代码后浏览器会自动刷新！

---

## 💡 下一步建议

1. 将6张轮播图替换为真实的产品图片
2. 根据需要调整轮播速度（默认5秒）
3. 替换产品中心的图片
4. 替换生态基地的图片
5. 更新联系信息为真实数据

---

**祝您使用愉快！** 🚀🎨
