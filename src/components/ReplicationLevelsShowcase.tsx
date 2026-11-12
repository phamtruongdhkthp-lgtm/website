import React, { useState } from 'react';
import {
  Sliders,
  Globe,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Layers,
  Palette,
  FileCode,
  Eye,
  Wand2,
  Copy,
  LayoutTemplate,
  Compass,
  Check,
} from 'lucide-react';
import { ReplicationLevel } from '../types';
import { LEVEL_DEFINITIONS } from '../utils/engine';

interface ReplicationLevelsShowcaseProps {
  onSelectLevelToCreate: (level: ReplicationLevel, sampleUrl?: string) => void;
}

interface LevelExampleData {
  level: ReplicationLevel;
  badge: string;
  brandName: string;
  tagline: string;
  themeColor: string;
  themeColorName: string;
  aiIntervention: string;
  aiPercent: number;
  copyrightSafety: string;
  screenshot: string;
  layoutDiff: string;
  copywritingDiff: string;
  assetDiff: string;
  keyHighlights: string[];
}

export const ReplicationLevelsShowcase: React.FC<ReplicationLevelsShowcaseProps> = ({
  onSelectLevelToCreate,
}) => {
  const [activeLevel, setActiveLevel] = useState<ReplicationLevel>(3);
  const [activeSampleSite, setActiveSampleSite] = useState<'vinfast' | 'highlands' | 'stripe'>('vinfast');

  // Sample sites data for comparison
  const sampleOriginals = {
    vinfast: {
      name: 'VinFast Auto (Website Gốc Mẫu)',
      url: 'https://vinfastauto.com',
      industry: 'Sản xuất & Phân phối Ô tô điện thông minh',
      primaryColor: '#2563EB',
      colorName: 'Xanh dương VinFast',
      screenshot: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&auto=format&fit=crop&q=80',
      description: 'Website gốc của tập đoàn xe điện với bố cục giới thiệu dòng xe VF, đặt cọc pin và hệ thống showroom.',
    },
    highlands: {
      name: 'Highlands Coffee (Website Gốc Mẫu)',
      url: 'https://highlandscoffee.com.vn',
      industry: 'Chuỗi F&B Cà phê & Bánh ngọt',
      primaryColor: '#B45309',
      colorName: 'Nâu đỏ Highlands',
      screenshot: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80',
      description: 'Website gốc chuỗi đồ uống với danh mục thực đơn Phin sữa đá, Trà sen vàng và tin tức khuyến mãi.',
    },
    stripe: {
      name: 'Stripe Global (Website Gốc Mẫu)',
      url: 'https://stripe.com',
      industry: 'Hạ tầng thanh toán trực tuyến SaaS',
      primaryColor: '#6366F1',
      colorName: 'Tím Indigo Stripe',
      screenshot: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
      description: 'Website gốc tài chính công nghệ với layout dạng dải màu gradient, bảng mã API và lưới tính năng doanh nghiệp.',
    },
  };

  const currentOriginal = sampleOriginals[activeSampleSite];

  // 5 Levels illustration details based on active level and selected site
  const levelExamples: Record<ReplicationLevel, LevelExampleData> = {
    1: {
      level: 1,
      badge: 'Cấp độ 1 – Gần như nguyên bản (Replica Cloned)',
      brandName: activeSampleSite === 'vinfast' ? 'VINFAST PARTNER VIETNAM' : activeSampleSite === 'highlands' ? 'HIGHLANDS FRANCHISE VN' : 'STRIPE PARTNER GATEWAY',
      tagline: 'Giữ nguyên 98% cấu trúc, chỉ thay thông tin liên hệ và dữ liệu chỉ định',
      themeColor: currentOriginal.primaryColor,
      themeColorName: currentOriginal.colorName + ' (Giữ nguyên gốc)',
      aiIntervention: 'Tối thiểu (5% - 10%)',
      aiPercent: 10,
      copyrightSafety: 'Yêu cầu có thỏa thuận ủy quyền / quyền đại lý từ chủ sở hữu',
      screenshot: currentOriginal.screenshot,
      layoutDiff: 'Bảo lưu 100% hệ thống grid, vị trí navbar, banner, footer và tỉ lệ khung hình.',
      copywritingDiff: 'Chỉ thay đổi: Tên công ty, số hotline, email liên hệ, địa chỉ trụ sở và giấy phép ĐKKD.',
      assetDiff: 'Giữ nguyên font chữ và bộ icon gốc; thay đổi file logo SVG mới theo thương hiệu.',
      keyHighlights: [
        'Bảo lưu nguyên vẹn trải nghiệm người dùng gốc',
        'Phù hợp cho đại lý phân phối chính thức, chi nhánh ủy quyền',
        'Thời gian dựng siêu tốc dưới 30 giây',
      ],
    },
    2: {
      level: 2,
      badge: 'Cấp độ 2 – Giữ thiết kế (Design Retained)',
      brandName: activeSampleSite === 'vinfast' ? 'VIET EV LUXURY MOTORS' : activeSampleSite === 'highlands' ? 'HERITAGE COFFEE ROASTERS' : 'NEXUS CLOUD PAYMENTS',
      tagline: 'Giữ phong cách thiết kế & typography, thay toàn bộ nội dung và ảnh stock mới',
      themeColor: '#0D9488',
      themeColorName: 'Xanh ngọc Emerald (#0D9488)',
      aiIntervention: 'Trung bình thấp (30% - 40%)',
      aiPercent: 35,
      copyrightSafety: 'An toàn cao (Không sao chép nội dung bài viết và hình ảnh gốc)',
      screenshot: activeSampleSite === 'vinfast' 
        ? 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&auto=format&fit=crop&q=80'
        : activeSampleSite === 'highlands'
        ? 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
      layoutDiff: 'Giữ nguyên lưới khung cấu trúc (header, 3 cột dịch vụ, bảng giá), tái cân bằng khoảng cách padding.',
      copywritingDiff: 'Toàn bộ tiêu đề, slogan, bài giới thiệu và mô tả sản phẩm được viết mới 100% cho thương hiệu mới.',
      assetDiff: 'Thay thế 100% hình ảnh sản phẩm bằng ảnh bản quyền Unsplash chất lượng 4K độ nét cao.',
      keyHighlights: [
        'Giữ nguyên phong cách thị giác cao cấp mà bạn thích',
        'Thay mới toàn bộ text & ảnh để không trùng lặp thương hiệu',
        'Chuẩn hóa nhận diện màu sắc mới hài hòa',
      ],
    },
    3: {
      level: 3,
      badge: 'Cấp độ 3 – Tương tự (Similar Structure - Khuyên Dùng)',
      brandName: activeSampleSite === 'vinfast' ? 'VINFAST E-MOBILITY NEXT' : activeSampleSite === 'highlands' ? 'HIGHLANDS SPECIALTY COFFEE' : 'NEXUS GLOBAL PAY',
      tagline: 'Giữ cấu trúc luồng người dùng, AI tối ưu giao diện hiện đại & tăng chuyển đổi CRO',
      themeColor: '#D4AF37',
      themeColorName: 'Vàng kim Hoàng Gia (#D4AF37)',
      aiIntervention: 'Cân bằng tối ưu (55% - 65%)',
      aiPercent: 60,
      copyrightSafety: 'Rất an toàn (Tái cơ cấu thành phần, tối ưu độc lập chuẩn SEO)',
      screenshot: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=80',
      layoutDiff: 'Giữ luồng chuyển đổi chính (Hero -> Features -> Pricing -> CTA), nhưng AI bố cục lại các thẻ theo phong cách Frosted Glass hiện đại.',
      copywritingDiff: 'AI viết lại toàn bộ thông điệp sắc sảo, tối ưu SEO on-page, thêm các tiêu đề kích thích hành động (Call To Action).',
      assetDiff: 'Bổ sung các widget tương tác: Form tư vấn nhanh, nút gọi Hotline & Zalo trực tiếp, bảng giá có gói nổi bật.',
      keyHighlights: [
        'Mức độ được 85% người dùng lựa chọn nhất',
        'Giao diện đẹp hơn web gốc nhờ áp dụng ngôn ngữ thiết kế mới',
        'Tối ưu tỷ lệ chuyển đổi khách hàng đăng ký hoặc gọi điện',
      ],
    },
    4: {
      level: 4,
      badge: 'Cấp độ 4 – Lấy cảm hứng (Inspiration Reimagined)',
      brandName: activeSampleSite === 'vinfast' ? 'APEX FUTURE HYPERDRIVE' : activeSampleSite === 'highlands' ? 'TERRA CAFE ARCHITECTURE' : 'FINTECH ORBIT PROTOCOL',
      tagline: 'Tham khảo website mẫu về tư duy, AI thiết kế lại đột phá theo xu hướng mới',
      themeColor: '#8B5CF6',
      themeColorName: 'Tím Cosmic Cyber (#8B5CF6)',
      aiIntervention: 'Mạnh mẽ (80% - 85%)',
      aiPercent: 80,
      copyrightSafety: 'Hoàn toàn độc lập (Ý tưởng tái thiết kế khác biệt rõ rệt)',
      screenshot: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=1200&auto=format&fit=crop&q=80',
      layoutDiff: 'Tái thiết kế lại đáng kể với layout thẻ nổi, animations mượt mà, phong cách Dark Mode không gian vũ trụ.',
      copywritingDiff: 'Nội dung hướng tới tương lai, phong cách công nghệ cao, tôn vinh vị thế dẫn đầu của thương hiệu.',
      assetDiff: 'Hệ thống đồ họa 3D, biểu đồ thông số kỹ thuật trực quan, thẻ kính mờ phản chiếu ánh sao.',
      keyHighlights: [
        'Thiết kế mang tính bứt phá, không bị gò bó bởi web cũ',
        'Tạo dấu ấn độc nhất cho thương hiệu công nghệ hoặc startup',
        'Tối ưu hóa hiệu ứng tương tác thị giác ấn tượng',
      ],
    },
    5: {
      level: 5,
      badge: 'Cấp độ 5 – Sáng tạo hoàn toàn (Full Creative Rebuild)',
      brandName: activeSampleSite === 'vinfast' ? 'SOLARIS MOBILITY LABS' : activeSampleSite === 'highlands' ? 'ZENITH BEVERAGE ATELIER' : 'AETHER CAPITAL DIGITAL',
      tagline: 'Chỉ lấy định hướng ngành từ web gốc, AI tự sáng tạo giao diện độc bản từ số 0',
      themeColor: '#EA580C',
      themeColorName: 'Cam Hoàng Hôn Sunset (#EA580C)',
      aiIntervention: 'Toàn diện (100% Sáng tạo mới)',
      aiPercent: 100,
      copyrightSafety: '100% Độc bản tuyệt đối (Không trùng bất kỳ chi tiết nào với web gốc)',
      screenshot: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
      layoutDiff: 'AI xây dựng một kiến trúc giao diện hoàn toàn mới: sitemap mới, cách sắp xếp section độc bản, tối ưu trải nghiệm đa điểm chạm.',
      copywritingDiff: 'Toàn bộ nội dung, slogan, câu chuyện thương hiệu và định vị giá trị được AI sáng tác mới 100%.',
      assetDiff: 'Bảng màu, typography, phong cách đồ họa và iconography được AI thiết kế riêng biệt cho doanh nghiệp.',
      keyHighlights: [
        'Dành cho doanh nghiệp muốn sở hữu website độc quyền 100%',
        'Không sợ bất kỳ rủi ro bản quyền hay mạo danh nào',
        'Tự do tùy biến sâu theo tầm nhìn dài hạn',
      ],
    },
  };

  const currentExample = levelExamples[activeLevel];

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-2 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
            <Sliders size={14} />
            <span>Trực Quan Hóa Mức Độ Can Thiệp Của AI</span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-2.5">
            <span>5 Cấp Độ Tái Tạo Thông Minh</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full gold-gradient-bg text-slate-950 font-bold">
              1 Web Gốc + 5 Mức Độ AI
            </span>
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            So sánh trực tiếp giữa <strong>Website Mẫu Ban Đầu</strong> và <strong>5 Cách Tiếp Cận Của AI</strong>. Nhấp vào từng cấp độ bên dưới để xem minh họa chi tiết.
          </p>
        </div>

        {/* Website sample switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 text-xs shrink-0">
          <span className="text-slate-400 px-2 text-[11px] hidden lg:inline">Chọn mẫu thử:</span>
          <button
            onClick={() => setActiveSampleSite('vinfast')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeSampleSite === 'vinfast'
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            VinFast (Ô tô)
          </button>
          <button
            onClick={() => setActiveSampleSite('highlands')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeSampleSite === 'highlands'
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Highlands (F&B)
          </button>
          <button
            onClick={() => setActiveSampleSite('stripe')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeSampleSite === 'stripe'
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Stripe (FinTech)
          </button>
        </div>
      </div>

      {/* 5 Level Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {LEVEL_DEFINITIONS.map((lvl) => {
          const isActive = activeLevel === lvl.level;
          const ex = levelExamples[lvl.level];

          return (
            <button
              key={lvl.level}
              onClick={() => setActiveLevel(lvl.level)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                isActive
                  ? 'glass-panel-gold border-amber-400 ring-2 ring-amber-400/30 shadow-lg shadow-amber-500/10'
                  : 'glass-card border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[10px] font-mono font-bold ${
                      isActive ? 'text-amber-400' : 'text-slate-400'
                    }`}
                  >
                    CẤP ĐỘ {lvl.level}
                  </span>
                  {lvl.recommended && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-extrabold uppercase">
                      Khuyên Dùng
                    </span>
                  )}
                </div>

                <div className="font-bold text-xs md:text-sm text-white mb-1 truncate">
                  {lvl.badge}
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {lvl.shortDesc}
                </p>
              </div>

              {/* Progress bar of AI intervention */}
              <div className="mt-3 pt-2.5 border-t border-white/5 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Mức độ AI:</span>
                  <span className={isActive ? 'text-amber-300 font-bold' : 'text-slate-300'}>
                    {ex.aiPercent}%
                  </span>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${ex.aiPercent}%`,
                      backgroundColor: isActive ? '#D4AF37' : '#64748B',
                    }}
                  ></div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* VÍ DỤ MINH HỌA: 1 WEB GỐC + 1 MỨC ĐỘ THÔNG MINH ĐƯỢC CHỌN (SIDE-BY-SIDE INTERACTIVE SHOWCASE) */}
      <div className="p-6 md:p-8 rounded-3xl glass-card border border-amber-400/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gold-gradient-bg flex items-center justify-center text-slate-950 font-bold">
              <Eye size={18} />
            </div>
            <div>
              <h4 className="font-bold text-base text-white">
                Bảng So Sánh Trực Quan: Web Gốc vs {currentExample.badge}
              </h4>
              <p className="text-xs text-slate-400">
                Thấy rõ sự khác biệt về nhận diện, bố cục, hình ảnh và tỷ lệ can thiệp AI
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectLevelToCreate(activeLevel, currentOriginal.url)}
            className="px-4 py-2 rounded-xl gold-gradient-btn text-xs font-bold flex items-center justify-center gap-1.5 shadow-md cursor-pointer self-start sm:self-auto"
          >
            <Sparkles size={13} />
            <span>Áp Dụng Cấp Độ {activeLevel} & Tạo Website</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* 2 Comparison Mockup Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* COLUMN 1: WEBSITE GỐC BAN ĐẦU */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden flex flex-col">
            {/* Header bar */}
            <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
                <span className="font-bold text-xs text-slate-300">
                  🌐 1. WEBSITE GỐC BAN ĐẦU (ORIGINAL)
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-400">
                Mẫu Tham Khảo
              </span>
            </div>

            {/* Thumbnail Mockup */}
            <div className="relative h-56 bg-slate-900 overflow-hidden group">
              <img
                src={currentOriginal.screenshot}
                alt={currentOriginal.name}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg backdrop-blur-md bg-slate-950/80 border border-white/15 text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                <Globe size={12} className="text-slate-400" />
                <span>{currentOriginal.url}</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <div className="text-xs text-slate-400 font-medium">Thương hiệu ban đầu:</div>
                <div className="text-base font-extrabold text-white truncate drop-shadow">
                  {currentOriginal.name}
                </div>
              </div>
            </div>

            {/* Original Metadata */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3 text-xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Lĩnh vực & Định hướng:</span>
                  <span className="font-medium text-slate-200">{currentOriginal.industry}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Màu sắc chủ đạo gốc:</span>
                  <div className="flex items-center gap-1.5 font-medium text-slate-200">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: currentOriginal.primaryColor }}
                    ></span>
                    <span>{currentOriginal.colorName}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Trạng thái bản quyền:</span>
                  <span className="text-amber-400 font-mono text-[11px]">Bản quyền đơn vị gốc</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 p-2.5 rounded-xl bg-black/40 border border-white/5 leading-relaxed">
                {currentOriginal.description}
              </p>
            </div>
          </div>

          {/* COLUMN 2: WEBSITE TÁI TẠO BỞI AI (THEO CẤP ĐỘ ĐANG CHỌN) */}
          <div className="rounded-2xl glass-panel-gold border border-amber-400/40 overflow-hidden flex flex-col relative">
            {/* Header bar */}
            <div className="px-4 py-3 bg-amber-400/10 border-b border-amber-400/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="font-bold text-xs text-amber-300">
                  ✨ 2. KẾT QUẢ AI TÁI TẠO (CẤP ĐỘ {activeLevel})
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded gold-gradient-bg text-slate-950 font-bold uppercase">
                {LEVEL_DEFINITIONS[activeLevel - 1]?.badge}
              </span>
            </div>

            {/* Transformed Mockup */}
            <div className="relative h-56 bg-slate-900 overflow-hidden group">
              <img
                src={currentExample.screenshot}
                alt={currentExample.brandName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg backdrop-blur-md bg-slate-950/80 border border-amber-400/40 text-[11px] font-semibold text-amber-300 flex items-center gap-1.5">
                <Sparkles size={12} className="text-amber-400" />
                <span>AI Output: {currentExample.aiIntervention}</span>
              </div>

              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg backdrop-blur-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-mono flex items-center gap-1">
                <ShieldCheck size={12} />
                <span>An toàn Fair Use</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <div className="text-xs text-amber-300/80 font-medium">Thương hiệu mới sau AI:</div>
                <div className="text-base font-extrabold text-white truncate drop-shadow">
                  {currentExample.brandName}
                </div>
              </div>
            </div>

            {/* Transformed Metadata */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3 text-xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Màu sắc mới được áp dụng:</span>
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: currentExample.themeColor }}
                    ></span>
                    <span>{currentExample.themeColorName}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-slate-400">
                  <span>Mức độ can thiệp của AI:</span>
                  <span className="font-mono text-amber-300 font-bold">
                    {currentExample.aiPercent}% ({currentExample.aiIntervention})
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-400">
                  <span>Tính pháp lý & Bản quyền:</span>
                  <span className="text-emerald-400 font-medium truncate max-w-[240px]">
                    {currentExample.copyrightSafety}
                  </span>
                </div>
              </div>

              {/* Key Features Bullets */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                <div className="font-bold text-amber-300 text-[11px] uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  <span>Điểm khác biệt trọng tâm ở Cấp độ {activeLevel}:</span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-200">
                  {currentExample.keyHighlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold shrink-0">✓</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Transformation Breakdown Matrix Table */}
        <div className="pt-2">
          <div className="text-xs font-bold text-white mb-3 uppercase tracking-wider flex items-center gap-2">
            <Layers size={14} className="text-amber-400" />
            <span>Chi Tiết Bóc Tách Các Thành Phần Ở Cấp Độ {activeLevel}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <LayoutTemplate size={14} className="text-amber-400" />
                <span>1. Bố Cục & Grid Layout</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {currentExample.layoutDiff}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <FileCode size={14} className="text-emerald-400" />
                <span>2. Nội Dung & Copywriting</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {currentExample.copywritingDiff}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Palette size={14} className="text-indigo-400" />
                <span>3. Nhận Diện & Hình Ảnh</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {currentExample.assetDiff}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
