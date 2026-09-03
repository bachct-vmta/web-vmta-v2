import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { NewsFilterClient } from '@/components/news/NewsFilterClient';

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVi = locale === 'vi';

  let posts: any[] = [];
  try {
    posts = await prisma.$queryRawUnsafe(
      `SELECT * FROM Post WHERE is_published = 1 ORDER BY published_at DESC, id DESC;`
    );
  } catch (err) {
    console.error('Error fetching posts for web:', err);
  }

  return (
    <div className="bg-white font-sans space-y-0 pb-16">
      {/* 1. Hero */}
      <section className="relative h-[280px] overflow-hidden bg-white">
        <img
          src="/images/about/8cae972b-1b32-4567-b3e9-d7348ea691af.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 py-8 z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#0b7f7c]">
            {isVi ? 'TIN TỨC & BÁO CHÍ' : 'NEWS & PRESS RELEASES'}
          </h1>
          <nav className="mt-2 text-xs text-[#0b7f7c] font-semibold" aria-label="breadcrumb">
            <Link href={`/${locale}`} className="hover:underline">
              {isVi ? 'Trang chủ' : 'Home'}
            </Link>
            <span className="mx-2">/</span>
            <span>{isVi ? 'Tin tức' : 'News'}</span>
          </nav>
        </div>
      </section>

      {/* 2. Main News Layout with Filter & Category Client Component */}
      <section className="bg-white pt-8 pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <NewsFilterClient posts={posts} locale={locale} />
        </div>
      </section>
    </div>
  );
}
