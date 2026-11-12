import React, { useState } from 'react';
import {
  X,
  UploadCloud,
  Globe,
  Download,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Server,
  Terminal,
  FileCode,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { Project } from '../types';

interface PublishModalProps {
  project: Project;
  onClose: () => void;
  onUpdateProject: (updated: Project) => void;
  onExportZip: (project: Project) => void;
  onLogActivity: (action: string, details: string) => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  project,
  onClose,
  onUpdateProject,
  onExportZip,
  onLogActivity,
}) => {
  const [activeTab, setActiveTab] = useState<'cloud' | 'self'>('cloud');
  const [customDomainInput, setCustomDomainInput] = useState(
    project.deployment.customDomain || project.brandInfo.domain || ''
  );
  const [isDeploying, setIsDeploying] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const handlePublishCloud = () => {
    setIsDeploying(true);
    setTimeout(() => {
      const updated = {
        ...project,
        deployment: {
          ...project.deployment,
          isPublished: true,
          customDomain: customDomainInput.trim() || undefined,
          publishedAt: new Date().toISOString(),
          cdnStatus: 'active' as const,
        },
      };
      onUpdateProject(updated);
      setIsDeploying(false);
      onLogActivity('Deploy Website', `Đã xuất bản lên ${updated.deployment.subdomain}`);
    }, 1200);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(id);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel-gold rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl border border-amber-400/30 my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center text-slate-950 font-bold">
              <UploadCloud size={20} />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Xuất Bản & Triển Khai Website</h3>
              <p className="text-xs text-slate-400">Dự án: {project.name}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher: Cloud Hosting vs Self-Hosted */}
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-white/5 border border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('cloud')}
            className={`flex-1 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'cloud'
                ? 'gold-gradient-bg text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Globe size={15} />
            <span>1. Hosting Của Hệ Thống (Cloud)</span>
          </button>

          <button
            onClick={() => setActiveTab('self')}
            className={`flex-1 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'self'
                ? 'gold-gradient-bg text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Server size={15} />
            <span>2. Tải Source Code (Hosting Riêng)</span>
          </button>
        </div>

        {/* Tab 1 Content: Cloud Hosting */}
        {activeTab === 'cloud' && (
          <div className="space-y-5 text-xs">
            {/* Free Subdomain Card */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <Globe size={14} className="text-amber-400" />
                  <span>Tên miền phụ miễn phí:</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  Đã kích hoạt SSL
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 p-2.5 rounded-xl bg-black/40 border border-white/10 font-mono text-amber-300 truncate">
                  https://{project.deployment.subdomain}
                </div>
                <button
                  onClick={() =>
                    handleCopy(`https://${project.deployment.subdomain}`, 'subdomain')
                  }
                  className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-medium cursor-pointer"
                >
                  {copySuccess === 'subdomain' ? 'Đã chép!' : 'Sao chép'}
                </button>
              </div>
            </div>

            {/* Custom Domain Mapping */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <span className="font-semibold text-white block">Kết nối tên miền riêng:</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customDomainInput}
                  onChange={(e) => setCustomDomainInput(e.target.value)}
                  placeholder="VD: www.thuonghieu.com"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white font-mono text-xs"
                />
              </div>

              {/* DNS Instruction Table */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-[11px] font-semibold text-slate-300">
                  Cấu hình bản ghi DNS tại nhà cung cấp tên miền của bạn:
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-[10px] text-slate-400 border-b border-white/5 pb-1">
                  <span>Loại Record</span>
                  <span>Host / Name</span>
                  <span>Giá trị trỏ tới</span>
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-slate-200">
                  <span className="text-amber-400 font-bold">CNAME</span>
                  <span>www</span>
                  <span className="truncate">cname.aiwebsite.app</span>
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-slate-200">
                  <span className="text-amber-400 font-bold">A</span>
                  <span>@</span>
                  <span>34.149.88.210</span>
                </div>
              </div>
            </div>

            {/* Cloud Features Status */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-[10px] text-slate-400">Chứng chỉ SSL</div>
                <div className="font-bold text-emerald-400 text-xs mt-0.5">Let's Encrypt 256-bit</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-[10px] text-slate-400">Mạng phân phối CDN</div>
                <div className="font-bold text-indigo-400 text-xs mt-0.5">Cloudflare Edge</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-[10px] text-slate-400">Tốc độ tải</div>
                <div className="font-bold text-amber-400 text-xs mt-0.5">~0.6s Toàn cầu</div>
              </div>
            </div>

            {/* Publish Action Button */}
            <button
              onClick={handlePublishCloud}
              disabled={isDeploying}
              className="w-full py-3 rounded-xl gold-gradient-btn text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
            >
              {isDeploying ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Đang đẩy bản dựng lên máy chủ đám mây...</span>
                </>
              ) : (
                <>
                  <UploadCloud size={15} />
                  <span>
                    {project.deployment.isPublished
                      ? 'Cập Nhật Bản Dựng Lên Cloud'
                      : 'Xuất Bản Website Ngay Lập Tức'}
                  </span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Tab 2 Content: Self-Hosted & Export Code */}
        {activeTab === 'self' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm">Gói Mã Nguồn Chuẩn React 19 + Tailwind CSS</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">
                  Production Ready
                </span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Tải về toàn bộ mã nguồn sạch, độc lập, không phụ thuộc vào hệ thống của chúng tôi. Bạn có thể tự lưu trữ trên Vercel, Netlify, Cloudflare Pages hoặc máy chủ VPS riêng.
              </p>

              {/* Project Directory Tree Visualizer */}
              <div className="p-3 rounded-xl bg-black/50 border border-white/10 font-mono text-[11px] text-slate-300 space-y-1">
                <div className="text-amber-400 font-bold">📦 {project.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}/</div>
                <div className="pl-4">├── index.html</div>
                <div className="pl-4">├── package.json (React 19, Lucide, Tailwind)</div>
                <div className="pl-4">├── vite.config.ts</div>
                <div className="pl-4">├── tailwind.config.js</div>
                <div className="pl-4">├── README.md (Hướng dẫn cài đặt chi tiết)</div>
                <div className="pl-4">└── src/</div>
                <div className="pl-8">├── main.tsx</div>
                <div className="pl-8">├── App.tsx (Giao diện hoàn chỉnh)</div>
                <div className="pl-8">└── index.css</div>
              </div>

              {/* Download ZIP button */}
              <button
                onClick={() => onExportZip(project)}
                className="w-full py-3 rounded-xl gold-gradient-btn text-xs font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Download size={15} />
                <span>Tải Toàn Bộ Source Code (.ZIP)</span>
              </button>
            </div>

            {/* Quick 1-Click Deployment Guide */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-slate-300">
              <div className="font-bold text-white text-xs">🚀 Hướng dẫn triển khai nhanh:</div>
              <div className="space-y-1.5 text-[11px]">
                <div>
                  <strong>Cách 1 (Vercel):</strong> Giải nén thư mục, kéo thả vào dashboard{' '}
                  <code className="text-amber-300">vercel.com</code> (miễn phí trọn đời).
                </div>
                <div>
                  <strong>Cách 2 (Local):</strong> Chạy <code className="text-amber-300">npm install</code> sau đó{' '}
                  <code className="text-amber-300">npm run dev</code> để phát triển offline.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
