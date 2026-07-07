import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '联系我们',
  description: '联系科栎雅，商务合作与咨询服务',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
