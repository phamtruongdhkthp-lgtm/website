import JSZip from 'jszip';
import { Project } from '../types';

export async function generateProjectZip(project: Project): Promise<Blob> {
  const zip = new JSZip();

  const brandName = project.brandInfo.businessName || project.name || 'AI-Website';
  const safeName = brandName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const primaryColor = project.activeTheme.primaryColor || '#D4AF37';

  // 1. package.json
  const packageJson = {
    name: safeName,
    private: true,
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview',
    },
    dependencies: {
      react: '^18.3.1',
      'react-dom': '^18.3.1',
      'lucide-react': '^0.344.0',
    },
    devDependencies: {
      '@types/react': '^18.3.5',
      '@types/react-dom': '^18.3.0',
      '@vitejs/plugin-react': '^4.3.1',
      autoprefixer: '^10.4.20',
      postcss: '^8.4.47',
      tailwindcss: '^3.4.11',
      typescript: '^5.5.3',
      vite: '^5.4.2',
    },
  };
  zip.file('package.json', JSON.stringify(packageJson, null, 2));

  // 2. index.html
  const indexHtml = `<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${brandName} - Website Chính Thức</title>
    <meta name="description" content="${project.analysis.description || 'Website được xây dựng bởi AI Website Builder'}" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#090b10] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
  zip.file('index.html', indexHtml);

  // 3. vite.config.ts
  const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;
  zip.file('vite.config.ts', viteConfig);

  // 4. tailwind.config.js
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '${primaryColor}',
          dark: '#07090e',
        },
      },
    },
  },
  plugins: [],
};
`;
  zip.file('tailwind.config.js', tailwindConfig);

  // 5. postcss.config.js
  const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
  zip.file('postcss.config.js', postcssConfig);

  // 6. tsconfig.json
  const tsconfig = `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}`;
  zip.file('tsconfig.json', tsconfig);

  // 7. README.md
  const readme = `# ${brandName} - Website Mã Nguồn Tự Động Tạo Bởi AI

Dự án này được tạo tự động bởi **AI WEBSITE BUILDER**
- **Website mẫu tham khảo**: ${project.sampleUrl}
- **Cấp độ tái tạo**: Cấp độ ${project.level}
- **Màu chủ đạo**: \`${primaryColor}\`
- **Ngày xuất bản mã nguồn**: ${new Date().toLocaleDateString('vi-VN')}

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Trên Máy Cá Nhân

1. Cài đặt các gói phụ thuộc:
\`\`\`bash
npm install
# hoặc yarn install / pnpm install
\`\`\`

2. Khởi chạy máy chủ phát triển cục bộ (Localhost):
\`\`\`bash
npm run dev
\`\`\`
Mở trình duyệt tại: \`http://localhost:5173\`

3. Đóng gói để đưa lên máy chủ sản xuất (Production Build):
\`\`\`bash
npm run build
\`\`\`
Thư mục \`dist/\` chứa toàn bộ mã nguồn tĩnh sẵn sàng triển khai.

---

## 🌐 Hướng Dẫn Triển Khai Lên Hosting Cá Nhân

### Cách 1: Vercel (Khuyên dùng - Miễn phí)
1. Đăng ký tài khoản tại [vercel.com](https://vercel.com).
2. Tải mã nguồn lên GitHub hoặc kéo thả trực tiếp thư mục này vào Vercel Dashboard.
3. Vercel sẽ tự động nhận diện Vite/React và cấp link \`.vercel.app\` kèm SSL trọn đời.

### Cách 2: Netlify
1. Đăng nhập [netlify.com](https://netlify.com).
2. Kéo thả thư mục \`dist\` (sau khi chạy \`npm run build\`) vào mục "Deploy manually".

### Cách 3: Máy chủ Nginx / Apache / CPanel
1. Chạy \`npm run build\`.
2. Upload toàn bộ nội dung trong thư mục \`dist/\` lên thư mục \`public_html\` của hosting.
3. Cấu hình rewrite URL về \`index.html\`.
`;
  zip.file('README.md', readme);

  // 8. src files
  const src = zip.folder('src');

  // src/main.tsx
  const mainTsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
  src?.file('main.tsx', mainTsx);

  // src/index.css
  const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  background-color: #07090e;
  color: #f8fafc;
}
`;
  src?.file('index.css', indexCss);

  // src/App.tsx with full responsive rendered layout
  const sectionsData = JSON.stringify(project.pages[0]?.sections || [], null, 2);
  const appTsx = `import React, { useState } from 'react';
import { 
  Zap, ShieldCheck, Sparkles, Smartphone, BarChart3, Headphones, 
  Menu, X, Phone, Mail, MapPin, CheckCircle, ArrowRight, ExternalLink 
} from 'lucide-react';

