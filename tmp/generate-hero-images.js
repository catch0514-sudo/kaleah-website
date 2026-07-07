#!/usr/bin/env node

/**
 * 批量生成首页轮播图图片
 */

const slides = [
  {
    id: 1,
    prompt: '高端生态食品品牌形象展示，"科栎雅 KALEAH"品牌名称，展示山茶油、大米、葡萄酒、茶点、小米等优质农产品，自然绿色调，专业商业摄影风格，4K超高清，光线柔和，构图优美，简洁大气'
  },
  {
    id: 2,
    prompt: '三清山山茶油产品展示，清澈的金黄色山茶油在精致玻璃瓶中，背景是三清山绿色山脉自然风光，绿色调为主，高品质商业摄影，4K超高清，光线明亮，产品突出'
  },
  {
    id: 3,
    prompt: '东北生态大米产品展示，晶莹剔透的有机大米，背景是东北黑土地稻田和金色稻穗，自然光线，专业商业摄影，4K超高清，质感细腻，展现生态农业'
  },
  {
    id: 4,
    prompt: '澳大利亚猎人谷葡萄酒展示，高端红酒瓶优雅摆放，背景是葡萄园和酒庄建筑，温暖色调，专业商业摄影，4K超高清，优雅奢华，展现国际品质'
  },
  {
    id: 5,
    prompt: '九江心茶饼传统茶点展示，精致的圆形茶饼堆叠摆放，传统工艺质感，暖色调，专业商业摄影，4K超高清，诱人食欲，展现传统美食文化'
  },
  {
    id: 6,
    prompt: '古龙小米特色产品展示，金黄色小米粒，传统陶瓷容器盛放，展现原生态特色，自然光线，专业商业摄影，4K超高清，颗粒分明，健康养生感'
  }
];

async function generateImage(prompt, id) {
  try {
    console.log(`正在生成轮播图 ${id}...`);
    
    const response = await fetch('http://localhost:5000/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size: '2K'
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log(`✅ 轮播图 ${id} 生成成功: ${result.imageUrl}`);
      return { id, imageUrl: result.imageUrl };
    } else {
      console.error(`❌ 轮播图 ${id} 生成失败:`, result.error);
      return { id, error: result.error };
    }
  } catch (error) {
    console.error(`❌ 轮播图 ${id} 生成异常:`, error.message);
    return { id, error: error.message };
  }
}

async function main() {
  console.log('开始生成首页轮播图...\n');
  
  const results = [];
  
  for (const slide of slides) {
    const result = await generateImage(slide.prompt, slide.id);
    results.push(result);
    
    // 等待1秒再生成下一张，避免请求过于频繁
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n========== 生成结果 ==========');
  results.forEach(result => {
    if (result.imageUrl) {
      console.log(`\n轮播图 ${result.id}:`);
      console.log(`  URL: ${result.imageUrl}`);
    } else {
      console.log(`\n轮播图 ${result.id}: 失败 - ${result.error}`);
    }
  });
  
  // 保存结果到 JSON 文件
  const fs = require('fs');
  fs.writeFileSync(
    '/tmp/hero-images-result.json',
    JSON.stringify(results, null, 2)
  );
  console.log('\n结果已保存到 /tmp/hero-images-result.json');
}

main().catch(console.error);
