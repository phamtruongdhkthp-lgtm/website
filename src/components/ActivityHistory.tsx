import React from 'react';
import {
  History,
  Sparkles,
  Layers,
  UploadCloud,
  Download,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { ActivityLogItem } from '../types';

interface ActivityHistoryProps {
  logs: ActivityLogItem[];
  onClearLogs?: () => void;
}

export const ActivityHistory: React.FC<ActivityHistoryProps> = ({ logs }) => {
  const getIconForType = (type: ActivityLogItem['type']) => {
    switch (type) {
      case 'create':
        return <Layers size={15} className="text-amber-400" />;
      case 'edit':
        return <Sparkles size={15} className="text-emerald-400" />;
      case 'deploy':
        return <UploadCloud size={15} className="text-indigo-400" />;
      case 'export':
        return <Download size={15} className="text-blue-400" />;
      case 'analyze':
        return <Search size={15} className="text-purple-400" />;
      default:
        return <Clock size={15} className="text-slate-400" />;
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-2">
          <History size={22} className="text-amber-400" />
          <span>Lịch Sử Hoạt Động & Nhật Ký AI</span>
        </h2>
        <p className="text-xs text-slate-400">
          Ghi nhận toàn bộ thao tác tạo mới, tinh chỉnh AI, xuất mã nguồn và triển khai
        </p>
      </div>

      <div className="rounded-2xl glass-panel border border-white/10 divide-y divide-white/5 overflow-hidden">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-4 md:p-5 flex items-start gap-4 hover:bg-white/[0.02] transition"
          >
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
              {getIconForType(log.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <span>{log.action}</span>
                  {log.projectName && (
                    <span className="text-[11px] px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 font-mono">
                      {log.projectName}
                    </span>
                  )}
                </h4>
                <span className="text-xs text-slate-400 font-mono shrink-0">
                  {log.timestamp}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{log.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
