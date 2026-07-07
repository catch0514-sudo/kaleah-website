'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Send, MessageCircle, Clock, Building } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [mapFlipped, setMapFlipped] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus('idle');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/30"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/contact/contactimage.png')",
            }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              联系我们
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              商务合作、产品咨询、意见反馈，我们随时为您服务
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">联系方式</h2>

                <Card className="border-l-4 border-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                        <Building className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">公司名称</h3>
                        <p className="text-gray-600">九江科栎雅贸易有限公司</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                        <MapPin className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">公司地址</h3>
                        <p className="text-gray-600">中国 · 江西省九江市八里湖新区天筑中丝国际大厦10层</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                        <Phone className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">联系电话</h3>
                        <p className="text-gray-600">0792-8125225</p>
                        <p className="text-sm text-gray-500 mt-1">客服热线：9:00-18:00</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                        <Mail className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">电子邮箱</h3>
                        <p className="text-gray-600">kaleah@163.com</p>
                        <p className="text-sm text-gray-500 mt-1">商务合作：135 7622 8274</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                        <Clock className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">工作时间</h3>
                        <p className="text-gray-600">周一至周五：9:00 - 18:00</p>
                        <p className="text-sm text-gray-500 mt-1">周末及节假日：预约服务</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="p-8">
                  <CardContent className="space-y-6">
                    <div className="text-center mb-8">
                      <MessageCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">在线留言</h2>
                      <p className="text-gray-600">
                        请填写以下表单，我们会尽快与您联系
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">您的姓名 *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="请输入您的姓名"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">联系电话 *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="请输入您的联系电话"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">电子邮箱 *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="请输入您的邮箱地址"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">咨询主题</Label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        >
                          <option value="">请选择咨询主题</option>
                          <option value="产品咨询">产品咨询</option>
                          <option value="商务合作">商务合作</option>
                          <option value="批发采购">批发采购</option>
                          <option value="售后服务">售后服务</option>
                          <option value="其他">其他</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">留言内容 *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="请详细描述您的需求或问题"
                          className="min-h-[150px]"
                          required
                        />
                      </div>

                      {submitStatus === 'success' && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                          感谢您的留言！我们会尽快与您联系。
                        </div>
                      )}
                      {submitStatus === 'error' && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                          提交失败，请稍后重试或直接电话联系我们。
                        </div>
                      )}

                      <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700" disabled={submitting}>
                        <Send className="mr-2 h-5 w-5" />
                        {submitting ? '提交中...' : '提交留言'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Business Cooperation */}
                <Card className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">商务合作</h3>
                    <p className="text-gray-600 mb-6">
                      如果您是企业或机构，希望进行批量采购、代理合作或定制服务，
                      请直接联系我们的商务部门，我们将为您提供专业的解决方案。
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <a href="mailto:kaleah@163.com">
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                          <Mail className="mr-2 h-4 w-4" />
                          商务邮箱
                        </Button>
                      </a>
                      <a href="tel:0792-8125225">
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                          <Phone className="mr-2 h-4 w-4" />
                          商务热线
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">我们的位置</h2>
              <p className="text-gray-600">江西省九江市八里湖新区天筑中丝国际大厦10楼</p>
            </div>
            {/* 3D Flip Card */}
            <div
              className="h-[400px] rounded-2xl cursor-pointer"
              style={{ perspective: '1200px' }}
              onClick={() => setMapFlipped(!mapFlipped)}
            >
              <div
                className="relative w-full h-full rounded-2xl"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: mapFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front Face */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url('/bases/sanqingshan-1.jpg')" }}
                  >
                    <div className="h-full flex items-center justify-center bg-black/30">
                      <div className="text-center text-white">
                        <MapPin className="h-16 w-16 mx-auto mb-4" />
                        <p className="text-2xl font-bold">扎根自然 · 永持初心</p>
                        <p className="mt-2">每一份产品，都是我们写给自然的一封情书</p>
                        <p className="mt-4 text-sm text-white/70">点击查看地图</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back Face */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden bg-white"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=115.965%2C29.275%2C115.985%2C29.295&layer=mapnik&marker=29.285%2C115.975"
                    className="w-full h-full border-0"
                    title="科栎雅公司位置"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    allowFullScreen
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        <span className="text-sm font-medium">九江市中丝国际大厦</span>
                      </div>
                      <span className="text-xs text-white/70">点击翻回</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}