const SECTIONS_DATA = ${sectionsData};
const PRIMARY_COLOR = '${primaryColor}';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0e121d]/80 border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-slate-950 text-xl shadow-lg"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              ${brandName.charAt(0).toUpperCase()}
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">${brandName}</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition">Tính Năng</a>
            <a href="#pricing" className="hover:text-white transition">Bảng Giá</a>
            <a href="#testimonials" className="hover:text-white transition">Đánh Giá</a>
            <a href="#contact" className="hover:text-white transition">Liên Hệ</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-950 transition hover:brightness-110 shadow-md"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              Liên Hệ Ngay
            </a>
          </div>

          <button 
            className="md:hidden text-slate-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-white/10 flex flex-col gap-3 text-sm">
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>Tính Năng</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Bảng Giá</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Đánh Giá</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Liên Hệ</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6 max-w-6xl mx-auto text-center flex flex-col items-center">
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border"
          style={{ borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
        >
          <Sparkles size={14} /> ${project.level === 5 ? 'Sáng Tạo Hoàn Toàn Bằng AI' : 'Giải Pháp Cao Cấp Hàng Đầu'}
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight mb-6">
          Nâng Tầm Doanh Nghiệp Cùng <span style={{ color: PRIMARY_COLOR }}>${brandName}</span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10">
          ${project.analysis.description || 'Giải pháp hiện đại, tối ưu trải nghiệm và thúc đẩy tăng trưởng mạnh mẽ.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-xl font-bold text-slate-950 text-base shadow-lg transition hover:brightness-110"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            Bắt Đầu Ngay
          </a>
          <a
            href="#features"
            className="px-8 py-3.5 rounded-xl font-semibold text-slate-200 border border-white/20 hover:bg-white/5 transition"
          >
            Tìm Hiểu Thêm
          </a>
        </div>

        {/* Hero Image Showcase */}
        <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#101422]">
          <img 
            src="${project.analysis.screenshotUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80'}" 
            alt="Showcase" 
            className="w-full h-80 md:h-[450px] object-cover"
          />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tính Năng Đột Phá</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Được xây dựng với các công nghệ tân tiến nhất để mang lại hiệu suất tối đa.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Tốc Độ Vượt Trội', desc: 'Tải trang siêu tốc chuẩn hóa SEO quốc tế.', icon: Zap },
            { title: 'Bảo Mật Cao Cấp', desc: 'Mã hóa đa lớp bảo vệ toàn vẹn thông tin.', icon: ShieldCheck },
            { title: 'Trí Tuệ Nhân Tạo', desc: 'Tự động hóa hành trình trải nghiệm người dùng.', icon: Sparkles },
            { title: 'Chuẩn Di Động', desc: 'Thích ứng hoàn hảo trên mọi kích cỡ màn hình.', icon: Smartphone },
            { title: 'Phân Tích Dữ Liệu', desc: 'Báo cáo chi tiết trực quan theo thời gian thực.', icon: BarChart3 },
            { title: 'Hỗ Trợ 24/7', desc: 'Đội ngũ chuyên viên tận tâm đồng hành.', icon: Headphones },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/30 transition">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-slate-950 font-bold"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                <item.icon size={22} />
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 max-w-4xl mx-auto w-full">
        <div className="p-8 md:p-12 rounded-3xl bg-white/[0.04] border border-white/10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Liên Hệ Tư Vấn</h2>
            <p className="text-slate-400">Để lại thông tin, đội ngũ ${brandName} sẽ liên hệ trong 15 phút.</p>
          </div>

          {contactSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center text-emerald-300">
              <CheckCircle className="mx-auto mb-2" size={32} />
              <p className="font-semibold">Cảm ơn bạn! Thông tin tư vấn đã được tiếp nhận thành công.</p>
            </div>
          ) : (
            <form 
              onSubmit={(e) => { e.preventDefault(); setContactSuccess(true); }}
              className="space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Họ và tên của bạn" 
                  required 
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-sm"
                />
                <input 
                  type="tel" 
                  placeholder="Số điện thoại" 
                  required 
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-sm"
                />
              </div>
              <input 
                type="email" 
                placeholder="Email liên hệ" 
                required 
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-sm"
              />
              <textarea 
                rows={3} 
                placeholder="Nhu cầu cụ thể của bạn..." 
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-sm resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-slate-950 transition hover:brightness-110"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                Gửi Thông Tin Ngay
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 py-10 px-6 bg-[#05070a] text-sm text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">${brandName}</span>
            <span>—</span>
            <span>${project.brandInfo.phone || '0988.123.456'}</span>
          </div>
          <div>© {new Date().getFullYear()} ${brandName}. Mã nguồn tạo bởi AI Website Builder.</div>
        </div>
      </footer>
    </div>
  );
}
`;
  src?.file('App.tsx', appTsx);

  return await zip.generateAsync({ type: 'blob' });
}
