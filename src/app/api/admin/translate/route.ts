import { NextResponse } from 'next/server';

// Common Vietnamese to English Medical & Business dictionary fallback
const COMMON_DICTIONARY: Record<string, string> = {
  'HỘI ĐỒNG Y KHOA & DU LỊCH Y TẾ VIỆT NAM': 'VIETNAM MEDICAL TOURISM ALLIANCE',
  'VIETNAM MEDICAL TOURISM ALLIANCE': 'INTERNATIONAL HEALTHCARE & RESORT RECOVERY',
  'Nơi hội tụ các bệnh viện, trung tâm y tế hàng đầu và doanh nghiệp lữ hành uy tín, mang đến giải pháp chăm sóc sức khỏe toàn diện kết hợp nghỉ dưỡng cao cấp tại Việt Nam.':
    'Uniting top accredited medical centers and premier travel operators to deliver all-inclusive healthcare and resort recovery in Vietnam.',
  'BỆNH VIỆN ĐẠT CHUẨN': 'ACCREDITED HOSPITALS',
  'ĐỘI NGŨ BÁC SĨ': 'MEDICAL TEAM',
  'CHI PHÍ TIẾT KIỆM': 'COST SAVINGS',
  'HỖ TRỢ 24/7': '24/7 SUPPORT',
  'JCI / ISO INTERNATIONAL': 'JCI / ISO CERTIFIED',
  'CHUYÊN GIA ĐẦU NGÀNH': 'TOP SPECIALISTS',
  'LÊN ĐẾN 60%': 'UP TO 60%',
  'ĐIỀU PHỐI Y TẾ TOÀN DIỆN': 'MEDICAL COORDINATION',
  'KHÁM PHÁ NGAY': 'DISCOVER NOW',
  'LIÊN HỆ TƯ VẤN': 'CONTACT CONSULTANT',
  'TẦM NHÌN, SỨ MỆNH & GIÁ TRỊ CỐT LÕI': 'VISION, MISSION & CORE VALUES',
  'TỰ HÀO LÀ CẦU NỐI Y TẾ VÀ DU LỊCH NGHỈ DƯỠNG UY TÍN': 'PROUD TO BE VIETNAM’S PREMIER MEDICAL TOURISM ALLIANCE',
  'VMTA – KIẾN TRÚC SƯ TRƯỞNG CHO HỆ SINH THÁI DU LỊCH Y TẾ VIỆT NAM': 'VMTA – PIONEERING VIETNAM MEDICAL TOURISM ECOSYSTEM',
  'CẦU NỐI Y TẾ VÀ DU LỊCH NGHỈ DƯỠNG': 'HEALTHCARE & RESORT BRIDGING',
  'GIẢI PHÁP ĐIỀU PHỐI DÀNH CHO CÁC ĐƠN VỊ': 'COORDINATION SOLUTIONS FOR PARTNERS',
  'KẾT NỐI SỨC MẠNH HỆ SINH THÁI GIỮA Y TẾ - NGHỈ DƯỠNG - DU LỊCH': 'INTELLIGENT CONNECTING SYSTEM FOR HEALTHCARE & TOURISM',
  'TẦM NHÌN': 'VISION',
  'SỨ MỆNH': 'MISSION',
  'QUYỀN LỢI THÀNH VIÊN LIÊN MINH': 'ALLIANCE MEMBER BENEFITS',
  'GIA TĂNG GIÁ TRỊ VÀ VƯƠN TẦM THƯƠNG HIỆU': 'MAXIMIZING VALUE & ELEVATING BRAND',
  'KHÁM PHÁ THÊM': 'DISCOVER MORE',
};

// Translate single string using Free Google GTX API
async function translateSingleText(text: string): Promise<string> {
  if (!text || text.trim() === '') return '';
  if (COMMON_DICTIONARY[text.trim()]) return COMMON_DICTIONARY[text.trim()];

  // 1. Try Free Google GTX Endpoint
  try {
    const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=vi&tl=en&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(gtxUrl);
    if (res.ok) {
      const data = await res.json();
      if (data && data[0] && Array.isArray(data[0])) {
        const translatedStr = data[0].map((item: any) => item[0]).filter(Boolean).join('');
        if (translatedStr && translatedStr.trim() !== '') {
          return translatedStr;
        }
      }
    }
  } catch (e) {
    console.warn('GTX translation warn:', e);
  }

  // 2. Try MyMemory Free API Endpoint
  try {
    const mmUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=vi|en`;
    const res = await fetch(mmUrl);
    if (res.ok) {
      const data = await res.json();
      const translatedStr = data.responseData?.translatedText;
      if (translatedStr && translatedStr.trim() !== '' && !translatedStr.includes('MYMEMORY WARNING')) {
        return translatedStr;
      }
    }
  } catch (e) {
    console.warn('MyMemory translation warn:', e);
  }

  return text;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const fields: string[] = body.fields || [];

    if (!fields.length) {
      return NextResponse.json({ translated: [] });
    }

    const apiKey = process.env.GOOGLE_TRANSLATE_KEY;

    // Collect non-empty fields with index mapping
    const indexMap: number[] = [];
    const toTranslate: string[] = [];

    fields.forEach((str, i) => {
      if (str && typeof str === 'string' && str.trim() !== '') {
        indexMap.push(i);
        toTranslate.push(str);
      }
    });

    if (toTranslate.length === 0) {
      return NextResponse.json({ translated: fields.map(() => '') });
    }

    // Official Google Translate API v2 if valid API key is present
    if (apiKey && apiKey !== 'AIzaSyATBXajvzQLTDHEQbcpq0Ihe0vWDHmO520') {
      try {
        const googleUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
        const res = await fetch(googleUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: toTranslate,
            source: 'vi',
            target: 'en',
            format: 'text',
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const googleTranslations = data.data?.translations || [];
          const result = new Array(fields.length).fill('');

          indexMap.forEach((origIdx, resultIdx) => {
            result[origIdx] = googleTranslations[resultIdx]?.translatedText || toTranslate[resultIdx];
          });

          return NextResponse.json({ translated: result });
        }
      } catch (err) {
        console.warn('Official Google Translate API failed, falling back to free engines:', err);
      }
    }

    // Free Engine Auto-Translation (Google GTX + MyMemory + Dictionary)
    const translatedResults = await Promise.all(
      toTranslate.map((text) => translateSingleText(text))
    );

    const finalResult = new Array(fields.length).fill('');
    indexMap.forEach((origIdx, resultIdx) => {
      finalResult[origIdx] = translatedResults[resultIdx] || toTranslate[resultIdx];
    });

    return NextResponse.json({ translated: finalResult });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
