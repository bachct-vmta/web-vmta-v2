'use client';

import React, { useState } from 'react';

interface AllianceJoinFormProps {
  locale: string;
}

export const AllianceJoinForm: React.FC<AllianceJoinFormProps> = ({ locale }) => {
  const isVi = locale === 'vi';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('');
  const [company, setCompany] = useState('');
  const [note, setNote] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    setStatus(null);

    const serviceTag = `Đăng ký Liên minh: ${company || 'Doanh nghiệp'} (${industry || 'Y tế / Du lịch'})`;
    const messageContent = `Tên doanh nghiệp: ${company || 'Chưa điền'} | Ngành nghề: ${industry || 'Chưa điền'} | Ghi chú: ${note || 'Không có ghi chú'}`;

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          service: serviceTag,
          message: messageContent,
          honeypot,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          msg: isVi
            ? 'Đăng ký tham gia Liên minh VMTA thành công! Đội ngũ điều phối sẽ liên hệ lại quý doanh nghiệp trong 24h.'
            : 'Successfully registered for VMTA Alliance! Our team will contact your enterprise within 24h.',
        });
        setName('');
        setEmail('');
        setPhone('');
        setIndustry('');
        setCompany('');
        setNote('');
      } else {
        setStatus({
          type: 'error',
          msg: data.error || (isVi ? 'Có lỗi xảy ra khi gửi đăng ký' : 'Failed to submit registration'),
        });
      }
    } catch {
      setStatus({
        type: 'error',
        msg: isVi ? 'Lỗi kết nối tới máy chủ' : 'Connection error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="partner-form" className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-6">
      <div className="text-center border-b border-slate-100 pb-6">
        <h2 className="font-sharp-bo text-[30px] md:text-[34px] uppercase font-bold leading-tight text-[#0b7f7c] mb-2">
          {isVi ? 'Tham gia hệ sinh thái của VMTA' : 'Join the VMTA Ecosystem'}
        </h2>
        <p className="font-utm-helve text-slate-700 text-base">
          {isVi
            ? 'Kết nối với hệ sinh thái Liên minh du lịch Y tế Việt Nam'
            : 'Connect with the Vietnam Medical Tourism Alliance Ecosystem'}
        </p>
      </div>

      {status && (
        <div
          className={`p-4 rounded-2xl text-xs md:text-sm font-bold ${
            status.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {status.msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Honeypot field for anti-spam */}
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isVi ? 'Họ tên *' : 'Name *'}
              className="w-full px-4 py-4 bg-[#0b7f7c] text-white placeholder-white/90 font-utm-helve text-base focus:outline-none focus:ring-2 focus:ring-[#d31e45] rounded-none border-0"
            />
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-4 bg-[#0b7f7c] text-white placeholder-white/90 font-utm-helve text-base focus:outline-none focus:ring-2 focus:ring-[#d31e45] rounded-none border-0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={isVi ? 'Điện thoại *' : 'Phone *'}
              className="w-full px-4 py-4 bg-[#0b7f7c] text-white placeholder-white/90 font-utm-helve text-base focus:outline-none focus:ring-2 focus:ring-[#d31e45] rounded-none border-0"
            />
          </div>

          <div>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder={isVi ? 'Ngành nghề (Bệnh viện / Lữ hành / Resort...)' : 'Industry'}
              className="w-full px-4 py-4 bg-[#0b7f7c] text-white placeholder-white/90 font-utm-helve text-base focus:outline-none focus:ring-2 focus:ring-[#d31e45] rounded-none border-0"
            />
          </div>
        </div>

        <div>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={isVi ? 'Tên doanh nghiệp / Đơn vị' : 'Company name'}
            className="w-full px-4 py-4 bg-[#0b7f7c] text-white placeholder-white/90 font-utm-helve text-base focus:outline-none focus:ring-2 focus:ring-[#d31e45] rounded-none border-0"
          />
        </div>

        <div>
          <textarea
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={isVi ? 'Ghi chú / Yêu cầu thêm' : 'Note / Additional Requests'}
            className="w-full px-4 py-4 bg-[#0b7f7c] text-white placeholder-white/90 font-utm-helve text-base focus:outline-none focus:ring-2 focus:ring-[#d31e45] resize-none border-0 min-h-[120px]"
          />
        </div>

        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[#0b7f7c] px-10 py-4 font-sharp-bo text-white uppercase font-bold text-sm hover:bg-[#096d6a] transition shadow-md disabled:opacity-50"
          >
            {loading ? (isVi ? 'Đang gửi...' : 'Sending...') : isVi ? 'Gửi ngay' : 'Submit now'}
          </button>
        </div>
      </form>
    </div>
  );
};
