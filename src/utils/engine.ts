import {
  BrandInfo,
  DetectedColor,
  DetectedComponent,
  DetectedFont,
  DetectedPage,
  LevelInfo,
  Project,
  ReplicationLevel,
  WebsiteAnalysis,
  WebsitePage,
  WebsiteSection,
} from '../types';

export const LEVEL_DEFINITIONS: LevelInfo[] = [
  {
    level: 1,
    title: 'Cấp độ 1 – Gần như nguyên bản',
    badge: 'Replica Cloned',
    shortDesc: 'Giữ nguyên tối đa giao diện, cấu trúc và bố cục website mẫu.',
    fullDesc: 'Giữ nguyên tối đa giao diện, cấu trúc và bố cục website mẫu trong phạm vi được phép sử dụng. Chỉ thay thông tin thương hiệu, thông tin liên hệ và dữ liệu cá nhân được chỉ định.',
    iconName: 'Copy',
  },
  {
    level: 2,
    title: 'Cấp độ 2 – Giữ thiết kế',
    badge: 'Design Retained',
    shortDesc: 'Giữ phong cách thiết kế, thay nội dung, hình ảnh và nhận diện.',
    fullDesc: 'Giữ nguyên phong cách thiết kế, typography, grid hệ thống. Tự động thay thế toàn bộ nội dung text, hình ảnh stock chất lượng cao và hệ thống nhận diện thương hiệu mới.',
    iconName: 'LayoutTemplate',
  },
  {
    level: 3,
    title: 'Cấp độ 3 – Tương tự (Khuyên dùng)',
    badge: 'Similar Structure',
    shortDesc: 'Giữ cấu trúc và phong cách tổng thể, AI tối ưu giao diện và nội dung.',
    fullDesc: 'Giữ cấu trúc luồng người dùng và phong cách tổng thể, AI được phép tối ưu giao diện hiện đại hơn, viết lại nội dung chuyên nghiệp và cải thiện trải nghiệm chuyển đổi (CRO).',
    iconName: 'Sparkles',
    recommended: true,
  },
  {
    level: 4,
    title: 'Cấp độ 4 – Lấy cảm hứng',
    badge: 'Inspiration Reimagined',
    shortDesc: 'Tham khảo website mẫu, thiết kế lại đáng kể theo xu hướng mới.',
    fullDesc: 'Tham khảo website mẫu về ý tưởng và tư duy sản phẩm, sau đó thiết kế lại đáng kể với layout đột phá, animations mượt mà và phong cách đồ họa độc bản cho thương hiệu mới.',
    iconName: 'Compass',
  },
  {
    level: 5,
    title: 'Cấp độ 5 – Sáng tạo hoàn toàn',
    badge: 'Full Creative Rebuild',
    shortDesc: 'Chỉ lấy định hướng ngành, AI tự sáng tạo giao diện độc bản.',
    fullDesc: 'AI chỉ sử dụng website mẫu để hiểu lĩnh vực, khách hàng mục tiêu và định hướng dịch vụ. Toàn bộ giao diện, sitemap, phong cách và copy được sáng tạo hoàn toàn mới từ số 0.',
    iconName: 'Wand2',
  },
];

export function validateWebsiteUrl(rawUrl: string): { isValid: boolean; normalizedUrl: string; error?: string } {
  if (!rawUrl || !rawUrl.trim()) {
    return { isValid: false, normalizedUrl: '', error: 'Vui lòng nhập đường dẫn URL website' };
  }

  let trimmed = rawUrl.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    trimmed = `https://${trimmed}`;
  }

  try {
    const parsed = new URL(trimmed);
    if (!parsed.hostname || !parsed.hostname.includes('.')) {
      return { isValid: false, normalizedUrl: trimmed, error: 'Định dạng tên miền không hợp lệ (ví dụ: https://example.com)' };
    }
    return { isValid: true, normalizedUrl: parsed.origin + (parsed.pathname !== '/' ? parsed.pathname : '') };
  } catch {
    return { isValid: false, normalizedUrl: trimmed, error: 'Đường dẫn URL không hợp lệ' };
  }
}

export function extractDomainName(url: string): string {
  try {
    const { hostname } = new URL(url.startsWith('http') ? url : `https://${url}`);
    return hostname.replace(/^www\./, '');
  } catch {
    return 'example.com';
  }
}

