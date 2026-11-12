import { Project } from '../types';
import { createProjectFromFlow, analyzeWebsiteBlueprint } from '../utils/engine';

export function getInitialProjects(): Project[] {
  // Project 1: VinFast
  const analysis1 = analyzeWebsiteBlueprint('https://vinfastauto.com', 'VINFAST MOTORS');
  const project1 = createProjectFromFlow(
    'https://vinfastauto.com',
    3,
    {
      businessName: 'VINFAST E-MOBILITY',
      domain: 'vinfast-ev.vn',
      email: 'contact@vinfast-ev.vn',
      phone: '1900 23 23 89',
      address: 'Khu công nghiệp Đình Vũ, Cát Hải, Hải Phòng',
      logoUrl: '',
      primaryColor: '#D4AF37',
      secondaryColor: '#0A0E1A',
      industry: 'Xe điện thông minh',
      additionalRequirements: 'Tập trung tính năng sạc pin toàn cầu và phong cách sang trọng',
    },
    analysis1
  );
  project1.id = 'proj_vinfast';
  project1.createdAt = new Date(Date.now() - 2 * 86400000).toISOString();
  project1.updatedAt = new Date(Date.now() - 3600000).toISOString();

  // Project 2: Highlands
  const analysis2 = analyzeWebsiteBlueprint('https://highlandscoffee.com.vn', 'HIGHLANDS HERITAGE');
  const project2 = createProjectFromFlow(
    'https://highlandscoffee.com.vn',
    2,
    {
      businessName: 'HIGHLANDS HERITAGE COFFEE',
      domain: 'highlands-heritage.vn',
      email: 'cskh@highlandsheritage.vn',
      phone: '1900 1755',
      address: '135 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. HCM',
      logoUrl: '',
      primaryColor: '#B45309',
      secondaryColor: '#3F1A02',
      industry: 'Chuỗi Cà Phê & Bánh',
      additionalRequirements: 'Giao diện ấm cúng, đậm bản sắc hạt cà phê Robusta Việt Nam',
    },
    analysis2
  );
  project2.id = 'proj_highlands';
  project2.createdAt = new Date(Date.now() - 5 * 86400000).toISOString();
  project2.updatedAt = new Date(Date.now() - 18000000).toISOString();

  // Project 3: Tech SaaS
  const analysis3 = analyzeWebsiteBlueprint('https://stripe.com', 'NEXUS PAYMENTS');
  const project3 = createProjectFromFlow(
    'https://stripe.com',
    4,
    {
      businessName: 'NEXUS CLOUD PAY',
      domain: 'nexuspay.io',
      email: 'support@nexuspay.io',
      phone: '+84 28 7300 8899',
      address: 'Tòa nhà Landmark 81, Vinhomes Central Park, Bình Thạnh, TP. HCM',
      logoUrl: '',
      primaryColor: '#6366F1',
      secondaryColor: '#0B0F19',
      industry: 'Cổng thanh toán điện tử',
      additionalRequirements: 'Thiết kế giao diện dark mode cao cấp, tỷ lệ chuyển đổi cao',
    },
    analysis3
  );
  project3.id = 'proj_nexus';
  project3.createdAt = new Date(Date.now() - 10 * 86400000).toISOString();
  project3.updatedAt = new Date(Date.now() - 86400000).toISOString();

  return [project1, project2, project3];
}
