import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultSections = [
  // ==================== 1. TRANG CHỦ (home) ====================
  {
    page_slug: 'home',
    section_key: 'hero',
    order: 1,
    vi: {
      title: 'HỘI ĐỒNG Y KHOA & DU LỊCH Y TẾ VIỆT NAM',
      subtitle: 'VIETNAM MEDICAL TOURISM ALLIANCE',
      body: 'Nơi hội tụ các bệnh viện, trung tâm y tế hàng đầu và doanh nghiệp lữ hành uy tín, mang đến giải pháp chăm sóc sức khỏe toàn diện kết hợp nghỉ dưỡng cao cấp tại Việt Nam.',
      extra_json: {
        cta_primary_label: 'KHÁM PHÁ NGAY',
        cta_primary_url: '#section-about',
        cta_secondary_label: 'LIÊN HỆ TƯ VẤN',
        cta_secondary_url: '/vi/lien-he',
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444013/vmta_hero_banner.png',
        image_url_vi: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444013/vmta_hero_banner.png',
        image_url_en: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444013/vmta_hero_banner.png',
        items: [
          { title: 'BỆNH VIỆN ĐẠT CHUẨN', body: 'JCI / ISO INTERNATIONAL' },
          { title: 'ĐỘI NGŨ BÁC SĨ', body: 'CHUYÊN GIA ĐẦU NGÀNH' },
          { title: 'CHI PHÍ TIẾT KIỆM', body: 'LÊN ĐẾN 60%' },
          { title: 'HỖ TRỢ 24/7', body: 'ĐIỀU PHỐI Y TẾ TOÀN DIỆN' },
        ],
      },
    },
    en: {
      title: 'VIETNAM MEDICAL TOURISM ALLIANCE',
      subtitle: 'INTERNATIONAL HEALTHCARE & RESORT RECOVERY',
      body: 'Uniting top accredited medical centers and premier travel operators to deliver all-inclusive healthcare and resort recovery in Vietnam.',
      extra_json: {
        cta_primary_label: 'DISCOVER NOW',
        cta_primary_url: '#section-about',
        cta_secondary_label: 'CONTACT CONSULTANT',
        cta_secondary_url: '/en/lien-he',
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444013/vmta_hero_banner.png',
        image_url_vi: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444013/vmta_hero_banner.png',
        image_url_en: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444013/vmta_hero_banner.png',
        items: [
          { title: 'ACCREDITED HOSPITALS', body: 'JCI / ISO CERTIFIED' },
          { title: 'MEDICAL TEAM', body: 'TOP SPECIALISTS' },
          { title: 'COST SAVINGS', body: 'UP TO 60%' },
          { title: '24/7 SUPPORT', body: 'MEDICAL COORDINATION' },
        ],
      },
    },
  },
  {
    page_slug: 'home',
    section_key: 'values',
    order: 2,
    vi: {
      title: 'TẦM NHÌN, SỨ MỆNH & GIÁ TRỊ CỐT LÕI',
      subtitle: 'TỰ HÀO LÀ CẦU NỐI Y TẾ VÀ DU LỊCH NGHỈ DƯỠNG UY TÍN',
      body: 'Mọi cơ sở y tế và đội ngũ chuyên gia trong liên minh đều trải qua quy trình thẩm định khắt khe trước khi tiếp nhận du khách.',
      extra_json: {
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444005/vmta_values_bg.png',
        image_url_vi: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444005/vmta_values_bg.png',
        image_url_en: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444005/vmta_values_bg.png',
        items: [
          { title: 'Niềm tin từ chuyên môn', body: 'Mọi cơ sở y tế và đội ngũ chuyên gia trong liên minh đều trải qua quy trình thẩm định khắt khe trước khi tiếp nhận du khách.', icon_url: '/images/home/values/icon-1.png' },
          { title: 'Sự minh bạch tuyệt đối', body: 'Minh bạch về chi phí, quy trình điều trị, tiêu chuẩn dịch vụ và quyền lợi của khách hàng trong suốt hành trình.', icon_url: '/images/home/values/icon-2.png' },
          { title: 'Sự kết nối chuẩn hóa', body: 'Xây dựng một ngôn ngữ chung và quy trình vận hành đồng bộ giữa ngành Y tế và ngành Du lịch – Nghỉ dưỡng.', icon_url: '/images/home/values/icon-3.png' },
          { title: 'Lấy trải nghiệm khách hàng làm trung tâm', body: 'Mỗi hành trình được thiết kế cá nhân hóa, tối ưu sự an tâm, riêng tư và sự phục hồi toàn diện cho người bệnh.', icon_url: '/images/home/values/icon-1.png' },
          { title: 'Khát vọng vươn tầm quốc tế', body: 'Định hình vị thế mới cho Du lịch Y tế Việt Nam bằng chất lượng dịch vụ chuẩn SLA và tư duy vận hành hiện đại.', icon_url: '/images/home/values/icon-2.png' },
        ],
      },
    },
    en: {
      title: 'VISION, MISSION & CORE VALUES',
      subtitle: 'PROUD TO BE VIETNAM’S PREMIER MEDICAL TOURISM ALLIANCE',
      body: 'Every medical center and expert team undergoes strict vetting before accepting patients.',
      extra_json: {
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444005/vmta_values_bg.png',
        image_url_vi: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444005/vmta_values_bg.png',
        image_url_en: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444005/vmta_values_bg.png',
        items: [
          { title: 'TRUST FROM EXPERTISE', body: 'Every medical center and expert team undergoes strict vetting before accepting patients.', icon_url: '/images/home/values/icon-1.png' },
          { title: 'ABSOLUTE TRANSPARENCY', body: 'Full transparency in treatment costs, procedures, and patient rights throughout the journey.', icon_url: '/images/home/values/icon-2.png' },
          { title: 'STANDARDIZED INTEGRATION', body: 'Unified operating standards bridging Healthcare and Tourism sectors.', icon_url: '/images/home/values/icon-3.png' },
          { title: 'PATIENT-CENTRIC EXPERIENCE', body: 'Every itinerary is personalized to ensure peace of mind, privacy, and full recovery.', icon_url: '/images/home/values/icon-1.png' },
          { title: 'GLOBAL AMBITION', body: 'Elevating Vietnam Medical Tourism with SLA-grade service standards.', icon_url: '/images/home/values/icon-2.png' },
        ],
      },
    },
  },
  {
    page_slug: 'home',
    section_key: 'about',
    order: 3,
    vi: {
      title: 'VMTA – KIẾN TRÚC SƯ TRƯỞNG CHO HỆ SINH THÁI DU LỊCH Y TẾ VIỆT NAM',
      subtitle: 'CẦU NỐI Y TẾ VÀ DU LỊCH NGHỈ DƯỠNG',
      body: 'Liên Minh Du Lịch Y Tế Việt Nam (VMTA) ra đời với vai trò là đơn vị điều phối độc lập, kết nối và chuẩn hóa các nguồn lực từ Y tế, Du lịch đến Công nghệ.',
      extra_json: {
        cta_label: 'KHÁM PHÁ THÊM',
        cta_url: '/vi/gioi-thieu',
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443995/vmta_about_architect.jpg',
        image_url_vi: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443995/vmta_about_architect.jpg',
        image_url_en: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443995/vmta_about_architect.jpg',
        bullets: [
          'Hệ thống tiếp nhận và điều phối hồ sơ bệnh án thông minh.',
          'Minh bạch quy trình và bảo chứng chất lượng dịch vụ tại mọi điểm chạm.',
          'Đồng hành 24/7 từ khi tư vấn trước khởi hành đến chăm sóc sau điều trị.',
        ],
      },
    },
    en: {
      title: 'VMTA – PIONEERING VIETNAM MEDICAL TOURISM ECOSYSTEM',
      subtitle: 'HEALTHCARE & RESORT BRIDGING',
      body: 'Vietnam Medical Tourism Alliance (VMTA) acts as an independent coordinator unifying Healthcare, Tourism, and Technology resources.',
      extra_json: {
        cta_label: 'DISCOVER MORE',
        cta_url: '/en/gioi-thieu',
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443995/vmta_about_architect.jpg',
        image_url_vi: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443995/vmta_about_architect.jpg',
        image_url_en: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443995/vmta_about_architect.jpg',
        bullets: [
          'Intelligent medical record intake and coordination system.',
          '100% transparent procedures and quality assurance at every touchpoint.',
          '24/7 dedicated support from pre-departure consultation to post-op care.',
        ],
      },
    },
  },
  {
    page_slug: 'home',
    section_key: 'solutions',
    order: 4,
    vi: {
      title: 'GIẢI PHÁP ĐIỀU PHỐI DÀNH CHO CÁC ĐƠN VỊ',
      subtitle: 'KẾT NỐI SỨC MẠNH HỆ SINH THÁI GIỮA Y TẾ - NGHỈ DƯỠNG - DU LỊCH',
      body: 'Hệ thống giải pháp khép kín hỗ trợ bệnh viện, phòng khám, resort nghỉ dưỡng và doanh nghiệp lữ hành tối ưu hiệu quả vận hành.',
      extra_json: {
        items: [
          { title: 'Đối với Bệnh viện & Cơ sở Y tế', body: 'Mở rộng tệp khách hàng quốc tế và nội địa cao cấp, tối ưu hóa quy trình tiếp nhận – hỗ trợ người bệnh theo chuẩn SLA.', icon_url: '/images/home/solutions/icon-1.png' },
          { title: 'Đối với Khách sạn & Resort', body: 'Phát triển dòng sản phẩm Du lịch Y tế / Wellness cao cấp, gia tăng tỷ lệ lấp đầy phòng hậu điều trị, tạo lợi thế cạnh tranh.', icon_url: '/images/home/solutions/icon-2.png' },
          { title: 'Đối với Doanh nghiệp Lữ hành', body: 'Đa dạng hóa sản phẩm tour du lịch y tế cao cấp, gia tăng doanh thu và trải nghiệm khách hàng với các dịch vụ bảo chứng uy tín.', icon_url: '/images/home/solutions/icon-3.png' },
        ],
      },
    },
    en: {
      title: 'COORDINATION SOLUTIONS FOR PARTNERS',
      subtitle: 'INTELLIGENT CONNECTING SYSTEM FOR HEALTHCARE & TOURISM',
      body: 'End-to-end solution suite supporting accredited hospitals, clinics, luxury resorts, and travel operators.',
      extra_json: {
        items: [
          { title: 'For Hospitals & Clinics', body: 'Expand high-end international patient reach, standardize intake SLA processes, and elevate brand standing.', icon_url: '/images/home/solutions/icon-1.png' },
          { title: 'For Hotels & Resorts', body: 'Develop premium Wellness & Medical Tourism products, increasing post-treatment resort occupancy.', icon_url: '/images/home/solutions/icon-2.png' },
          { title: 'For Travel Agencies', body: 'Diversify premium medical tourism packages, increasing revenue and customer satisfaction.', icon_url: '/images/home/solutions/icon-3.png' },
        ],
      },
    },
  },
  {
    page_slug: 'home',
    section_key: 'vision_mission',
    order: 5,
    vi: {
      title: 'TẦM NHÌN',
      subtitle: 'SỨ MỆNH',
      body: 'Trở thành biểu tượng bảo chứng cho chất lượng Du lịch Y tế tại Việt Nam, đưa Việt Nam trở thành điểm đến ưu tiên trên bản đồ y khoa toàn cầu.',
      extra_json: {
        video_url: 'https://storageovp.vnews.gov.vn//mediacache//2026//04//10//TS_QTND_9520_DU//9NIWHWEJC38D//hls//master.m3u8',
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444014/vmta_vision_poster.webp',
        image_url_vi: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444014/vmta_vision_poster.webp',
        image_url_en: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444014/vmta_vision_poster.webp',
        items: [
          { title: 'VỚI KHÁCH HÀNG', body: 'Mang đến hành trình chăm sóc sức khỏe an toàn, cá nhân hóa và không rào cản địa lý.' },
          { title: 'VỚI ĐỐI TÁC', body: 'Xây dựng hệ điều hành kết nối thông minh, giúp nâng cao hiệu quả vận hành và giá trị thương hiệu.' },
          { title: 'VỚI NGÀNH', body: 'Định hình một hệ sinh thái Du lịch Y tế minh bạch, chuyên nghiệp và bền vững.' },
        ],
      },
    },
    en: {
      title: 'VISION',
      subtitle: 'MISSION',
      body: 'To become the gold standard for Medical Tourism in Vietnam — establishing the country as a priority destination on the global medical map.',
      extra_json: {
        video_url: 'https://storageovp.vnews.gov.vn//mediacache//2026//04//10//TS_QTND_9520_DU//9NIWHWEJC38D//hls//master.m3u8',
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444014/vmta_vision_poster.webp',
        image_url_vi: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444014/vmta_vision_poster.webp',
        image_url_en: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444014/vmta_vision_poster.webp',
        items: [
          { title: 'FOR CLIENTS', body: 'Delivering a safe, premium healthcare journey with end-to-end care and zero geographical barriers.' },
          { title: 'FOR PARTNERS', body: 'Building an intelligent coordination platform that connects hospitals, resorts and technology.' },
          { title: 'FOR THE INDUSTRY', body: 'Shaping a transparent, professional, and sustainable Medical Tourism ecosystem.' },
        ],
      },
    },
  },
  {
    page_slug: 'home',
    section_key: 'benefits',
    order: 6,
    vi: {
      title: 'QUYỀN LỢI THÀNH VIÊN LIÊN MINH',
      subtitle: 'GIA TĂNG GIÁ TRỊ VÀ VƯƠN TẦM THƯƠNG HIỆU',
      body: 'Bảo chứng uy tín thương hiệu, tiếp cận nguồn khách hàng quốc tế dồi dào, tối ưu hóa quy trình điều phối.',
      extra_json: {
        items: [
          { title: 'Bảo Chứng Uy Tín Thương Hiệu', body: 'Gia nhập mạng lưới đạt chuẩn thẩm định độc lập VMTA, nâng cao niềm tin đối với du khách.', icon_url: '/images/home/values/icon-1.png' },
          { title: 'Tiếp Cận Nguồn Khách Hàng Quốc Tế', body: 'Kết nối mạng lưới kênh phân phối lữ hành toàn cầu và hệ thống tiếp nhận bệnh nhân tập trung.', icon_url: '/images/home/values/icon-2.png' },
          { title: 'Ứng Dụng Công Nghệ Vận Hành', body: 'Sử dụng hệ điều hành điều phối hồ sơ bệnh án và lịch trình nghỉ dưỡng chuyên nghiệp.', icon_url: '/images/home/values/icon-3.png' },
          { title: 'Đồng Hành Phát Triển Bền Vững', body: 'Tham gia chuỗi sự kiện xúc tiến thương mại và hội thảo chuyển giao công nghệ y khoa.', icon_url: '/images/home/values/icon-1.png' },
        ],
      },
    },
    en: {
      title: 'ALLIANCE MEMBER BENEFITS',
      subtitle: 'MAXIMIZING VALUE & ELEVATING BRAND',
      body: 'Brand endorsement, access to international patient pool, and optimized coordination workflows.',
      extra_json: {
        items: [
          { title: 'Brand Credibility Endorsement', body: 'Join the independently vetted VMTA network to boost international patient trust.', icon_url: '/images/home/values/icon-1.png' },
          { title: 'Access International Patient Pool', body: 'Connect with global travel channels and centralized medical intake systems.', icon_url: '/images/home/values/icon-2.png' },
          { title: 'Operational Tech Integration', body: 'Utilize professional medical record and resort recovery coordination operating software.', icon_url: '/images/home/values/icon-3.png' },
          { title: 'Sustainable Growth Partnership', body: 'Participate in trade promotion events and international medical technology seminars.', icon_url: '/images/home/values/icon-1.png' },
        ],
      },
    },
  },

  // ==================== 2. TRANG GIỚI THIỆU (about) ====================
  {
    page_slug: 'about',
    section_key: 'hero',
    order: 1,
    vi: {
      title: 'KIẾN TRÚC SƯ TRƯỞNG CHO HỆ SINH THÁI DU LỊCH Y TẾ VIỆT NAM',
      subtitle: 'GIỚI THIỆU VỀ VMTA',
      body: 'VMTA là đơn vị điều phối độc lập, kết nối và chuẩn hóa các nguồn lực y tế, du lịch và công nghệ.',
      extra_json: {
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443991/vmta_about_hero.png',
      },
    },
    en: {
      title: 'PIONEERING VIETNAM MEDICAL TOURISM ECOSYSTEM',
      subtitle: 'ABOUT VMTA',
      body: 'VMTA acts as an independent coordinator unifying Healthcare, Tourism, and Technology resources.',
      extra_json: {
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443991/vmta_about_hero.png',
      },
    },
  },
  {
    page_slug: 'about',
    section_key: 'architect',
    order: 2,
    vi: {
      title: 'VMTA LÀ AI ?',
      subtitle: 'ĐƠN VỊ ĐIỀU PHỐI ĐỘC LẬP',
      body: 'VMTA không phải là một bệnh viện hay công ty lữ hành đơn lẻ. Chúng tôi là thực thể điều phối trung tâm.',
      extra_json: {
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443995/vmta_about_architect.jpg',
      },
    },
    en: {
      title: 'WHO IS VMTA ?',
      subtitle: 'INDEPENDENT COORDINATOR',
      body: 'We are the central orchestrating body unifying medical and travel resources.',
      extra_json: {
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443995/vmta_about_architect.jpg',
      },
    },
  },

  // ==================== 3. TRANG THÀNH TỰU (products) ====================
  {
    page_slug: 'products',
    section_key: 'hero',
    order: 1,
    vi: {
      title: 'THÀNH TỰU Y KHOA VIỆT NAM',
      subtitle: 'NĂNG LỰC CHUYÊN MÔN VÀ CÔNG NGHỆ CHỮA LÀNH HÀNG ĐẦU',
      body: 'Tự hào sở hữu những ca phẫu thuật chuyên sâu sánh ngang các trung tâm y học hàng đầu thế giới.',
      extra_json: {
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443991/vmta_about_hero.png',
      },
    },
    en: {
      title: 'VIETNAM MEDICAL ACHIEVEMENTS',
      subtitle: 'TOP-TIER SPECIALIST CAPABILITIES & HEALING TECH',
      body: 'Delivering complex surgical procedures on par with global medical centers.',
      extra_json: {
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443991/vmta_about_hero.png',
      },
    },
  },

  // ==================== 4. TRANG MẠNG LƯỚI LIÊN MINH (alliance) ====================
  {
    page_slug: 'alliance',
    section_key: 'hero',
    order: 1,
    vi: {
      title: 'MẠNG LƯỚI LIÊN MINH VMTA',
      subtitle: 'HỘI TỤ BỆNH VIỆN HẠNG ĐẶC BIỆT, RESORT CAO CẤP & ĐƠN VỊ LỮ HÀNH UY TÍN',
      body: 'Mạng lưới kết nối chặt chẽ giữa 4 trụ cột: Y tế - Lữ hành - Lưu trú - Công nghệ.',
      extra_json: {
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443995/vmta_about_architect.jpg',
      },
    },
    en: {
      title: 'VMTA ALLIANCE NETWORK',
      subtitle: 'UNITING TOP HOSPITALS, RESORTS & TRAVEL OPERATORS',
      body: 'Strongly integrated network bridging Healthcare, Travel, Accommodation and Technology.',
      extra_json: {
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443995/vmta_about_architect.jpg',
      },
    },
  },

  // ==================== 5. TRANG LIÊN HỆ (contact) ====================
  {
    page_slug: 'contact',
    section_key: 'hero',
    order: 1,
    vi: {
      title: 'Liên hệ',
      subtitle: 'Liên hệ với VMTA',
      body: 'Nơi mọi hành trình chăm sóc sức khỏe được thiết kế riêng',
      extra_json: {
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443991/vmta_about_hero.png',
      },
    },
    en: {
      title: 'Contact',
      subtitle: 'Contact VMTA',
      body: 'Where every healthcare journey is personalized',
      extra_json: {
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443991/vmta_about_hero.png',
      },
    },
  },

  // ==================== 6. TRANG PHÁP LÝ: BẢO MẬT (policy_privacy) ====================
  {
    page_slug: 'policy_privacy',
    section_key: 'hero',
    order: 1,
    vi: {
      title: 'Chính Sách Bảo Mật',
      subtitle: 'BẢO VỆ DỮ LIỆU & QUYỀN RIÊNG TƯ CỦA DU KHÁCH Y TẾ',
      body: 'Cam kết bảo mật thông tin hồ sơ y tế, dữ liệu cá nhân và lịch trình nghỉ dưỡng theo chuẩn SLA & HIPAA.',
      extra_json: {
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443991/vmta_about_hero.png',
      },
    },
    en: {
      title: 'Privacy Policy',
      subtitle: 'DATA PROTECTION & PRIVACY ASSURANCE',
      body: 'Committed to safeguarding medical records, personal data and resort itineraries per SLA & HIPAA standards.',
      extra_json: {
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443991/vmta_about_hero.png',
      },
    },
  },

  // ==================== 7. TRANG PHÁP LÝ: QUY TẮC ĐẠO ĐỨC (policy_ethics) ====================
  {
    page_slug: 'policy_ethics',
    section_key: 'hero',
    order: 1,
    vi: {
      title: 'Quy Tắc Đạo Đức & Ứng Xử Thành Viên',
      subtitle: 'TIÊU CHUẨN ĐẠO ĐỨC NGHỀ NGHIỆP & BẢO CHỨNG CHẤT LƯỢNG LINH HỒN LIÊN MINH',
      body: 'Bộ quy tắc áp dụng bắt buộc cho toàn bộ Bệnh viện, Resort, Lữ hành và Công nghệ gia nhập hệ sinh thái VMTA.',
      extra_json: {
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443995/vmta_about_architect.jpg',
      },
    },
    en: {
      title: 'Member Code of Ethics & Conduct',
      subtitle: 'PROFESSIONAL ETHICAL STANDARDS & ALLIANCE CODE',
      body: 'Mandatory ethical guidelines governing all Hospitals, Resorts, Travel agencies and Tech partners.',
      extra_json: {
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788443995/vmta_about_architect.jpg',
      },
    },
  },

  // ==================== 8. TRANG PHÁP LÝ: QUYỀN LỢI THÀNH VIÊN (policy_benefits) ====================
  {
    page_slug: 'policy_benefits',
    section_key: 'hero',
    order: 1,
    vi: {
      title: 'Quyền Lợi Của Thành Viên Liên Minh',
      subtitle: 'GIA TĂNG GIÁ TRỊ THƯƠNG HIỆU & TIẾP CẬN TỆP KHÁCH HÀNG TOÀN CẦU',
      body: 'Hệ thống quyền lợi độc quyền dành cho Bệnh viện, Phòng khám, Khách sạn - Resort và Doanh nghiệp Lữ hành khi chính thức gia nhập VMTA.',
      extra_json: {
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444005/vmta_values_bg.png',
      },
    },
    en: {
      title: 'Alliance Member Benefits',
      subtitle: 'ELEVATING BRAND VALUE & GLOBAL PATIENT ACCESS',
      body: 'Exclusive benefits suite supporting accredited Hospitals, Clinics, Resorts and Travel Agencies upon joining VMTA.',
      extra_json: {
        image_url: 'https://res.cloudinary.com/bl0iakcy/image/upload/v1788444005/vmta_values_bg.png',
      },
    },
  },
];

