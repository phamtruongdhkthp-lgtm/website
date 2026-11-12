import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Loader2,
  Terminal,
  ArrowRight,
  ShieldCheck,
  Globe,
  Layers,
  Palette,
  Code,
  Layout,
  Smartphone,
  Check,
} from 'lucide-react';
import { Project } from '../types';

interface BuildProgressProps {
  project: Project;
  onComplete: (project: Project) => void;
}

export const BuildProgress: React.FC<BuildProgressProps> = ({
  project,
  onComplete,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [progressPercent, setProgressPercent] = useState(12);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    `[INIT] Khởi động AI Generation Engine v3.8...`,
    `[TARGET] Kết nối đến website mẫu: ${project.sampleUrl}`,
  ]);

  const steps = [
    { title: 'Đang truy cập website mẫu', desc: 'Thiết lập phiên làm việc và kiểm tra phản hồi HTTP 200' },
    { title: 'Đang thu thập dữ liệu', desc: 'Bóc tách mã HTML, CSS stylesheet, hình ảnh công khai' },
    { title: 'Đang phân tích cấu trúc', desc: 'Xây dựng cây DOM, phát hiện sitemap và điều hướng' },
    { title: 'Đang phân tích thiết kế', desc: 'Trích xuất Design Tokens: màu chủ đạo, font chữ, bố cục' },
    { title: 'Đang xây dựng website', desc: 'Tái lập component React & cấu hình Tailwind CSS' },
    { title: 'Đang thay thế thông tin thương hiệu', desc: `Áp dụng tên "${project.name}", email, logo và thông tin mới` },
    { title: 'Đang kiểm tra giao diện', desc: 'Kiểm tra độ tương thích Mobile, Tablet, Desktop & QA' },
    { title: 'Hoàn tất & Tối ưu hóa', desc: 'Sẵn sàng chỉnh sửa trực quan trong AI Editor và xuất bản' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev < steps.length - 1) {
          const next = prev + 1;
          const nextPercent = Math.min(100, Math.round(((next + 1) / steps.length) * 100));
          setProgressPercent(nextPercent);

          const stepLogs = [
            `[CRAWLER] Đã tải 100% tài nguyên DOM từ ${project.sampleUrl}`,
            `[PARSER] Phát hiện ${project.analysis.totalPages} trang nội bộ, ${project.analysis.detectedImages.length} hình ảnh`,
            `[DESIGN_TOKENS] Bảng màu: ${project.activeTheme.primaryColor}, Typography: ${project.analysis.detectedFonts[0]?.name}`,
            `[AI_CODEGEN] Khởi tạo component React 19 + Tailwind CSS hoàn chỉnh`,
            `[BRAND_INJECTION] Cập nhật nhận diện mới: ${project.brandInfo.businessName}`,
            `[RESPONSIVE_QA] Hoàn tất kiểm thử trên iOS, Android và Chromium`,
            `[SUCCESS] Website đã sẵn sàng! Mã nguồn đóng gói thành công.`,
          ];

          if (stepLogs[next - 1]) {
            setTerminalLogs((old) => [...old, stepLogs[next - 1]]);
          }

          return next;
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1100);

    return () => clearInterval(timer);
  }, []);

  const isFinished = currentStepIdx === steps.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
      <div className="glass-panel-gold rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl border border-amber-400/40 relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-500/15 blur-3xl pointer-events-none"></div>

        {/* Progress Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            {isFinished ? (
              <>
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span className="text-emerald-300">Khởi Tạo Thành Công!</span>
              </>
            ) : (
              <>
                <Sparkles size={14} className="animate-spin text-amber-400" />
                <span>AI Đang Tiến Hành Xây Dựng Website</span>
              </>
            )}
          </div>

          <h3 className="text-xl md:text-2xl font-extrabold text-white">
            {isFinished ? 'Website Đã Sẵn Sàng!' : 'Quá Trình Tạo Website Tự Động'}
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {steps[currentStepIdx]?.desc}
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300">Tiến độ hoàn thiện:</span>
            <span className="font-bold text-amber-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="bg-gradient-to-r from-amber-500 via-amber-300 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* 8 Process Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {steps.map((st, idx) => {
            const isDone = idx < currentStepIdx;
            const isCurrent = idx === currentStepIdx;

            return (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
                  isDone
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                    : isCurrent
                    ? 'bg-amber-400/15 border-amber-400/40 text-amber-300 font-semibold shadow-sm'
                    : 'bg-white/[0.02] border-white/5 text-slate-500'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                      : isCurrent
                      ? 'bg-amber-400 text-slate-950 font-bold animate-pulse'
                      : 'bg-white/5 text-slate-500'
                  }`}
                >
                  {isDone ? <Check size={12} /> : idx + 1}
                </div>
                <div className="truncate">
                  <div className="truncate font-medium">{st.title}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real-time Terminal Log Window */}
        <div className="rounded-xl bg-slate-950/90 border border-white/10 p-3.5 space-y-1 font-mono text-[11px] h-32 overflow-y-auto">
          <div className="flex items-center gap-2 text-slate-500 pb-1 border-b border-white/5 text-[10px]">
            <Terminal size={12} />
            <span>NHẬT KÝ XỬ LÝ (LIVE ACTIVITY LOG)</span>
          </div>
          {terminalLogs.map((log, idx) => (
            <div key={idx} className="text-slate-300 leading-relaxed">
              <span className="text-amber-400 mr-1.5">›</span>
              {log}
            </div>
          ))}
        </div>

        {/* Action Button when Complete */}
        {isFinished ? (
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => onComplete(project)}
              className="w-full py-3.5 rounded-xl gold-gradient-btn text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 cursor-pointer"
            >
              <Sparkles size={16} />
              <span>Mở Trong AI Website Editor Ngay</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
            <Loader2 size={14} className="animate-spin text-amber-400" />
            <span>Đang hoàn tất đóng gói dữ liệu...</span>
          </div>
        )}
      </div>
    </div>
  );
};
