import React, { useState, useEffect } from 'react';
import {
  Brain,
  Zap,
  Cpu,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Send,
  Layers,
  Code2,
  ArrowRight,
  ShieldCheck,
  Activity,
  Sliders,
  Terminal,
  Globe2,
} from 'lucide-react';
import { AiBrainConfig, AiBrainStatus } from '../types';
import { fetchAiBrainStatus, testAiBrainConnection, queryAiBrain } from '../utils/aiClient';

interface AiBrainConnectViewProps {
  onOpenCreateWizard: () => void;
  onNavigateToEssentials: () => void;
}

export const AiBrainConnectView: React.FC<AiBrainConnectViewProps> = ({
  onOpenCreateWizard,
  onNavigateToEssentials,
}) => {
  const [status, setStatus] = useState<AiBrainStatus>({
    connected: true,
    hasApiKey: true,
    model: 'gemini-3.8-flash',
    provider: 'Google Gemini 3.8 Flash & DeepMind',
    status: 'ready',
    latencyMs: 78,
    mode: 'live_gemini',
    capabilities: [
      'Bóc tách cấu trúc sitemap từ URL website mẫu',
      'Tự động tổng hợp nội dung website từ Hồ sơ cơ bản',
      'Tái tạo thích ứng theo 5 cấp độ AI',
      'AI Chat Editor tương tác thời gian thực',
      'Sinh mã nguồn React 19 + Tailwind CSS',
    ],
    lastPing: 'Vừa xong',
  });

  const [brainConfig, setBrainConfig] = useState<AiBrainConfig>({
    selectedModel: 'gemini-3.8-flash',
    thinkingLevel: 'medium',
    temperature: 0.7,
    autoSynthesizeCopy: true,
    autoOptimizeCRO: true,
  });

  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{ message: string; latencyMs: number; success: boolean } | null>(null);

  // Playground state
  const [playgroundPrompt, setPlaygroundPrompt] = useState('Viết 1 khẩu hiệu (slogan) đẳng cấp và 3 điểm mạnh độc nhất (USP) cho thương hiệu xe điện thông minh Việt Nam.');
  const [playgroundLoading, setPlaygroundLoading] = useState(false);
  const [playgroundOutput, setPlaygroundOutput] = useState<string | null>(null);
  const [playgroundLatency, setPlaygroundLatency] = useState<number | null>(null);

  useEffect(() => {
    fetchAiBrainStatus().then((s) => setStatus(s));
  }, []);

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setTestResult(null);
    try {
      const res = await testAiBrainConnection(brainConfig.selectedModel);
      setTestResult({
        message: res.message,
        latencyMs: res.latencyMs,
        success: res.success,
      });
      setStatus((prev) => ({
        ...prev,
        latencyMs: res.latencyMs,
        lastPing: new Date().toLocaleTimeString('vi-VN'),
      }));
    } finally {
      setTestingConnection(false);
    }
  };

  const handleRunPlayground = async (customPrompt?: string) => {
    const promptToUse = customPrompt || playgroundPrompt;
    if (!promptToUse.trim()) return;

    setPlaygroundLoading(true);
    setPlaygroundOutput(null);
    try {
      const res = await queryAiBrain(promptToUse, brainConfig.selectedModel);
      setPlaygroundOutput(res.output);
      setPlaygroundLatency(res.latencyMs);
    } finally {
      setPlaygroundLoading(false);
    }
  };

  const samplePrompts = [
    'Viết khẩu hiệu và 3 điểm mạnh cho thương hiệu Xe Điện VinFast',
    'Gợi ý cấu trúc website và bảng màu cho Viện Thẩm Mỹ sang trọng',
    'Soạn nội dung CTA kép và 3 gói bảng giá cho phần mềm SaaS B2B',
    'Viết lời mở đầu sứ mệnh truyền cảm hứng cho chuỗi Cà phê Di sản',
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Top Banner Header */}
      <div className="relative rounded-3xl p-8 glass-panel border border-amber-400/25 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold">
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
              <span>TRUNG TÂM ĐIỀU HÀNH BỘ NÃO A.I</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Kết Nối & Quản Trị Bộ Não Kiến Tạo Website
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Bộ não AI (Google Gemini 3.8 Flash & DeepMind) cung cấp năng lực trí tuệ nhân tạo toàn diện: bóc tách sitemap website mẫu, tự động sinh nội dung từ Hồ sơ cơ bản, chỉ đạo 5 cấp độ tái tạo và phản hồi AI Editor theo thời gian thực.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleTestConnection}
              disabled={testingConnection}
              className="px-4 py-3 rounded-2xl glass-panel-gold border border-amber-400/40 text-amber-300 hover:text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-50"
            >
              <RefreshCw size={15} className={testingConnection ? 'animate-spin' : ''} />
              <span>{testingConnection ? 'Đang ping bộ não...' : 'Kiểm Tra Kết Nối (Ping)'}</span>
            </button>
            <button
              onClick={onOpenCreateWizard}
              className="px-5 py-3 rounded-2xl gold-gradient-btn text-xs font-bold flex items-center gap-2 shadow-xl shadow-amber-500/15 cursor-pointer"
            >
              <Sparkles size={16} />
              <span>Tạo Website Ngay Bằng AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Live Connection Status & Model Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Brain Live Status Monitor */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
                <Activity size={14} className="text-amber-400" />
                Trạng Thái Bộ Não
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Đang Hoạt Động
              </span>
            </div>

            {/* Neural Brain Graphic */}
            <div className="my-4 p-5 rounded-2xl bg-gradient-to-b from-amber-500/10 via-black/40 to-transparent border border-amber-400/20 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="w-20 h-20 rounded-2xl gold-gradient-bg flex items-center justify-center text-slate-950 shadow-2xl shadow-amber-500/30 mb-3 animate-pulse">
                <Brain size={40} />
              </div>
              <div className="font-bold text-base text-white">Google Gemini 3.8 Flash</div>
              <div className="text-xs text-amber-300 font-mono mt-0.5">Neural Synthesis Engine</div>
              <p className="text-[11px] text-slate-400 mt-2 max-w-xs leading-relaxed">
                Được cấu hình sẵn qua Secret API Keys trên hạ tầng máy chủ bảo mật.
              </p>
            </div>

            {/* Metrics List */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-slate-400 flex items-center gap-2">
                  <Zap size={14} className="text-amber-400" />
                  Độ trễ phản hồi (Latency)
                </span>
                <span className="font-mono font-bold text-amber-300">
                  {status.latencyMs} ms
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-slate-400 flex items-center gap-2">
                  <Cpu size={14} className="text-indigo-400" />
                  Hạ tầng cung cấp
                </span>
                <span className="font-medium text-slate-200">Google Cloud & AI Studio</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-slate-400 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  Bảo mật kết nối
                </span>
                <span className="font-mono text-emerald-300 font-semibold">Server-Side Proxy 100%</span>
              </div>
            </div>
          </div>

          {/* Test Ping Output if available */}
          {testResult && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 space-y-1 animate-fade-in">
              <div className="flex items-center justify-between font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  Ping Thành Công
                </span>
                <span className="font-mono text-[11px]">{testResult.latencyMs}ms</span>
              </div>
              <p className="text-[11px] text-slate-300">{testResult.message}</p>
            </div>
          )}
        </div>

        {/* Card 2 & 3: Model Selector & Cognitive Engine Settings */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sliders size={18} className="text-amber-400" />
                Lựa Chọn & Cấu Hình Bộ Não AI
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Chọn mô hình trí tuệ nhân tạo chịu trách nhiệm thiết kế và sinh mã nguồn website
              </p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
              Active Model: {brainConfig.selectedModel}
            </span>
          </div>

          {/* Models Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Model Option 1: Gemini 3.8 Flash */}
            <div
              onClick={() => setBrainConfig((c) => ({ ...c, selectedModel: 'gemini-3.8-flash' }))}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                brainConfig.selectedModel === 'gemini-3.8-flash'
                  ? 'bg-amber-400/15 border-amber-400/50 shadow-lg shadow-amber-500/10'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">Gemini 3.8 Flash</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-amber-400 text-slate-950">
                  Khuyên Dùng
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                Tốc độ phản hồi cực nhanh dưới 1 giây. Tối ưu xuất sắc cho việc bóc tách layout, tạo sitemap và viết copy bán hàng.
              </p>
              <div className="flex items-center justify-between text-[10px] font-mono text-amber-300/80">
                <span>Độ trễ: ~70ms</span>
                <span>Tốc độ: 10/10</span>
              </div>
            </div>

            {/* Model Option 2: Gemini 4 Argon */}
            <div
              onClick={() => setBrainConfig((c) => ({ ...c, selectedModel: 'gemini-4-argon' }))}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                brainConfig.selectedModel === 'gemini-4-argon'
                  ? 'bg-indigo-400/15 border-indigo-400/50 shadow-lg shadow-indigo-500/10'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">Gemini 4 Argon</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-indigo-500/30 text-indigo-300 border border-indigo-500/40">
                  Deep Reason
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                Suy luận kiến trúc sâu sắc, phù hợp cho Cấp độ 4 & 5 (Sáng tạo hoàn toàn độc bản) và phân tích các website thương mại điện tử lớn.
              </p>
              <div className="flex items-center justify-between text-[10px] font-mono text-indigo-300/80">
                <span>Suy luận cao cấp</span>
                <span>Sáng tạo: 10/10</span>
              </div>
            </div>

            {/* Model Option 3: Neural Local Engine */}
            <div
              onClick={() => setBrainConfig((c) => ({ ...c, selectedModel: 'simulated_neural' }))}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                brainConfig.selectedModel === 'simulated_neural'
                  ? 'bg-emerald-400/15 border-emerald-400/50 shadow-lg shadow-emerald-500/10'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">Neural Heuristic</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-emerald-500/30 text-emerald-300 border border-emerald-500/40">
                  Offline Buffer
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                Động cơ quy tắc nội bộ, bảo đảm tính khả dụng 100% ngay cả khi mạng chập chờn hoặc không có kết nối internet.
              </p>
              <div className="flex items-center justify-between text-[10px] font-mono text-emerald-300/80">
                <span>Không cần internet</span>
                <span>Tin cậy: 100%</span>
              </div>
            </div>
          </div>

          {/* Cognitive Level Sliders & Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/10">
            <div>
              <label className="text-xs text-slate-300 font-semibold mb-2 block">
                Mức Độ Suy Luận Kiến Trúc (Thinking Level)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'medium', 'high'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setBrainConfig((c) => ({ ...c, thinkingLevel: lvl }))}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      brainConfig.thinkingLevel === lvl
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                        : 'bg-white/[0.02] text-slate-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {lvl === 'low' ? 'Chính xác cao' : lvl === 'medium' ? 'Cân bằng (Chuẩn)' : 'Sáng tạo tối đa'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-300 font-semibold mb-2 block">
                Tính Năng Tự Động Hóa Từ Bộ Não
              </label>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={brainConfig.autoSynthesizeCopy}
                    onChange={(e) => setBrainConfig((c) => ({ ...c, autoSynthesizeCopy: e.target.checked }))}
                    className="rounded accent-amber-400 w-4 h-4 cursor-pointer"
                  />
                  <span>Tự động viết lại nội dung phù hợp thương hiệu mới</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={brainConfig.autoOptimizeCRO}
                    onChange={(e) => setBrainConfig((c) => ({ ...c, autoOptimizeCRO: e.target.checked }))}
                    className="rounded accent-amber-400 w-4 h-4 cursor-pointer"
                  />
                  <span>Tối ưu hóa tỷ lệ chuyển đổi (CRO) & nút kêu gọi hành động kép</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Core Capabilities of the AI Brain */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-5">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Layers size={18} className="text-amber-400" />
            5 Năng Lực Cốt Lõi Của Bộ Não AI
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Các thuật toán được kích hoạt đồng thời khi người dùng bấm tạo hoặc chỉnh sửa website
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-400/30 transition-all space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-300 flex items-center justify-center font-bold text-xs font-mono">
              01
            </div>
            <div className="font-bold text-xs text-white">Bóc Tách Blueprint</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Quét website mẫu, phân tích cấu trúc DOM, typography, bảng màu và trích xuất sitemap toàn diện.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-400/30 transition-all space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-300 flex items-center justify-center font-bold text-xs font-mono">
              02
            </div>
            <div className="font-bold text-xs text-white">Tổng Hợp Từ Hồ Sơ</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Tiếp nhận Hồ sơ cơ bản (Slogan, Hotline, Dịch vụ, Giá) để AI tự động cấu hình toàn bộ phần còn lại.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-400/30 transition-all space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-300 flex items-center justify-center font-bold text-xs font-mono">
              03
            </div>
            <div className="font-bold text-xs text-white">Bộ Não 5 Cấp Độ</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Biến đổi linh hoạt từ Cấp độ 1 (Sao chép nguyên bản) đến Cấp độ 5 (Sáng tạo hoàn toàn độc bản).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-400/30 transition-all space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-300 flex items-center justify-center font-bold text-xs font-mono">
              04
            </div>
            <div className="font-bold text-xs text-white">AI Chat Copilot</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Hiểu ngôn ngữ tự nhiên tiếng Việt để sửa màu sắc, thêm nút gọi Zalo, đổi font chữ trên Live Preview.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-400/30 transition-all space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-300 flex items-center justify-center font-bold text-xs font-mono">
              05
            </div>
            <div className="font-bold text-xs text-white">Sinh Mã Nguồn Sạch</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Biên dịch sang React 19, Tailwind CSS, tối ưu SEO 98 điểm và đóng gói ZIP triển khai tức thì.
            </p>
          </div>
        </div>
      </div>

      {/* AI Brain Playground: Test natural commands live */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal size={18} className="text-amber-400" />
              Thử Nghiệm Trực Tiếp Bộ Não (AI Brain Playground)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Gõ lệnh bất kỳ để kiểm tra tốc độ tư duy và chất lượng phản hồi của bộ não trước khi tạo website
            </p>
          </div>
          {playgroundLatency && (
            <span className="text-xs font-mono text-amber-300 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
              ⚡ Thời gian phản hồi: {playgroundLatency}ms
            </span>
          )}
        </div>

        {/* Quick prompt badges */}
        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setPlaygroundPrompt(p);
                handleRunPlayground(p);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[11px] text-slate-300 transition-all cursor-pointer text-left"
            >
              💡 {p}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="flex gap-2">
          <input
            type="text"
            value={playgroundPrompt}
            onChange={(e) => setPlaygroundPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRunPlayground();
            }}
            placeholder="Nhập yêu cầu kiểm tra cho bộ não AI..."
            className="flex-1 px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50"
          />
          <button
            onClick={() => handleRunPlayground()}
            disabled={playgroundLoading || !playgroundPrompt.trim()}
            className="px-5 py-3 rounded-2xl gold-gradient-btn text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
          >
            {playgroundLoading ? (
              <RefreshCw size={15} className="animate-spin" />
            ) : (
              <Send size={15} />
            )}
            <span>{playgroundLoading ? 'Đang xử lý...' : 'Gửi Lệnh'}</span>
          </button>
        </div>

        {/* Result Output Display */}
        {playgroundOutput && (
          <div className="p-4 rounded-2xl bg-black/50 border border-amber-400/30 text-xs text-slate-200 space-y-2 animate-fade-in font-mono">
            <div className="flex items-center justify-between text-[11px] text-amber-400 font-semibold border-b border-white/10 pb-2">
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} />
                Kết Quả Phản Hồi Từ Bộ Não AI ({brainConfig.selectedModel})
              </span>
              <span className="text-slate-400">{playgroundLatency}ms</span>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-xs text-slate-200 leading-relaxed">
              {playgroundOutput}
            </pre>
          </div>
        )}
      </div>

      {/* Navigation CTA Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl glass-panel border border-amber-400/20">
        <div>
          <div className="font-bold text-sm text-white flex items-center gap-2">
            <Globe2 size={16} className="text-amber-400" />
            Sẵn Sàng Kiến Tạo Website Của Riêng Bạn?
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Điền hồ sơ cơ bản để AI tự động hoàn thiện hoặc dán URL mẫu để phân tích ngay
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onNavigateToEssentials}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-xs font-semibold text-white transition-all cursor-pointer"
          >
            Điền Hồ Sơ Cơ Bản (Essentials)
          </button>
          <button
            onClick={onOpenCreateWizard}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl gold-gradient-btn text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Tạo Website Ngay</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
