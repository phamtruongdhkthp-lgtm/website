import {
  Menu,
  Sparkles,
  Bell,
  Search,
  ExternalLink,
  ShieldCheck,
  User,
  PlusCircle,
  Brain,
  FileCheck2,
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onOpenCreate: () => void;
  onSelectTab?: (tab: string) => void;
  onToggleMobileMenu?: () => void;
  activeProjectName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onOpenCreate,
  onSelectTab,
  onToggleMobileMenu,
  activeProjectName,
}) => {
  const tabTitles: Record<string, string> = {
    dashboard: 'Bảng Điều Khiển (Dashboard)',
    create: 'Quy Trình Tạo Website Tự Động',
    essentials: 'Hồ Sơ Cơ Bản Website (Website Essentials)',
    brain: 'Trung Tâm Kết Nối Bộ Não A.I (AI Brain Hub)',
    projects: 'Danh Sách Website Của Tôi',
    editor: activeProjectName ? `AI Editor: ${activeProjectName}` : 'AI Website Editor',
    history: 'Nhật Ký & Lịch Sử Hoạt Động',
    settings: 'Cài Đặt Hệ Thống & Crawler',
  };

  return (
    <header className="h-16 px-6 glass-panel border-b border-white/10 flex items-center justify-between z-20 sticky top-0">
      <div className="flex items-center gap-4">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
          >
            <Menu size={20} />
          </button>
        )}

        <div>
          <h1 className="font-bold text-base md:text-lg text-white flex items-center gap-2">
            <span>{tabTitles[currentTab] || 'Tổng quan'}</span>
          </h1>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            Nền tảng kiến tạo website tự động chuẩn SEO bằng AI thế hệ mới
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Interactive AI Brain Status Chip */}
        <button
          onClick={() => onSelectTab?.('brain')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
            currentTab === 'brain'
              ? 'bg-amber-400/20 text-amber-300 border-amber-400/50 shadow-md shadow-amber-500/20'
              : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border-white/10 hover:border-amber-400/30'
          }`}
          title="Bấm để mở Trung Tâm Kết Nối Bộ Não A.I"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <Brain size={14} className="text-amber-400" />
          <span className="hidden sm:inline">Bộ Não:</span>
          <span className="text-amber-300 font-mono text-[11px]">Gemini 3.8 Flash</span>
        </button>

        {/* Quick Create Button */}
        {currentTab !== 'create' && (
          <button
            onClick={onOpenCreate}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl gold-gradient-btn text-xs font-bold shadow-md cursor-pointer"
          >
            <PlusCircle size={15} />
            <span>Tạo mới</span>
          </button>
        )}

        {/* User Account */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs ring-1 ring-amber-400/30">
            PT
          </div>
          <div className="hidden xl:block text-left text-xs">
            <div className="font-semibold text-slate-200">phamtruong</div>
            <div className="text-[10px] text-amber-400/80">Gói Pro Doanh Nghiệp</div>
          </div>
        </div>
      </div>
    </header>
  );
};
