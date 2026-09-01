'use client';

import React, { useState } from 'react';

export const AdminFooter: React.FC = () => {
  const [showChangelog, setShowChangelog] = useState(false);

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs font-utm-helve mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Column 1: Tech Support */}
        <div className="md:col-span-5 space-y-2">
          <h4 className="text-xs font-bold uppercase text-teal-400 flex items-center gap-2">
            👨‍💻 THÔNG TIN HỖ TRỢ KỸ THUẬT VIÊN
          </h4>
          <p className="text-slate-300 font-medium">
            Đội ngũ Kỹ thuật VMTA System Admin & Developer
          </p>
          <ul className="space-y-1 text-[11px] text-slate-400">
            <li>📧 Email Hỗ Trợ Kỹ Thuật: <a href="mailto:vmta@vmta.vn" className="text-teal-300 font-bold hover:underline">vmta@vmta.vn</a></li>
            <li>📞 Hotline Kỹ Thuật 24/7: <span className="text-amber-300 font-mono font-bold">0988 123 456</span></li>
            <li>🏢 Trụ sở Kỹ thuật: 193 Trích Sài, Phường Tây Hồ, Hà Nội</li>
          </ul>
        </div>

        {/* Column 2: System Version & Changelog Toggle */}
        <div className="md:col-span-7 space-y-3 md:text-right">
          <div className="flex flex-wrap items-center md:justify-end gap-3">
            <span className="bg-teal-900/80 text-teal-200 border border-teal-700/80 px-3 py-1 rounded-lg text-[11px] font-mono font-bold">
              VMTA CMS v2.5.0 (Release 2026)
            </span>
            <button
              onClick={() => setShowChangelog(!showChangelog)}
              className="text-xs text-amber-400 font-bold hover:underline bg-slate-800 px-3 py-1 rounded-lg border border-slate-700 shadow-sm"
            >
              {showChangelog ? '▲ Ẩn Nhật Ký Thay Đổi' : '📋 Xem Nhật Ký Thay Đổi (Changelog)'}
            </button>
          </div>

          <p className="text-[11px] text-slate-500">
            © 2026 Vietnam Medical Tourism Alliance (VMTA). Bản quyền hệ thống CMS đã được bảo hộ.
          </p>
        </div>
      </div>

      {/* Expanded Changelog Modal / Accordion */}
      {showChangelog && (
        <div className="max-w-7xl mx-auto px-4 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 space-y-3">
            <h5 className="text-xs font-bold uppercase text-amber-300 flex items-center gap-2">
              📜 NHẬT KÝ CẬP NHẬT PHIÊN BẢN (SYSTEM CHANGELOG)
            </h5>
            <div className="space-y-3 text-[11px] text-slate-300">
              <div className="border-b border-slate-700/80 pb-3 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-400 font-mono">v2.5.0 (Mới nhất)</span>
                  <span className="bg-emerald-900/60 text-emerald-300 text-[10px] px-2 py-0.5 rounded">01/09/2026</span>
                </div>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-300">
                  <li>✨ <b>Form Đăng Ký Tham Gia Liên Minh</b>: Tích hợp Client Component xử lý gửi form "Tham gia hệ sinh thái của VMTA" ở trang Liên hệ (`/lien-he`), tự động gửi về Admin <b>YÊU CẦU & NEWSLETTER</b>.</li>
                  <li>✨ <b>Bộ Máy Dịch Tự Động Đa Tầng (VI ➔ EN)</b>: Tích hợp Google GTX Engine, MyMemory API & Từ điển Y tế VMTA, cho phép dịch tự động 100% không cần API Key trả phí.</li>
                  <li>✨ <b>Cơ Sở Dữ Liệu PostgreSQL 16 & Seed 1-Click</b>: Thêm nút `🌱 NẠP DỮ LIỆU MẪU CSLD (1-CLICK)` trực tiếp trong Admin UI và tương thích ANSI SQL với Vibe Host.</li>
                  <li>✨ <b>Nén Dung Lượng Next.js Standalone</b>: Nén kích thước build server giảm 80% (từ 1.3GB xuống ~150MB), giải phóng hoàn toàn vạch đỏ lưu trữ trên Vibe Host.</li>
                  <li>✨ <b>Cloud Storage Cloudinary CDN</b>: Đồng bộ 2 chiều trực tiếp thư viện ảnh Cloudinary (`bl0iakcy`) với tab `📁 QUẢN LÝ MEDIA`.</li>
                </ul>
              </div>
              <div className="border-b border-slate-700/80 pb-2">
                <span className="font-bold text-teal-400 font-mono">v2.4.0</span>: 
                Tích hợp tính năng Upload Ảnh từ máy tính & Quản lý Link Video YouTube/HLS trực tiếp vào CSDL. Đồng bộ toàn bộ nội dung hiển thị 6 trang con.
              </div>
              <div className="border-b border-slate-700/80 pb-2">
                <span className="font-bold text-teal-400 font-mono">v2.3.0</span>: 
                Tích hợp dịch tự động Tiếng Việt sang Tiếng Anh trực tiếp trên trình biên soạn CMS Section.
              </div>
              <div>
                <span className="font-bold text-teal-400 font-mono">v2.2.0</span>: 
                Chuẩn hóa cấu trúc 4 trụ cột Mạng lưới Liên minh (Y tế, Nghỉ dưỡng, Lữ hành, Bảo hiểm) và thông tin trụ sở 193 Trích Sài, Tây Hồ, Hà Nội.
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
