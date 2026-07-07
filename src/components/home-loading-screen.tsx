'use client';

import { useState, useEffect, type ReactNode } from 'react';

interface HomeLoadingScreenProps {
  children: ReactNode;
}

export default function HomeLoadingScreen({ children }: HomeLoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => setFadingOut(true), 2600);
    const hideTimer = setTimeout(() => setVisible(false), 3000);
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) {
    return <>{children}</>;
  }

  return (
    <>
      {/* 全屏遮罩 */}
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-green-50 via-green-50/90 to-amber-50/80 ${
          fadingOut ? 'animate-fadeOut' : ''
        }`}
        style={{
          animation: fadingOut ? 'fadeOut 0.4s ease forwards' : 'none',
        }}
      >
        {/* 大树动画容器 */}
        <div className="relative w-80 h-96 mb-10">
          {/* === 树冠 - 云朵状（多个椭圆叠加） === */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0" style={{ animation: 'treeGrow 2.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}>
            <svg width="240" height="200" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 树冠椭圆叠加 */}
              <defs>
                <radialGradient id="crownGrad1" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="60%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#16a34a" />
                </radialGradient>
                <radialGradient id="crownGrad2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#86efac" />
                  <stop offset="100%" stopColor="#22c55e" />
                </radialGradient>
                <radialGradient id="crownGrad3" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#15803d" />
                </radialGradient>
              </defs>

              {/* 底部大椭圆 */}
              <ellipse cx="120" cy="140" rx="100" ry="55" fill="url(#crownGrad1)" opacity="0.95" />
              {/* 中层椭圆 */}
              <ellipse cx="90" cy="100" rx="75" ry="50" fill="url(#crownGrad2)" opacity="0.9" />
              <ellipse cx="155" cy="105" rx="70" ry="48" fill="url(#crownGrad2)" opacity="0.85" />
              {/* 上层椭圆 */}
              <ellipse cx="120" cy="65" rx="65" ry="45" fill="url(#crownGrad3)" opacity="0.9" />
              <ellipse cx="80" cy="70" rx="50" ry="40" fill="url(#crownGrad2)" opacity="0.8" />
              <ellipse cx="165" cy="72" rx="48" ry="38" fill="url(#crownGrad2)" opacity="0.8" />
              {/* 顶部小椭圆 */}
              <ellipse cx="120" cy="35" rx="40" ry="30" fill="url(#crownGrad3)" opacity="0.95" />
              <ellipse cx="95" cy="40" rx="30" ry="25" fill="url(#crownGrad2)" opacity="0.75" />
              <ellipse cx="148" cy="42" rx="28" ry="24" fill="url(#crownGrad2)" opacity="0.75" />

              {/* 高光点缀 */}
              <ellipse cx="100" cy="55" rx="20" ry="15" fill="#86efac" opacity="0.4" />
              <ellipse cx="145" cy="80" rx="18" ry="12" fill="#86efac" opacity="0.35" />
              <ellipse cx="120" cy="100" rx="22" ry="16" fill="#bbf7d0" opacity="0.3" />
            </svg>
          </div>

          {/* === 树干 === */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0" style={{ animation: 'trunkGrow 2.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}>
            <svg width="60" height="160" viewBox="0 0 60 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#78350f" />
                  <stop offset="30%" stopColor="#92400e" />
                  <stop offset="60%" stopColor="#a16207" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>
              </defs>
              {/* 主树干 */}
              <path d="M22 0 Q20 60 18 100 Q14 140 10 160 L50 160 Q46 140 42 100 Q38 60 36 0 Z" fill="url(#trunkGrad)" />
              {/* 纹理线条 */}
              <line x1="25" y1="20" x2="27" y2="60" stroke="#78350f" strokeWidth="1.5" opacity="0.5" />
              <line x1="30" y1="10" x2="32" y2="80" stroke="#78350f" strokeWidth="1" opacity="0.4" />
              <line x1="35" y1="30" x2="33" y2="70" stroke="#78350f" strokeWidth="1.5" opacity="0.5" />
              <line x1="28" y1="70" x2="29" y2="130" stroke="#78350f" strokeWidth="2" opacity="0.4" />
              <line x1="33" y1="80" x2="32" y2="140" stroke="#78350f" strokeWidth="1.5" opacity="0.35" />
              {/* 根部 */}
              <path d="M10 160 Q5 155 0 160" stroke="url(#trunkGrad)" strokeWidth="8" fill="none" strokeLinecap="round" />
              <path d="M50 160 Q55 155 60 160" stroke="url(#trunkGrad)" strokeWidth="8" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          {/* === 飘落叶片 === */}
          <Leaf className="absolute top-20 left-8" delay="0.8s" />
          <Leaf className="absolute top-32 right-10" delay="1.3s" />
          <Leaf className="absolute top-48 left-14" delay="1.8s" />
          <Leaf className="absolute top-16 right-16" delay="1.0s" />
          <Leaf className="absolute top-40 left-4" delay="1.6s" />
          <Leaf className="absolute top-56 right-6" delay="2.0s" />
          <Leaf className="absolute top-10 left-12" delay="1.5s" />
          <Leaf className="absolute top-44 right-14" delay="0.9s" />
        </div>

        {/* 文字逐字显现 */}
        <TypewriterText text="扎根自然 · 净素健康" />
      </div>

      {/* 实际页面内容 */}
      <div style={{ visibility: fadingOut ? 'visible' : 'hidden' }}>{children}</div>

      <style jsx>{`
        @keyframes treeGrow {
          0% {
            transform: translate(-50%, 0) scale(0.3);
            opacity: 0;
          }
          40% {
            transform: translate(-50%, 0) scale(1.08);
            opacity: 1;
          }
          60% {
            transform: translate(-50%, 0) scale(0.95);
            opacity: 1;
          }
          80% {
            transform: translate(-50%, 0) scale(1.02);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, 0) scale(1);
            opacity: 1;
          }
        }

        @keyframes trunkGrow {
          0% {
            transform: translate(-50%, 0) scaleY(0);
            opacity: 0;
            transform-origin: bottom center;
          }
          50% {
            transform: translate(-50%, 0) scaleY(1.05);
            opacity: 1;
            transform-origin: bottom center;
          }
          70% {
            transform: translate(-50%, 0) scaleY(0.97);
            opacity: 1;
            transform-origin: bottom center;
          }
          100% {
            transform: translate(-50%, 0) scaleY(1);
            opacity: 1;
            transform-origin: bottom center;
          }
        }

        @keyframes leafFall {
          0% {
            transform: translateY(0) rotate(0deg) scale(0);
            opacity: 0;
          }
          15% {
            transform: translateY(15px) rotate(30deg) scale(1);
            opacity: 0.9;
          }
          30% {
            transform: translateY(40px) rotate(80deg) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translateY(80px) rotate(140deg) scale(0.9);
            opacity: 0.7;
          }
          70% {
            transform: translateY(140px) rotate(220deg) scale(0.8);
            opacity: 0.5;
          }
          85% {
            transform: translateY(200px) rotate(300deg) scale(0.6);
            opacity: 0.3;
          }
          100% {
            transform: translateY(280px) rotate(400deg) scale(0.3);
            opacity: 0;
          }
        }

        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; pointer-events: none; }
        }
      `}</style>
    </>
  );
}

/* 叶片组件 */
function Leaf({ className, delay }: { className: string; delay: string }) {
  return (
    <span
      className={className}
      style={{
        animation: `leafFall 2.5s ${delay} ease-in forwards`,
        display: 'inline-block',
        width: '16px',
        height: '16px',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 0C8 0 2 4 2 9C2 12.3 4.7 15 8 15C11.3 15 14 12.3 14 9C14 4 8 0 8 0Z"
          fill="#4ade80"
          opacity="0.8"
        />
        <line x1="8" y1="0" x2="8" y2="14" stroke="#22c55e" strokeWidth="0.8" opacity="0.5" />
      </svg>
    </span>
  );
}

/* 逐字显现文字 */
function TypewriterText({ text }: { text: string }) {
  const chars = text.split('');

  return (
    <div className="flex items-center justify-center">
      {chars.map((char, index) => (
        <span
          key={index}
          className="text-2xl md:text-3xl font-bold text-green-800"
          style={{
            animation: `charReveal 0.15s ${1.2 + index * 0.1}s ease-out both`,
            width: char === ' ' ? '0.5em' : 'auto',
            display: 'inline-block',
            textAlign: 'center',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
      <style jsx>{`
        @keyframes charReveal {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.5);
            filter: blur(4px);
          }
          60% {
            opacity: 1;
            transform: translateY(-2px) scale(1.05);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
      `}</style>
    </div>
  );
}