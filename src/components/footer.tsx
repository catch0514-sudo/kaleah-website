import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                <Image
                  src="/logo.png"
                  alt="科栎雅 KALEAH Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">科栎雅</span>
                <span className="text-xs text-gray-400">KALEAH</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              专注于精选全球优质原产地生态食品，传递健康生活理念。
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/bases" className="text-gray-400 hover:text-white transition-colors text-sm">
                  生态基地
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors text-sm">
                  产品中心
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">产品系列</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=tea-oil" className="text-gray-400 hover:text-white transition-colors text-sm">
                  精品山茶油
                </Link>
              </li>
              <li>
                <Link href="/products?category=tea-cake" className="text-gray-400 hover:text-white transition-colors text-sm">
                  特色茶点
                </Link>
              </li>
              <li>
                <Link href="/products?category=grain" className="text-gray-400 hover:text-white transition-colors text-sm">
                  东北粮品
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>中国 · 江西省九江市八里湖新区中丝国际大厦</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>0792-8125225</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>kaleah@163.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 科栎雅(KALEAH). 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
}
