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
});
