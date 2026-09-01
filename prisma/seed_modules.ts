import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Initializing and seeding 5 Admin Header Modules into database...');

  // SEED DATA 1: Medical & Tourism Categories
  const categories = [
    { type: 'medical', category_key: 'screening', title_vi: 'Tầm soát và dự phòng', title_en: 'Screening & Prevention', icon: '🩺' },
    { type: 'medical', category_key: 'cosmetics', title_vi: 'Thẩm mỹ & Nha khoa', title_en: 'Aesthetic & Dental', icon: '✨' },
    { type: 'medical', category_key: 'advanced_treatment', title_vi: 'Điều trị chuyên sâu', title_en: 'Advanced Treatment', icon: '🏥' },
    { type: 'medical', category_key: 'regenerative', title_vi: 'Trị liệu tái tạo', title_en: 'Regenerative Therapy', icon: '🧬' },
    { type: 'medical', category_key: 'traditional', title_vi: 'Y học cổ truyền', title_en: 'Traditional Medicine', icon: '🌿' },

    { type: 'tourism', category_key: 'travel', title_vi: 'Du lịch / Lữ hành', title_en: 'Travel & Tours', icon: '✈️' },
    { type: 'tourism', category_key: 'resort', title_vi: 'Khách sạn / Nơi lưu trú', title_en: 'Hotels & Resorts', icon: '🏨' },
    { type: 'tourism', category_key: 'transport', title_vi: 'Đi lại / Vận chuyển', title_en: 'Transportation', icon: '🚘' },
    { type: 'tourism', category_key: 'dining', title_vi: 'Nhà hàng / Dịch vụ giải trí', title_en: 'Dining & Leisure', icon: '🍽️' },
    { type: 'tourism', category_key: 'shopping', title_vi: 'Mua sắm & Quà tặng', title_en: 'Shopping & Souvenirs', icon: '🛍️' },
  ];

  for (const cat of categories) {
    try {
      const existing: any[] = await prisma.$queryRawUnsafe(
        `SELECT id FROM MedicalCategory WHERE category_key = ? LIMIT 1;`,
        cat.category_key
      );
      if (!existing || existing.length === 0) {
        await prisma.$executeRawUnsafe(
          `INSERT INTO MedicalCategory (type, category_key, title_vi, title_en, icon) VALUES (?, ?, ?, ?, ?);`,
          cat.type, cat.category_key, cat.title_vi, cat.title_en, cat.icon
        );
      }
    } catch (e) {
      console.warn('MedicalCategory table insertion:', e);
    }
  }

  // SEED DATA 1.1: Sample Packages
  const packages = [
    {
      category_key: 'screening',
      title_vi: 'Gói Tầm Soát Sức Khỏe Toàn Diện & Nghỉ Dưỡng 3D2N',
      title_en: 'Comprehensive Health Screening & 3D2N Resort Package',
      subtitle_vi: 'Xét nghiệm chuyên sâu 50 chỉ số + Nghỉ dưỡng bờ biển Tây Hồ',
      subtitle_en: '50-parameter deep health check + Tay Ho lakefront recovery',
      duration_vi: '3 Ngày 2 Đêm',
      duration_en: '3 Days 2 Nights',
      price_vi: '15.500.000 VNĐ / Khách',
      price_en: '$650 USD / Guest',
      facility_name: 'Bệnh Viện Đa Khoa Quốc Tế Vinmec & Khách Sạn InterContinental Westlake',
      image_url: '/images/news/Making-Vietnam-Medical-Tourism.jpg',
      itinerary_vi: 'Sáng Ngày 1: Tiếp đón tại sân bay & Kiểm tra y tế tổng quát tại Vinmec. Chiều Ngày 1-3: Nghỉ dưỡng hồi phục.',
      itinerary_en: 'Day 1 Morning: Airport pick-up & Health screening at Vinmec. Day 1-3: Resort recovery.',
    },
    {
      category_key: 'cosmetics',
      title_vi: 'Gói Nha Khoa Thẩm Mỹ & Phục Hồi Nụ Cười Hollywood',
      title_en: 'Hollywood Smile Dental & Aesthetic Restoration Package',
      subtitle_vi: 'Dán sứ Veneer 16 răng + Nghỉ dưỡng tại Resort 5 sao',
      subtitle_en: '16-unit Porcelain Veneer + 5-Star Resort Stay',
      duration_vi: '5 Ngày 4 Đêm',
      duration_en: '5 Days 4 Nights',
      price_vi: '45.000.000 VNĐ',
      price_en: '$1,900 USD',
      facility_name: 'Nha Khoa Thẩm Mỹ Quốc Tế Đạt Chuẩn VMTA & Sheraton Hanoi Hotel',
      image_url: '/images/about/Asset-7-100.jpg',
      itinerary_vi: 'Ngày 1: Khám & Thiết kế nụ cười 3D. Ngày 2: Gắn răng sứ tạm & Đi ngắm cảnh. Ngày 4: Hoàn thiện Veneer.',
      itinerary_en: 'Day 1: Smile design 3D. Day 2: Temporary veneers & City tour. Day 4: Final Veneer placement.',
    },
  ];

  for (const pkg of packages) {
    try {
      const existing: any[] = await prisma.$queryRawUnsafe(
        `SELECT id FROM MedicalPackage WHERE title_vi = ? LIMIT 1;`,
        pkg.title_vi
      );
      if (!existing || existing.length === 0) {
        await prisma.$executeRawUnsafe(
          `INSERT INTO MedicalPackage (category_key, title_vi, title_en, subtitle_vi, subtitle_en, duration_vi, duration_en, price_vi, price_en, facility_name, image_url, itinerary_vi, itinerary_en)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          pkg.category_key, pkg.title_vi, pkg.title_en, pkg.subtitle_vi, pkg.subtitle_en, pkg.duration_vi, pkg.duration_en, pkg.price_vi, pkg.price_en, pkg.facility_name, pkg.image_url, pkg.itinerary_vi, pkg.itinerary_en
        );
      }
    } catch (e) {
      console.warn('MedicalPackage insertion:', e);
    }
  }

  // SEED DATA 2: Alliance Members
  const allianceMembers = [
    {
      group_id: 1,
      name_vi: 'Bệnh viện Đa khoa Quốc tế Vinmec Times City',
      name_en: 'Vinmec International Hospital Times City',
      badge: 'Bạch Kim',
      logo_url: '/images/home/header/logo-vmta.png',
      address: '458 Minh Khai, Hai Bà Trưng, Hà Nội',
      phone: '024 3974 3556',
      email: 'info@vinmec.com',
      website: 'https://vinmec.com',
      description_vi: 'Bệnh viện đạt chứng nhận quốc tế JCI hàng đầu Việt Nam.',
      description_en: 'Premier JCI-accredited international hospital in Vietnam.',
    },
    {
      group_id: 2,
      name_vi: 'Vietravel International Medical Tour Division',
      name_en: 'Vietravel International Medical Tour Division',
      badge: 'Vàng',
      logo_url: '/images/home/header/logo-vmta.png',
      address: '190 Pasteur, Phường 6, Quận 3, TP.HCM',
      phone: '1900 1839',
      email: 'info@vietravel.com',
      website: 'https://vietravel.com',
      description_vi: 'Tập đoàn lữ hành hàng đầu điều phối các tour du lịch y tế chuyên nghiệp.',
      description_en: 'Leading travel corporation operating professional medical tours.',
    },
    {
      group_id: 3,
      name_vi: 'Bảo hiểm Du lịch & Sức khỏe Quốc tế Pacific Cross',
      name_en: 'Pacific Cross International Health & Travel Insurance',
      badge: 'Vàng',
      logo_url: '/images/home/header/logo-vmta.png',
      address: 'Tầng 7, Tòa nhà Royal Tower, Quận 7, TP.HCM',
      phone: '028 3821 9909',
      email: 'inquiry@pacificcross.com.vn',
      website: 'https://pacificcross.com.vn',
      description_vi: 'Đơn vị cung cấp giải pháp bảo hiểm sức khỏe toàn cầu cho du khách y tế.',
      description_en: 'Global medical travel insurance solutions provider for patients.',
    },
    {
      group_id: 4,
      name_vi: 'Hệ thống Công nghệ Vận hành Y tế VMTA Tech Platform',
      name_en: 'VMTA Healthcare Coordination Tech Platform',
      badge: 'Bạch Kim',
      logo_url: '/images/home/header/logo-vmta.png',
      address: '193 Trích Sài, Phường Tây Hồ, Hà Nội',
      phone: '0988 123 456',
      email: 'tech@vmta.vn',
      website: 'https://vmta.vn',
      description_vi: 'Nền tảng công nghệ tiếp nhận hồ sơ y tế từ xa và kết nối bác sĩ.',
      description_en: 'Intelligent remote medical intake and specialist booking software platform.',
    },
  ];

  for (const m of allianceMembers) {
    try {
      const existing: any[] = await prisma.$queryRawUnsafe(
        `SELECT id FROM AllianceMember WHERE name_vi = ? LIMIT 1;`,
        m.name_vi
      );
      if (!existing || existing.length === 0) {
        await prisma.$executeRawUnsafe(
          `INSERT INTO AllianceMember (group_id, name_vi, name_en, badge, logo_url, address, phone, email, website, description_vi, description_en)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          m.group_id, m.name_vi, m.name_en, m.badge, m.logo_url, m.address, m.phone, m.email, m.website, m.description_vi, m.description_en
        );
      }
    } catch (e) {
      console.warn('AllianceMember insertion:', e);
    }
  }

  // SEED DATA 3: Posts & News
  const posts = [
    {
      slug: 'thu-truong-bo-y-te-trao-quyet-dinh',
      category: 'Sự kiện VMTA',
      title_vi: 'Thứ trưởng Bộ Y tế trao quyết định thành lập Liên Minh Du Lịch Y Tế Việt Nam (VMTA)',
      title_en: 'Deputy Minister of Health presents decision establishing Vietnam Medical Tourism Alliance',
      summary_vi: 'Sự kiện đánh dấu bước ngoặt lớn đưa Du lịch Y tế Việt Nam hội nhập chuẩn mực SLA toàn cầu.',
      summary_en: 'Event marks major milestone establishing SLA-grade Vietnam Medical Tourism.',
      content_vi: 'Hà Nội, Bộ Y tế vừa chính thức trao quyết định công nhận và ủng hộ Liên Minh Du Lịch Y Tế Việt Nam (VMTA)...',
      content_en: 'Hanoi, Ministry of Health officially announced and presented support for VMTA...',
      image_url: '/images/news/thu-truong-bo-y-te-trao-quyet-dinh.jpg',
      author: 'Ban Biên Tập VMTA',
    },
    {
      slug: 'ra-mat-he-sinh-thai-du-lich-y-te',
      category: 'Y học & Du lịch',
      title_vi: 'Ra mắt Hệ Sinh Thái Du Lịch Y Tế Minh Bạch Đầu Tiên Tại Việt Nam',
      title_en: 'Launching Vietnam’s First Transparent Medical Tourism Ecosystem',
      summary_vi: 'Hội tụ 50+ bệnh viện đạt chuẩn JCI và resort nghỉ dưỡng 5 sao.',
      summary_en: 'Uniting 50+ JCI accredited hospitals and luxury 5-star recovery resorts.',
      content_vi: 'Sự ra đời của VMTA giải quyết triệt để bài toán kết nối rào cản giữa ngành y tế và ngành du lịch...',
      content_en: 'The launch of VMTA bridges the gap between healthcare and tourism industries...',
      image_url: '/images/news/Lien-minh-du-lich-y-te-ra-mat.jpg',
      author: 'Chuyên gia Y tế VMTA',
    },
  ];

  for (const p of posts) {
    try {
      const existing: any[] = await prisma.$queryRawUnsafe(
        `SELECT id FROM Post WHERE slug = ? LIMIT 1;`,
        p.slug
      );
      if (!existing || existing.length === 0) {
        await prisma.$executeRawUnsafe(
          `INSERT INTO Post (slug, category, title_vi, title_en, summary_vi, summary_en, content_vi, content_en, image_url, author)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          p.slug, p.category, p.title_vi, p.title_en, p.summary_vi, p.summary_en, p.content_vi, p.content_en, p.image_url, p.author
        );
      }
    } catch (e) {
      console.warn('Post insertion:', e);
    }
  }

  // SEED DATA 5: Chatbot Scripts
  const botScripts = [
    {
      category: 'Quy trình',
      question_vi: 'Quy trình khám y tế kết hợp nghỉ dưỡng tại VMTA diễn ra như thế nào?',
      question_en: 'How does the medical treatment & resort recovery process work at VMTA?',
      answer_vi: 'Quy trình gồm 4 bước: 1. Thẩm định hồ sơ y tế từ xa -> 2. Tư vấn phác đồ & Báo giá -> 3. Đưa đón & Đưa vào điều trị -> 4. Nghỉ dưỡng phục hồi tại Resort.',
      answer_en: '4-step process: 1. Remote medical evaluation -> 2. Treatment plan & Quote -> 3. Airport pickup & Hospital intake -> 4. Resort recovery.',
      order: 1,
    },
    {
      category: 'Chi phí',
      question_vi: 'Chi phí du lịch y tế tại Việt Nam có tiết kiệm hơn so với quốc tế không?',
      question_en: 'Are medical treatment costs in Vietnam more cost-effective than overseas?',
      answer_vi: 'Chi phí dịch vụ y tế kỹ thuật cao tại Việt Nam tiết kiệm từ 40% đến 60% so với Singapore, Thái Lan hoặc Mỹ nhưng chất lượng bác sĩ và thiết bị chuẩn ISO/JCI tương đương.',
      answer_en: 'High-tech medical services in Vietnam offer 40% to 60% savings compared to Singapore or US while maintaining JCI-grade quality.',
      order: 2,
    },
    {
      category: 'Bảo hiểm',
      question_vi: 'VMTA có hỗ trợ thanh toán bảo hiểm y tế quốc tế không?',
      question_en: 'Does VMTA support international medical insurance claim settlement?',
      answer_vi: 'Có! VMTA hợp tác với các đơn vị bảo hiểm quốc tế như Pacific Cross, Allianz, Cigna để hỗ trợ bảo lãnh viện phí trực tiếp cho bệnh nhân.',
      answer_en: 'Yes! VMTA partners with international insurers like Pacific Cross, Allianz, Cigna for direct hospital billing guarantee.',
      order: 3,
    },
  ];

  for (const s of botScripts) {
    try {
      const existing: any[] = await prisma.$queryRawUnsafe(
        `SELECT id FROM ChatbotScript WHERE question_vi = ? LIMIT 1;`,
        s.question_vi
      );
      if (!existing || existing.length === 0) {
        await prisma.$executeRawUnsafe(
          `INSERT INTO ChatbotScript (category, question_vi, question_en, answer_vi, answer_en, "order")
           VALUES (?, ?, ?, ?, ?, ?);`,
          s.category, s.question_vi, s.question_en, s.answer_vi, s.answer_en, s.order
        );
      }
    } catch (e) {
      console.warn('ChatbotScript insertion:', e);
    }
  }

  console.log('SUCCESSFULLY SEEDED ALL MODULES INTO DATABASE!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
