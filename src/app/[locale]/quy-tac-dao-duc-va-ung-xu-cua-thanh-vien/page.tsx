import React from 'react';
import Link from 'next/link';
import { getSectionContent } from '@/lib/cms';

export default async function MemberEthicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVi = locale === 'vi';

  const heroCms = await getSectionContent('policy_ethics', 'hero', locale, {
    title: isVi ? 'Quy Tắc Đạo Đức & Ứng Xử Thành Viên' : 'Member Code of Ethics & Conduct',
    subtitle: isVi ? 'TIÊU CHUẨN ĐẠO ĐỨC NGHỀ NGHIỆP & BẢO CHỨNG CHẤT LƯỢNG LINH HỒN LIÊN MINH' : 'PROFESSIONAL ETHICAL STANDARDS & ALLIANCE CODE',
    body: isVi
      ? 'Bộ quy tắc áp dụng bắt buộc cho toàn bộ Bệnh viện, Resort, Lữ hành và Công nghệ gia nhập hệ sinh thái VMTA.'
      : 'Mandatory ethical guidelines governing all Hospitals, Resorts, Travel agencies and Tech partners.',
    image_url: '/images/about/Asset-7-100.jpg',
  });

  return (
    <div className="bg-white font-utm-helve space-y-0 pb-16">
      {/* 1. Banner Hero */}
      <section className="relative h-[280px] overflow-hidden bg-white border-b border-slate-100">
        <img
          src={heroCms.image_url || '/images/about/Asset-7-100.jpg'}
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
            <p className="text-xs text-slate-500 mt-1">Nghị quyết Ban Điều Hành VMTA - Áp dụng toàn hệ sinh thái</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-[#0b7f7c] text-lg">1. Tôn chỉ Y đức & An toàn Người bệnh trên hết</h3>
            <p>
              Tất cả các cơ sở y tế và bác sĩ thành viên phải lấy an toàn, sức khỏe và quyền lợi của người bệnh làm trọng tâm. Tuyệt đối không vì mục đích lợi nhuận mà chỉ định các dịch vụ y tế không cần thiết hoặc vượt quá năng lực chuyên môn.
            </p>

            <h3 className="font-bold text-[#0b7f7c] text-lg">2. Minh bạch về Chi phí & Dịch vụ</h3>
            <p>
              Mọi thành viên khối Lữ hành, Resort và Bệnh viện trong liên minh phải công khai minh bạch bảng giá dịch vụ, phác đồ điều trị và các khoản chi phí liên quan trước khi du khách khởi hành. Tuyệt đối không thu thêm các khoản phí ẩn ngoài hợp đồng SLA.
            </p>

            <h3 className="font-bold text-[#0b7f7c] text-lg">3. Tôn trọng Sự riêng tư & Văn hóa đa quốc gia</h3>
            <p>
              Ứng xử chuyên nghiệp, tôn trọng bản sắc văn hóa, tín ngưỡng và sự riêng tư riêng biệt của từng bệnh nhân quốc tế và nội địa trong suốt hành trình lưu trú nghỉ dưỡng.
            </p>

            <h3 className="font-bold text-[#0b7f7c] text-lg">4. Tinh thần Hợp tác & Đồng hành bền vững</h3>
            <p>
              Các đơn vị thành viên cam kết phối hợp chặt chẽ với Trung tâm Điều phối Vận hành VMTA, xử lý kịp thời các tình huống phát sinh theo chuẩn thời gian phản hồi SLA khẩn cấp.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