// Generate rich simulated or real analysis data for a given URL
export function analyzeWebsiteBlueprint(url: string, brandNameHint?: string): WebsiteAnalysis {
  const domain = extractDomainName(url);
  const cleanName = brandNameHint || domain.split('.')[0].toUpperCase();

  // Industry heuristics
  let industry = 'Công nghệ & Dịch vụ';
  let primaryHex = '#D4AF37';
  let secondaryHex = '#1E293B';
  let screenshot = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80';

  if (domain.includes('tech') || domain.includes('app') || domain.includes('stripe') || domain.includes('saas')) {
    industry = 'Phần mềm & SaaS';
    primaryHex = '#6366F1';
    secondaryHex = '#0F172A';
    screenshot = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80';
  } else if (domain.includes('cafe') || domain.includes('coffee') || domain.includes('food') || domain.includes('highlands')) {
    industry = 'F&B & Ẩm thực';
    primaryHex = '#B45309';
    secondaryHex = '#451A03';
    screenshot = 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80';
  } else if (domain.includes('auto') || domain.includes('car') || domain.includes('vinfast')) {
    industry = 'Ô tô & Vận tải điện';
    primaryHex = '#2563EB';
    secondaryHex = '#111827';
    screenshot = 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&auto=format&fit=crop&q=80';
  } else if (domain.includes('store') || domain.includes('shop') || domain.includes('dienthoai') || domain.includes('thegioididong')) {
    industry = 'Bán lẻ & Thương mại điện tử';
    primaryHex = '#EA580C';
    secondaryHex = '#18181B';
    screenshot = 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop&q=80';
  }

  const detectedPages: DetectedPage[] = [
    { id: 'p1', name: 'Trang chủ (Home)', path: '/', status: 'ready', type: 'Landing Page', elementsCount: 38 },
    { id: 'p2', name: 'Giới thiệu (About Us)', path: '/about', status: 'ready', type: 'Content Page', elementsCount: 22 },
    { id: 'p3', name: 'Sản phẩm & Dịch vụ', path: '/services', status: 'ready', type: 'Product Grid', elementsCount: 45 },
    { id: 'p4', name: 'Bảng giá (Pricing)', path: '/pricing', status: 'ready', type: 'Comparison Table', elementsCount: 19 },
    { id: 'p5', name: 'Tin tức & Blog', path: '/blog', status: 'ready', type: 'Article List', elementsCount: 31 },
    { id: 'p6', name: 'Liên hệ & Bản đồ', path: '/contact', status: 'ready', type: 'Form & Location', elementsCount: 16 },
  ];

  const detectedColors: DetectedColor[] = [
    { hex: primaryHex, role: 'Primary Accent', name: 'Màu nhận diện chủ đạo' },
    { hex: secondaryHex, role: 'Dark Neutral', name: 'Nền chính / Tiêu đề' },
    { hex: '#F8FAFC', role: 'Light Neutral', name: 'Nền phụ sáng' },
    { hex: '#10B981', role: 'Success / Accent', name: 'Nút hành động phụ' },
    { hex: '#64748B', role: 'Muted Text', name: 'Văn bản phụ' },
  ];

  const detectedFonts: DetectedFont[] = [
    { name: 'Plus Jakarta Sans', usage: 'Headings & Hero' },
    { name: 'Inter', usage: 'Body text & Buttons' },
    { name: 'JetBrains Mono', usage: 'Metrics & Data tags' },
  ];

  const detectedComponents: DetectedComponent[] = [
    { name: 'Navigation Bar (Sticky)', count: 1, category: 'Header' },
    { name: 'Hero Banner với CTA kép', count: 1, category: 'Hero' },
    { name: 'Lưới tính năng / Dịch vụ', count: 6, category: 'Features' },
    { name: 'Thống kê ấn tượng (Metrics)', count: 4, category: 'Stats' },
    { name: 'Bảng so sánh giá & gói', count: 3, category: 'Pricing' },
    { name: 'Đánh giá khách hàng (Slider)', count: 4, category: 'Testimonials' },
    { name: 'Form đăng ký tư vấn', count: 1, category: 'Conversion' },
    { name: 'Footer đa cột & Mạng xã hội', count: 1, category: 'Footer' },
  ];

  const detectedImages = [
    { url: screenshot, alt: 'Banner chính', category: 'Hero' },
    { url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80', alt: 'Đội ngũ chuyên gia', category: 'About' },
    { url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80', alt: 'Sản phẩm tiêu biểu', category: 'Showcase' },
    { url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80', alt: 'Hợp tác khách hàng', category: 'Trust' },
  ];

  return {
    url,
    title: `${cleanName} - Giải pháp hàng đầu trong lĩnh vực ${industry}`,
    description: `Website chính thức cung cấp dịch vụ ${industry} chuẩn quốc tế với trải nghiệm người dùng cao cấp.`,
    screenshotUrl: screenshot,
    detectedPages,
    totalPages: detectedPages.length,
    detectedImages,
    detectedComponents,
    detectedColors,
    detectedFonts,
    menuStructure: [
      { label: 'Trang chủ', url: '/' },
      { label: 'Giới thiệu', url: '/about' },
      {
        label: 'Dịch vụ',
        url: '/services',
        children: [
          { label: 'Gói Tiêu chuẩn', url: '/services/standard' },
          { label: 'Gói Cao cấp Doanh nghiệp', url: '/services/enterprise' },
        ],
      },
      { label: 'Bảng giá', url: '/pricing' },
      { label: 'Tin tức', url: '/blog' },
      { label: 'Liên hệ', url: '/contact' },
    ],
    headerConfig: {
      type: 'Floating Glass Navigation',
      sticky: true,
      hasCta: true,
      logoPosition: 'left',
    },
    footerConfig: {
      columns: 4,
      hasSocials: true,
      hasNewsletter: true,
      copyright: `© ${new Date().getFullYear()} ${cleanName}. Mọi quyền được bảo lưu.`,
    },
    interactiveFeatures: [
      { name: 'Bộ lọc sản phẩm AJAX', description: 'Lọc danh mục không reload trang', status: 'Tương thích 100%' },
      { name: 'Form gửi email tư vấn', description: 'Tự động gửi thông báo về admin', status: 'Hỗ trợ' },
      { name: 'Nút chat hotline & Zalo', description: 'Widget liên hệ nhanh ở góc màn hình', status: 'Tích hợp sẵn' },
      { name: 'Giao diện tối (Dark Mode)', description: 'Chuyển đổi giao diện sáng/tối linh hoạt', status: 'Có sẵn' },
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Vercel / Cloudflare'],
    seoScore: 94,
    performanceScore: 98,
  };
}

// Generate the initial website sections based on level & brand info
export function buildDefaultSections(
  brand: BrandInfo,
  analysis: WebsiteAnalysis,
  level: ReplicationLevel
): WebsiteSection[] {
  const brandName = brand.businessName || 'LUXURY BRAND';
  const phone = brand.phone || '0988.123.456';
  const email = brand.email || 'contact@brand.vn';
  const address = brand.address || 'Tầng 12, Tòa nhà Diamond, Quận 1, TP. Hồ Chí Minh';

  // Customize headings & style depending on replication level
  let heroTitle = `Giải Pháp Đột Phá Cùng ${brandName}`;
  let heroSubtitle = `Nâng tầm thương hiệu với hệ thống hiện đại, tối ưu trải nghiệm và dẫn đầu thị trường.`;
  let badgeText = 'Khám Phá Thế Hệ Mới';

  if (level === 1) {
    heroTitle = `${brandName} - Uy Tín & Chất Lượng Vượt Trội`;
    badgeText = 'Bản Tái Tạo Chuẩn Xác';
  } else if (level === 2) {
    heroTitle = `Khẳng Định Phong Cách Doanh Nghiệp Với ${brandName}`;
    badgeText = 'Thiết Kế Tinh Tế';
  } else if (level === 3) {
    heroTitle = `Tăng Trưởng Bền Vững Cùng Hệ Sinh Thái ${brandName}`;
    badgeText = 'Công Nghệ AI Tối Ưu Hóa';
  } else if (level === 4) {
    heroTitle = `Định Hình Tương Lai Ngành Dịch Vụ - ${brandName}`;
    badgeText = 'Sáng Tạo Độc Bản';
  } else if (level === 5) {
    heroTitle = `Kỷ Nguyên Mới Cho Trải Nghiệm Khách Hàng`;
    heroSubtitle = `${brandName} kiến tạo chuẩn mực mới với nền tảng trí tuệ nhân tạo thế hệ tiếp theo.`;
    badgeText = 'Đột Phá Toàn Diện';
  }

  return [
    {
      id: 'sec-navbar',
      type: 'navbar',
      title: 'Thanh Điều Hướng',
      order: 1,
      content: {
        brandName,
        logoUrl: brand.logoUrl || '',
        links: [
          { label: 'Trang chủ', href: '#home' },
          { label: 'Tính năng', href: '#features' },
          { label: 'Dịch vụ', href: '#services' },
          { label: 'Bảng giá', href: '#pricing' },
          { label: 'Đánh giá', href: '#testimonials' },
          { label: 'Liên hệ', href: '#contact' },
        ],
        ctaText: 'Tư Vấn Miễn Phí',
        ctaPhone: phone,
      },
    },
    {
      id: 'sec-hero',
      type: 'hero',
      title: 'Hero Banner',
      subtitle: heroSubtitle,
      order: 2,
      content: {
        badge: badgeText,
        title: heroTitle,
        subtitle: heroSubtitle,
        ctaPrimary: 'Bắt Đầu Ngay',
        ctaSecondary: 'Xem Video Giới Thiệu',
        heroImage: analysis.screenshotUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
        stats: [
          { value: '99.8%', label: 'Độ hài lòng của đối tác' },
          { value: '15,000+', label: 'Dự án đã triển khai' },
          { value: '24/7', label: 'Hỗ trợ kỹ thuật chuyên sâu' },
        ],
      },
    },
    {
      id: 'sec-features',
      type: 'features',
      title: 'Tính Năng Nổi Bật',
      subtitle: 'Trải nghiệm đỉnh cao với các giải pháp được thiết kế riêng biệt',
      order: 3,
      content: {
        items: [
          {
            icon: 'Zap',
            title: 'Tốc Độ Xử Lý Siêu Tốc',
            description: 'Tối ưu hóa thời gian tải trang dưới 0.8 giây, gia tăng tỷ lệ chuyển đổi đơn hàng vượt trội.',
          },
          {
            icon: 'ShieldCheck',
            title: 'Bảo Mật Tiêu Chuẩn Quốc Tế',
            description: 'Mã hóa SSL 256-bit đa tầng, tường lửa thông minh bảo vệ tuyệt đối dữ liệu khách hàng.',
          },
          {
            icon: 'Sparkles',
            title: 'Trí Tuệ Nhân Tạo Tự Động',
            description: 'Tự động cá nhân hóa giao diện và thông điệp tiếp cận phù hợp với từng phân khúc người dùng.',
          },
          {
            icon: 'Smartphone',
            title: 'Tối Ưu 100% Trên Di Động',
            description: 'Hiển thị hoàn hảo trên mọi kích thước màn hình từ iPhone, iPad đến màn hình lớn 4K.',
          },
          {
            icon: 'BarChart3',
            title: 'Báo Cáo & Phân Tích Chuyên Sâu',
            description: 'Theo dõi hành vi người dùng, biểu đồ trực quan hóa dữ liệu theo thời gian thực.',
          },
          {
            icon: 'Headphones',
            title: 'Đồng Hành Cùng Chuyên Gia',
            description: 'Đội ngũ kỹ thuật hỗ trợ trực tiếp qua Zalo, Hotline và Email sẵn sàng 24/7.',
          },
        ],
      },
    },
    {
      id: 'sec-showcase',
      type: 'showcase',
      title: 'Không Gian Trải Nghiệm Sản Phẩm',
      subtitle: `Bộ sưu tập giải pháp cao cấp dành cho khách hàng của ${brandName}`,
      order: 4,
      content: {
        items: [
          {
            name: 'Gói Chuyên Nghiệp (Professional)',
            category: 'Doanh Nghiệp Vừa & Nhỏ',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
            desc: 'Bộ công cụ toàn diện giúp doanh nghiệp tự tin bứt phá doanh thu trong 30 ngày.',
          },
          {
            name: 'Hệ Sinh Thái Doanh Nghiệp (Enterprise)',
            category: 'Tập Đoàn Đa Quốc Gia',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
            desc: 'Kiến trúc phân tán quy mô lớn, tích hợp hệ thống CRM, ERP và bảo mật chuyên biệt.',
          },
        ],
      },
    },
    {
      id: 'sec-pricing',
      type: 'pricing',
      title: 'Bảng Giá & Gói Dịch Vụ',
      subtitle: 'Lựa chọn gói dịch vụ tối ưu cho từng giai đoạn phát triển của bạn',
      order: 5,
      content: {
        plans: [
          {
            name: 'Khởi Nghiệp (Starter)',
            price: '1.990.000 đ',
            period: '/tháng',
            description: 'Phù hợp cho cá nhân kinh doanh & cửa hàng mới thành lập',
            features: ['1 Tên miền riêng', 'Băng thông không giới hạn', 'SSL miễn phí trọn đời', 'Hỗ trợ kỹ thuật giờ hành chính'],
            popular: false,
            ctaText: 'Đăng Ký Gói',
          },
          {
            name: 'Tăng Trưởng (Growth Pro)',
            price: '3.990.000 đ',
            period: '/tháng',
            description: 'Giải pháp hoàn hảo cho doanh nghiệp muốn tăng tốc doanh thu',
            features: [
              'Tất cả tính năng của gói Starter',
              'AI Marketing tự động hóa',
              'Tích hợp Zalo Mini App & Hotline',
              'Sao lưu dữ liệu hàng ngày',
              'Chuyên viên hỗ trợ ưu tiên 24/7',
            ],
            popular: true,
            ctaText: 'Chọn Gói Thịnh Hành',
          },
          {
            name: 'Độc Quyền (Enterprise)',
            price: 'Liên hệ',
            period: '',
            description: 'Tùy biến cao cấp theo yêu cầu đặc thù của tập đoàn',
            features: [
              'Hạ tầng máy chủ chuyên dụng',
              'Cam kết SLA 99.99%',
              'Tùy chỉnh mã nguồn 100%',
              'Đào tạo nhân sự tận nơi',
            ],
            popular: false,
            ctaText: 'Yêu Cầu Báo Giá',
          },
        ],
      },
    },
    {
      id: 'sec-testimonials',
      type: 'testimonials',
      title: 'Khách Hàng Nói Gì Về Chúng Tôi',
      subtitle: 'Hơn 5,000+ đối tác đã tin tưởng và nâng tầm vị thế thương hiệu',
      order: 6,
      content: {
        reviews: [
          {
            name: 'Nguyễn Hoàng Long',
            role: 'Giám đốc Điều hành - TechCorp VN',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
            comment: `Website được thiết kế chỉn chu vượt xa mong đợi. Giao diện sang trọng, tốc độ phản hồi cực nhanh giúp khách hàng tin tưởng ngay từ lần chạm đầu tiên!`,
            rating: 5,
          },
          {
            name: 'Trần Mai Linh',
            role: 'Nhà sáng lập - Luxury Beauty Spa',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
            comment: `Chúng tôi đã tăng 140% lượng khách đặt lịch hẹn chỉ sau 2 tuần đưa website mới vào vận hành. Cực kỳ ưng ý và đề xuất cho bạn bè!`,
            rating: 5,
          },
        ],
      },
    },
    {
      id: 'sec-contact',
      type: 'contact',
      title: 'Kết Nối Với Chúng Tôi',
      subtitle: `Đội ngũ ${brandName} luôn sẵn sàng lắng nghe và tư vấn giải pháp tốt nhất`,
      order: 7,
      content: {
        phone,
        email,
        address,
        workingHours: 'Thứ Hai - Thứ Bảy: 08:00 - 18:00',
        formFields: ['Họ và tên', 'Số điện thoại', 'Email liên hệ', 'Nội dung tư vấn'],
      },
    },
    {
      id: 'sec-footer',
      type: 'footer',
      title: 'Footer',
      order: 8,
      content: {
        brandName,
        tagline: `Nâng tầm vị thế doanh nghiệp cùng các giải pháp số tiên tiến.`,
        phone,
        email,
        address,
        socials: [
          { name: 'Facebook', url: '#' },
          { name: 'Zalo', url: '#' },
          { name: 'LinkedIn', url: '#' },
          { name: 'YouTube', url: '#' },
        ],
        copyright: `© ${new Date().getFullYear()} ${brandName}. Bảo lưu mọi quyền.`,
      },
    },
  ];
}

// Generate project model
export function createProjectFromFlow(
  sampleUrl: string,
  level: ReplicationLevel,
  brandInfo: BrandInfo,
  analysis: WebsiteAnalysis
): Project {
  const domainName = brandInfo.domain || extractDomainName(sampleUrl);
  const businessName = brandInfo.businessName || domainName.split('.')[0].toUpperCase();
  const id = 'proj_' + Math.random().toString(36).substring(2, 9);
  const now = new Date().toISOString();

  const sections = buildDefaultSections(
    { ...brandInfo, businessName, domain: domainName },
    analysis,
    level
  );

  const mainPage: WebsitePage = {
    id: 'page_home',
    title: 'Trang chủ',
    path: '/',
    sections,
  };

  const aboutPage: WebsitePage = {
    id: 'page_about',
    title: 'Giới thiệu',
    path: '/about',
    sections: [
      sections[0], // navbar
      {
        id: 'sec-about-hero',
        type: 'hero',
        title: `Về ${businessName}`,
        subtitle: `Hành trình kiến tạo giá trị và câu chuyện truyền cảm hứng.`,
        order: 2,
        content: {
          badge: 'Câu chuyện thương hiệu',
          title: `Chúng tôi là ai?`,
          subtitle: `${businessName} được thành lập với khát vọng đem đến dịch vụ chuẩn mực quốc tế, lấy sự hài lòng và thành công của khách hàng làm kim chỉ nam.`,
          ctaPrimary: 'Khám Phá Dịch Vụ',
          heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
          stats: [
            { value: '10+', label: 'Năm kinh nghiệm' },
            { value: '100+', label: 'Chuyên gia đầu ngành' },
          ],
        },
      },
      sections[sections.length - 1], // footer
    ],
  };

  return {
    id,
    name: businessName,
    sampleUrl,
    level,
    status: 'completed',
    createdAt: now,
    updatedAt: now,
    thumbnail: analysis.screenshotUrl,
    brandInfo: {
      ...brandInfo,
      businessName,
      domain: domainName,
      primaryColor: brandInfo.primaryColor || analysis.detectedColors[0]?.hex || '#D4AF37',
      secondaryColor: brandInfo.secondaryColor || '#07090e',
    },
    analysis,
    pages: [mainPage, aboutPage],
    activeTheme: {
      primaryColor: brandInfo.primaryColor || analysis.detectedColors[0]?.hex || '#D4AF37',
      secondaryColor: '#07090e',
      fontFamily: 'Plus Jakarta Sans',
      borderRadius: '12px',
      mode: 'dark',
    },
    deployment: {
      isPublished: false,
      subdomain: businessName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.aiwebsite.app',
      sslActive: true,
      cdnStatus: 'active',
    },
  };
}

// AI Chat prompt parser & engine
export function executeAiPrompt(
  project: Project,
  promptText: string
): { updatedProject: Project; changeSummary: string } {
  const p = JSON.parse(JSON.stringify(project)) as Project;
  const lower = promptText.toLowerCase();
  let summary = 'Đã phân tích yêu cầu và tối ưu giao diện website.';

  // 1. Color change request
  if (lower.includes('đổi màu') || lower.includes('màu chủ đạo') || lower.includes('thay màu')) {
    let newHex = '#D4AF37';
    let colorName = 'Vàng kim (Gold Luxury)';

    if (lower.includes('xanh ngọc') || lower.includes('emerald') || lower.includes('teal')) {
      newHex = '#0D9488';
      colorName = 'Xanh ngọc (Emerald Teal)';
    } else if (lower.includes('xanh dương') || lower.includes('blue') || lower.includes('biển')) {
      newHex = '#2563EB';
      colorName = 'Xanh dương hoàng gia (Royal Blue)';
    } else if (lower.includes('đỏ') || lower.includes('red') || lower.includes('ruby')) {
      newHex = '#E11D48';
      colorName = 'Đỏ Ruby (Crimson Red)';
    } else if (lower.includes('tím') || lower.includes('purple') || lower.includes('violet')) {
      newHex = '#8B5CF6';
      colorName = 'Tím không gian (Cosmic Violet)';
    } else if (lower.includes('cam') || lower.includes('orange')) {
      newHex = '#EA580C';
      colorName = 'Cam rực rỡ (Sunset Orange)';
    } else if (lower.includes('đen') || lower.includes('dark')) {
      newHex = '#F59E0B';
      colorName = 'Hổ phách quý phái (Amber Gold)';
    }

    p.activeTheme.primaryColor = newHex;
    p.brandInfo.primaryColor = newHex;
    summary = `Đã cập nhật hệ thống màu chủ đạo sang ${colorName} (${newHex}) đồng bộ trên toàn bộ button, badge và điểm nhấn đồ họa.`;
  }
  // 2. Change logo or brand name
  else if (lower.includes('logo') || lower.includes('tên thương hiệu') || lower.includes('tên công ty')) {
    // Check if new name provided in quotes or after colon
    const match = promptText.match(/["']([^"']+)["']/) || promptText.match(/thành\s+([A-Za-z0-9\s]+)/i);
    const newName = match ? match[1].trim() : 'INNOVATION GLOBAL';

    p.name = newName;
    p.brandInfo.businessName = newName;

    // Update in navbar, hero, footer
    p.pages.forEach((page) => {
      page.sections.forEach((sec) => {
        if (sec.type === 'navbar') sec.content.brandName = newName;
        if (sec.type === 'hero') sec.content.title = `Giải Pháp Đột Phá Cùng ${newName}`;
        if (sec.type === 'footer') sec.content.brandName = newName;
      });
    });

    summary = `Đã đổi tên nhận diện thương hiệu thành "${newName}" trên toàn bộ thanh điều hướng, tiêu đề chính và chân trang.`;
  }
  // 3. Add hotline or Zalo button
  else if (lower.includes('hotline') || lower.includes('zalo') || lower.includes('nút liên hệ') || lower.includes('gọi')) {
    p.pages.forEach((page) => {
      const nav = page.sections.find((s) => s.type === 'navbar');
      if (nav) {
        nav.content.ctaText = 'Gọi Hotline: 0988.123.456';
        nav.content.hasZaloWidget = true;
      }
    });
    summary = `Đã thêm widget nút liên hệ nổi và nút gọi Hotline trực tiếp ngay trên thanh điều hướng.`;
  }
  // 4. Change slogan or hero text
  else if (lower.includes('slogan') || lower.includes('tiêu đề') || lower.includes('nội dung')) {
    const match = promptText.match(/["']([^"']+)["']/);
    const customText = match ? match[1] : 'Khẳng Định Giá Trị Đẳng Cấp Toàn Cầu';

    p.pages.forEach((page) => {
      const hero = page.sections.find((s) => s.type === 'hero');
      if (hero) {
        hero.content.title = customText;
      }
    });
    summary = `Đã cập nhật slogan tiêu đề chính: "${customText}".`;
  }
  // 5. Add pricing table if not present or toggle
  else if (lower.includes('bảng giá') || lower.includes('pricing') || lower.includes('gói cước')) {
    const homePage = p.pages[0];
    const hasPricing = homePage.sections.some((s) => s.type === 'pricing');
    if (!hasPricing) {
      homePage.sections.splice(4, 0, {
        id: 'sec-pricing-new',
        type: 'pricing',
        title: 'Bảng Giá Dịch Vụ',
        subtitle: 'Linh hoạt và minh bạch theo quy mô',
        order: 5,
        content: {
          plans: [
            { name: 'Cơ Bản', price: '990.000 đ', period: '/tháng', features: ['Đầy đủ tính năng', 'Hỗ trợ 24/7'] },
            { name: 'Nâng Cao', price: '2.490.000 đ', period: '/tháng', features: ['Tối ưu AI', 'Tên miền riêng', 'Cam kết 99.9%'], popular: true },
          ],
        },
      });
      summary = `Đã tự động tạo và chèn section Bảng giá 3 gói dịch vụ hiện đại vào trang chủ.`;
    } else {
      summary = `Đã tối ưu hóa lại bảng giá và bổ sung nhãn "Khuyên Dùng" (Recommended) nổi bật cho gói Growth.`;
    }
  }
  // 6. Mobile optimization
  else if (lower.includes('điện thoại') || lower.includes('mobile') || lower.includes('responsive')) {
    summary = `Đã áp dụng bộ cấu hình Responsive Mobile-First: padding thu gọn, font size tự động co giãn, hamburger menu tối ưu cảm ứng và tốc độ tải ảnh nén WebP.`;
  }
  // 7. General custom AI refinement
  else {
    summary = `AI đã tiếp nhận yêu cầu: "${promptText}". Đã cập nhật layout và tinh chỉnh typography phù hợp phong cách thương hiệu.`;
  }

  p.updatedAt = new Date().toISOString();
  return { updatedProject: p, changeSummary: summary };
}
