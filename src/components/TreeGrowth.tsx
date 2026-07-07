'use client';

import { useState, useEffect } from 'react';

export default function TreeGrowth() {
  const slogan = '扎根自然 · 净素健康'.split('');
  const [leaves, setLeaves] = useState<Array<{ startX: number; startY: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const leafData = Array.from({ length: 12 }, () => ({
      startX: 20 + Math.random() * 60,
      startY: 10 + Math.random() * 30,
      size: 6 + Math.random() * 10,
      duration: 2.8 + Math.random() * 1.2,
      delay: 0.6 + Math.random() * 0.8,
    }));
    setLeaves(leafData);
  }, []);

  return (
    <>
      <style>{`
        @keyframes trunkGrow {
          0% { transform: scaleY(0); opacity: 0.5; }
          100% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes crownGrow {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes highlightFade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes rootGrow {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes leafFloat {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translate(var(--dx), 120px) rotate(360deg); opacity: 0; }
        }
        @keyframes fadeInChar {
          0% { opacity: 0; transform: translateY(8px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes softBreathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-softBreathe {
          animation: softBreathe 4s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#f2f6f2] via-[#e6ede6] to-[#d9e0d9]">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-200/15 blur-3xl" />

        <div className="relative w-72 h-80 animate-softBreathe">
          {/* 树干 */}
          <div
            className="absolute bottom-0 left-1/2 w-8 -translate-x-1/2 origin-bottom"
            style={{
              height: '55%',
              background: 'linear-gradient(to top, #4A3A2A, #6B5A4A)',
              borderRadius: '6px 6px 0 0',
              boxShadow: 'inset -2px 0 8px rgba(0,0,0,0.2), inset 2px 0 8px rgba(255,255,240,0.15)',
              animation: 'trunkGrow 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              transformOrigin: 'bottom',
              transform: 'scaleY(0)',
              willChange: 'transform',
            }}
          >
            <div className="absolute top-[20%] left-0 w-full h-[2px] bg-[#3A2A1A]/30" />
            <div className="absolute top-[45%] left-0 w-full h-[2px] bg-[#3A2A1A]/25" />
            <div className="absolute top-[70%] left-0 w-full h-[2px] bg-[#3A2A1A]/20" />
          </div>

          {/* 云朵状树冠 */}
          <div
            className="absolute bottom-[28%] left-1/2 -translate-x-1/2"
            style={{
              width: '210px',
              height: '150px',
              background: 'radial-gradient(ellipse at 40% 35%, #B5CFB5, #6B8F6B)',
              borderRadius: '50%',
              boxShadow: 'inset -10px -10px 30px rgba(46, 70, 46, 0.25), 0 10px 40px rgba(107, 143, 107, 0.15)',
              animation: 'crownGrow 0.7s 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              transform: 'scale(0)',
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          />
          <div
            className="absolute bottom-[33%] left-[8%]"
            style={{
              width: '170px',
              height: '130px',
              background: 'radial-gradient(ellipse at 30% 30%, #C2DAC2, #7AA57A)',
              borderRadius: '50%',
              boxShadow: 'inset -8px -8px 25px rgba(46, 70, 46, 0.2), 0 8px 35px rgba(122, 165, 122, 0.1)',
              animation: 'crownGrow 0.7s 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              transform: 'scale(0)',
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          />
          <div
            className="absolute bottom-[28%] right-[6%]"
            style={{
              width: '160px',
              height: '120px',
              background: 'radial-gradient(ellipse at 60% 35%, #B5CFB5, #5F895F)',
              borderRadius: '50%',
              boxShadow: 'inset -8px -8px 25px rgba(46, 70, 46, 0.2), 0 8px 35px rgba(95, 137, 95, 0.1)',
              animation: 'crownGrow 0.7s 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              transform: 'scale(0)',
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          />
          <div
            className="absolute bottom-[45%] left-[14%]"
            style={{
              width: '130px',
              height: '100px',
              background: 'radial-gradient(ellipse at 40% 30%, #CCE0CC, #86B386)',
              borderRadius: '50%',
              boxShadow: 'inset -6px -6px 20px rgba(46, 70, 46, 0.15), 0 6px 30px rgba(134, 179, 134, 0.08)',
              animation: 'crownGrow 0.7s 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              transform: 'scale(0)',
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          />
          <div
            className="absolute bottom-[42%] right-[10%]"
            style={{
              width: '120px',
              height: '90px',
              background: 'radial-gradient(ellipse at 60% 30%, #C4DCC4, #7CAF7C)',
              borderRadius: '50%',
              boxShadow: 'inset -6px -6px 20px rgba(46, 70, 46, 0.15), 0 6px 30px rgba(124, 175, 124, 0.08)',
              animation: 'crownGrow 0.7s 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              transform: 'scale(0)',
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          />
          <div
            className="absolute bottom-[56%] left-1/2 -translate-x-1/2"
            style={{
              width: '110px',
              height: '75px',
              background: 'radial-gradient(ellipse at 50% 30%, #D4E6D4, #93C293)',
              borderRadius: '50%',
              boxShadow: 'inset -4px -4px 15px rgba(46, 70, 46, 0.1), 0 4px 25px rgba(147, 194, 147, 0.06)',
              animation: 'crownGrow 0.7s 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              transform: 'scale(0)',
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          />

          {/* 高光层 */}
          <div
            className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-[180px] h-[120px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse at 30% 30%, rgba(255,255,245,0.2), transparent 70%)',
              animation: 'highlightFade 1s 0.5s ease-out forwards',
              opacity: 0,
              willChange: 'opacity',
            }}
          />

          {/* 飘落叶片 */}
          {leaves.map((leaf, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${leaf.startX}%`,
                top: `${leaf.startY}%`,
                width: `${leaf.size}px`,
                height: `${leaf.size}px`,
                background: 'radial-gradient(circle, #CDE0CD, #6B8F6B)',
                opacity: 0,
                boxShadow: '0 2px 8px rgba(107, 143, 107, 0.15)',
                animation: `leafFloat ${leaf.duration}s ${leaf.delay}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
                willChange: 'transform, opacity',
                transform: 'translate(0, 0) rotate(0deg)',
                ['--dx' as string]: leaf.startX > 50 ? '40px' : '-40px',
              }}
            />
          ))}

          {/* 根部 */}
          <div
            className="absolute bottom-0 left-1/2 w-52 h-6 -translate-x-1/2"
            style={{
              background: 'radial-gradient(ellipse at center, #5D4A3A, #3A2A1A)',
              borderRadius: '50%',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              animation: 'rootGrow 0.7s 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              transform: 'scaleX(0)',
              willChange: 'transform',
            }}
          />
        </div>

        {/* 文字 */}
        <div className="mt-8 flex justify-center text-4xl md:text-5xl font-light font-serif tracking-[0.15em]">
          {slogan.map((char, index) => (
            <span
              key={index}
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #3D5E3D, #9B8A6B)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 2px 20px rgba(61, 94, 61, 0.1)',
                animation: `fadeInChar 0.35s ${1.0 + index * 0.1}s ease-out forwards`,
                opacity: 0,
                transform: 'translateY(8px) scale(0.95)',
                willChange: 'transform, opacity',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}