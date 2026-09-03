'use client';

import React, { useState, useEffect } from 'react';
import { MediaPicker } from '@/components/admin/MediaPicker';

export const SiteSettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, string>>({
    site_name: 'Vietnam Medical Tourism Alliance',
    site_hotline: '1900-1234',
    site_address: '193 Trích Sài, Phường Tây Hồ, Hà Nội',
    site_branch_address: 'Chi nhánh VMTA',
    site_support_email: 'vmta@vmta.vn',
    social_facebook: '#',
    social_instagram: '#',
    social_youtube: '#',
    social_tiktok: '#',
    bo_cong_thuong_badge: '/images/home/footer/vmta-bo-y-te-badge.png',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings((prev) => ({ ...prev, ...data.settings }));
      }
    } catch (err) {
      console.error('Error fetching site settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({ type: 'success', text: '💾 Đã lưu cấu hình Website thành công! Dữ liệu đã đồng bộ 100% trên toàn bộ các trang.' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Lỗi khi lưu cấu hình.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Lỗi kết nối tới máy chủ.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center font-bold text-slate-400 text-xs">
        ⏳ Đang tải cấu hình website...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 font-utm-helve">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-base font-bold uppercase text-[#0b7f7c]">
          ⚙️ QUẢN LÝ CẤU HÌNH WEBSITE TỔ CHỨC (SITE SETTINGS)
        </h2>
        <p className="text-xs text-slate-500">
          Chỉnh sửa hotline, trụ sở 193 Trích Sài, email hỗ trợ, link 4 mạng xã hội và các chính sách pháp lý. Dữ liệu tự động đồng bộ trên tất cả các trang công khai.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-bold ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* GROUP 1: THÔNG TIN TỔ CHỨC & LIÊN HỆ */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
          <h3 className="text-xs font-bold uppercase text-[#0b7f7c] border-b border-slate-200 pb-2">
            🏢 1. THÔNG TIN THƯƠNG HIỆU & ĐỊA CHỈ TRỤ SỞ
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tên tổ chức (Hiển thị Footer/Header)</label>
              <input
                type="text"
                value={settings.site_name || ''}
                onChange={(e) => handleChange('site_name', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-[#0b7f7c]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hotline công khai (Hiển thị Header/Footer)</label>
              <input
                type="text"
                value={settings.site_hotline || ''}
                onChange={(e) => handleChange('site_hotline', e.target.value)}
                placeholder="1900-1234 hoặc 0988 123 456"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono font-bold text-amber-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Địa chỉ Trụ sở chính</label>
              <input
                type="text"
                value={settings.site_address || ''}
                onChange={(e) => handleChange('site_address', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Địa chỉ Chi nhánh văn phòng</label>
              <input
                type="text"
                value={settings.site_branch_address || ''}
                onChange={(e) => handleChange('site_branch_address', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Tiếp Nhận & Hỗ Trợ Khách Hàng</label>
            <input
              type="email"
              value={settings.site_support_email || ''}
              onChange={(e) => handleChange('site_support_email', e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono text-blue-800"
            />
          </div>
        </div>

        {/* GROUP 2: MẠNG XÃ HỘI */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
          <h3 className="text-xs font-bold uppercase text-[#0b7f7c] border-b border-slate-200 pb-2">
            🌐 2. ĐƯỜNG DẪN MẠNG XÃ HỘI (SOCIAL MEDIA LINKS)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Link Facebook Fanpage</label>
              <input
                type="text"
                value={settings.social_facebook || ''}
                onChange={(e) => handleChange('social_facebook', e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Link Instagram Page</label>
              <input
                type="text"
                value={settings.social_instagram || ''}
                onChange={(e) => handleChange('social_instagram', e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Link Kênh YouTube</label>
              <input
                type="text"
                value={settings.social_youtube || ''}
                onChange={(e) => handleChange('social_youtube', e.target.value)}
                placeholder="https://youtube.com/..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Link Kênh TikTok</label>
              <input
                type="text"
                value={settings.social_tiktok || ''}
                onChange={(e) => handleChange('social_tiktok', e.target.value)}
                placeholder="https://tiktok.com/@..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* GROUP 3: HUY HIỆU BỘ CÔNG THƯƠNG */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
          <h3 className="text-xs font-bold uppercase text-[#0b7f7c] border-b border-slate-200 pb-2">
            🛡️ 3. HUY HIỆU PHÁP LÝ & CHỨNG NHẬN (FOOTER BADGE)
          </h3>

          <MediaPicker
            label="Ảnh Huy Hiệu Xác Nhận Bộ Công Thương"
            value={settings.bo_cong_thuong_badge || ''}
            onChange={(url) => handleChange('bo_cong_thuong_badge', url)}
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 bg-[#0b7f7c] text-white rounded-xl text-xs font-bold uppercase hover:bg-[#086865] transition shadow-md disabled:opacity-50"
          >
            {saving ? '⏳ Đang lưu...' : '💾 LƯU CẤU HÌNH KHÓA NÀY'}
          </button>
        </div>
      </form>
    </div>
  );
};
