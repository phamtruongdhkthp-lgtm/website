import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Undo2,
  Redo2,
  Bookmark,
  History,
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  Code,
  Download,
  UploadCloud,
  CheckCircle2,
  Zap,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Star,
  RefreshCw,
  Sliders,
  ChevronDown,
  BarChart3,
  Headphones,
} from 'lucide-react';
import { ChatMessage, Project, VersionSnapshot, WebsiteSection } from '../types';
import { executeAiPrompt } from '../utils/engine';

interface AiWebsiteEditorProps {
  project: Project;
  onUpdateProject: (updated: Project) => void;
  onExportCode: (project: Project) => void;
  onOpenPublish: (project: Project) => void;
  onLogActivity: (action: string, details: string) => void;
}

export const AiWebsiteEditor: React.FC<AiWebsiteEditorProps> = ({
  project,
  onUpdateProject,
  onExportCode,
  onOpenPublish,
  onLogActivity,
}) => {
  // Device view: desktop, tablet, mobile
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [viewTab, setViewTab] = useState<'preview' | 'code'>('preview');

  // Undo / Redo history stacks
  const [undoStack, setUndoStack] = useState<Project[]>([]);
  const [redoStack, setRedoStack] = useState<Project[]>([]);

  // Version Snapshots
  const [versionSnapshots, setVersionSnapshots] = useState<VersionSnapshot[]>([
    {
      id: 'v_init',
      timestamp: new Date().toLocaleTimeString('vi-VN'),
      label: 'Phiên bản ban đầu (Khởi tạo)',
      pagesState: project.pages,
      themeState: project.activeTheme,
    },
  ]);
  const [showVersionDropdown, setShowVersionDropdown] = useState(false);

  // Chat Editor State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Xin chào! Tôi là trợ lý AI Website Editor. Tôi đã khởi tạo thành công website cho thương hiệu "${project.name}". Bạn muốn tôi chỉnh sửa hoặc bổ sung gì tiếp theo?`,
      timestamp: 'Vừa xong',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Contact form submission state inside preview
  const [previewContactSuccess, setPreviewContactSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const quickPrompts = [
    { label: 'Đổi màu sang xanh ngọc', prompt: 'Đổi màu website sang xanh ngọc (Emerald Teal)' },
    { label: 'Đổi màu vàng kim', prompt: 'Đổi màu chủ đạo sang vàng kim hoàng gia (#D4AF37)' },
    { label: 'Thêm nút gọi Hotline & Zalo', prompt: 'Thêm nút gọi hotline và widget liên hệ Zalo' },
    { label: 'Đổi slogan tiêu đề', prompt: 'Đổi slogan tiêu đề thành "Khẳng Định Vị Thế Dẫn Đầu"' },
    { label: 'Tối ưu giao diện điện thoại', prompt: 'Tối ưu hóa giao diện di động và tốc độ tải trang' },
    { label: 'Thêm bảng giá 3 gói', prompt: 'Thêm bảng giá 3 gói dịch vụ vào trang chủ' },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const prompt = (textToSend || inputText).trim();
    if (!prompt || isAiThinking) return;

    // Push current project to undo stack
    setUndoStack((prev) => [...prev, JSON.parse(JSON.stringify(project))]);
    setRedoStack([]); // clear redo

    // Add user message
    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsAiThinking(true);

    // AI Processing
    setTimeout(() => {
      const { updatedProject, changeSummary } = executeAiPrompt(project, prompt);
      onUpdateProject(updatedProject);
      onLogActivity('AI Edit', changeSummary);

      const aiMsg: ChatMessage = {
        id: 'ai_' + Date.now(),
        sender: 'ai',
        text: changeSummary,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        appliedChangeSummary: changeSummary,
      };

      setChatMessages((prev) => [...prev, aiMsg]);
      setIsAiThinking(false);
    }, 900);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    const newUndo = undoStack.slice(0, undoStack.length - 1);

    setRedoStack((prev) => [...prev, JSON.parse(JSON.stringify(project))]);
    setUndoStack(newUndo);
    onUpdateProject(previous);

    setChatMessages((prev) => [
      ...prev,
      {
        id: 'sys_' + Date.now(),
        sender: 'system',
        text: 'Đã hoàn tác (Undo) thay đổi vừa rồi.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    const newRedo = redoStack.slice(0, redoStack.length - 1);

    setUndoStack((prev) => [...prev, JSON.parse(JSON.stringify(project))]);
    setRedoStack(newRedo);
    onUpdateProject(next);

    setChatMessages((prev) => [
      ...prev,
      {
        id: 'sys_' + Date.now(),
        sender: 'system',
        text: 'Đã làm lại (Redo) thay đổi.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSaveSnapshot = () => {
    const label = `Phiên bản #${versionSnapshots.length + 1} (${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })})`;
    const snapshot: VersionSnapshot = {
      id: 'v_' + Date.now(),
      timestamp: new Date().toLocaleTimeString('vi-VN'),
      label,
      pagesState: JSON.parse(JSON.stringify(project.pages)),
      themeState: JSON.parse(JSON.stringify(project.activeTheme)),
    };

    setVersionSnapshots((prev) => [...prev, snapshot]);
    onLogActivity('Save Version', `Đã lưu ${label}`);

    setChatMessages((prev) => [
      ...prev,
      {
        id: 'sys_' + Date.now(),
        sender: 'system',
        text: `Đã lưu snapshot ${label} thành công vào lịch sử phiên bản.`,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleRestoreSnapshot = (snapshot: VersionSnapshot) => {
    setUndoStack((prev) => [...prev, JSON.parse(JSON.stringify(project))]);
    const updated = {
      ...project,
      pages: JSON.parse(JSON.stringify(snapshot.pagesState)),
      activeTheme: JSON.parse(JSON.stringify(snapshot.themeState)),
      updatedAt: new Date().toISOString(),
    };
    onUpdateProject(updated);
    setShowVersionDropdown(false);

    setChatMessages((prev) => [
      ...prev,
      {
        id: 'sys_' + Date.now(),
        sender: 'system',
        text: `Đã khôi phục lại "${snapshot.label}".`,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Helper variables for rendering preview
  const primaryColor = project.activeTheme.primaryColor || '#D4AF37';
  const brandName = project.brandInfo.businessName || project.name;
  const homeSections = project.pages[0]?.sections || [];

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row overflow-hidden bg-[#07090e]">
      {/* LEFT COLUMN: AI CHAT EDITOR */}
      <div className="w-full md:w-96 lg:w-[420px] flex-shrink-0 flex flex-col glass-panel border-r border-white/10 h-full">
        {/* Editor Chat Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gold-gradient-bg flex items-center justify-center text-slate-950 font-bold">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="font-bold text-sm text-white flex items-center gap-1.5">
                <span>AI Website Editor</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <div className="text-[10px] text-amber-400 font-mono">Gemini 3.8 Flash • Online</div>
            </div>
          </div>

          <div className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 font-mono">
            Cấp {project.level}
          </div>
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="px-3 py-2 border-b border-white/5 bg-white/[0.01] overflow-x-auto flex items-center gap-1.5 scrollbar-none">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qp.prompt)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 hover:text-amber-300 border border-white/5 transition whitespace-nowrap cursor-pointer shrink-0"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Chat History Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {chatMessages.map((msg) => {
            if (msg.sender === 'system') {
              return (
                <div key={msg.id} className="text-center my-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-mono text-slate-400 border border-white/10">
                    {msg.text}
                  </span>
                </div>
              );
            }

            const isAi = msg.sender === 'ai';

            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isAi ? 'items-start' : 'items-start justify-end'}`}
              >
                {isAi && (
                  <div className="w-7 h-7 rounded-lg gold-gradient-bg flex items-center justify-center text-slate-950 font-bold shrink-0 mt-0.5">
                    <Sparkles size={13} />
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    isAi
                      ? 'glass-card border-white/10 text-slate-200'
                      : 'bg-amber-500/20 text-amber-200 border border-amber-400/30'
                  }`}
                >
                  <div className="text-xs">{msg.text}</div>

                  {msg.appliedChangeSummary && (
                    <div className="mt-2 pt-2 border-t border-white/10 text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                      <CheckCircle2 size={12} />
                      <span>Đã áp dụng lên Live Preview</span>
                    </div>
                  )}

                  <div className="text-[9px] text-slate-400 text-right mt-1 font-mono">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {isAiThinking && (
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono p-3 rounded-2xl glass-card border border-white/10">
              <Sparkles size={14} className="animate-spin" />
              <span>AI đang phân tích & áp dụng chỉnh sửa...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Chat Input Box */}
        <div className="p-3 border-t border-white/10 bg-white/[0.02]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nhập yêu cầu (VD: đổi màu sang đỏ, thêm hotline)..."
              disabled={isAiThinking}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-xs"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isAiThinking}
              className="p-2.5 rounded-xl gold-gradient-btn text-slate-950 disabled:opacity-40 cursor-pointer shadow-md"
            >
              <Send size={15} />
            </button>
          </form>
          <div className="text-[10px] text-slate-400 text-center mt-1.5">
            Hỗ trợ tự nhiên: đổi màu, đổi tên thương hiệu, thêm nút hotline, tối ưu mobile...
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: LIVE WEBSITE PREVIEW & TOOLBAR */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950/60">
        {/* Editor Controls Toolbar */}
        <div className="h-14 px-4 glass-panel border-b border-white/10 flex items-center justify-between shrink-0">
          {/* Device Switcher */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded-lg text-xs transition cursor-pointer flex items-center gap-1.5 ${
                deviceMode === 'desktop'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Xem trên Desktop"
            >
              <Monitor size={15} />
              <span className="hidden sm:inline">Desktop</span>
            </button>

            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded-lg text-xs transition cursor-pointer flex items-center gap-1.5 ${
                deviceMode === 'tablet'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Xem trên Tablet"
            >
              <Tablet size={15} />
              <span className="hidden sm:inline">Tablet</span>
            </button>

            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-lg text-xs transition cursor-pointer flex items-center gap-1.5 ${
                deviceMode === 'mobile'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Xem trên Mobile"
            >
              <Smartphone size={15} />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* View Tab Switcher (Preview vs Code) */}
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setViewTab('preview')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                viewTab === 'preview'
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Eye size={13} />
                <span>Xem Trước</span>
              </span>
            </button>
            <button
              onClick={() => setViewTab('code')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                viewTab === 'code'
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Code size={13} />
                <span>Mã Nguồn JSX</span>
              </span>
            </button>
          </div>

          {/* Action Tools: Undo, Redo, Save Version, Download, Publish */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleUndo}
              disabled={undoStack.length === 0}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 border border-white/10 cursor-pointer"
              title="Hoàn tác (Undo)"
            >
              <Undo2 size={16} />
            </button>

            <button
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 border border-white/10 cursor-pointer"
              title="Làm lại (Redo)"
            >
              <Redo2 size={16} />
            </button>

            {/* Version Snapshot Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowVersionDropdown(!showVersionDropdown)}
                className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 border border-white/10 flex items-center gap-1.5 cursor-pointer"
              >
                <Bookmark size={14} className="text-amber-400" />
                <span className="hidden lg:inline">Phiên bản ({versionSnapshots.length})</span>
                <ChevronDown size={12} />
              </button>

              {showVersionDropdown && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl glass-panel-gold border border-amber-400/30 p-2 shadow-2xl z-50 text-xs space-y-1">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-mono text-slate-400 font-bold border-b border-white/10 flex items-center justify-between">
                    <span>Lịch sử snapshot</span>
                    <button
                      onClick={handleSaveSnapshot}
                      className="text-amber-400 hover:underline cursor-pointer"
                    >
                      + Lưu bản mới
                    </button>
                  </div>
                  {versionSnapshots.map((snap) => (
                    <button
                      key={snap.id}
                      onClick={() => handleRestoreSnapshot(snap)}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/10 text-slate-200 transition flex items-center justify-between cursor-pointer"
                    >
                      <span className="truncate">{snap.label}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{snap.timestamp}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Save Version Button */}
            <button
              onClick={handleSaveSnapshot}
              className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 border border-white/10 cursor-pointer"
            >
              <History size={14} />
              <span>Lưu Snapshot</span>
            </button>

            {/* Download Code Button */}
            <button
              onClick={() => onExportCode(project)}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 flex items-center gap-1.5 cursor-pointer"
            >
              <Download size={14} className="text-amber-400" />
              <span className="hidden sm:inline">Tải Code (.zip)</span>
            </button>

            {/* Publish Button */}
            <button
              onClick={() => onOpenPublish(project)}
              className="px-3.5 py-1.5 rounded-xl gold-gradient-btn text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <UploadCloud size={14} />
              <span>Xuất Bản</span>
            </button>
          </div>
        </div>

        {/* Live Preview Container or Code View */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex items-start justify-center bg-black/40">
          {viewTab === 'code' ? (
            /* JSX Code View */
            <div className="w-full max-w-4xl rounded-2xl bg-slate-950 border border-white/10 p-6 font-mono text-xs text-slate-300 overflow-x-auto space-y-2">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-slate-400 text-[11px]">
                <span>src/App.tsx (Tự động sinh bởi AI)</span>
                <span className="font-mono text-amber-400">React 19 + Tailwind v4</span>
              </div>
              <pre className="text-emerald-300 leading-relaxed">
{`// Component Website được tạo tự động bởi AI Website Builder
// Nhận diện thương hiệu: ${brandName}
// Cấp độ tái tạo: Cấp độ ${project.level}

import React, { useState } from 'react';
import { Zap, ShieldCheck, Sparkles, Smartphone, BarChart3, Headphones } from 'lucide-react';

const BRAND_CONFIG = {
  name: "${brandName}",
  primaryColor: "${primaryColor}",
  phone: "${project.brandInfo.phone || '0988.123.456'}",
  email: "${project.brandInfo.email || 'contact@brand.vn'}",
};

export default function GeneratedWebsite() {
  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100">
      {/* Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-white/10 px-6 py-4">
        {/* ... Header Elements ... */}
      </header>

      {/* Hero Section */}
      <section className="py-24 text-center max-w-5xl mx-auto px-6">
        <h1 className="text-5xl font-extrabold text-white">
          Giải Pháp Đột Phá Cùng <span style={{ color: "${primaryColor}" }}>${brandName}</span>
        </h1>
      </section>
    </div>
  );
}`}
              </pre>
            </div>
          ) : (
            /* Live Interactive Preview in Device Frame */
            <div
              className={`transition-all duration-300 bg-[#07090e] shadow-2xl rounded-2xl overflow-hidden border border-white/10 text-slate-100 flex flex-col ${
                deviceMode === 'mobile'
                  ? 'w-[375px] min-h-[720px] ring-8 ring-slate-800'
                  : deviceMode === 'tablet'
                  ? 'w-[768px] min-h-[850px] ring-8 ring-slate-800'
                  : 'w-full max-w-6xl'
              }`}
            >
              {/* Device Notch / Bar (for mobile view simulation) */}
              {deviceMode === 'mobile' && (
                <div className="h-6 bg-slate-950 flex items-center justify-between px-6 text-[10px] text-slate-400 font-mono border-b border-white/5">
                  <span>09:41</span>
                  <div className="w-16 h-3 bg-slate-800 rounded-full"></div>
                  <span>5G 100%</span>
                </div>
              )}

              {/* RENDERED INTERACTIVE WEBSITE PREVIEW */}
              <div className="flex-1 flex flex-col">
                {/* 1. Navbar */}
                <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0a0d16]/90 border-b border-white/10 px-6 py-4">
                  <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-slate-950 text-xl shadow-md"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {brandName.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-extrabold text-lg md:text-xl tracking-tight text-white">
                        {brandName}
                      </span>
                    </div>

                    {deviceMode !== 'mobile' && (
                      <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
                        <a href="#features" className="hover:text-white transition">Tính Năng</a>
                        <a href="#pricing" className="hover:text-white transition">Bảng Giá</a>
                        <a href="#testimonials" className="hover:text-white transition">Đánh Giá</a>
                        <a href="#contact" className="hover:text-white transition">Liên Hệ</a>
                      </div>
                    )}

                    {deviceMode !== 'mobile' && (
                      <div className="hidden md:flex items-center gap-3">
                        <a
                          href="#contact"
                          className="px-4 py-2 rounded-xl font-bold text-xs text-slate-950 transition hover:brightness-110 shadow-sm"
                          style={{ backgroundColor: primaryColor }}
                        >
                          Tư Vấn Ngay
                        </a>
                      </div>
                    )}

                    <button
                      className={`${deviceMode === 'mobile' ? 'block' : 'md:hidden'} text-slate-300 p-1 cursor-pointer`}
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                      {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                  </div>

                  {/* Mobile dropdown */}
                  {mobileMenuOpen && (
                    <div className="pt-3 pb-2 border-t border-white/10 mt-3 flex flex-col gap-2 text-xs">
                      <a href="#features" onClick={() => setMobileMenuOpen(false)}>Tính Năng</a>
                      <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Bảng Giá</a>
                      <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Đánh Giá</a>
                      <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Liên Hệ</a>
                    </div>
                  )}
                </header>

                {/* 2. Hero Section */}
                <section className="relative py-16 md:py-24 px-6 text-center flex flex-col items-center">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 border"
                    style={{
                      borderColor: `${primaryColor}40`,
                      color: primaryColor,
                      backgroundColor: `${primaryColor}15`,
                    }}
                  >
                    <Sparkles size={14} />
                    <span>Cấp độ {project.level} • Tự Động Hóa AI</span>
                  </div>

                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight mb-5 text-white">
                    Nâng Tầm Doanh Nghiệp Cùng{' '}
                    <span style={{ color: primaryColor }}>{brandName}</span>
                  </h1>

                  <p className="text-slate-300 text-sm md:text-base max-w-2xl mb-8 leading-relaxed">
                    {project.analysis.description ||
                      'Website chuẩn thương hiệu cao cấp với kiến trúc hiện đại, tối ưu tốc độ và tỷ lệ chuyển đổi khách hàng.'}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                    <a
                      href="#contact"
                      className="px-6 py-3 rounded-xl font-bold text-slate-950 text-xs md:text-sm shadow-lg transition hover:brightness-110"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Bắt Đầu Ngay
                    </a>
                    <a
                      href="#features"
                      className="px-6 py-3 rounded-xl font-semibold text-slate-200 border border-white/20 hover:bg-white/5 transition text-xs md:text-sm"
                    >
                      Khám Phá Tính Năng
                    </a>
                  </div>

                  {/* Hero Showcase Image */}
                  <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 max-h-96">
                    <img
                      src={project.analysis.screenshotUrl}
                      alt="Showcase"
                      className="w-full h-64 md:h-96 object-cover"
                    />
                  </div>
                </section>

                {/* 3. Features Section */}
                <section id="features" className="py-16 px-6 max-w-6xl mx-auto w-full">
                  <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Tính Năng Đột Phá</h2>
                    <p className="text-xs md:text-sm text-slate-400 max-w-lg mx-auto">
                      Được tối ưu chuẩn hóa theo tiêu chuẩn công nghệ quốc tế
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { title: 'Tốc Độ Tải Siêu Nhanh', desc: 'Tối ưu 100/100 Google PageSpeed, tải dưới 1 giây.', icon: Zap },
                      { title: 'Bảo Mật Tiêu Chuẩn Cao', desc: 'Mã hóa SSL 256-bit bảo vệ an toàn toàn diện.', icon: ShieldCheck },
                      { title: 'Giao Diện Chuẩn Mobile', desc: 'Thích ứng hoàn hảo mọi thiết bị di động và tablet.', icon: Smartphone },
                      { title: 'AI Tự Động Cá Nhân Hóa', desc: 'Tự động hiển thị nội dung phù hợp từng nhóm khách.', icon: Sparkles },
                      { title: 'Phân Tích Báo Cáo', desc: 'Biểu đồ trực quan theo dõi lượng truy cập tức thì.', icon: BarChart3 },
                      { title: 'Hỗ Trợ Chuyên Nghiệp', desc: 'Đội ngũ kỹ thuật đồng hành 24/7 không gián đoạn.', icon: Headphones },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/30 transition"
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-slate-950 font-bold"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <item.icon size={20} />
                        </div>
                        <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 4. Pricing Plans */}
                <section id="pricing" className="py-16 px-6 max-w-6xl mx-auto w-full">
                  <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Bảng Giá Dịch Vụ</h2>
                    <p className="text-xs md:text-sm text-slate-400">
                      Lựa chọn gói tối ưu phù hợp với quy mô doanh nghiệp của bạn
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        name: 'Gói Cơ Bản',
                        price: '1.990.000 đ',
                        period: '/tháng',
                        features: ['1 Tên miền riêng', 'Băng thông cao', 'Bảo mật SSL', 'Hỗ trợ giờ hành chính'],
                        popular: false,
                      },
                      {
                        name: 'Gói Chuyên Nghiệp',
                        price: '3.990.000 đ',
                        period: '/tháng',
                        features: ['Tất cả tính năng Cơ bản', 'AI Marketing tự động', 'Tích hợp Hotline & Zalo', 'Hỗ trợ ưu tiên 24/7'],
                        popular: true,
                      },
                      {
                        name: 'Gói Doanh Nghiệp',
                        price: 'Liên hệ',
                        period: '',
                        features: ['Máy chủ chuyên dụng riêng', 'Tùy chỉnh 100% mã nguồn', 'Cam kết SLA 99.99%', 'Bàn giao trọn gói'],
                        popular: false,
                      },
                    ].map((plan, idx) => (
                      <div
                        key={idx}
                        className={`p-6 rounded-2xl border flex flex-col justify-between ${
                          plan.popular
                            ? 'bg-white/[0.06] ring-2 shadow-xl'
                            : 'bg-white/[0.02] border-white/10'
                        }`}
                        style={{
                          borderColor: plan.popular ? primaryColor : undefined,
                        }}
                      >
                        <div>
                          {plan.popular && (
                            <span
                              className="inline-block px-2 py-0.5 rounded text-[10px] font-bold text-slate-950 uppercase mb-2"
                              style={{ backgroundColor: primaryColor }}
                            >
                              Khuyên Dùng
                            </span>
                          )}
                          <h3 className="font-bold text-base text-white">{plan.name}</h3>
                          <div className="my-4">
                            <span className="text-2xl font-extrabold text-white">{plan.price}</span>
                            <span className="text-xs text-slate-400">{plan.period}</span>
                          </div>
                          <ul className="space-y-2 text-xs text-slate-300">
                            {plan.features.map((f, fIdx) => (
                              <li key={fIdx} className="flex items-center gap-2">
                                <CheckCircle2 size={14} style={{ color: primaryColor }} />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          className="mt-6 w-full py-2.5 rounded-xl font-bold text-xs text-slate-950 transition hover:brightness-110 cursor-pointer"
                          style={{ backgroundColor: primaryColor }}
                        >
                          Chọn Gói Này
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 5. Contact Form Section */}
                <section id="contact" className="py-16 px-6 max-w-4xl mx-auto w-full">
                  <div className="p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/10">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">Kết Nối Với Chúng Tôi</h2>
                      <p className="text-xs md:text-sm text-slate-400">
                        {project.brandInfo.address || 'Liên hệ để nhận báo giá và tư vấn lộ trình chi tiết'}
                      </p>
                    </div>

                    {previewContactSuccess ? (
                      <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center text-emerald-300 space-y-2">
                        <CheckCircle2 size={32} className="mx-auto" />
                        <div className="font-bold">Đã gửi yêu cầu tư vấn thành công!</div>
                        <div className="text-xs text-slate-300">
                          Chuyên viên của {brandName} sẽ liên hệ lại với bạn trong ít phút.
                        </div>
                        <button
                          onClick={() => setPreviewContactSuccess(false)}
                          className="mt-2 text-xs underline text-amber-300 cursor-pointer"
                        >
                          Gửi yêu cầu khác
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setPreviewContactSuccess(true);
                        }}
                        className="space-y-3.5"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <input
                            type="text"
                            placeholder="Họ và tên quý khách"
                            required
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-xs"
                          />
                          <input
                            type="tel"
                            placeholder="Số điện thoại"
                            required
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-xs"
                          />
                        </div>
                        <input
                          type="email"
                          placeholder="Địa chỉ Email"
                          required
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-xs"
                        />
                        <textarea
                          rows={3}
                          placeholder="Nội dung nhu cầu tư vấn..."
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-amber-400 focus:outline-none text-white text-xs resize-none"
                        ></textarea>
                        <button
                          type="submit"
                          className="w-full py-3 rounded-xl font-bold text-slate-950 text-xs md:text-sm transition hover:brightness-110 shadow-lg cursor-pointer"
                          style={{ backgroundColor: primaryColor }}
                        >
                          Gửi Thông Tin Ngay
                        </button>
                      </form>
                    )}
                  </div>
                </section>

                {/* 6. Footer */}
                <footer className="mt-auto border-t border-white/10 py-8 px-6 bg-[#040609] text-xs text-slate-400">
                  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{brandName}</span>
                      <span>—</span>
                      <span>Hotline: {project.brandInfo.phone || '0988.123.456'}</span>
                    </div>
                    <div>
                      © {new Date().getFullYear()} {brandName}. Tạo tự động bởi AI Website Builder.
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
