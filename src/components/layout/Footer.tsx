'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface FooterProps {
  locale: string;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isVi = locale === 'vi';

  const [settings, setSettings] = useState<Record<string, string>>({
    site_name: 'Vietnam Medical Tourism Alliance',
    site_hotline: '1900-1234',
    site_address: '193 Trích Sài, Phường Tây Hồ, Hà Nội',
    site_support_email: 'vmta@vmta.vn',
    social_facebook: '#',
    social_instagram: '#',
    social_youtube: '#',
    social_tiktok: '#',
    bo_cong_thuong_badge: '/images/home/footer/vmta-bo-y-te-badge.png',
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/admin/settings');
        if (res.ok) {
          const data = await res.json();
          setSettings((prev) => ({ ...prev, ...data.settings }));
        }
      } catch (err) {
        console.warn('Error loading footer settings:', err);
      }
    }
    loadSettings();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/admin/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus(isVi ? 'Đăng ký thành công! Cảm ơn bạn.' : 'Successfully subscribed!');
        setEmail('');
      } else {
        setStatus(data.error || (isVi ? 'Lỗi khi đăng ký' : 'Subscription failed'));
      }
    } catch {
      setStatus(isVi ? 'Lỗi kết nối' : 'Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer-wrapper bg-white border-t border-slate-100 relative font-utm-helve">
      <section className="relative overflow-hidden py-16 md:py-24 bg-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <img
            src="/images/about/908c99ad-f012-4b20-9d8a-cbeee71686e5.png"
            className="w-full h-full object-cover scale-150"
            alt=""
            aria-hidden="true"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 z-10">
          {/* Row 1: Logo / Newsletter / Social */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-12">
            {/* Col 1: Logo */}
            <div>
              <img
                src="/images/home/footer/logo-vmta-white.png"
                alt="VMTA Logo"
                className="w-1/2 md:w-[70%] filter invert brightness-0"
              />
            </div>

            {/* Col 2: Newsletter */}
            <div>
              <h3 className="uppercase text-[#0b7f7c] mb-4 font-bold text-base tracking-wide">
                {isVi ? 'ĐĂNG KÝ NHẬN BẢN TIN Y TẾ' : 'SUBSCRIBE TO MEDICAL NEWSLETTER'}
              </h3>
              {status && <p className="text-sm text-[#0b7f7c] mb-2 font-bold">{status}</p>}
              <form onSubmit={handleSubscribe} className="relative max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isVi ? 'Nhập email của bạn...' : 'Enter your email...'}
                  required
                  className="w-full rounded-xl bg-white border border-[#0b7f7c]/30 pl-4 pr-12 py-2.5 text-sm text-[#0b7f7c] placeholder-[#0b7f7c]/60 focus:outline-none focus:ring-2 focus:ring-[#0b7f7c]/40 shadow-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-8 h-8 rounded-full text-[#0b7f7c] hover:bg-[#0b7f7c]/10 transition"
                  aria-label="Subscribe"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Col 3: Social */}
            <div className="md:text-right">
              <h3 className="uppercase text-[#0b7f7c] mb-4 font-bold text-base tracking-wide">
                {isVi ? 'KẾT NỐI VỚI VMTA' : 'CONNECT WITH VMTA'}
              </h3>
              <div className="flex items-center md:justify-end gap-3">
                <a href={settings.social_facebook || '#'} target="_blank" rel="noreferrer" aria-label="Facebook" className="block max-h-[45px]">
                  <img src="/images/home/footer/social-1.png" alt="Facebook" className="h-10 w-auto hover:opacity-80 transition" />
                </a>
                <a href={settings.social_instagram || '#'} target="_blank" rel="noreferrer" aria-label="Instagram" className="block max-h-[45px]">
                  <img src="/images/home/footer/social-2.png" alt="Instagram" className="h-10 w-auto hover:opacity-80 transition" />
                </a>
                <a href={settings.social_youtube || '#'} target="_blank" rel="noreferrer" aria-label="YouTube" className="block max-h-[45px]">
                  <img src="/images/home/footer/social-3.png" alt="YouTube" className="h-10 w-auto hover:opacity-80 transition" />
                </a>
                <a href={settings.social_tiktok || '#'} target="_blank" rel="noreferrer" aria-label="TikTok" className="block max-h-[45px]">
                  <img src="/images/home/footer/social-4.png" alt="TikTok" className="h-10 w-auto hover:opacity-80 transition" />
                </a>
              </div>
            </div>
          </div>

          {/* Row 2: Company info & Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8 border-t border-slate-200/80 text-sm text-[#4a4a4a]">
            {/* Col 1: Company Info */}
            <div className="space-y-3">
              <p className="font-bold text-[#0b7f7c] text-lg leading-snug">
                {settings.site_name || 'Vietnam Medical Tourism Alliance'}
              </p>
              <p className="text-xs leading-relaxed text-justify">
                {isVi
                  ? 'VMTA là liên minh du lịch y tế chính thức của Việt Nam xây dựng mô hình vận hành khép kín giữa Bệnh viện – Resort – Công nghệ'
                  : 'VMTA is the official medical-tourism alliance of Vietnam, building a closed-loop operating model between Hospitals – Resorts – Technology.'}
              </p>
              <p className="text-xs font-semibold text-slate-700">
                {isVi ? 'Địa chỉ:' : 'Address:'} {settings.site_address || '193 Trích Sài, Phường Tây Hồ, Hà Nội'}
              </p>
              {settings.bo_cong_thuong_badge && (
                <img
                  src={settings.bo_cong_thuong_badge}
                  alt="Đã thông báo Bộ Công Thương"
                  className="w-36 h-auto mt-2"
                />
              )}
            </div>

            {/* Col 2: Policies */}
            <div>
              <h4 className="font-bold text-[#0b7f7c] text-base mb-3">
                {isVi ? 'CHÍNH SÁCH & ĐẠO ĐỨC' : 'POLICIES & ETHICS'}
              </h4>
              <ul className="space-y-2.5 text-xs font-medium">
                <li>
                  <Link href={`/${locale}/chinh-sach-bao-mat`} className="hover:text-[#0b7f7c] transition flex items-center gap-1.5">
                    <span>📌</span>
                    <span>{isVi ? 'Chính Sách bảo mật' : 'Privacy Policy'}</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/quy-tac-dao-duc-va-ung-xu-cua-thanh-vien`} className="hover:text-[#0b7f7c] transition flex items-center gap-1.5">
                    <span>📌</span>
                    <span>{isVi ? 'Quy tắc đạo đức & ứng xử thành viên' : 'Member Code of Ethics & Conduct'}</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/quyen-loi-cua-thanh-vien-lien-minh`} className="hover:text-[#0b7f7c] transition flex items-center gap-1.5">
                    <span>📌</span>
                    <span>{isVi ? 'Quyền lợi của thành viên Liên Minh' : 'Alliance Member Benefits'}</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Quick Links */}
            <div>
              <h4 className="font-bold text-[#0b7f7c] text-base mb-3">
                {isVi ? 'LIÊN KẾT' : 'QUICK LINKS'}
              </h4>
              <ul className="space-y-2.5 text-xs font-medium">
                <li>
                  <Link href={`/${locale}/lien-he#partner-form`} className="hover:text-[#0b7f7c] transition flex items-center gap-1.5">
                    <span>🤝</span>
                    <span>{isVi ? 'Đăng ký doanh nghiệp liên minh' : 'Register alliance business'}</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/gioi-thieu`} className="hover:text-[#0b7f7c] transition flex items-center gap-1.5">
                    <span>ℹ️</span>
                    <span>{isVi ? 'Tìm hiểu thêm về chương trình' : 'Learn more about the program'}</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Support & Hotline */}
            <div>
              <h4 className="font-bold text-[#0b7f7c] text-base mb-3">
                {isVi ? 'HỖ TRỢ KHÁCH HÀNG' : 'CUSTOMER SUPPORT'}
              </h4>
              <ul className="space-y-2.5 text-xs font-medium">
                <li>
                  <span>Hotline: </span>
                  <a href={`tel:${settings.site_hotline || '1900-1234'}`} className="text-[#d31e45] hover:underline font-bold font-mono">
                    {settings.site_hotline || '1900-1234'}
                  </a>
                </li>
                <li>
                  <span>Email: </span>
                  <a href={`mailto:${settings.site_support_email || 'vmta@vmta.vn'}`} className="text-[#0b7f7c] hover:underline font-semibold font-mono">
                    {settings.site_support_email || 'vmta@vmta.vn'}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="py-4 bg-slate-100 text-center text-xs text-slate-500 border-t border-slate-200/60">
        © {new Date().getFullYear()} VMTA - Vietnam Medical Tourism Alliance. All rights reserved.
      </div>
    </footer>
  );
};
