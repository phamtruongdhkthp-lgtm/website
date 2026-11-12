import { BrandInfo } from '../types';

export interface EssentialsPreset {
  id: string;
  name: string;
  industry: string;
  badge: string;
  data: Partial<BrandInfo>;
}

export const ESSENTIALS_PRESETS: EssentialsPreset[] = [
  {
    id: 'ev_tech',
    name: 'Xe Điện & Công Nghệ Thông Minh',
    industry: 'Ô tô & Năng lượng xanh',
    badge: 'Tech & Mobility',
    data: {
      businessName: 'VINFAST E-MOBILITY VIỆT NAM',
      tagline: 'Kiến Tạo Tương Lai Giao Thông Xanh & Thông Minh',
      mission: 'Cung cấp giải pháp di chuyển bằng năng lượng điện bền vững, công nghệ tự hành tiêu chuẩn quốc tế và trải nghiệm khách hàng đẳng cấp.',
      industry: 'Xe điện thông minh',
      domain: 'vinfast-emobility.vn',
      phone: '1900 23 23 89',
      zaloNumber: '0988 123 456',
      email: 'cskh@vinfast-emobility.vn',
      address: 'Khu công nghiệp Đình Vũ, Cát Hải, TP. Hải Phòng',
      workingHours: 'Thứ Hai - Chủ Nhật: 08:00 - 20:00',
      primaryCta: 'Đăng Ký Lái Thử Miễn Phí',
      primaryColor: '#D4AF37',
      secondaryColor: '#0A0E1A',
      toneOfVoice: 'luxury',
      colorMode: 'dark',
      keyStrengths: [
        'Bảo hành chính hãng 10 năm hoặc 200.000 km',
        'Mạng lưới 150.000 cổng sạc phủ sóng 63 tỉnh thành',
        'Hỗ trợ cứu hộ 24/7 và dịch vụ sửa chữa lưu động Mobile Service',
      ],
      coreProducts: [
        {
          name: 'VF 7 Plus - SUV Điện Đột Phá',
          price: '850.000.000 đ',
          description: 'Công suất 349 mã lực, dẫn động AWD, quãng đường 431 km/lần sạc.',
        },
        {
          name: 'VF 9 - SUV 7 Chỗ Hạng Sang',
          price: '1.490.000.000 đ',
          description: 'Ghế cơ trưởng massage, màn hình giải trí 15.6 inch, gói ADAS cấp độ 2.',
        },
        {
          name: 'Trạm Sạc Siêu Nhanh 250kW',
          price: 'Tích hợp sẵn',
          description: 'Sạc 10% - 70% chỉ trong 24 phút tại mọi trạm cao tốc toàn quốc.',
        },
      ],
      socialLinks: {
        facebook: 'https://facebook.com/vinfastvn',
        zalo: 'https://zalo.me/0988123456',
        tiktok: 'https://tiktok.com/@vinfastofficial',
        youtube: 'https://youtube.com/vinfast',
      },
      targetPages: ['Trang chủ', 'Dòng xe VF', 'Hệ thống trạm sạc', 'Bảng giá & Ưu đãi', 'Đăng ký lái thử', 'Hệ thống showroom'],
      additionalRequirements: 'Tập trung hình ảnh sắc nét, bảng so sánh thông số kỹ thuật rõ ràng và nút đăng ký lái thử nổi bật.',
    },
  },
  {
    id: 'fnb_heritage',
    name: 'Chuỗi Cà Phê & Ẩm Thực Cao Cấp',
    industry: 'F&B & Dịch vụ nhà hàng',
    badge: 'F&B & Coffee',
    data: {
      businessName: 'HIGHLANDS HERITAGE COFFEE',
      tagline: 'Khởi Nguồn Từ Tình Yêu Cà Phê Việt Nam Hào Sảng',
      mission: 'Gìn giữ tinh hoa hạt cà phê Robusta và Arabica Tây Nguyên, kết hợp không gian thưởng thức hiện đại đậm bản sắc văn hóa Việt.',
      industry: 'F&B & Chuỗi Cà Phê',
      domain: 'highlands-heritage.vn',
      phone: '1900 1755',
      zaloNumber: '0901 888 999',
      email: 'cskh@highlandsheritage.vn',
      address: '135 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
      workingHours: 'Thứ Hai - Chủ Nhật: 07:00 - 23:00',
      primaryCta: 'Đặt Món & Giao Tận Nơi',
      primaryColor: '#B45309',
      secondaryColor: '#3F1A02',
      toneOfVoice: 'friendly',
      colorMode: 'dark',
      keyStrengths: [
        '100% hạt cà phê mộc hái chín từ cao nguyên Buôn Ma Thuột',
        'Giao hàng hỏa tốc trong 30 phút giữ trọn độ nóng và hương vị',
        'Không gian máy lạnh sang trọng, wifi tốc độ cao làm việc',
      ],
      coreProducts: [
        {
          name: 'Phin Sữa Đá Di Sản',
          price: '39.000 đ',
          description: 'Cà phê rang xay truyền thống nhỏ giọt, hòa quyện sữa đặc thơm béo.',
        },
        {
          name: 'Trà Sen Vàng Hạt Sen Tươi',
          price: '55.000 đ',
          description: 'Trà Oolong thanh mát, củ năng giòn ngọt và hạt sen bùi béo nấu đường phèn.',
        },
        {
          name: 'Freeze Trà Xanh Thạch',
          price: '65.000 đ',
          description: 'Matcha đá xay cao cấp phủ kem tươi béo ngậy kèm thạch giòn sần sật.',
        },
      ],
      socialLinks: {
        facebook: 'https://facebook.com/highlandsheritage',
        zalo: 'https://zalo.me/0901888999',
        tiktok: 'https://tiktok.com/@highlandscoffee',
      },
      targetPages: ['Trang chủ', 'Thực đơn đồ uống', 'Câu chuyện hạt cà phê', 'Hệ thống cửa hàng', 'Tin tức & Khuyến mãi', 'Liên hệ nhượng quyền'],
      additionalRequirements: 'Giao diện ấm áp tone màu nâu cà phê, thực đơn trực quan, nút đặt hàng Delivery nhanh.',
    },
  },
  {
    id: 'spa_luxury',
    name: 'Viện Thẩm Mỹ & Spa Quốc Tế',
    industry: 'Làm đẹp & Sức khỏe',
    badge: 'Beauty & Wellness',
    data: {
      businessName: 'AURA LUXURY BEAUTY CLINIC',
      tagline: 'Khơi Dậy Nhan Sắc Hoàn Mỹ Tự Nhiên Chuẩn Y Khoa',
      mission: 'Đem đến các liệu trình trẻ hóa da, chăm sóc vóc dáng chuyên sâu ứng dụng công nghệ chuyển giao từ Thụy Sĩ và Hoa Kỳ.',
      industry: 'Thẩm mỹ & Spa',
      domain: 'auraluxury.vn',
      phone: '0988 889 999',
      zaloNumber: '0988 889 999',
      email: 'tuvan@auraluxury.vn',
      address: '72 Lê Thánh Tôn, Bến Nghé, Quận 1, TP. Hồ Chí Minh',
      workingHours: 'Thứ Hai - Chủ Nhật: 09:00 - 21:00',
      primaryCta: 'Đặt Lịch Soi Da 0 Đồng',
      primaryColor: '#D4AF37',
      secondaryColor: '#1A1528',
      toneOfVoice: 'luxury',
      colorMode: 'dark',
      keyStrengths: [
        '100% Bác sĩ Da liễu & Chuyên gia tu nghiệp quốc tế',
        'Công nghệ nâng cơ Ultherapy & Thermage FLX nhập khẩu chính hãng',
        'Phòng dịch vụ VIP 1:1 vô khuẩn chuẩn y khoa',
      ],
      coreProducts: [
        {
          name: 'Trẻ Hóa Xóa Nhăn Căng Bóng Meso Nano',
          price: '2.500.000 đ',
          description: 'Cấy vi điểm tinh chất HA nguyên chất giúp da sáng mịn, se khít lỗ chân lông.',
        },
        {
          name: 'Nâng Cơ Trẻ Hóa 1 Lần Duy Nhất Hifu Pro',
          price: '8.900.000 đ',
          description: 'Kích thích tăng sinh collagen tầng sâu, tạo viền hàm V-line sắc nét không phẫu thuật.',
        },
        {
          name: 'Liệu Trình Trị Nám Chuyên Sâu Pico Laser',
          price: '4.200.000 đ',
          description: 'Xóa sạch nám mảng, tàn nhang và đồi mồi an toàn, không bong tróc nghỉ dưỡng.',
        },
      ],
      socialLinks: {
        facebook: 'https://facebook.com/auraluxuryclinic',
        zalo: 'https://zalo.me/0988889999',
        tiktok: 'https://tiktok.com/@aurabeauty',
      },
      targetPages: ['Trang chủ', 'Dịch vụ nổi bật', 'Hình ảnh thực tế trước/sau', 'Đội ngũ bác sĩ', 'Bảng giá dịch vụ', 'Đặt lịch hẹn'],
      additionalRequirements: 'Phong cách tối giản sang trọng, hình ảnh trước sau chuyên nghiệp, form đặt lịch tư vấn nhanh.',
    },
  },
  {
    id: 'saas_platform',
    name: 'Phần Mềm Quản Trị & Giải Pháp Số SaaS',
    industry: 'Công nghệ thông tin & FinTech',
    badge: 'Software & SaaS',
    data: {
      businessName: 'NEXUS CLOUD SOFTWARE',
      tagline: 'Tự Động Hóa Vận Hành & Tăng Trưởng Doanh Thu Bứt Phá',
      mission: 'Cung cấp nền tảng quản trị kinh doanh hợp nhất, tích hợp AI phân tích dữ liệu và tự động hóa quy trình cho doanh nghiệp vừa và nhỏ.',
      industry: 'Phần mềm & SaaS',
      domain: 'nexuscloud.io',
      phone: '028 7300 8899',
      zaloNumber: '0938 111 222',
      email: 'sales@nexuscloud.io',
      address: 'Tòa nhà Landmark 81, Vinhomes Central Park, Bình Thạnh, TP. HCM',
      workingHours: 'Thứ Hai - Thứ Sáu: 08:30 - 18:00 (Hỗ trợ kỹ thuật 24/7)',
      primaryCta: 'Dùng Thử Miễn Phí 14 Ngày',
      primaryColor: '#6366F1',
      secondaryColor: '#0B0F19',
      toneOfVoice: 'professional',
      colorMode: 'dark',
      keyStrengths: [
        'Triển khai tức thì chỉ sau 5 phút cấu hình, không cần lập trình',
        'Cam kết thời gian hoạt động hệ thống SLA 99.99%',
        'Tích hợp sẵn hơn 50 cổng thanh toán, hóa đơn điện tử và đơn vị vận chuyển',
      ],
      coreProducts: [
        {
          name: 'Gói Starter (Khởi Nghiệp)',
          price: '490.000 đ/tháng',
          description: 'Đầy đủ tính năng quản lý bán hàng, tồn kho và xuất hóa đơn điện tử.',
        },
        {
          name: 'Gói Growth AI (Tăng Trưởng)',
          price: '1.290.000 đ/tháng',
          description: 'Trí tuệ nhân tạo dự đoán xu hướng mua hàng, CRM đa kênh và Zalo Mini App.',
        },
        {
          name: 'Gói Enterprise (Doanh Nghiệp Lớn)',
          price: 'Liên hệ',
          description: 'Hạ tầng máy chủ chuyên biệt, tùy biến báo cáo BI theo yêu cầu, hỗ trợ tận nơi.',
        },
      ],
      socialLinks: {
        facebook: 'https://facebook.com/nexuscloud',
        zalo: 'https://zalo.me/0938111222',
        youtube: 'https://youtube.com/nexuscloud',
      },
      targetPages: ['Trang chủ', 'Tính năng', 'Giải pháp theo ngành', 'Bảng giá', 'Tài liệu API', 'Đăng ký dùng thử'],
      additionalRequirements: 'Giao diện dark mode chuẩn công nghệ cao, bảng giá so sánh rõ ràng, form đăng ký tài khoản nhanh.',
    },
  },
];

