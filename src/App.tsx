/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { MyWebsites } from './components/MyWebsites';
import { AiWebsiteEditor } from './components/AiWebsiteEditor';
import { ActivityHistory } from './components/ActivityHistory';
import { SettingsView } from './components/SettingsView';
import { CreateWizard } from './components/CreateWizard';
import { BuildProgress } from './components/BuildProgress';
import { PublishModal } from './components/PublishModal';
import { PreviewModal } from './components/PreviewModal';
import { ActivityLogItem, BrandInfo, Project, ReplicationLevel, WebsiteAnalysis } from './types';
import { getInitialProjects } from './data/mockProjects';
import { createProjectFromFlow } from './utils/engine';
import { generateProjectZip } from './utils/exportZip';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'projects' | 'editor' | 'history' | 'settings'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Projects State
  const [projects, setProjects] = useState<Project[]>(() => getInitialProjects());
  const [activeProject, setActiveProject] = useState<Project>(() => projects[0]);

  // Modal States
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  const [createUrlHint, setCreateUrlHint] = useState<string>('');
  const [buildingProject, setBuildingProject] = useState<Project | null>(null);
  const [publishModalProject, setPublishModalProject] = useState<Project | null>(null);
  const [previewModalProject, setPreviewModalProject] = useState<Project | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Activity Log
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>([
    {
      id: 'log_1',
      projectName: 'VINFAST E-MOBILITY',
      action: 'Khởi tạo dự án',
      details: 'Tạo website từ mẫu vinfastauto.com theo Cấp độ 3 (Tương tự)',
      timestamp: '10 phút trước',
      type: 'create',
    },
    {
      id: 'log_2',
      projectName: 'HIGHLANDS HERITAGE',
      action: 'Chỉnh sửa AI',
      details: 'Cập nhật bảng màu hổ phách nâu cà phê và thêm widget liên hệ hotline',
      timestamp: '25 phút trước',
      type: 'edit',
    },
    {
      id: 'log_3',
      projectName: 'NEXUS CLOUD PAY',
      action: 'Xuất bản Cloud',
      details: 'Triển khai lên subdomain nexuspay.aiwebsite.app thành công kèm SSL',
      timestamp: '1 giờ trước',
      type: 'deploy',
    },
  ]);

  const addActivityLog = (action: string, details: string, projectName?: string) => {
    const newLog: ActivityLogItem = {
      id: 'log_' + Date.now(),
      projectName: projectName || activeProject?.name,
      action,
      details,
      timestamp: 'Vừa xong',
      type: action.toLowerCase().includes('edit')
        ? 'edit'
        : action.toLowerCase().includes('deploy')
        ? 'deploy'
        : action.toLowerCase().includes('export')
        ? 'export'
        : 'create',
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  // Handlers
  const handleOpenCreateWizard = (urlHint?: string) => {
    setCreateUrlHint(urlHint || '');
    setShowCreateWizard(true);
  };

  const handleStartBuild = (
    sampleUrl: string,
    level: ReplicationLevel,
    brandInfo: BrandInfo,
    analysis: WebsiteAnalysis
  ) => {
    setShowCreateWizard(false);
    const newProj = createProjectFromFlow(sampleUrl, level, brandInfo, analysis);
    setBuildingProject(newProj);
  };

  const handleBuildComplete = (completedProject: Project) => {
    setProjects((prev) => [completedProject, ...prev]);
    setActiveProject(completedProject);
    setBuildingProject(null);
    setCurrentTab('editor');
    addActivityLog('Khởi tạo dự án', `Đã tạo website hoàn chỉnh cho ${completedProject.name}`, completedProject.name);
    showToast(`Đã tạo thành công website "${completedProject.name}"!`);
  };

  const handleUpdateProject = (updated: Project) => {
    setActiveProject(updated);
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleExportZip = async (project: Project) => {
    try {
      showToast(`Đang đóng gói mã nguồn cho ${project.name}...`, 'info');
      const blob = await generateProjectZip(project);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const safeName = (project.name || 'website').toLowerCase().replace(/[^a-z0-9]/g, '-');
      a.href = url;
      a.download = `${safeName}-source-code.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      addActivityLog('Tải mã nguồn', `Tải gói source code ${safeName}.zip`, project.name);
      showToast(`Đã tải xuống gói mã nguồn .zip thành công!`);
    } catch (err) {
      console.error(err);
      showToast('Có lỗi xảy ra khi đóng gói mã nguồn.', 'info');
    }
  };

  const handleDeleteProject = (projectId: string) => {
    const toDelete = projects.find((p) => p.id === projectId);
    if (!toDelete) return;

    if (confirm(`Bạn có chắc muốn xóa dự án "${toDelete.name}"?`)) {
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      if (activeProject.id === projectId) {
        const remaining = projects.filter((p) => p.id !== projectId);
        if (remaining.length > 0) setActiveProject(remaining[0]);
      }
      addActivityLog('Xóa dự án', `Đã xóa dự án ${toDelete.name}`, toDelete.name);
      showToast(`Đã xóa dự án "${toDelete.name}".`);
    }
  };

  const handleCloneProject = (project: Project) => {
    const cloned: Project = {
      ...JSON.parse(JSON.stringify(project)),
      id: 'proj_' + Math.random().toString(36).substring(2, 9),
      name: `${project.name} (Bản sao)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects((prev) => [cloned, ...prev]);
    addActivityLog('Nhân bản', `Tạo bản sao từ ${project.name}`, cloned.name);
    showToast(`Đã nhân bản "${cloned.name}" thành công!`);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex cosmic-bg cosmic-stars relative selection:bg-amber-500/30 selection:text-amber-200">
      {/* Sidebar for Desktop */}
      <div className="hidden md:block">
        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab as any)}
          onOpenCreateModal={() => handleOpenCreateWizard()}
          projectsCount={projects.length}
        />
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="relative z-10 w-72 h-full">
            <Sidebar
              currentTab={currentTab}
              onSelectTab={(tab) => {
                setCurrentTab(tab as any);
                setMobileMenuOpen(false);
              }}
              onOpenCreateModal={() => {
                setMobileMenuOpen(false);
                handleOpenCreateWizard();
              }}
              projectsCount={projects.length}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Global Header */}
        <Header
          currentTab={currentTab}
          onOpenCreate={() => handleOpenCreateWizard()}
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          activeProjectName={activeProject?.name}
        />

        {/* View Routing */}
        <main className="flex-1 overflow-y-auto">
          {currentTab === 'dashboard' && (
            <Dashboard
              projects={projects}
              onOpenCreate={(hint) => handleOpenCreateWizard(hint)}
              onOpenEditor={(p) => {
                setActiveProject(p);
                setCurrentTab('editor');
              }}
              onOpenPreview={(p) => setPreviewModalProject(p)}
              onOpenPublish={(p) => setPublishModalProject(p)}
              onExportCode={handleExportZip}
            />
          )}

          {currentTab === 'projects' && (
            <MyWebsites
              projects={projects}
              onOpenCreate={() => handleOpenCreateWizard()}
              onOpenEditor={(p) => {
                setActiveProject(p);
                setCurrentTab('editor');
              }}
              onOpenPreview={(p) => setPreviewModalProject(p)}
              onOpenPublish={(p) => setPublishModalProject(p)}
              onExportCode={handleExportZip}
              onDeleteProject={handleDeleteProject}
              onCloneProject={handleCloneProject}
            />
          )}

          {currentTab === 'editor' && (
            <AiWebsiteEditor
              project={activeProject}
              onUpdateProject={handleUpdateProject}
              onExportCode={handleExportZip}
              onOpenPublish={(p) => setPublishModalProject(p)}
              onLogActivity={(action, details) => addActivityLog(action, details, activeProject.name)}
            />
          )}

          {currentTab === 'history' && (
            <ActivityHistory logs={activityLogs} />
          )}

          {currentTab === 'settings' && (
            <SettingsView />
          )}
        </main>
      </div>

      {/* MODAL 1: 5-Step Creation Wizard */}
      {showCreateWizard && (
        <CreateWizard
          initialUrl={createUrlHint}
          onClose={() => setShowCreateWizard(false)}
          onStartBuild={handleStartBuild}
        />
      )}

      {/* MODAL 2: 8-Step Build Progress Visualizer */}
      {buildingProject && (
        <BuildProgress
          project={buildingProject}
          onComplete={handleBuildComplete}
        />
      )}

      {/* MODAL 3: Publish & Hosting Modal */}
      {publishModalProject && (
        <PublishModal
          project={publishModalProject}
          onClose={() => setPublishModalProject(null)}
          onUpdateProject={handleUpdateProject}
          onExportZip={handleExportZip}
          onLogActivity={addActivityLog}
        />
      )}

      {/* MODAL 4: Fullscreen Preview Modal */}
      {previewModalProject && (
        <PreviewModal
          project={previewModalProject}
          onClose={() => setPreviewModalProject(null)}
          onOpenEditor={(p) => {
            setActiveProject(p);
            setCurrentTab('editor');
          }}
          onExportCode={handleExportZip}
          onOpenPublish={(p) => setPublishModalProject(p)}
        />
      )}

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl glass-panel-gold border border-amber-400/40 text-xs text-white shadow-2xl animate-fade-in">
          <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
          <span>{toastMessage.text}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
