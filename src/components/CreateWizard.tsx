import React, { useState, useEffect } from 'react';
import {
  Globe,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Copy,
  LayoutTemplate,
  Compass,
  Wand2,
  Upload,
  Palette,
  Layers,
  FileCode,
  Image,
  ExternalLink,
  Loader2,
  Info,
  ChevronRight,
  X,
} from 'lucide-react';
import { BrandInfo, ReplicationLevel, WebsiteAnalysis } from '../types';
import {
  validateWebsiteUrl,
  analyzeWebsiteBlueprint,
  LEVEL_DEFINITIONS,
  extractDomainName,
} from '../utils/engine';
import { ESSENTIALS_PRESETS } from '../data/websiteEssentialsPresets';

interface CreateWizardProps {
  initialUrl?: string;
  onClose: () => void;
  onStartBuild: (
    sampleUrl: string,
    level: ReplicationLevel,
    brandInfo: BrandInfo,
    analysis: WebsiteAnalysis
  ) => void;
}

export const CreateWizard: React.FC<CreateWizardProps> = ({
  initialUrl = '',
  onClose,
  onStartBuild,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: URL input & Analysis
  const [urlInput, setUrlInput] = useState(initialUrl);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<WebsiteAnalysis | null>(null);
  const [analysisLog, setAnalysisLog] = useState<string[]>([]);

  // Step 2: Replication Level
  const [selectedLevel, setSelectedLevel] = useState<ReplicationLevel>(3);

  // Step 3: Brand Info
  const [brandInfo, setBrandInfo] = useState<BrandInfo>({
    businessName: '',
    domain: '',
    email: '',
    phone: '',
    address: '',
    logoUrl: '',
    primaryColor: '#D4AF37',
    secondaryColor: '#07090e',
    industry: '',
    additionalRequirements: '',
  });

  // Step 4: Compliance & Confirmation
  const [confirmRight, setConfirmRight] = useState(false);
  const [confirmTransform, setConfirmTransform] = useState(false);

  // If initialUrl provided, run analysis automatically
  useEffect(() => {
    if (initialUrl && !analysis) {
      handleAnalyzeUrl(initialUrl);
    }
  }, [initialUrl]);

  const handleAnalyzeUrl = (targetUrl?: string) => {
    const raw = targetUrl || urlInput;
    const { isValid, normalizedUrl, error } = validateWebsiteUrl(raw);

    if (!isValid) {
      setUrlError(error || 'Vui lòng nhập URL hợp lệ');
      return;
    }

    setUrlError(null);
    setIsAnalyzing(true);
    setAnalysisLog(['Đang khởi tạo crawler...', 'Kiểm tra tệp robots.txt và chính sách truy cập...']);

    // Simulate crawler step-by-step telemetry
    setTimeout(() => {
      setAnalysisLog((prev) => [...prev, `Kết nối thành công đến ${normalizedUrl}...`, 'Thu thập cấu trúc DOM và cây thư mục sitemap...']);
    }, 400);

    setTimeout(() => {
      setAnalysisLog((prev) => [...prev, 'Trích xuất bảng màu CSS, typography và tài nguyên hình ảnh...']);
    }, 900);

    setTimeout(() => {
      const result = analyzeWebsiteBlueprint(normalizedUrl);
      setAnalysis(result);
      setIsAnalyzing(false);

      // Prepopulate brand recommendations
      const guessedName = extractDomainName(normalizedUrl).split('.')[0].toUpperCase();
      setBrandInfo((prev) => ({
        ...prev,
        businessName: prev.businessName || `${guessedName} VIETNAM`,
        domain: prev.domain || `${guessedName.toLowerCase()}-brand.vn`,
        primaryColor: result.detectedColors[0]?.hex || '#D4AF37',
      }));
    }, 1400);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!analysis) {
        handleAnalyzeUrl();
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((step - 1) as any);
    }
  };

  const handleTriggerBuild = () => {
    if (!analysis) return;
    if (!confirmRight || !confirmTransform) {
      alert('Vui lòng xác nhận các điều khoản quyền sử dụng trước khi tạo website.');
      return;
    }
    onStartBuild(analysis.url, selectedLevel, brandInfo, analysis);
  };

  const samplePresets = [
    { label: 'VinFast Auto', url: 'https://vinfastauto.com' },
    { label: 'Highlands Coffee', url: 'https://highlandscoffee.com.vn' },
    { label: 'Stripe SaaS', url: 'https://stripe.com' },
    { label: 'Thế Giới Di Động', url: 'https://thegioididong.com' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel-gold rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-amber-400/30 overflow-hidden my-auto">
        {/* Wizard Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center text-slate-950 font-bold">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Quy Trình Tạo Website Tự Động Bằng AI</h3>
              <p className="text-xs text-slate-400">
                5 bước thông minh từ phân tích URL mẫu đến khởi tạo giao diện hoàn chỉnh
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="px-6 py-3 bg-white/[0.02] border-b border-white/5 flex items-center justify-between text-xs overflow-x-auto">
          {[
            { num: 1, label: 'Nhập URL & Phân tích' },
            { num: 2, label: 'Chọn cấp độ tái tạo' },
            { num: 3, label: 'Thông tin thương hiệu' },
            { num: 4, label: 'Xác nhận & Bắt đầu' },
          ].map((s) => (
            <div
              key={s.num}
              className={`flex items-center gap-2 whitespace-nowrap px-2 py-1 ${
                step === s.num
                  ? 'text-amber-400 font-bold'
                  : step > s.num
                  ? 'text-emerald-400 font-medium'
                  : 'text-slate-500'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  step === s.num
                    ? 'gold-gradient-bg text-slate-950 shadow-sm shadow-amber-400/40'
                    : step > s.num
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                    : 'bg-white/5 text-slate-400'
                }`}
              >
                {step > s.num ? <CheckCircle2 size={13} /> : s.num}
              </div>
              <span>{s.label}</span>
              {s.num < 4 && <ChevronRight size={14} className="text-slate-600 hidden sm:block" />}
            </div>
          ))}
        </div>

        {/* Step Content Body (Scrollable) */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: URL Input & Blueprint Analysis */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-white mb-1">
                  Bước 1: Nhập URL website mẫu cần phân tích
                </h4>
                <p className="text-xs text-slate-300">
                  Dán đường dẫn của trang web bạn muốn tham khảo bố cục, màu sắc và chức năng.
                </p>
              </div>

              {/* URL Input Box */}
              <div className="space-y-2">
                <div className="relative">
                  <Globe className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => {
                      setUrlInput(e.target.value);
                      setUrlError(null);
                    }}
                    placeholder="https://example.com"
                    className="w-full pl-11 pr-32 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-sm"
                  />
                  <button
                    onClick={() => handleAnalyzeUrl()}
                    disabled={isAnalyzing}
                    className="absolute right-2 top-2 px-4 py-1.5 rounded-lg gold-gradient-btn text-xs font-bold shadow-md cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        <span>Đang quét...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={13} />
                        <span>Phân Tích</span>
                      </>
                    )}
                  </button>
                </div>

                {urlError && (
                  <div className="text-xs text-rose-400 flex items-center gap-1.5">
                    <AlertCircle size={14} />
                    <span>{urlError}</span>
                  </div>
                )}

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-[11px] text-slate-400">Gợi ý mẫu có sẵn:</span>
                  {samplePresets.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setUrlInput(p.url);
                        handleAnalyzeUrl(p.url);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-amber-300 border border-white/10 transition cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Crawler Telemetry Log */}
              {isAnalyzing && (
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 font-mono text-xs">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold">
                    <Loader2 size={14} className="animate-spin" />
                    <span>Đang thu thập dữ liệu cấu trúc website mẫu...</span>
                  </div>
                  {analysisLog.map((log, idx) => (
                    <div key={idx} className="text-slate-400 text-[11px]">
                      › {log}
                    </div>
                  ))}
                </div>
              )}

              {/* Module V: Phân Tích Website Preview (Hiển thị ngay khi phân tích xong) */}
              {analysis && !isAnalyzing && (
                <div className="rounded-2xl p-6 glass-card border border-amber-400/30 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                      <CheckCircle2 size={16} />
                      <span>Đã phân tích thành công cấu trúc website</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{analysis.url}</span>
                  </div>

                  {/* Screenshot & Top Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="rounded-xl overflow-hidden border border-white/10 h-44 bg-slate-900 relative">
                      <img
                        src={analysis.screenshotUrl}
                        alt="Screenshot mẫu"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <span className="absolute bottom-2 left-2 text-[10px] px-2 py-0.5 rounded bg-black/60 text-white font-mono">
                        Ảnh chụp giao diện thực tế
                      </span>
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <h5 className="font-bold text-white text-base">{analysis.title}</h5>
                      <p className="text-xs text-slate-300 leading-relaxed">{analysis.description}</p>

                      <div className="grid grid-cols-3 gap-2 pt-2">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                          <div className="text-[10px] text-slate-400">Số trang nội bộ</div>
                          <div className="font-extrabold text-amber-300 text-sm">
                            {analysis.totalPages} trang
                          </div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                          <div className="text-[10px] text-slate-400">Hình ảnh bóc tách</div>
                          <div className="font-extrabold text-emerald-300 text-sm">
                            {analysis.detectedImages.length}+ ảnh
                          </div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                          <div className="text-[10px] text-slate-400">Components UI</div>
                          <div className="font-extrabold text-indigo-300 text-sm">
                            {analysis.detectedComponents.length} loại
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sitemap Tree Visualizer */}
                  <div className="space-y-2">
                    <h6 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Layers size={14} className="text-amber-400" />
                      <span>Cấu Trúc Sitemap & Luồng Trang Được Phát Hiện</span>
                    </h6>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {analysis.detectedPages.map((page) => (
                        <div
                          key={page.id}
                          className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-medium text-white">{page.name}</div>
                            <div className="font-mono text-[10px] text-slate-400">{page.path}</div>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                            {page.elementsCount} el
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Color Palette & Typography Detected */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Colors */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <Palette size={14} className="text-amber-400" />
                        <span>Bảng màu nhận diện</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {analysis.detectedColors.map((color, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs"
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-white/20"
                              style={{ backgroundColor: color.hex }}
                            ></span>
                            <span className="font-mono text-white text-[11px]">{color.hex}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fonts */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <FileCode size={14} className="text-amber-400" />
                        <span>Hệ thống Font chữ</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {analysis.detectedFonts.map((font, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200 font-mono"
                          >
                            {font.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Legal Notice */}
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 flex items-start gap-2">
                    <Info size={16} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>Quy định bảo mật & tôn trọng bản quyền:</strong> AI chỉ phân tích cấu trúc HTML, CSS công khai và giao diện trực quan. Chúng tôi hoàn toàn không truy cập vào database nội bộ, mã nguồn backend hoặc thông tin riêng tư của website mẫu.
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Choose Replication Level */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-white mb-1">
                  Bước 2: Chọn mức độ tái tạo website (1 trong 5 cấp độ)
                </h4>
                <p className="text-xs text-slate-300">
                  Lựa chọn cấp độ can thiệp của AI để phù hợp với định hướng thương hiệu và yêu cầu dự án.
                </p>
              </div>

              <div className="space-y-3">
                {LEVEL_DEFINITIONS.map((lvl) => {
                  const isSelected = selectedLevel === lvl.level;

                  return (
                    <div
                      key={lvl.level}
                      onClick={() => setSelectedLevel(lvl.level)}
                      className={`p-4 md:p-5 rounded-2xl border transition-all cursor-pointer relative ${
                        isSelected
                          ? 'glass-panel-gold border-amber-400 ring-2 ring-amber-400/30'
                          : 'glass-card border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                          {/* Radio circle indicator */}
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                              isSelected
                                ? 'border-amber-400 bg-amber-400 text-slate-950 font-bold'
                                : 'border-slate-500 bg-white/5'
                            }`}
                          >
                            {isSelected && <CheckCircle2 size={16} />}
                          </div>

                          <div>
                            <div className="flex items-center gap-2.5 mb-1">
                              <h5 className="font-bold text-sm md:text-base text-white">
                                {lvl.title}
                              </h5>
                              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-semibold bg-white/10 text-slate-300">
                                {lvl.badge}
                              </span>
                              {lvl.recommended && (
                                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-extrabold uppercase tracking-wide">
                                  Khuyên Dùng
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed">{lvl.fullDesc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Brand Info & Essentials */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    Bước 3: Nhập hồ sơ cơ bản & thương hiệu mới
                  </h4>
                  <p className="text-xs text-slate-300">
                    Điền các thông tin cốt lõi để Bộ não AI tự động thiết lập toàn bộ website. Bạn có thể bấm chọn mẫu điền sẵn bên phải.
                  </p>
                </div>
              </div>

              {/* 1-Click Preset Selection */}
              <div className="p-3.5 rounded-2xl bg-amber-400/5 border border-amber-400/20 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-400" />
                    AI Điền Mẫu Nhanh (1 Click)
                  </span>
                  <span className="text-[10px] text-slate-400">Tự động điền đầy đủ mọi thông tin</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ESSENTIALS_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setBrandInfo((prev) => ({
                          ...prev,
                          ...preset.data,
                        }));
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-amber-400/15 border border-white/10 hover:border-amber-400/30 text-left transition-all cursor-pointer group"
                    >
                      <div className="text-[11px] font-bold text-slate-200 group-hover:text-amber-300 truncate">
                        {preset.name}
                      </div>
                      <div className="text-[9px] text-slate-400 truncate font-mono">
                        {preset.badge}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Tên doanh nghiệp / Thương hiệu
                  </label>
                  <input
                    type="text"
                    value={brandInfo.businessName}
                    onChange={(e) => setBrandInfo({ ...brandInfo, businessName: e.target.value })}
                    placeholder="VD: LUXURY TECH VIETNAM"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Tên miền mới dự kiến
                  </label>
                  <input
                    type="text"
                    value={brandInfo.domain}
                    onChange={(e) => setBrandInfo({ ...brandInfo, domain: e.target.value })}
                    placeholder="VD: luxurytech.vn"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-sm font-mono"
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Khẩu hiệu / Slogan (Tagline)
                  </label>
                  <input
                    type="text"
                    value={brandInfo.tagline || ''}
                    onChange={(e) => setBrandInfo({ ...brandInfo, tagline: e.target.value })}
                    placeholder="VD: Kiến Tạo Tương Lai Giao Thông Xanh & Đẳng Cấp"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Số điện thoại hotline
                  </label>
                  <input
                    type="text"
                    value={brandInfo.phone}
                    onChange={(e) => setBrandInfo({ ...brandInfo, phone: e.target.value })}
                    placeholder="1900 6868 hoặc 0988.123.456"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-sm font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Số Zalo OA / Hotline tư vấn
                  </label>
                  <input
                    type="text"
                    value={brandInfo.zaloNumber || ''}
                    onChange={(e) => setBrandInfo({ ...brandInfo, zaloNumber: e.target.value })}
                    placeholder="0988 123 456"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-sm font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Email liên hệ
                  </label>
                  <input
                    type="email"
                    value={brandInfo.email}
                    onChange={(e) => setBrandInfo({ ...brandInfo, email: e.target.value })}
                    placeholder="contact@luxurytech.vn"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Nút kêu gọi hành động chính (CTA)
                  </label>
                  <input
                    type="text"
                    value={brandInfo.primaryCta || ''}
                    onChange={(e) => setBrandInfo({ ...brandInfo, primaryCta: e.target.value })}
                    placeholder="VD: Đăng Ký Tư Vấn, Đặt Món Ngay, Dùng Thử 14 Ngày"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-sm"
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Địa chỉ văn phòng / trụ sở
                  </label>
                  <input
                    type="text"
                    value={brandInfo.address}
                    onChange={(e) => setBrandInfo({ ...brandInfo, address: e.target.value })}
                    placeholder="Tầng 18, Tòa nhà Bitexco, Quận 1, TP. Hồ Chí Minh"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-sm"
                  />
                </div>

                {/* Color Selector */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                    <span>Màu sắc chủ đạo mới</span>
                    <span className="font-mono text-amber-400 text-xs">
                      {brandInfo.primaryColor}
                    </span>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={brandInfo.primaryColor}
                      onChange={(e) => setBrandInfo({ ...brandInfo, primaryColor: e.target.value })}
                      className="w-10 h-10 rounded-xl bg-transparent border border-white/20 cursor-pointer p-0.5"
                    />

                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      {[
                        { hex: '#D4AF37', label: 'Vàng Kim Luxury' },
                        { hex: '#6366F1', label: 'Tím Indigo' },
                        { hex: '#0D9488', label: 'Xanh Ngọc Emerald' },
                        { hex: '#2563EB', label: 'Xanh Hoàng Gia' },
                        { hex: '#E11D48', label: 'Đỏ Ruby' },
                      ].map((preset) => (
                        <button
                          key={preset.hex}
                          type="button"
                          onClick={() => setBrandInfo({ ...brandInfo, primaryColor: preset.hex })}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs cursor-pointer ${
                            brandInfo.primaryColor === preset.hex
                              ? 'border-amber-400 bg-amber-400/20 text-white'
                              : 'border-white/10 bg-white/5 text-slate-400'
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: preset.hex }}
                          ></span>
                          <span>{preset.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Additional Prompt / Requirements */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Yêu cầu bổ sung cho AI (Prompt tùy biến)
                  </label>
                  <textarea
                    rows={2}
                    value={brandInfo.additionalRequirements}
                    onChange={(e) =>
                      setBrandInfo({ ...brandInfo, additionalRequirements: e.target.value })
                    }
                    placeholder="VD: Cần nhấn mạnh tính năng đặt hàng nhanh, thêm nút chat Zalo ở góc màn hình và phong cách tối giản thanh lịch..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-sm resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Compliance & Confirmation */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-white mb-1">
                  Bước 4: Xác nhận quyền sử dụng và điều khoản dịch vụ
                </h4>
                <p className="text-xs text-slate-300">
                  Vui lòng đọc và tích chọn xác nhận để tiến hành khởi tạo website bằng AI.
                </p>
              </div>

              {/* Review summary cards */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <div className="text-slate-400">Website mẫu:</div>
                  <div className="font-semibold text-white truncate">{analysis?.url}</div>
                </div>
                <div>
                  <div className="text-slate-400">Cấp độ tái tạo:</div>
                  <div className="font-semibold text-amber-400">Cấp độ {selectedLevel}</div>
                </div>
                <div>
                  <div className="text-slate-400">Thương hiệu mới:</div>
                  <div className="font-semibold text-white">
                    {brandInfo.businessName || 'Tự động đề xuất'}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Màu chủ đạo:</div>
                  <div className="flex items-center gap-1.5 font-semibold text-white">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: brandInfo.primaryColor }}
                    ></span>
                    <span>{brandInfo.primaryColor}</span>
                  </div>
                </div>
              </div>

              {/* Compliance Checkboxes */}
              <div className="space-y-3.5">
                <label className="flex items-start gap-3 p-4 rounded-xl glass-card border border-white/10 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={confirmRight}
                    onChange={(e) => setConfirmRight(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-white/20 bg-white/5 cursor-pointer"
                  />
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-white block mb-0.5">
                      Quyền tham khảo & Sử dụng hợp lý (Fair Use):
                    </strong>
                    Tôi xác nhận việc tái tạo hoặc tham khảo website mẫu này tuân thủ đúng quy định pháp luật hiện hành và chính sách sử dụng hợp lý.
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-xl glass-card border border-white/10 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={confirmTransform}
                    onChange={(e) => setConfirmTransform(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-white/20 bg-white/5 cursor-pointer"
                  />
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-white block mb-0.5">
                      Nhận diện thương hiệu mới & Trách nhiệm pháp lý:
                    </strong>
                    Tôi cam kết website được tạo sẽ sử dụng thông tin thương hiệu, sản phẩm và nội dung mới độc lập, không mạo danh đơn vị ban đầu.
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Controls */}
        <div className="p-6 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={handlePrevStep}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <ArrowLeft size={15} />
              <span>Quay lại</span>
            </button>
          ) : (
            <div></div>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-medium cursor-pointer"
            >
              Hủy bỏ
            </button>

            {step < 4 ? (
              <button
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl gold-gradient-btn text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>Tiếp tục</span>
                <ArrowRight size={15} />
              </button>
            ) : (
              <button
                onClick={handleTriggerBuild}
                disabled={!confirmRight || !confirmTransform}
                className="px-8 py-2.5 rounded-xl gold-gradient-btn text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles size={16} />
                <span>BƯỚC 5: TẠO WEBSITE BẰNG AI</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
