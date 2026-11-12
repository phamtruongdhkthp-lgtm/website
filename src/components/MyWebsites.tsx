import React, { useState } from 'react';
import {
  Globe,
  Sparkles,
  Search,
  ExternalLink,
  Download,
  UploadCloud,
  Trash2,
  Copy,
  PlusCircle,
  CheckCircle2,
  Sliders,
  Filter,
} from 'lucide-react';
import { Project, ReplicationLevel } from '../types';
import { LEVEL_DEFINITIONS } from '../utils/engine';

interface MyWebsitesProps {
  projects: Project[];
  onOpenCreate: () => void;
  onOpenEditor: (project: Project) => void;
  onOpenPreview: (project: Project) => void;
  onOpenPublish: (project: Project) => void;
  onExportCode: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onCloneProject: (project: Project) => void;
}

export const MyWebsites: React.FC<MyWebsitesProps> = ({
  projects,
  onOpenCreate,
  onOpenEditor,
  onOpenPreview,
  onOpenPublish,
  onExportCode,
  onDeleteProject,
  onCloneProject,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sampleUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.deployment.subdomain.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = levelFilter === 'all' || p.level.toString() === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white">
            Danh Sách Website Của Tôi ({projects.length})
          </h2>
          <p className="text-xs text-slate-400">
            Quản lý các trang web đã tạo, chỉnh sửa trực quan và quản lý tên miền
          </p>
        </div>

        <button
          onClick={onOpenCreate}
          className="px-4 py-2.5 rounded-xl gold-gradient-btn text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle size={15} />
          <span>Tạo Website Mới</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên website, URL mẫu hoặc tên miền..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1 text-xs text-slate-400 shrink-0">
            <Filter size={14} />
            <span>Cấp độ:</span>
          </div>

          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-slate-900">Tất cả các cấp độ</option>
            <option value="1" className="bg-slate-900">Cấp độ 1 - Nguyên bản</option>
            <option value="2" className="bg-slate-900">Cấp độ 2 - Giữ thiết kế</option>
            <option value="3" className="bg-slate-900">Cấp độ 3 - Tương tự</option>
            <option value="4" className="bg-slate-900">Cấp độ 4 - Lấy cảm hứng</option>
            <option value="5" className="bg-slate-900">Cấp độ 5 - Sáng tạo hoàn toàn</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-3xl glass-card border border-white/10 space-y-3">
          <Globe size={40} className="mx-auto text-slate-500" />
          <h4 className="font-bold text-white text-base">Không tìm thấy website nào</h4>
          <p className="text-xs text-slate-400">
            Hãy thử tìm kiếm với từ khóa khác hoặc bấm nút Tạo website mới để bắt đầu.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                {/* Level badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg backdrop-blur-md bg-slate-950/80 border border-amber-400/30 text-amber-300 text-[11px] font-semibold">
                  Cấp độ {project.level} • {LEVEL_DEFINITIONS[project.level - 1]?.badge}
                </div>

                {/* Status */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg backdrop-blur-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{project.deployment.isPublished ? 'Đã Xuất Bản' : 'Sẵn Sàng'}</span>
                </div>

                {/* Title and Domain */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="font-extrabold text-white text-base tracking-tight truncate">
                    {project.name}
                  </h4>
                  <div className="text-xs text-slate-300 flex items-center gap-1.5 truncate">
                    <Globe size={12} className="text-amber-400 shrink-0" />
                    <span className="truncate">{project.sampleUrl}</span>
                  </div>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Tên miền phụ:</span>
                    <span className="font-mono text-amber-300/90 text-[11px]">
                      {project.deployment.subdomain}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-400">
                    <span>Màu chủ đạo:</span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: project.activeTheme.primaryColor }}
                      ></span>
                      <span className="font-mono text-slate-200 text-[11px]">
                        {project.activeTheme.primaryColor}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-slate-400">
                    <span>Ngày tạo:</span>
                    <span className="text-slate-300">
                      {new Date(project.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
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
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    <button
                      onClick={() => onExportCode(project)}
                      className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 text-[11px] font-medium flex items-center justify-center gap-1 transition cursor-pointer"
                      title="Tải toàn bộ mã nguồn (.zip)"
                    >
                      <Download size={12} />
                      <span>Tải ZIP</span>
                    </button>

                    <button
                      onClick={() => onOpenPublish(project)}
                      className="py-1.5 px-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 text-[11px] font-medium flex items-center justify-center gap-1 transition cursor-pointer"
                      title="Xuất bản hoặc trỏ tên miền"
                    >
                      <UploadCloud size={12} />
                      <span>Xuất bản</span>
                    </button>

                    <button
                      onClick={() => onCloneProject(project)}
                      className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 text-[11px] font-medium flex items-center justify-center gap-1 transition cursor-pointer"
                      title="Nhân bản dự án"
                    >
                      <Copy size={12} />
                      <span>Nhân bản</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
