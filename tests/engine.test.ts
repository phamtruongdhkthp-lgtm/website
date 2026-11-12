import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { 
  validateWebsiteUrl, 
  extractDomainName, 
  analyzeWebsiteBlueprint, 
  executeAiPrompt,
  createProjectFromFlow
} from '../src/utils/engine.ts';

describe('Website Engine Pure Logic Tests', () => {
  test('validateWebsiteUrl handles clean and missing protocols', () => {
    const res1 = validateWebsiteUrl('vinfastauto.com');
    assert.equal(res1.isValid, true);
    assert.equal(res1.normalizedUrl, 'https://vinfastauto.com');

    const res2 = validateWebsiteUrl('https://stripe.com/docs');
    assert.equal(res2.isValid, true);
    assert.equal(res2.normalizedUrl, 'https://stripe.com/docs');

    const resInvalid = validateWebsiteUrl('not-a-domain');
    assert.equal(resInvalid.isValid, false);
    assert.ok(resInvalid.error);
  });

  test('extractDomainName strips www and protocols', () => {
    assert.equal(extractDomainName('https://www.apple.com/iphone'), 'apple.com');
    assert.equal(extractDomainName('highlands.com.vn'), 'highlands.com.vn');
  });

  test('analyzeWebsiteBlueprint detects pages, colors and fonts', () => {
    const blueprint = analyzeWebsiteBlueprint('https://stripe.com', 'STRIPE PAY');
    assert.ok(blueprint.totalPages >= 5);
    assert.ok(blueprint.detectedColors.length >= 3);
    assert.ok(blueprint.detectedFonts.length >= 2);
    assert.ok(blueprint.menuStructure.length > 0);
  });

  test('executeAiPrompt updates theme color on natural language prompt', () => {
    const blueprint = analyzeWebsiteBlueprint('https://example.com');
    const project = createProjectFromFlow('https://example.com', 3, {
      businessName: 'TEST CO',
      domain: 'test.vn',
      email: 'a@test.vn',
      phone: '0909090909',
      address: 'HN',
      logoUrl: '',
      primaryColor: '#D4AF37',
      secondaryColor: '#000000',
      industry: 'IT',
      additionalRequirements: '',
    }, blueprint);

    const { updatedProject, changeSummary } = executeAiPrompt(project, 'Đổi màu website sang xanh ngọc');
    assert.equal(updatedProject.activeTheme.primaryColor, '#0D9488');
    assert.ok(changeSummary.includes('Emerald Teal') || changeSummary.includes('Xanh ngọc'));
  });

  test('executeAiPrompt updates brand name on prompt', () => {
    const blueprint = analyzeWebsiteBlueprint('https://example.com');
    const project = createProjectFromFlow('https://example.com', 3, {
      businessName: 'OLD NAME',
      domain: 'old.vn',
      email: 'a@old.vn',
      phone: '0909090909',
      address: 'HN',
      logoUrl: '',
      primaryColor: '#D4AF37',
      secondaryColor: '#000000',
      industry: 'IT',
      additionalRequirements: '',
    }, blueprint);

    const { updatedProject } = executeAiPrompt(project, 'Đổi tên thương hiệu thành "VIETNAM LUXURY"');
    assert.equal(updatedProject.name, 'VIETNAM LUXURY');
    assert.equal(updatedProject.brandInfo.businessName, 'VIETNAM LUXURY');
  });

  test('calculateEssentialsCompleteness accurately measures percentage', async () => {
    const { calculateEssentialsCompleteness, ESSENTIALS_PRESETS } = await import('../src/data/websiteEssentialsPresets.ts');
    
    // Empty info
    const emptyResult = calculateEssentialsCompleteness({});
    assert.equal(emptyResult.percentage, 0);
    assert.ok(emptyResult.missingItems.length > 8);

    // Full preset
    const preset = ESSENTIALS_PRESETS[0];
    const fullResult = calculateEssentialsCompleteness(preset.data);
    assert.ok(fullResult.percentage >= 90);
    assert.equal(fullResult.completedCount >= 10, true);
  });

  test('buildDefaultSections incorporates tagline, primaryCta, products and USPs', async () => {
    const { buildDefaultSections } = await import('../src/utils/engine.ts');
    const blueprint = analyzeWebsiteBlueprint('https://example.com');
    const sections = buildDefaultSections(
      {
        businessName: 'VINFAST E-MOBILITY',
        tagline: 'Kỷ Nguyên Xe Điện',
        mission: 'Kiến tạo tương lai xanh bền vững.',
        domain: 'vinfast.vn',
        email: 'info@vinfast.vn',
        phone: '1900 2323',
        zaloNumber: '0988 888 888',
        address: 'Hải Phòng',
        logoUrl: '',
        primaryColor: '#D4AF37',
        secondaryColor: '#000000',
        industry: 'Xe điện',
        primaryCta: 'Đăng Ký Lái Thử',
        coreProducts: [
          { name: 'VF 7 Plus', price: '850.000.000 đ', description: 'SUV Thể Thao' }
        ],
        keyStrengths: [
          'Bảo hành 10 năm chính hãng',
          'Hệ thống 150.000 cổng sạc'
        ],
        additionalRequirements: '',
      },
      blueprint,
      3
    );

    const hero = sections.find((s) => s.type === 'hero');
    assert.ok(hero?.content.title.includes('Kỷ Nguyên Xe Điện'));
    assert.equal(hero?.content.ctaPrimary, 'Đăng Ký Lái Thử');

    const navbar = sections.find((s) => s.type === 'navbar');
    assert.equal(navbar?.content.ctaText, 'Đăng Ký Lái Thử');
    assert.equal(navbar?.content.hasZaloWidget, true);

    const features = sections.find((s) => s.type === 'features');
    assert.ok(features?.content.items.some((i: any) => i.title.includes('Bảo hành 10 năm')));

    const pricing = sections.find((s) => s.type === 'pricing');
    assert.ok(pricing?.content.plans.some((p: any) => p.name === 'VF 7 Plus'));
  });
});

