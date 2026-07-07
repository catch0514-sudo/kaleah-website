"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdmin } from "@/contexts/AdminContext";
import { Lock, User, ArrowLeft, Shield } from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();

    const {
        admin,
        isLoading,
        login
    } = useAdmin();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isLoading && admin) {
            router.push("/admin/news");
        }
    }, [admin, isLoading, router]);

    useEffect(() => {
        fetch("/api/admin/auth").then(res => res.json()).then(data => {
            if (data.message === "管理员已存在")
                {}
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const result = await login(username, password);

        if (result.success) {
            router.push("/admin/news");
        } else {
            setError(result.error || "登录失败");
        }

        setLoading(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (admin) {
        return null;
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block mb-6">
                        <div className="flex items-center justify-center space-x-3">
                            <div className="text-3xl font-bold text-white">科栎雅</div>
                            <div className="text-xl text-gray-400">KALEAH</div>
                        </div>
                    </Link>
                    <div className="flex items-center justify-center space-x-2 text-green-400">
                        <Shield className="h-6 w-6" />
                        <span className="text-xl font-semibold">管理员登录</span>
                    </div>
                </div>
                {}
                <Card className="shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-center">管理后台</CardTitle>
                        <CardDescription className="text-center">请输入管理员账号密码</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">用户名</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="请输入用户名"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        className="pl-10"
                                        required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">密码</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="请输入密码"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="pl-10"
                                        required />
                                </div>
                            </div>
                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            <Button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700"
                                disabled={loading}>
                                {loading ? "登录中..." : "登录"}
                            </Button>
                        </form>
                        <div className="mt-6 pt-4 border-t text-center">
                            <p className="text-sm text-gray-500 mb-2">首次登录？</p>
                            <p
                                className="text-xs text-gray-400"
                                style={{
                                    fontFamily: "\"Noto Sans SC\", sans-serif",
                                    fontSize: "14px"
                                }}>
                                请联系科栎雅管理员获取登录账号密码
                            </p>
                        </div>
                    </CardContent>
                </Card>
                {}
                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="text-gray-400 hover:text-white transition-colors flex items-center justify-center">
                        <ArrowLeft className="h-4 w-4 mr-2" />返回首页
                                                                                  </Link>
                </div>
            </div>
        </div>
    );
}