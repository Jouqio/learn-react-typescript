/**
 * ============================================================================
 * MODULE SELECTOR COMPONENT (ModuleSelector.tsx)
 * Card Grid Pemilih Tahap Kurikulum
 * ============================================================================
 */

import { CheckCircle2, LayoutGrid } from "lucide-react";

export interface ModuleItem {
  id: number;
  step: string;
  title: string;
  icon?: React.ReactNode;
}

interface ModuleSelectorProps {
  modules: ModuleItem[];
  activeModuleId: number;
  onSelectModule: (id: number) => void;
}

export function ModuleSelector({
  modules,
  activeModuleId,
  onSelectModule,
}: ModuleSelectorProps) {
  return (
    <nav className="curriculum-nav-wrapper" aria-label="Pemilih Modul Kurikulum">
      {/* Header Card */}
      <div className="curriculum-nav-header">
        <span className="curriculum-nav-title">
          <CheckCircle2 size={16} className="nav-title-icon" />
          <span>Pilih Modul Pembelajaran</span>
        </span>
        <span className="curriculum-progress-text">
          {activeModuleId === 0
            ? "Semua Modul (7 Tahap)"
            : `Modul ${activeModuleId} dari ${modules.length}`}
        </span>
      </div>

      {/* Grid Tombol Tahap 1 - 7 */}
      <div className="module-nav-grid">
        {modules.map((m) => {
          const isActive = activeModuleId === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelectModule(m.id)}
              className={`module-nav-btn ${isActive ? "active" : ""}`}
              aria-pressed={isActive}
            >
              <span className="module-nav-step">{m.step}</span>
              <span className="module-nav-name">{m.title}</span>
            </button>
          );
        })}
      </div>

      {/* Link Bawah: Tampilkan Semua Modul */}
      <div className="module-selector-footer">
        <button
          type="button"
          onClick={() => onSelectModule(0)}
          className={`all-modules-btn ${activeModuleId === 0 ? "active" : ""}`}
        >
          <LayoutGrid size={14} />
          <span>Tampilkan Semua Modul (Roadmap Lengkap)</span>
        </button>
      </div>
    </nav>
  );
}

export default ModuleSelector;
