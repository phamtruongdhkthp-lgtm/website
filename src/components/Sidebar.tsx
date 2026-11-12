import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  Globe,
  Bot,
  History,
  Settings,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenCreateModal: () => void;
  projectsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenCreateModal,
  projectsCount,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'create', label: 'Tạo website mới', icon: PlusCircle, isHighlight: true },
    { id: 'projects', label: 'Website của tôi', icon: Globe, count: projectsCount },
    { id: 'editor', label: 'AI Website Editor', icon: Bot, isBeta: true },
    { id: 'history', label: 'Lịch sử hoạt động', icon: History },
    { id: 'settings', label: 'Cài đặt hệ thống', icon: Settings },
  ];

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col h-screen glass-panel border-r border-white/10 z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
            <Sparkles size={20} className="animate-pulse" />
          </div>
          <div>
            <div className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
              <span>AI WEBSITE</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                PRO
              </span>
            </div>
            <div className="text-[11px] text-slate-400 tracking-wide font-medium">
              BUILDER PLATFORM
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Button */}
      <div className="p-4">
        <button
          onClick={onOpenCreateModal}
          className="w-full py-2.5 px-4 rounded-xl gold-gradient-btn flex items-center justify-center gap-2 text-sm font-bold shadow-lg shadow-amber-500/10 cursor-pointer"
        >
          <PlusCircle size={17} />
          <span>Tạo Website Mới</span>
        </button>
      </div>

      {/* Main Navigation Menu */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <div className="text-[10px] uppercase tracking-wider text-slate-400 px-3 py-2 font-semibold">
          Menu Quản Trị
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'create') {
                  onOpenCreateModal();
                } else {
                  onSelectTab(item.id);
                }
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={18}
                  className={isActive ? 'text-amber-400' : 'text-slate-400'}
                />
                <span>{item.label}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {item.count !== undefined && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
                    {item.count}
                  </span>
                )}
                {item.isBeta && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                    Live
                  </span>
                )}
                {isActive && <ChevronRight size={14} className="text-amber-400" />}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Engine Status / Footer Info */}
      <div className="p-4 border-t border-white/10 m-3 rounded-2xl bg-white/[0.02] border">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            AI Engine v3.8
          </span>
          <span className="text-amber-400/90 font-mono text-[11px]">Sẵn sàng</span>
        </div>
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full w-[85%] rounded-full"></div>
        </div>
        <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
          Đã hỗ trợ 5 cấp độ tái tạo website thông minh & xuất mã nguồn React.
        </p>
      </div>
    </aside>
  );
};
