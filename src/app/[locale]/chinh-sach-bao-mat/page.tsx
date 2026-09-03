import React from 'react';
import Link from 'next/link';
import { getSectionContent } from '@/lib/cms';

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVi = locale === 'vi';

  const heroCms = await getSectionContent('policy_privacy', 'hero', locale, {
    title: isVi ? 'Chính Sách Bảo Mật' : 'Privacy Policy',
    subtitle: isVi ? 'BẢO VỆ DỮ LIỆU & QUYỀN RIÊNG TƯ CỦA DU KHÁCH Y TẾ' : 'DATA PROTECTION & PRIVACY ASSURANCE',
    body: isVi
      ? 'Cam kết bảo mật thông tin hồ sơ y tế, dữ liệu cá nhân và lịch trình nghỉ dưỡng theo chuẩn SLA & HIPAA.'
      : 'Committed to safeguarding medical records, personal data and resort itineraries per SLA & HIPAA standards.',
    image_url: '/images/about/8cae972b-1b32-4567-b3e9-d7348ea691af.png',
  });

  return (
    <div className="bg-white font-utm-helve space-y-0 pb-16">
      {/* 1. Banner Hero */}
      <section className="relative h-[280px] overflow-hidden bg-white border-b border-slate-100">
        <img
          src={heroCms.image_url || '/images/about/8cae972b-1b32-4567-b3e9-d7348ea691af.png'}
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          alt=""
        />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 py-6 z-10">
          <h1 className="font-sharp-bo text-3xl md:text-5xl font-bold uppercase leading-tight text-[#0b7f7c]">
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

      {/* 2. Policy Details Content */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-md space-y-6 text-slate-700 leading-relaxed text-sm md:text-base">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl md:text-2xl font-bold uppercase text-[#0b7f7c]">
              {heroCms.subtitle}
            </h2>
            <p className="text-xs text-slate-500 mt-1">Cập nhật lần cuối: Năm 2026 - Ban Quản Trị VMTA</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-[#0b7f7c] text-lg">1. Thu thập thông tin</h3>
            <p>
              Liên Minh Du Lịch Y Tế Việt Nam (VMTA) chỉ thu thập các thông tin cần thiết phục vụ quá trình tiếp nhận hồ sơ khám chữa bệnh, bao gồm: Họ tên, Số điện thoại, Email, Ngành nghề, Tên đơn vị và Tình trạng y tế theo yêu cầu của du khách.
            </p>

            <h3 className="font-bold text-[#0b7f7c] text-lg">2. Mục đích sử dụng dữ liệu</h3>
            <p>
              Thông tin của du khách được sử dụng duy nhất cho các mục đích:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Thẩm định y khoa từ xa và đề xuất phác đồ điều trị phù hợp.</li>
              <li>Sắp xếp lịch trình đưa đón, lưu trú tại resort và lịch khám tại Bệnh viện thành viên.</li>
              <li>Gửi xác nhận đặt lịch và phản hồi yêu cầu CSKH 24/7.</li>
            </ul>

            <h3 className="font-bold text-[#0b7f7c] text-lg">3. Cam kết bảo mật & Chia sẻ thông tin</h3>
            <p>
              VMTA cam kết không bán, trao đổi hoặc chia sẻ thông tin cá nhân của bạn cho bên thứ ba vì mục đích thương mại. Thông tin y khoa chỉ được chia sẻ trực tiếp với Đội ngũ Chuyên gia Bác sĩ thuộc mạng lưới Bệnh viện đạt chuẩn trong Liên minh.
            </p>

            <h3 className="font-bold text-[#0b7f7c] text-lg">4. Quyền của khách hàng</h3>
            <p>
              Quý khách có quyền yêu cầu tra cứu, điều chỉnh hoặc xóa bỏ dữ liệu cá nhân của mình bất kỳ lúc nào bằng cách gửi yêu cầu tới email hỗ trợ chính thức: <a href="mailto:vmta@vmta.vn" className="text-[#0b7f7c] font-bold underline">vmta@vmta.vn</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
