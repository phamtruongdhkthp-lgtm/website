import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Building,
  Phone,
  ShoppingBag,
  Palette,
  ArrowRight,
  RotateCcw,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { BrandInfo, CoreProductItem } from '../types';
import { ESSENTIALS_PRESETS, calculateEssentialsCompleteness } from '../data/websiteEssentialsPresets';

interface WebsiteEssentialsViewProps {
  initialBrandInfo?: Partial<BrandInfo>;
  onSaveAndCreateWebsite: (brandInfo: BrandInfo) => void;
  onNavigateToBrain: () => void;
}

export const WebsiteEssentialsView: React.FC<WebsiteEssentialsViewProps> = ({
  initialBrandInfo,
  onSaveAndCreateWebsite,
  onNavigateToBrain,
}) => {
  const [activeTab, setActiveTab] = useState<'identity' | 'contact' | 'products' | 'style'>('identity');

  // Form State initialized with either passed info or default VinFast preset
  const [brandInfo, setBrandInfo] = useState<BrandInfo>(() => {
    const defaultData = ESSENTIALS_PRESETS[0].data;
    return {
      businessName: initialBrandInfo?.businessName || defaultData.businessName || '',
      tagline: initialBrandInfo?.tagline || defaultData.tagline || '',
      mission: initialBrandInfo?.mission || defaultData.mission || '',
      industry: initialBrandInfo?.industry || defaultData.industry || '',
      domain: initialBrandInfo?.domain || defaultData.domain || '',
      phone: initialBrandInfo?.phone || defaultData.phone || '',
      zaloNumber: initialBrandInfo?.zaloNumber || defaultData.zaloNumber || '',
      email: initialBrandInfo?.email || defaultData.email || '',
      address: initialBrandInfo?.address || defaultData.address || '',
      workingHours: initialBrandInfo?.workingHours || defaultData.workingHours || '',
      logoUrl: initialBrandInfo?.logoUrl || '',
      primaryColor: initialBrandInfo?.primaryColor || defaultData.primaryColor || '#D4AF37',
      secondaryColor: initialBrandInfo?.secondaryColor || defaultData.secondaryColor || '#07090e',
      toneOfVoice: initialBrandInfo?.toneOfVoice || defaultData.toneOfVoice || 'luxury',
      colorMode: initialBrandInfo?.colorMode || defaultData.colorMode || 'dark',
      primaryCta: initialBrandInfo?.primaryCta || defaultData.primaryCta || 'Đăng Ký Tư Vấn Ngay',
      coreProducts: initialBrandInfo?.coreProducts || defaultData.coreProducts || [
        { name: 'Sản phẩm 1', price: 'Liên hệ', description: 'Mô tả dịch vụ tiêu chuẩn' },
      ],
      keyStrengths: initialBrandInfo?.keyStrengths || defaultData.keyStrengths || [
        'Dịch vụ chuyên nghiệp hàng đầu',
        'Hỗ trợ khách hàng tận tâm 24/7',
        'Bảo hành và cam kết chất lượng dài lâu',
      ],
      socialLinks: initialBrandInfo?.socialLinks || defaultData.socialLinks || {},
      additionalRequirements: initialBrandInfo?.additionalRequirements || '',
    };
  });

  const completeness = calculateEssentialsCompleteness(brandInfo);

  // Apply quick preset
  const handleApplyPreset = (presetId: string) => {
    const p = ESSENTIALS_PRESETS.find((item) => item.id === presetId);
    if (!p) return;
    setBrandInfo((prev) => ({
      ...prev,
      ...p.data,
      coreProducts: p.data.coreProducts ? [...p.data.coreProducts] : prev.coreProducts,
      keyStrengths: p.data.keyStrengths ? [...p.data.keyStrengths] : prev.keyStrengths,
    }));
  };

  // Add / Remove products
  const handleAddProduct = () => {
    setBrandInfo((prev) => ({
      ...prev,
      coreProducts: [
        ...(prev.coreProducts || []),
        { name: '', price: '', description: '' },
      ],
    }));
  };

  const handleUpdateProduct = (index: number, field: keyof CoreProductItem, value: string) => {
    setBrandInfo((prev) => {
      const updated = [...(prev.coreProducts || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, coreProducts: updated };
    });
  };

  const handleRemoveProduct = (index: number) => {
    setBrandInfo((prev) => ({
      ...prev,
      coreProducts: (prev.coreProducts || []).filter((_, i) => i !== index),
    }));
  };

  // Add / Remove strengths
  const handleAddStrength = () => {
    setBrandInfo((prev) => ({
      ...prev,
      keyStrengths: [...(prev.keyStrengths || []), ''],
    }));
  };

  const handleUpdateStrength = (index: number, val: string) => {
    setBrandInfo((prev) => {
      const updated = [...(prev.keyStrengths || [])];
      updated[index] = val;
      return { ...prev, keyStrengths: updated };
    });
  };

  const handleRemoveStrength = (index: number) => {
    setBrandInfo((prev) => ({
      ...prev,
      keyStrengths: (prev.keyStrengths || []).filter((_, i) => i !== index),
    }));
  };

  const handleResetForm = () => {
    if (confirm('Bạn có chắc muốn xóa trắng toàn bộ thông tin để điền từ đầu?')) {
      setBrandInfo({
        businessName: '',
        tagline: '',
        mission: '',
        industry: '',
        domain: '',
        phone: '',
        zaloNumber: '',
        email: '',
        address: '',
        workingHours: '',
        logoUrl: '',
        primaryColor: '#D4AF37',
        secondaryColor: '#07090e',
        toneOfVoice: 'professional',
        colorMode: 'dark',
        primaryCta: '',
        coreProducts: [{ name: '', price: '', description: '' }],
        keyStrengths: [''],
        socialLinks: {},
        additionalRequirements: '',
      });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Top Banner Header */}
      <div className="relative rounded-3xl p-8 glass-panel border border-amber-400/25 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold">
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
              <span>HỒ SƠ CƠ BẢN CỦA WEBSITE (WEBSITE ESSENTIALS)</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Điền Đầy Đủ Những Thứ Cơ Bản – Để AI Tự Động Làm Phần Còn Lại
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Nhập các thông tin nền tảng về thương hiệu, liên hệ, sản phẩm chủ lực và phong cách. Khi hoàn tất, Bộ não AI sẽ tự động phân bổ layout, viết slogan, tối ưu tỷ lệ chuyển đổi và sinh mã nguồn website hoàn chỉnh.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleResetForm}
              className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Xóa Trắng</span>
            </button>
            <button
              onClick={() => onSaveAndCreateWebsite(brandInfo)}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl gold-gradient-btn text-xs font-bold flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 cursor-pointer"
            >
              <Sparkles size={16} />
              <span>Gửi Cho AI Tạo Website Ngay</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Completeness Bar & 1-Click AI Presets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Completeness Card */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-amber-400" />
                Độ Hoàn Thiện Hồ Sơ Website
              </span>
              <span className="text-xs font-mono font-extrabold text-amber-300">
                {completeness.percentage}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 shadow-md shadow-amber-500/30"
                style={{ width: `${completeness.percentage}%` }}
              ></div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span>Đã điền {completeness.completedCount}/{completeness.totalCount} tiêu chí cơ bản</span>
              {completeness.percentage >= 90 ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  Sẵn sàng 100%
                </span>
              ) : (
                <span className="text-amber-300 font-mono">Cần thêm {completeness.missingItems.length} mục</span>
              )}
            </div>
          </div>

          {/* Missing items pills */}
          {completeness.missingItems.length > 0 && (
            <div className="p-3 rounded-2xl bg-amber-400/5 border border-amber-400/15">
              <div className="text-[10px] uppercase font-bold text-amber-300/80 mb-1.5">
                Các mục nên bổ sung:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {completeness.missingItems.slice(0, 4).map((item, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/5"
                  >
                    • {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="text-[11px] text-slate-400 leading-relaxed border-t border-white/5 pt-3">
            <span className="text-amber-300 font-medium">Lưu ý thông minh:</span> Càng điền chi tiết, Bộ não AI càng sinh nội dung chuẩn xác và sát với nhận diện thương hiệu của bạn.
          </div>
        </div>

        {/* 1-Click AI Presets Showcase */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap size={16} className="text-amber-400" />
                AI Tự Động Điền Mẫu Thông Minh (1 Click)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Chọn mẫu ngành nghề có sẵn để trải nghiệm toàn bộ hồ sơ hoàn chỉnh ngay tức thì
              </p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-white/10 text-slate-300">
              4 Mẫu Chuẩn Doanh Nghiệp
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ESSENTIALS_PRESETS.map((preset) => (
              <div
                key={preset.id}
                onClick={() => handleApplyPreset(preset.id)}
                className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-amber-400/10 border border-white/10 hover:border-amber-400/30 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      {preset.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      {preset.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {preset.data.tagline}
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{preset.data.coreProducts?.length || 3} sản phẩm • Hotline • USP</span>
                  <span className="text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    Áp dụng →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Tabbed Essentials Form */}
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
        {/* Form Tabs */}
        <div className="flex border-b border-white/10 bg-white/[0.01] overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('identity')}
            className={`flex items-center gap-2.5 px-6 py-4 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'identity'
                ? 'border-amber-400 text-amber-300 bg-amber-400/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Building size={16} />
            <span>1. Nhận Diện & Sứ Mệnh</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`flex items-center gap-2.5 px-6 py-4 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'contact'
                ? 'border-amber-400 text-amber-300 bg-amber-400/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Phone size={16} />
            <span>2. Liên Hệ & Hotline / Zalo</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2.5 px-6 py-4 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'products'
                ? 'border-amber-400 text-amber-300 bg-amber-400/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag size={16} />
            <span>3. Sản Phẩm & Điểm Mạnh (USP)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('style')}
            className={`flex items-center gap-2.5 px-6 py-4 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'style'
                ? 'border-amber-400 text-amber-300 bg-amber-400/5'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Palette size={16} />
            <span>4. Phong Cách & Giọng Điệu</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 md:p-8 space-y-6">
          {/* TAB 1: IDENTITY */}
          {activeTab === 'identity' && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                    Tên Doanh Nghiệp / Thương Hiệu <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={brandInfo.businessName}
                    onChange={(e) => setBrandInfo((p) => ({ ...p, businessName: e.target.value }))}
                    placeholder="Ví dụ: VINFAST E-MOBILITY VIỆT NAM"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                    Lĩnh Vực Hoạt Động
                  </label>
                  <input
                    type="text"
                    value={brandInfo.industry}
                    onChange={(e) => setBrandInfo((p) => ({ ...p, industry: e.target.value }))}
                    placeholder="Ví dụ: Ô tô điện thông minh & Năng lượng xanh"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                  Khẩu Hiệu (Tagline / Slogan Chính) <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  value={brandInfo.tagline || ''}
                  onChange={(e) => setBrandInfo((p) => ({ ...p, tagline: e.target.value }))}
                  placeholder="Ví dụ: Kiến Tạo Tương Lai Giao Thông Xanh & Thông Minh"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                  Sứ Mệnh & Giới Thiệu Ngắn (Mission Statement)
                </label>
                <textarea
                  rows={3}
                  value={brandInfo.mission || ''}
                  onChange={(e) => setBrandInfo((p) => ({ ...p, mission: e.target.value }))}
                  placeholder="Mô tả giá trị cốt lõi, đối tượng phục vụ và cam kết chất lượng..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50 resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                    Tên Miền Dự Kiến
                  </label>
                  <input
                    type="text"
                    value={brandInfo.domain}
                    onChange={(e) => setBrandInfo((p) => ({ ...p, domain: e.target.value }))}
                    placeholder="vinfast-emobility.vn"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                    Đường Dẫn Logo (URL ảnh)
                  </label>
                  <input
                    type="text"
                    value={brandInfo.logoUrl}
                    onChange={(e) => setBrandInfo((p) => ({ ...p, logoUrl: e.target.value }))}
                    placeholder="https://example.com/logo.png"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTACT */}
          {activeTab === 'contact' && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                    Số Điện Thoại / Hotline Tư Vấn <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={brandInfo.phone}
                    onChange={(e) => setBrandInfo((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="1900 23 23 89 hoặc 0988 123 456"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                    Số Zalo OA / Zalo Tư Vấn Nhanh
                  </label>
                  <input
                    type="text"
                    value={brandInfo.zaloNumber || ''}
                    onChange={(e) => setBrandInfo((p) => ({ ...p, zaloNumber: e.target.value }))}
                    placeholder="0988 123 456"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                    Email Liên Hệ & Tiếp Nhận Yêu Cầu <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={brandInfo.email}
                    onChange={(e) => setBrandInfo((p) => ({ ...p, email: e.target.value }))}
                    placeholder="cskh@vinfast-emobility.vn"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                    Khung Giờ Hoạt Động / Phục Vụ
                  </label>
                  <input
                    type="text"
                    value={brandInfo.workingHours || ''}
                    onChange={(e) => setBrandInfo((p) => ({ ...p, workingHours: e.target.value }))}
                    placeholder="Thứ Hai - Chủ Nhật: 08:00 - 20:00"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                  Địa Chỉ Trụ Sở / Showroom Chính <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  value={brandInfo.address}
                  onChange={(e) => setBrandInfo((p) => ({ ...p, address: e.target.value }))}
                  placeholder="Khu công nghiệp Đình Vũ, Cát Hải, TP. Hải Phòng"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                  Mạng Xã Hội (Facebook, TikTok, YouTube)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={brandInfo.socialLinks?.facebook || ''}
                    onChange={(e) =>
                      setBrandInfo((p) => ({
                        ...p,
                        socialLinks: { ...p.socialLinks, facebook: e.target.value },
                      }))
                    }
                    placeholder="Facebook: https://facebook.com/..."
                    className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={brandInfo.socialLinks?.tiktok || ''}
                    onChange={(e) =>
                      setBrandInfo((p) => ({
                        ...p,
                        socialLinks: { ...p.socialLinks, tiktok: e.target.value },
                      }))
                    }
                    placeholder="TikTok: @..."
                    className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={brandInfo.socialLinks?.youtube || ''}
                    onChange={(e) =>
                      setBrandInfo((p) => ({
                        ...p,
                        socialLinks: { ...p.socialLinks, youtube: e.target.value },
                      }))
                    }
                    placeholder="YouTube: https://youtube.com/..."
                    className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS & USPs */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-fade-in">
              {/* Primary CTA */}
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                  Tên Nút Kêu Gọi Hành Động Chính (Call to Action - CTA) <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  value={brandInfo.primaryCta || ''}
                  onChange={(e) => setBrandInfo((p) => ({ ...p, primaryCta: e.target.value }))}
                  placeholder="Ví dụ: Đăng Ký Lái Thử Miễn Phí, Đặt Hàng Ngay, Nhận Tư Vấn 1:1"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50"
                />
              </div>

              {/* Core Products / Services */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white">Sản Phẩm & Dịch Vụ Chủ Lực (Hiển thị bảng giá & showcase)</span>
                    <p className="text-[11px] text-slate-400">Tối thiểu 1 sản phẩm, khuyên dùng 3 sản phẩm</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddProduct}
                    className="px-3 py-1.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Thêm Sản Phẩm</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(brandInfo.coreProducts || []).map((product, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-amber-400">
                          Sản phẩm #{idx + 1}
                        </span>
                        {(brandInfo.coreProducts || []).length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(idx)}
                            className="text-slate-400 hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            value={product.name}
                            onChange={(e) => handleUpdateProduct(idx, 'name', e.target.value)}
                            placeholder="Tên sản phẩm/dịch vụ (VD: VF 7 Plus - SUV Điện)"
                            className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={product.price}
                            onChange={(e) => handleUpdateProduct(idx, 'price', e.target.value)}
                            placeholder="Giá (VD: 850.000.000 đ hoặc Miễn phí)"
                            className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono"
                          />
                        </div>
                      </div>

                      <input
                        type="text"
                        value={product.description}
                        onChange={(e) => handleUpdateProduct(idx, 'description', e.target.value)}
                        placeholder="Mô tả tóm tắt tính năng nổi bật..."
                        className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Strengths / USPs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white">Điểm Mạnh Cạnh Tranh (USPs)</span>
                    <p className="text-[11px] text-slate-400">Các lý do khách hàng nên chọn thương hiệu của bạn</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddStrength}
                    className="px-3 py-1.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Thêm Điểm Mạnh</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {(brandInfo.keyStrengths || []).map((strength, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-[11px] font-mono text-slate-400 shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={strength}
                        onChange={(e) => handleUpdateStrength(idx, e.target.value)}
                        placeholder="Ví dụ: Mạng lưới 150.000 cổng sạc phủ sóng 63 tỉnh thành..."
                        className="flex-1 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      />
                      {(brandInfo.keyStrengths || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStrength(idx)}
                          className="text-slate-400 hover:text-red-400 p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STYLE & TONE */}
          {activeTab === 'style' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                    Màu Sắc Chủ Đạo (Primary Accent)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={brandInfo.primaryColor}
                      onChange={(e) => setBrandInfo((p) => ({ ...p, primaryColor: e.target.value }))}
                      className="w-10 h-10 rounded-xl bg-transparent border border-white/20 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={brandInfo.primaryColor}
                      onChange={(e) => setBrandInfo((p) => ({ ...p, primaryColor: e.target.value }))}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                    Tone Giọng Điệu Nội Dung (Tone of Voice)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'luxury', label: 'Sang Trọng / Đẳng Cấp' },
                      { id: 'professional', label: 'Chuyên Nghiệp / B2B' },
                      { id: 'friendly', label: 'Thân Thiện / Trẻ Trung' },
                    ].map((tone) => (
                      <button
                        key={tone.id}
                        type="button"
                        onClick={() => setBrandInfo((p) => ({ ...p, toneOfVoice: tone.id }))}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                          brandInfo.toneOfVoice === tone.id
                            ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                            : 'bg-white/[0.02] text-slate-400 border-white/10 hover:text-white'
                        }`}
                      >
                        {tone.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                  Yêu Cầu Thiết Kế Bổ Sung Cho Bộ Não AI
                </label>
                <textarea
                  rows={3}
                  value={brandInfo.additionalRequirements}
                  onChange={(e) => setBrandInfo((p) => ({ ...p, additionalRequirements: e.target.value }))}
                  placeholder="Ví dụ: Ưu tiên hiển thị thông số kỹ thuật rõ ràng, nút đăng ký nổi bật, phong cách hiện đại tối giản..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400/50 resize-none"
                ></textarea>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 bg-white/[0.01] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Độ hoàn thiện hiện tại: <strong className="text-amber-300">{completeness.percentage}%</strong></span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onNavigateToBrain}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-slate-300 transition-all cursor-pointer"
            >
              Kiểm Tra Bộ Não AI
            </button>
            <button
              type="button"
              onClick={() => onSaveAndCreateWebsite(brandInfo)}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl gold-gradient-btn text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <Sparkles size={15} />
              <span>Gửi Cho AI Tự Động Xây Dựng Website</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
