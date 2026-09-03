import React from 'react';
import Link from 'next/link';
import { getSectionContent } from '@/lib/cms';
import { prisma } from '@/lib/prisma';
import { AllianceJoinForm } from '@/components/contact/AllianceJoinForm';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVi = locale === 'vi';

  // 1. Fetch Dynamic Site Settings from Database
  let settingsMap: Record<string, string> = {
    site_name: 'Vietnam Medical Tourism Alliance',
    site_hotline: '1900-1234',
    site_address: '193 Trích Sài, Phường Tây Hồ, Hà Nội',
    site_branch_address: 'Chi nhánh VMTA',
    site_support_email: 'vmta@vmta.vn',
  };

  try {
    const rawSettings: any[] = await prisma.$queryRawUnsafe(`SELECT key, value FROM Setting;`);
    (rawSettings || []).forEach((row) => {
      if (row.key && row.value) {
        settingsMap[row.key] = row.value;
      }
    });
  } catch (err) {
    console.warn('Error fetching settings for contact page:', err);
  }

  // 2. Fetch CMS Section Content
  const heroCms = await getSectionContent('contact', 'hero', locale, {
    title: isVi ? 'Liên hệ' : 'Contact',
    subtitle: isVi ? 'Liên hệ với VMTA' : 'Contact VMTA',
    body: isVi
      ? 'Nơi mọi hành trình chăm sóc sức khỏe được thiết kế riêng'
      : 'Where every healthcare journey is personalized',
    image_url: '/images/about/8cae972b-1b32-4567-b3e9-d7348ea691af.png',
  });

  const officesCms = await getSectionContent('contact', 'offices', locale, {
    title: isVi ? 'Thông tin liên hệ trực tiếp' : 'Direct Contact Information',
    subtitle: isVi
      ? `Trụ sở VMTA: ${settingsMap.site_address}`
      : `VMTA Headquarters: ${settingsMap.site_address}`,
    body: `Email: ${settingsMap.site_support_email}`,
    image_url: '/images/contact/section-image.jpg',
  });

  const offices = isVi
    ? [
        {
          name: 'Trụ sở VMTA',
          address: settingsMap.site_address || '193 Trích Sài, Phường Tây Hồ, Hà Nội',
          email: settingsMap.site_support_email || 'vmta@vmta.vn',
          phone: settingsMap.site_hotline || '1900-1234',
          note: '',
        },
        {
          name: 'Chi nhánh VMTA',
          address: settingsMap.site_branch_address || 'Chi nhánh VMTA',
          email: settingsMap.site_support_email || 'vmta@vmta.vn',
          phone: settingsMap.site_hotline || '1900-1234',
          note: '',
        },
        {
          name: 'Hỗ trợ kỹ thuật',
          address: '',
          email: settingsMap.site_support_email || 'vmta@vmta.vn',
          phone: settingsMap.site_hotline || '1900-1234',
          note: '(Phản hồi trong 24h)',
        },
      ]
    : [
        {
          name: 'VMTA Headquarters',
          address: settingsMap.site_address || '193 Trich Sai, Tay Ho Ward, Hanoi',
          email: settingsMap.site_support_email || 'vmta@vmta.vn',
          phone: settingsMap.site_hotline || '1900-1234',
          note: '',
        },
        {
          name: 'VMTA Branch',
          address: settingsMap.site_branch_address || 'VMTA Branch Office',
          email: settingsMap.site_support_email || 'vmta@vmta.vn',
          phone: settingsMap.site_hotline || '1900-1234',
          note: '',
        },
        {
          name: 'Technical Support',
          address: '',
          email: settingsMap.site_support_email || 'vmta@vmta.vn',
          phone: settingsMap.site_hotline || '1900-1234',
          note: '(Response within 24h)',
        },
      ];

  return (
    <div id="content" className="content-area bg-white font-utm-helve space-y-0 pb-16">
      {/* 1. Page Banner Hero */}
      <section className="relative h-[300px] overflow-hidden bg-white">
        <img
          src={heroCms.image_url || '/images/about/8cae972b-1b32-4567-b3e9-d7348ea691af.png'}
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          alt=""
        />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 py-4 z-10">
          <h1 className="font-sharp-bo text-[46px] md:text-[50px] font-bold uppercase leading-none text-[#0b7f7c]">
            {heroCms.title}
          </h1>
          <p className="mt-2 text-[16px] text-[#0b7f7c]">
            <Link href={`/${locale}`} className="hover:underline transition-colors">
              {isVi ? 'Trang chủ' : 'Home'}
            </Link>
            {' / '}
            <span>{heroCms.title}</span>
          </p>
        </div>
      </section>

      {/* 2. Hero Heading Sub-section */}
      <section className="py-[40px] md:py-[60px] text-center bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="font-sharp-bo text-2xl md:text-3xl uppercase font-bold text-[#0b7f7c]">
            {heroCms.subtitle}
          </h2>
          <p className="font-utm-helve text-slate-600 mt-3">
            {heroCms.body}
          </p>
        </div>
      </section>

      {/* 3. Partner Join Form (Interactive Client Component) */}
      <section id="partner-form" className="relative overflow-hidden py-[56px] md:py-[80px] bg-slate-50 border-b border-slate-200/80">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <img src="/images/contact/forms-bg.png" className="w-full h-full object-cover" alt="" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 z-10">
          <AllianceJoinForm locale={locale} />
        </div>
      </section>

      {/* 4. Direct Contact Info */}
      <section className="py-[60px] md:py-[88px] bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-sharp-bo text-[36px] md:text-[48px] uppercase font-bold text-center text-[#0b7f7c] mb-12">
            {officesCms.title}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            <div className="space-y-8">
              {offices.map((o, idx) => (
                <div key={idx}>
                  <h3 className="font-sharp-bo uppercase font-bold text-[#4b4b4b] text-base md:text-xl mb-4">
                    {o.name}
                  </h3>
                  {o.note && (
                    <p className="text-slate-500 text-sm mb-2">{o.note}</p>
                  )}
                  <ul className="font-utm-helve text-slate-700 text-base md:text-lg leading-relaxed list-disc pl-5 space-y-1">
                    {o.address && (
                      <li>
                        {isVi ? 'Địa chỉ' : 'Address'}: {o.address}
                      </li>
                    )}
                    {o.phone && (
                      <li>
                        Hotline: {o.phone}
                      </li>
                    )}
                    {o.email && (
                      <li>
                        Email:{' '}
                        <a href={`mailto:${o.email}`} className="uppercase text-slate-700 hover:text-[#0b7f7c]">
                          {o.email}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <img
                src={officesCms.image_url || '/images/contact/section-image.jpg'}
                className="w-full rounded-[28px] object-cover shadow-md"
                loading="lazy"
                alt="VMTA Office"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