/**
 * Calculates completeness percentage for a BrandInfo object
 */
export function calculateEssentialsCompleteness(info: Partial<BrandInfo>): {
  percentage: number;
  completedCount: number;
  totalCount: number;
  missingItems: string[];
} {
  const fields: { key: keyof BrandInfo; label: string; isFilled: boolean }[] = [
    { key: 'businessName', label: 'Tên thương hiệu', isFilled: Boolean(info.businessName?.trim()) },
    { key: 'tagline', label: 'Slogan / Khẩu hiệu', isFilled: Boolean(info.tagline?.trim()) },
    { key: 'mission', label: 'Sứ mệnh / Giới thiệu', isFilled: Boolean(info.mission?.trim()) },
    { key: 'industry', label: 'Lĩnh vực kinh doanh', isFilled: Boolean(info.industry?.trim()) },
    { key: 'domain', label: 'Tên miền', isFilled: Boolean(info.domain?.trim()) },
    { key: 'phone', label: 'Số hotline', isFilled: Boolean(info.phone?.trim()) },
    { key: 'email', label: 'Email liên hệ', isFilled: Boolean(info.email?.trim()) },
    { key: 'address', label: 'Địa chỉ trụ sở', isFilled: Boolean(info.address?.trim()) },
    { key: 'primaryCta', label: 'Nút hành động chính (CTA)', isFilled: Boolean(info.primaryCta?.trim()) },
    { key: 'primaryColor', label: 'Màu sắc chủ đạo', isFilled: Boolean(info.primaryColor?.trim()) },
    { key: 'coreProducts', label: 'Sản phẩm / Dịch vụ chủ lực', isFilled: Boolean(info.coreProducts && info.coreProducts.length > 0) },
    { key: 'keyStrengths', label: 'Điểm mạnh cạnh tranh (USP)', isFilled: Boolean(info.keyStrengths && info.keyStrengths.length > 0) },
  ];

  const completed = fields.filter((f) => f.isFilled);
  const missing = fields.filter((f) => !f.isFilled).map((f) => f.label);
  const percentage = Math.round((completed.length / fields.length) * 100);

  return {
    percentage,
    completedCount: completed.length,
    totalCount: fields.length,
    missingItems: missing,
  };
}
