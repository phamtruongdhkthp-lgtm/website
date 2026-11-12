import React, { useState } from 'react';
import {
  Settings,
  Sparkles,
  ShieldCheck,
  Server,
  Globe,
  Database,
  Cpu,
  CheckCircle2,
  Lock,
  Terminal,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [modelType, setModelType] = useState('gemini-3.8-flash');
  const [crawlerEngine, setCrawlerEngine] = useState('playwright-stealth');
  const [rateLimit, setRateLimit] = useState('5');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-2">
          <Settings size={22} className="text-amber-400" />
          <span>Cài Đặt Hệ Thống & Crawler Engine</span>
        </h2>
        <p className="text-xs text-slate-400">
          Cấu hình mô hình AI, Playwright Crawler và các chính sách bảo mật dữ liệu
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* AI Model Configuration */}
        <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Cpu size={16} className="text-amber-400" />
            <span>1. Cấu Hình Mô Hình Trí Tuệ Nhân Tạo (AI Engine)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold">Mô hình AI chủ đạo</label>
              <select
                value={modelType}
                onChange={(e) => setModelType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-amber-400 focus:outline-none cursor-pointer"
              >
                <option value="gemini-3.8-flash" className="bg-slate-900">
                  Gemini 3.8 Flash (Tốc độ cao, tối ưu code React)
                </option>
                <option value="gemini-3.5-pro" className="bg-slate-900">
                  Gemini 3.5 Pro (Suy luận sâu, kiến trúc phức tạp)
                </option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold">Cơ chế bảo mật API Key</label>
              <div className="px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[11px] flex items-center gap-2">
                <Lock size={13} />
                <span>Backend Proxy (Server-side Gemini API)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Playwright Crawler Configuration */}
        <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Globe size={16} className="text-indigo-400" />
            <span>2. Cấu Hình Kiến Trúc Thu Thập Dữ Liệu (Crawler Engine)</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Hệ thống hỗ trợ backend Playwright Crawler để tự động phân tích DOM, trích xuất CSS
            stylesheet, chụp ảnh màn hình đa tỷ lệ (Desktop, Tablet, Mobile) và lập bản đồ sitemap.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold">Công nghệ Crawler</label>
              <select
                value={crawlerEngine}
                onChange={(e) => setCrawlerEngine(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-amber-400 focus:outline-none cursor-pointer"
              >
                <option value="playwright-stealth" className="bg-slate-900">
                  Playwright Headless Chromium (Bóc tách SPA, CSR, SSR)
                </option>
                <option value="fast-html" className="bg-slate-900">
                  Fast Static Cheerio/Axios (Tốc độ cao cho website tĩnh)
                </option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold">Giới hạn tần suất (Requests/giây)</label>
              <input
                type="number"
                value={rateLimit}
                onChange={(e) => setRateLimit(e.target.value)}
                min="1"
                max="20"
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300 space-y-1.5">
            <div className="text-amber-400 font-bold flex items-center gap-1.5">
              <span>Chính sách thu thập tuân thủ:</span>
            </div>
            <div className="text-slate-400">• Chỉ quét tài nguyên HTML, CSS, hình ảnh công khai có thể tiếp cận bằng trình duyệt.</div>
            <div className="text-slate-400">• Tuyệt đối không can thiệp backend, cơ sở dữ liệu hoặc thông tin tài khoản người dùng.</div>
          </div>
        </div>

        {/* Security & Deployment Environment */}
        <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>3. Tiêu Chuẩn Bảo Mật & Xuất Bản</span>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span>Mã hóa đường truyền HTTPS / SSL</span>
              <span className="text-emerald-400 font-mono font-semibold">Tự động (Let's Encrypt 256-bit)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span>Định dạng mã nguồn xuất bản</span>
              <span className="text-amber-400 font-mono font-semibold">React 19 + Tailwind CSS + TypeScript</span>
            </div>
          </div>
        </div>

        {saveSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>Đã lưu toàn bộ cấu hình hệ thống thành công!</span>
          </div>
        )}

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl gold-gradient-btn text-xs font-bold shadow-md cursor-pointer"
        >
          Lưu Cấu Hình
        </button>
      </form>
    </div>
  );
};
