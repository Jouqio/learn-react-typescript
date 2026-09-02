/**
 * ============================================================================
 * SIDEBAR COMPONENT (Sidebar.tsx)
 * Modern Icon-only Technical Navigation Sidebar
 * ============================================================================
 */

import { 
  Atom, 
  Home, 
  BookOpen, 
  Code2, 
  FileText, 
  FolderKanban, 
  BarChart2, 
  Settings 
} from "lucide-react";

export type SidebarTab = "home" | "materi" | "runner" | "docs" | "files" | "progress" | "settings";

interface SidebarProps {
  activeTab: SidebarTab;
  onSelectTab: (tab: SidebarTab) => void;
}

interface SidebarItem {
  id: SidebarTab;
  label: string;
  icon: React.ReactNode;
}

export function Sidebar({ activeTab, onSelectTab }: SidebarProps) {
  const menuItems: SidebarItem[] = [
    { id: "home", label: "Dashboard Home", icon: <Home size={20} /> },
    { id: "materi", label: "Materi Pembelajaran", icon: <BookOpen size={20} /> },
    { id: "runner", label: "Latihan Runner", icon: <Code2 size={20} /> },
    { id: "docs", label: "Dokumentasi", icon: <FileText size={20} /> },
    { id: "files", label: "Struktur Proyek", icon: <FolderKanban size={20} /> },
    { id: "progress", label: "Progres Belajar", icon: <BarChart2 size={20} /> },
  ];

  return (
    <aside className="dashboard-sidebar" aria-label="Navigasi Utama">
      {/* Brand Logo di Paling Atas */}
      <div className="sidebar-logo" title="React + TypeScript Curriculum">
        <Atom size={28} className="sidebar-logo-icon" />
      </div>

      {/* Navigasi Vertikal Icon-Only */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`sidebar-icon-btn ${isActive ? "active" : ""}`}
              title={item.label}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              {item.icon}
            </button>
          );
        })}
      </nav>

      {/* Bagian Bawah: Settings */}
      <div className="sidebar-footer">
        <button
          type="button"
          onClick={() => onSelectTab("settings")}
          className={`sidebar-icon-btn ${activeTab === "settings" ? "active" : ""}`}
          title="Pengaturan Lingkungan"
          aria-label="Pengaturan Lingkungan"
        >
          <Settings size={20} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
