'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { decodeHtmlEntities } from '@/lib/utils';

interface NewsFilterClientProps {
  posts: any[];
  locale: string;
}

export const NewsFilterClient: React.FC<NewsFilterClientProps> = ({ posts, locale }) => {
  const isVi = locale === 'vi';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTime, setSelectedTime] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      if (p.category) set.add(p.category.trim());
    });
    return Array.from(set);
  }, [posts]);

  // Extract unique Month/Year values (e.g., "08/2026", "07/2026", "06/2026", "05/2026")
  const timeOptions = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      const pubDate = p.published_at || String(p.created_at || '');
      const match = pubDate.match(/(\d{2})\/(\d{4})/) || pubDate.match(/(\d{4})-(\d{2})/);
      if (match) {
        if (pubDate.includes('/')) {
          set.add(`${match[1]}/${match[2]}`);
        } else {
          set.add(`${match[2]}/${match[1]}`);
        }
      }
    });
    return Array.from(set).sort().reverse();
  }, [posts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = posts.filter((p) => {
      // 1. Category Tag Filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // 2. Time Filter (Month/Year)
      if (selectedTime !== 'all') {
        const pubDate = p.published_at || String(p.created_at || '');
        if (!pubDate.includes(selectedTime)) {
          return false;
        }
      }

      // 3. Search Query Filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const titleVi = (p.title_vi || '').toLowerCase();
        const titleEn = (p.title_en || '').toLowerCase();
        const summaryVi = (p.summary_vi || '').toLowerCase();
        if (!titleVi.includes(q) && !titleEn.includes(q) && !summaryVi.includes(q)) {
          return false;
        }
      }

      return true;
    });

    // Sort by published_at / id (asc or desc)
    result = [...result].sort((a, b) => {
      const dateA = a.published_at || String(a.created_at || '');
      const dateB = b.published_at || String(b.created_at || '');

      const comp = dateA.localeCompare(dateB);
      if (comp !== 0) {
        return sortOrder === 'desc' ? -comp : comp;
      }
      return sortOrder === 'desc' ? b.id - a.id : a.id - b.id;
    });

    return result;
  }, [posts, selectedCategory, selectedTime, sortOrder, searchQuery]);

  return (
    <div className="space-y-8 font-utm-helve">
      {/* 1. STABLE FILTER CONTROL BAR (ALWAYS AT TOP - PREVENTS LAYOUT JUMPING) */}
      <section className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            <h2 className="text-lg font-bold uppercase text-[#0b7f7c]">
              {isVi ? 'BỘ LỌC TIN TỨC' : 'NEWS FILTER'}
            </h2>
          </div>

          <div className="text-xs text-slate-500 font-semibold">
            {isVi ? `Hiển thị ${filteredPosts.length} / ${posts.length} bài viết` : `Showing ${filteredPosts.length} / ${posts.length} articles`}
          </div>
        </div>

        {/* Category Tag Pills (Only tags, no droplist) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            🏷️ {isVi ? 'Chuyên mục bài viết:' : 'Category tags:'}
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                selectedCategory === 'all'
                  ? 'bg-[#0b7f7c] text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {isVi ? 'Tất cả' : 'All'}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-[#0b7f7c] text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Time Month Dropdown + Time Sort Order + Keyword Search Input */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-200/80">
          {/* Time Month Filter Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              📅 {isVi ? 'Lọc theo tháng' : 'Filter by month'}
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs font-bold bg-white text-[#0b7f7c] focus:outline-none focus:ring-2 focus:ring-[#0b7f7c]/40"
            >
              <option value="all">{isVi ? 'Tất cả mốc thời gian' : 'All time periods'}</option>
              {timeOptions.map((t) => (
                <option key={t} value={t}>
                  {isVi ? `Tháng ${t}` : `Month ${t}`}
                </option>
              ))}
            </select>
          </div>

          {/* Time Sort Order Dropdown */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              ⇅ {isVi ? 'Sắp xếp thời gian' : 'Time sort order'}
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'desc' | 'asc')}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs font-bold bg-white text-[#0b7f7c] focus:outline-none focus:ring-2 focus:ring-[#0b7f7c]/40"
            >
              <option value="desc">⬇️ {isVi ? 'Mới nhất trước (Giảm dần)' : 'Newest first (Desc)'}</option>
              <option value="asc">⬆️ {isVi ? 'Cũ nhất trước (Tăng dần)' : 'Oldest first (Asc)'}</option>
            </select>
          </div>

          {/* Search Keyword */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              🔎 {isVi ? 'Từ khóa tìm kiếm' : 'Search Keyword'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isVi ? 'Nhập tiêu đề hoặc tóm tắt...' : 'Search title or summary...'}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0b7f7c]/40"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTERED RESULTS GRID (UPDATES CLEANLY WITHOUT DOM COLLAPSE OR JUMP) */}
      <section className="pt-2">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200/80 space-y-3">
            <span className="text-4xl block">📭</span>
            <p className="text-base font-bold text-slate-600">
              {isVi ? 'Không tìm thấy bài viết nào phù hợp với bộ lọc.' : 'No articles match your filter selection.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTime('all');
                setSortOrder('desc');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#0b7f7c] text-white font-bold text-xs rounded-xl hover:bg-[#086a67] transition"
            >
              {isVi ? '🔄 Xóa bộ lọc' : '🔄 Reset filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const postSlug = isVi ? (post.slug_vi || post.slug) : (post.slug_en || post.slug || post.slug_vi);
              const postTitle = decodeHtmlEntities(isVi ? post.title_vi : post.title_en);
              const postSummary = decodeHtmlEntities(isVi ? post.summary_vi : post.summary_en);
              const pubDate = post.published_at || String(post.created_at || '').substring(0, 10);

              return (
                <article key={post.id} className="bg-slate-50/60 p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:shadow-md transition">
                  <div className="space-y-3">
                    {post.image_url && (
                      <Link href={`/${locale}/tin-tuc/${postSlug}`} className="block overflow-hidden rounded-2xl">
                        <img src={post.image_url} alt="" className="aspect-[16/10] w-full object-cover hover:scale-105 transition duration-300" />
                      </Link>
                    )}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-teal-100 text-teal-800">
                        {post.category}
                      </span>
                      <h3 className="text-base font-extrabold text-[#0b7f7c] leading-snug">
                        <Link href={`/${locale}/tin-tuc/${postSlug}`}>{postTitle}</Link>
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {postSummary}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between text-xs text-[#0b7f7c] font-semibold border-t border-slate-200/80">
                    <Link href={`/${locale}/tin-tuc/${postSlug}`} className="text-[#0b7f7c] hover:underline font-bold">
                      {isVi ? 'Xem chi tiết >' : 'Read more >'}
                    </Link>
                    <span className="text-[11px] text-slate-400 font-mono">📅 {pubDate}</span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
