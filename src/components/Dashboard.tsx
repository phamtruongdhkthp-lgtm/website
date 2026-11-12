import React, { useState } from 'react';
import {
  Globe,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  Code,
  UploadCloud,
  CheckCircle2,
  Clock,
  Zap,
  TrendingUp,
  Sliders,
  ShieldCheck,
  FileCode,
  Download,
  Brain,
  FileCheck2,
} from 'lucide-react';
import { Project, ReplicationLevel } from '../types';
import { LEVEL_DEFINITIONS } from '../utils/engine';
import { ReplicationLevelsShowcase } from './ReplicationLevelsShowcase';

interface DashboardProps {
  projects: Project[];
  onOpenCreate: (urlHint?: string) => void;
  onOpenEditor: (project: Project) => void;
  onOpenPreview: (project: Project) => void;
  onOpenPublish: (project: Project) => void;
  onExportCode: (project: Project) => void;
  onNavigateToBrain?: () => void;
  onNavigateToEssentials?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  projects,
  onOpenCreate,
  onOpenEditor,
  onOpenPreview,
  onOpenPublish,
  onExportCode,
  onNavigateToBrain,
  onNavigateToEssentials,
}) => {
  const [quickUrl, setQuickUrl] = useState('');

  const completedCount = projects.filter((p) => p.status === 'completed').length;
  const processingCount = projects.filter((p) => p.status === 'processing').length;

  const sampleQuickUrls = [
    { label: 'VinFast Auto', url: 'https://vinfastauto.com', category: 'Ô tô điện' },
    { label: 'Highlands Coffee', url: 'https://highlandscoffee.com.vn', category: 'F&B' },
    { label: 'Stripe SaaS', url: 'https://stripe.com', category: 'FinTech' },
    { label: 'Thế Giới Di Động', url: 'https://thegioididong.com', category: 'E-commerce' },
    { label: 'Apple Global', url: 'https://apple.com', category: 'Công nghệ cao' },
  ];

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickUrl.trim()) {
      onOpenCreate(quickUrl.trim());
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Hero Quick-Start Banner */}
      <div className="relative rounded-3xl p-8 md:p-10 glass-panel-gold overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute right-10 top-10 hidden lg:block opacity-25 pointer-events-none">
          <Sparkles size={140} className="text-amber-400" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-4">
            <Sparkles size={14} />
            <span>AI Tự Động Hóa 100% Từ URL Mẫu</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Tạo Website Chuyên Nghiệp Trong <span className="gold-gradient-text">60 Giây</span>
          </h2>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            Dán đường dẫn bất kỳ website nào bạn yêu thích. Chọn 1 trong 5 cấp độ tái tạo từ nguyên bản
            đến sáng tạo độc bản. AI sẽ bóc tách cấu trúc, màu sắc, font chữ và xuất bản mã nguồn React hoàn chỉnh.
          </p>

          {/* Quick URL Input Form */}
          <form onSubmit={handleQuickSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Globe className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Dán link website mẫu (ví dụ: https://vinfastauto.com hoặc apple.com)..."
                value={quickUrl}
                onChange={(e) => setQuickUrl(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:border-amber-400 focus:bg-black/40 focus:outline-none text-white placeholder-slate-400 text-sm transition"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl gold-gradient-btn flex items-center justify-center gap-2 font-bold text-sm shadow-lg whitespace-nowrap cursor-pointer"
            >
              <span>Phân Tích & Bắt Đầu</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Suggestion Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
            <span className="text-slate-400 font-medium">Thử nhanh với mẫu:</span>
            {sampleQuickUrls.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onOpenCreate(s.url)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-amber-300 transition cursor-pointer flex items-center gap-1.5"
              >
                <span>{s.label}</span>
                <span className="text-[10px] text-slate-400">({s.category})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5 Cấp Độ Tái Tạo Thông Minh & Ví Dụ Minh Họa 1 Web Gốc + 5 Mức Độ (Ngay sau chỗ tạo website) */}
      <ReplicationLevelsShowcase
        onSelectLevelToCreate={(level, url) => {
          onOpenCreate(url);
        }}
      />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Tổng số dự án
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400">
              <Layers size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">{projects.length}</div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <TrendingUp size={13} className="text-emerald-400" />
            <span className="text-emerald-400 font-medium">+100%</span> trong tháng này
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Website đã tạo
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-400/10 flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">{completedCount}</div>
          <div className="text-xs text-slate-400 mt-1">Đã sẵn sàng tải code & xuất bản</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Đang xử lý / Crawler
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-400/10 flex items-center justify-center text-indigo-400">
              <Zap size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">{processingCount}</div>
          <div className="text-xs text-slate-400 mt-1">Băng thông thời gian thực</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Tốc độ tạo trung bình
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-400/10 flex items-center justify-center text-purple-400">
              <Clock size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">42s</div>
          <div className="text-xs text-slate-400 mt-1">Tối ưu kiến trúc Vite & Tailwind</div>
        </div>
      </div>

      {/* AI Brain & Website Essentials Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: AI Brain Hub Card */}
        <div className="glass-panel p-6 rounded-3xl border border-amber-400/20 relative overflow-hidden flex flex-col justify-between group hover:border-amber-400/40 transition-all">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 text-xs font-semibold border border-amber-400/25">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <Brain size={13} />
                BỘ NÃO A.I ĐANG KẾT NỐI
              </span>
              <span className="text-[11px] font-mono text-slate-400">Google Gemini 3.8 Flash</span>
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
              Trung Tâm Điều Hành Bộ Não A.I
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Kiểm tra tình trạng kết nối, độ trễ và thử nghiệm trực tiếp các câu lệnh (prompts) với mô hình Gemini 3.8 Flash & DeepMind trước khi tạo website.
            </p>
          </div>

          <div className="relative z-10 mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <Zap size={13} className="text-amber-400" />
              <span>Độ trễ: ~78ms (Sẵn sàng)</span>
            </div>
            <button
              onClick={onNavigateToBrain}
              className="px-3.5 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Vào Trung Tâm AI</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Card 2: Website Essentials Card */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all">
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-semibold border border-indigo-500/25">
                <FileCheck2 size={13} />
                HỒ SƠ CƠ BẢN (ESSENTIALS)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                AI Ready
              </span>
            </div>
            <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
              Điền Những Thứ Cơ Bản – Để AI Làm Phần Còn Lại
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Nhập tên thương hiệu, slogan, hotline Zalo và 3 sản phẩm/dịch vụ cốt lõi. AI sẽ tự động phân bổ layout, viết slogan và xây dựng toàn bộ website.
            </p>
          </div>

          <div className="relative z-10 mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Hỗ trợ 4 mẫu ngành nghề 1 click</span>
            <button
              onClick={onNavigateToEssentials}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Điền Hồ Sơ Ngay</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Projects List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers size={18} className="text-amber-400" />
              <span>Dự Án Gần Đây ({projects.length})</span>
            </h3>
            <p className="text-xs text-slate-400">Quản lý, chỉnh sửa trực quan bằng AI và xuất bản</p>
          </div>

          <button
            onClick={() => onOpenCreate()}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>+ Tạo website mới</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col group"
            >
              {/* Thumbnail with overlay */}
              <div className="relative h-44 bg-slate-900 overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                {/* Level badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg backdrop-blur-md bg-slate-950/80 border border-amber-400/30 text-amber-300 text-[11px] font-semibold">
                  Cấp độ {project.level} • {LEVEL_DEFINITIONS[project.level - 1]?.badge}
                </div>

                {/* Status */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg backdrop-blur-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Hoàn thành</span>
                </div>

                {/* Brand Name on thumbnail */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="font-extrabold text-white text-lg tracking-tight truncate drop-shadow">
                    {project.name}
                  </h4>
                  <div className="text-xs text-slate-300 flex items-center gap-1.5 truncate">
                    <Globe size={12} className="text-amber-400 shrink-0" />
                    <span className="truncate">{project.sampleUrl}</span>
                  </div>
                </div>
              </div>

              {/* Project Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Số trang phát hiện:</span>
                    <span className="font-mono text-white font-semibold">
                      {project.analysis.totalPages} trang
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Màu chủ đạo:</span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: project.activeTheme.primaryColor }}
                      ></span>
                      <span className="font-mono text-slate-200 text-[11px]">
                        {project.activeTheme.primaryColor}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Hosting / Subdomain:</span>
                    <span className="font-mono text-amber-300/90 text-[11px] truncate max-w-[160px]">
                      {project.deployment.subdomain}
                    </span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onOpenEditor(project)}
                    className="py-2 px-3 rounded-xl gold-gradient-btn text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles size={13} />
                    <span>Mở AI Editor</span>
                  </button>

                  <button
                    onClick={() => onOpenPreview(project)}
                    className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <ExternalLink size={13} />
                    <span>Xem trước</span>
                  </button>

                  <button
                    onClick={() => onExportCode(project)}
                    className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Download size={13} />
                    <span>Tải Mã Nguồn</span>
                  </button>

                  <button
                    onClick={() => onOpenPublish(project)}
                    className="py-2 px-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <UploadCloud size={13} />
                    <span>Xuất Bản</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
