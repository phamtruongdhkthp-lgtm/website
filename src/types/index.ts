export type ReplicationLevel = 1 | 2 | 3 | 4 | 5;

export interface LevelInfo {
  level: ReplicationLevel;
  title: string;
  badge: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  recommended?: boolean;
}

export interface CoreProductItem {
  name: string;
  price: string;
  description: string;
}

export interface BrandInfo {
  businessName: string;
  tagline?: string;
  mission?: string;
  domain: string;
  email: string;
  phone: string;
  zaloNumber?: string;
  address: string;
  workingHours?: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  industry: string;
  toneOfVoice?: string;
  colorMode?: 'dark' | 'light';
  primaryCta?: string;
  coreProducts?: CoreProductItem[];
  keyStrengths?: string[];
  targetPages?: string[];
  socialLinks?: {
    facebook?: string;
    zalo?: string;
    tiktok?: string;
    youtube?: string;
  };
  additionalRequirements: string;
}

export interface DetectedPage {
  id: string;
  name: string;
  path: string;
  status: 'ready' | 'pending' | 'warning';
  type: string;
  elementsCount: number;
}

export interface DetectedImage {
  url: string;
  alt: string;
  category: string;
}

export interface DetectedComponent {
  name: string;
  count: number;
  category: string;
}

export interface DetectedColor {
  hex: string;
  role: string;
  name: string;
}

export interface DetectedFont {
  name: string;
  usage: string;
}

export interface MenuItem {
  label: string;
  url: string;
  children?: MenuItem[];
}

export interface WebsiteAnalysis {
  url: string;
  title: string;
  description: string;
  screenshotUrl: string;
  detectedPages: DetectedPage[];
  totalPages: number;
  detectedImages: DetectedImage[];
  detectedComponents: DetectedComponent[];
  detectedColors: DetectedColor[];
  detectedFonts: DetectedFont[];
  menuStructure: MenuItem[];
  headerConfig: {
    type: string;
    sticky: boolean;
    hasCta: boolean;
    logoPosition: string;
  };
  footerConfig: {
    columns: number;
    hasSocials: boolean;
    hasNewsletter: boolean;
    copyright: string;
  };
  interactiveFeatures: Array<{
    name: string;
    description: string;
    status: string;
  }>;
  techStack: string[];
  seoScore: number;
  performanceScore: number;
}

export interface WebsiteSection {
  id: string;
  type: 'navbar' | 'hero' | 'features' | 'showcase' | 'stats' | 'pricing' | 'testimonials' | 'cta' | 'footer' | 'contact' | 'faq';
  title: string;
  subtitle?: string;
  content: Record<string, any>;
  order: number;
}

export interface WebsitePage {
  id: string;
  title: string;
  path: string;
  sections: WebsiteSection[];
}

export interface ProjectTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: string;
  mode: 'dark' | 'light';
}

export interface DeploymentConfig {
  isPublished: boolean;
  subdomain: string;
  customDomain?: string;
  publishedAt?: string;
  sslActive: boolean;
  cdnStatus: 'active' | 'deploying' | 'disabled';
}

export interface Project {
  id: string;
  name: string;
  sampleUrl: string;
  level: ReplicationLevel;
  status: 'completed' | 'processing' | 'draft' | 'error';
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
  brandInfo: BrandInfo;
  analysis: WebsiteAnalysis;
  pages: WebsitePage[];
  activeTheme: ProjectTheme;
  deployment: DeploymentConfig;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
  appliedChangeSummary?: string;
  actionPayload?: any;
}

export interface VersionSnapshot {
  id: string;
  timestamp: string;
  label: string;
  pagesState: WebsitePage[];
  themeState: ProjectTheme;
  appliedPrompt?: string;
}

export interface ActivityLogItem {
  id: string;
  projectId?: string;
  projectName?: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'create' | 'edit' | 'deploy' | 'export' | 'analyze';
}

export interface AiBrainStatus {
  connected: boolean;
  hasApiKey: boolean;
  model: string;
  provider: string;
  status: 'ready' | 'connecting' | 'error';
  latencyMs: number;
  mode: 'live_gemini' | 'simulated_neural' | 'fallback_neural';
  capabilities: string[];
  lastPing?: string;
}

export interface AiBrainConfig {
  selectedModel: 'gemini-3.8-flash' | 'gemini-4-argon' | 'simulated_neural';
  thinkingLevel: 'low' | 'medium' | 'high';
  temperature: number;
  autoSynthesizeCopy: boolean;
  autoOptimizeCRO: boolean;
}
