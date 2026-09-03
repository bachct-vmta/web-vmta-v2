import React from 'react';
import Link from 'next/link';
import { getSectionContent } from '@/lib/cms';

export default async function AllianceBenefitsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVi = locale === 'vi';

  const heroCms = await getSectionContent('policy_benefits', 'hero', locale, {
    title: isVi ? 'Quyền Lợi Của Thành Viên Liên Minh' : 'Alliance Member Benefits',
    subtitle: isVi ? 'GIA TĂNG GIÁ TRỊ THƯƠNG HIỆU & TIẾP CẬN TỆP KHÁCH HÀNG TOÀN CẦU' : 'ELEVATING BRAND VALUE & GLOBAL PATIENT ACCESS',
    body: isVi
      ? 'Hệ thống quyền lợi độc quyền dành cho Bệnh viện, Phòng khám, Khách sạn - Resort và Doanh nghiệp Lữ hành khi chính thức gia nhập VMTA.'
      : 'Exclusive benefits suite supporting accredited Hospitals, Clinics, Resorts and Travel Agencies upon joining VMTA.',
    image_url: '/images/about/908c99ad-f012-4b20-9d8a-cbeee71686e5.png',
  });

  return (
    <div className="bg-white font-utm-helve space-y-0 pb-16">
      {/* 1. Banner Hero */}
      <section className="relative h-[280px] overflow-hidden bg-white border-b border-slate-100">
        <img
          src={heroCms.image_url || '/images/about/908c99ad-f012-4b20-9d8a-cbeee71686e5.png'}
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          alt=""
        />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 py-6 z-10">
          <h1 className="font-sharp-bo text-2xl md:text-4xl font-bold uppercase leading-tight text-[#0b7f7c]">
            {heroCms.title}
          </h1>
          <p className="mt-2 text-sm text-[#0b7f7c]">
            <Link href={`/${locale}`} className="hover:underline">
              {isVi ? 'Trang chủ' : 'Home'}
            </Link>
            {' / '}
            <span>{heroCms.title}</span>
          </p>
        </div>
      </section>

      {/* 2. Content */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-md space-y-6 text-slate-700 leading-relaxed text-sm md:text-base">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl md:text-2xl font-bold uppercase text-[#0b7f7c]">
              {heroCms.subtitle}
            </h2>
            <p className="text-xs text-slate-500 mt-1">Đồng hành phát triển bền vững cùng Liên Minh Du Lịch Y Tế Việt Nam</p>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-teal-50 border-l-4 border-[#0b7f7c] rounded-r-xl space-y-2">
              <h3 className="font-bold text-[#0b7f7c] text-lg">🏥 1. Đối với Bệnh viện & Cơ sở Y tế</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Tiếp cận tệp bệnh nhân quốc tế và du khách nội địa cao cấp thông qua Trung tâm Tiếp nhận & Điều phối Hồ sơ tập trung.</li>
                <li>Được bảo chứng uy tín thương hiệu đạt chuẩn độc lập VMTA trên bản đồ du lịch y tế quốc tế.</li>
                <li>Ứng dụng phần mềm công nghệ điều phối hồ sơ bệnh án từ xa giúp tối ưu hóa quy trình tiếp đón.</li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl space-y-2">
              <h3 className="font-bold text-amber-900 text-lg">🏨 2. Đối với Khách sạn & Resort Nghỉ dưỡng</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Phát triển gói sản phẩm Wellness & Du lịch Y tế hậu điều trị cao cấp.</li>
                <li>Gia tăng tỷ lệ lấp đầy phòng nghỉ dưỡng dài ngày với tệp khách hàng phục hồi sức khỏe.</li>
                <li>Được hỗ trợ đào tạo nghiệp vụ CSKH phục hồi y tế theo chuẩn dịch vụ SLA.</li>
              </ul>
            </div>

            <div className="p-4 bg-rose-50 border-l-4 border-[#d31e45] rounded-r-xl space-y-2">
              <h3 className="font-bold text-[#d31e45] text-lg">✈️ 3. Đối với Doanh nghiệp Lữ hành</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Đa dạng hóa dòng tour du lịch y tế kết hợp khám chữa bệnh cao cấp với biên lợi nhuận tốt hơn tour truyền thống.</li>
                <li>Được kết nối trực tiếp với mạng lưới Bệnh viện đạt chuẩn JCI/ISO trong liên minh mà không cần tự thẩm định rời rạc.</li>
                <li>Tham gia chuỗi sự kiện xúc tiến thương mại và hội thảo Du lịch Y tế quốc tế do VMTA tổ chức.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
