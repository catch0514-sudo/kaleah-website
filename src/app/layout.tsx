import type { Metadata } from 'next';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '科栎雅 KALEAH - 源自天然，臻于品质',
    template: '%s | 科栎雅 KALEAH',
  },
  description:
    '科栎雅(KALEAH)专注于精选全球优质原产地生态食品，提供三清山山茶油、东北大米、古龙小米等高品质产品，传递健康生活理念。',
  keywords: [
    '科栎雅',
    'KALEAH',
    '山茶油',
    '三清山',
    '东北大米',
    '古龙小米',

    '生态食品',
    '有机食品',
    '健康食品',
    '原产地直供',
  ],
  authors: [{ name: '科栎雅 KALEAH' }],
  generator: 'Next.js',
  // icons: {
  //   icon: '',
  // },
  openGraph: {
    title: '科栎雅 KALEAH | 源自天然，臻于品质',
    description:
      '科栎雅专注于精选全球优质原产地生态食品，传递健康生活理念。提供三清山山茶油、东北大米、古龙小米等高品质产品。',
    url: 'https://www.kaleah.com',
    siteName: '科栎雅 KALEAH',
    locale: 'zh_CN',
    type: 'website',
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Coze Code | Your AI Engineer is Here',
  //   description:
  //     'Build and deploy full-stack applications through AI conversation. No env setup, just flow.',
  //   // images: [''],
  // },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
            <Navigation />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
      </body>
    </html>
  );
}
