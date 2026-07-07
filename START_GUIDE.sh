#!/bin/bash

echo "================================"
echo "   科栎雅网站快速启动脚本"
echo "================================"
echo ""

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录下运行此脚本"
    echo "   当前目录: $(pwd)"
    echo "   项目目录: /workspace/projects"
    exit 1
fi

echo "✅ 检测到项目文件"
echo ""

# 检查端口是否被占用
echo "🔍 检查端口 5000..."
if ss -tuln 2>/dev/null | grep -q ':5000.*LISTEN'; then
    echo "✅ 端口 5000 已有服务运行"
    echo ""
    echo "🌐 网站已在运行，请访问："
    echo "   http://localhost:5000"
    echo ""
    echo "💡 提示：修改代码后浏览器会自动刷新（热更新）"
else
    echo "🚀 启动开发服务器..."
    echo ""
    coze dev &

    # 等待服务启动
    echo "⏳ 等待服务启动..."
    for i in {1..10}; do
        if ss -tuln 2>/dev/null | grep -q ':5000.*LISTEN'; then
            echo "✅ 服务启动成功！"
            break
        fi
        sleep 2
    done

    echo ""
    echo "🌐 网站已启动，请访问："
    echo "   http://localhost:5000"
    echo ""
fi

echo ""
echo "================================"
echo "   📝 常用操作"
echo "================================"
echo ""
echo "📂 查看项目指南："
echo "   cat PROJECT_GUIDE.md"
echo ""
echo "🖼️  修改轮播图图片："
echo "   code src/components/hero-carousel.tsx"
echo ""
echo "📝 编辑其他页面："
echo "   code src/app/"
echo ""
echo "🔄 重启服务（如果需要）："
echo "   coze dev"
echo ""
echo "🛑 停止服务："
echo "   pkill -f 'coze dev'"
echo ""
echo "================================"
echo "   🎨 替换轮播图图片位置"
echo "================================"
echo ""
echo "📁 文件：src/components/hero-carousel.tsx"
echo ""
echo "📝 在第 8-30 行找到以下代码："
echo ""
echo "   const slides: SlideData[] = ["
echo "     {"
echo "       id: 1,"
echo "       image: \"url('YOUR_IMAGE_URL')\",  👈 替换这里"
echo "       title: '源自天然',"
echo "       subtitle: '臻于品质',"
echo "       ..."
echo "     },"
echo "     ..."
echo "   ];"
echo ""
echo "💡 提示：修改后保存，浏览器会自动刷新！"
echo ""
echo "================================"
