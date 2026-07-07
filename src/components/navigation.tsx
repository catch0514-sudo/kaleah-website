"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("首页");

    const navItems = [{
        name: "首页",
        href: "/"
    }, {
        name: "关于我们",
        href: "/about"
    }, {
        name: "生态基地",
        href: "/bases"
    }, {
        name: "产品中心",
        href: "/products"
    }, {
        name: "品牌动态",
        href: "/news"
    }, {
        name: "联系我们",
        href: "/contact"
    }];

    return (
        <header
            className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
            <div className="container mx-auto px-4">
                <div className="flex h-20 items-center justify-between">
                    {}
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                            <Image
                                src="/logo.png"
                                alt="科栎雅 KALEAH Logo"
                                fill
                                className="object-contain"
                                priority />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-gray-900">科栎雅</span>
                            <span className="text-xs text-gray-600">KALEAH</span>
                        </div>
                    </Link>
                    {}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map(item => <Link
                            key={item.name}
                            href={item.href}
                            className={`text-sm font-medium transition-colors hover:text-green-600 ${activeItem === item.name ? "text-green-600" : "text-gray-700"}`}
                            onClick={() => setActiveItem(item.name)}>
                            {item.name}
                        </Link>)}
                    </nav>
                    {}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px]">
                            <nav className="flex flex-col space-y-4 mt-8">
                                {navItems.map(item => <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`text-lg font-medium transition-colors hover:text-green-600 ${activeItem === item.name ? "text-green-600" : "text-gray-700"}`}
                                    onClick={() => {
                                        setActiveItem(item.name);
                                        setIsOpen(false);
                                    }}>
                                    {item.name}
                                </Link>)}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}