async function main() {
  console.log('Seeding CMS sections into PostgreSQL / SQLite database...');

  for (const item of defaultSections) {
    let existingSections: any[] = await prisma.$queryRawUnsafe(
      `SELECT id FROM CmsSection WHERE page_slug = ? AND section_key = ? LIMIT 1;`,
      item.page_slug,
      item.section_key
    );

    let sectionId: number;

    if (existingSections && existingSections.length > 0) {
      sectionId = existingSections[0].id;
      await prisma.$executeRawUnsafe(
        `UPDATE CmsSection SET "order" = ? WHERE id = ?;`,
        item.order,
        sectionId
      );
    } else {
      await prisma.$executeRawUnsafe(
        `INSERT INTO CmsSection (page_slug, section_key, "order") VALUES (?, ?, ?);`,
        item.page_slug,
        item.section_key,
        item.order
      );
      const newlyCreated: any[] = await prisma.$queryRawUnsafe(
        `SELECT id FROM CmsSection WHERE page_slug = ? AND section_key = ? LIMIT 1;`,
        item.page_slug,
        item.section_key
      );
      sectionId = newlyCreated[0].id;
    }

    const upsertTrans = async (locale: string, langData: any) => {
      const extraJsonStr = langData.extra_json ? JSON.stringify(langData.extra_json) : null;
      const existingTrans: any[] = await prisma.$queryRawUnsafe(
        `SELECT id FROM CmsSectionTranslation WHERE section_id = ? AND locale = ? LIMIT 1;`,
        sectionId,
        locale
      );

      if (existingTrans && existingTrans.length > 0) {
        await prisma.$executeRawUnsafe(
          `UPDATE CmsSectionTranslation SET title = ?, subtitle = ?, body = ?, extra_json = ? WHERE section_id = ? AND locale = ?;`,
          langData.title, langData.subtitle, langData.body, extraJsonStr, sectionId, locale
        );
      } else {
        await prisma.$executeRawUnsafe(
          `INSERT INTO CmsSectionTranslation (section_id, locale, title, subtitle, body, extra_json) VALUES (?, ?, ?, ?, ?, ?);`,
          sectionId, locale, langData.title, langData.subtitle, langData.body, extraJsonStr
        );
      }
    };

    await upsertTrans('vi', item.vi);
    await upsertTrans('en', item.en);

    console.log(`Seeded ${item.page_slug}/${item.section_key}`);
  }

  console.log('SUCCESSFULLY SEEDED ALL CMS SECTIONS WITH LIVE CLOUDINARY CDN LINKS INTO DATABASE!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
