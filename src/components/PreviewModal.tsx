import React, { useState } from 'react';
import {
  X,
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
  ExternalLink,
  Download,
  UploadCloud,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Menu,
  Zap,
  ShieldCheck,
  BarChart3,
  Headphones,
} from 'lucide-react';
import { Project } from '../types';

interface PreviewModalProps {
  project: Project;
  onClose: () => void;
  onOpenEditor: (project: Project) => void;
  onExportCode: (project: Project) => void;
  onOpenPublish: (project: Project) => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  project,
  onClose,
  onOpenEditor,
  onExportCode,
  onOpenPublish,
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const primaryColor = project.activeTheme.primaryColor || '#D4AF37';
  const brandName = project.brandInfo.businessName || project.name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 bg-black/85 backdrop-blur-md overflow-hidden">
      <div className="glass-panel-gold rounded-3xl w-full max-w-6xl h-[92vh] flex flex-col shadow-2xl border border-amber-400/30 overflow-hidden">
        {/* Top Control Bar */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-slate-950 text-sm shadow-md"
              style={{ backgroundColor: primaryColor }}
            >
              {brandName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <span>{brandName}</span>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-white/10 text-slate-300">
                  Cấp độ {project.level}
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 truncate max-w-xs">{project.sampleUrl}</p>
            </div>
          </div>

          {/* Device Controls */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded-lg text-xs cursor-pointer ${
                deviceMode === 'desktop'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop View"
            >
              <Monitor size={15} />
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded-lg text-xs cursor-pointer ${
                deviceMode === 'tablet'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet View"
            >
              <Tablet size={15} />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-lg text-xs cursor-pointer ${
                deviceMode === 'mobile'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile View"
            >
              <Smartphone size={15} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenEditor(project);
              }}
              className="px-3 py-1.5 rounded-xl gold-gradient-btn text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles size={13} />
              <span>Sửa Bằng AI</span>
            </button>

            <button
              onClick={() => onExportCode(project)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-semibold cursor-pointer"
            >
              <Download size={13} />
              <span>Tải Mã Nguồn</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Preview Canvas */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex items-start justify-center bg-black/50">
          <div
            className={`transition-all duration-300 bg-[#07090e] shadow-2xl rounded-2xl overflow-hidden border border-white/10 text-slate-100 flex flex-col ${
              deviceMode === 'mobile'
                ? 'w-[375px] min-h-[720px] ring-8 ring-slate-800'
                : deviceMode === 'tablet'
                ? 'w-[768px] min-h-[850px] ring-8 ring-slate-800'
                : 'w-full max-w-5xl'
            }`}
          >
            {/* Navigation */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0a0d16]/90 border-b border-white/10 px-6 py-4">
              <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-slate-950 text-xl shadow-md"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {brandName.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-extrabold text-lg md:text-xl tracking-tight text-white">
                    {brandName}
                  </span>
                </div>

                {deviceMode !== 'mobile' && (
                  <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
                    <a href="#f-feat" className="hover:text-white transition">Tính Năng</a>
                    <a href="#f-price" className="hover:text-white transition">Bảng Giá</a>
                    <a href="#f-contact" className="hover:text-white transition">Liên Hệ</a>
                  </div>
                )}

                {deviceMode !== 'mobile' && (
                  <div className="hidden md:flex items-center gap-3">
                    <a
                      href="#f-contact"
                      className="px-4 py-2 rounded-xl font-bold text-xs text-slate-950 transition hover:brightness-110 shadow-sm"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Tư Vấn Ngay
                    </a>
                  </div>
                )}

                <button
                  className={`${deviceMode === 'mobile' ? 'block' : 'md:hidden'} text-slate-300 p-1 cursor-pointer`}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>

              {mobileMenuOpen && (
                <div className="pt-3 pb-2 border-t border-white/10 mt-3 flex flex-col gap-2 text-xs">
                  <a href="#f-feat" onClick={() => setMobileMenuOpen(false)}>Tính Năng</a>
                  <a href="#f-price" onClick={() => setMobileMenuOpen(false)}>Bảng Giá</a>
                  <a href="#f-contact" onClick={() => setMobileMenuOpen(false)}>Liên Hệ</a>
                </div>
              )}
            </header>

            {/* Hero */}
            <section className="relative py-16 md:py-20 px-6 text-center flex flex-col items-center">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 border"
                style={{
                  borderColor: `${primaryColor}40`,
                  color: primaryColor,
                  backgroundColor: `${primaryColor}15`,
                }}
              >
                <Sparkles size={14} />
                <span>Cấp độ {project.level} • Khởi Tạo Bằng AI</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight mb-5 text-white">
                Nâng Tầm Doanh Nghiệp Cùng{' '}
                <span style={{ color: primaryColor }}>{brandName}</span>
              </h1>

              <p className="text-slate-300 text-sm md:text-base max-w-2xl mb-8 leading-relaxed">
                {project.analysis.description ||
                  'Website chuẩn thương hiệu cao cấp với kiến trúc hiện đại, tối ưu tốc độ và tỷ lệ chuyển đổi.'}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                <a
                  href="#f-contact"
                  className="px-6 py-3 rounded-xl font-bold text-slate-950 text-xs md:text-sm shadow-lg transition hover:brightness-110"
                  style={{ backgroundColor: primaryColor }}
                >
                  Bắt Đầu Ngay
                </a>
                <a
                  href="#f-feat"
                  className="px-6 py-3 rounded-xl font-semibold text-slate-200 border border-white/20 hover:bg-white/5 transition text-xs md:text-sm"
                >
                  Khám Phá Tính Năng
                </a>
              </div>

              <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 max-h-80">
                <img
                  src={project.analysis.screenshotUrl}
                  alt="Showcase"
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            </section>

            {/* Features */}
            <section id="f-feat" className="py-16 px-6 max-w-5xl mx-auto w-full">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold mb-2 text-white">Tính Năng Nổi Bật</h2>
                <p className="text-xs text-slate-400">Được tối ưu chuẩn hóa theo tiêu chuẩn công nghệ quốc tế</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { title: 'Tốc Độ Vượt Trội', desc: 'Tải trang dưới 0.8 giây, chuẩn hóa SEO 100/100.', icon: Zap },
                  { title: 'Bảo Mật Cao Cấp', desc: 'Mã hóa SSL 256-bit bảo vệ an toàn toàn diện.', icon: ShieldCheck },
                  { title: 'Chuẩn Di Động', desc: 'Thích ứng hoàn hảo mọi thiết bị di động và tablet.', icon: Smartphone },
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-slate-950 font-bold"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <item.icon size={20} />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Form */}
            <section id="f-contact" className="py-16 px-6 max-w-3xl mx-auto w-full">
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2 text-white">Liên Hệ Tư Vấn</h2>
                  <p className="text-xs text-slate-400">{project.brandInfo.phone || '0988.123.456'}</p>
                </div>

                {contactSuccess ? (
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center text-emerald-300 text-xs font-semibold">
                    Cảm ơn quý khách! Yêu cầu tư vấn đã được gửi thành công.
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setContactSuccess(true);
                    }}
                    className="space-y-3"
                  >
                    <input
                      type="text"
                      placeholder="Họ và tên"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-xs"
                    />
                    <input
                      type="tel"
                      placeholder="Số điện thoại"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-xs"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl font-bold text-slate-950 text-xs transition hover:brightness-110"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Gửi Yêu Cầu
                    </button>
                  </form>
                )}
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-auto border-t border-white/10 py-6 px-6 bg-[#040609] text-xs text-slate-400 text-center">
              © {new Date().getFullYear()} {brandName}. Tạo tự động bởi AI Website Builder.
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
