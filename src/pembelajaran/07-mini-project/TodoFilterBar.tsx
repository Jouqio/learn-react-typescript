/**
 * ============================================================================
 * TAHAP 7: BILAH FILTER & STATISTIK (TodoFilterBar.tsx)
 * ============================================================================
 * 
 * TANGGUNG JAWAB KOMPONEN (Single Responsibility):
 * Menampilkan opsi filter (Semua, Aktif, Selesai), counter statistik,
 * dan tombol pembersih tugas selesai.
 */

import { Trash2 } from "lucide-react";
import type { TaskFilter } from "./types";

// Interface Props di atas Component
export interface TodoFilterBarProps {
  currentFilter: TaskFilter;
  totalCount: number;
  activeCount: number;
  completedCount: number;
  onFilterChange: (filter: TaskFilter) => void;
  onClearCompleted: () => void;
}

export function TodoFilterBar({
  currentFilter,
  totalCount,
  activeCount,
  completedCount,
  onFilterChange,
  onClearCompleted,
}: TodoFilterBarProps) {
  return (
    <div className="todo-filter-bar">
      {/* Tombol Tab Filter */}
      <div className="filter-pill-group">
        <button
          type="button"
          onClick={() => onFilterChange("all")}
          className={`filter-tab ${currentFilter === "all" ? "active" : ""}`}
        >
          Semua ({totalCount})
        </button>

        <button
          type="button"
          onClick={() => onFilterChange("active")}
          className={`filter-tab ${currentFilter === "active" ? "active" : ""}`}
        >
          Aktif ({activeCount})
        </button>

        <button
          type="button"
          onClick={() => onFilterChange("completed")}
          className={`filter-tab ${currentFilter === "completed" ? "active" : ""}`}
        >
          Selesai ({completedCount})
        </button>
      </div>

      {/* Tombol Bersihkan Selesai jika ada item selesai */}
      {completedCount > 0 && (
        <button
          type="button"
          onClick={onClearCompleted}
          className="btn-clear-completed"
        >
          <Trash2 size={13} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
          Bersihkan Selesai ({completedCount})
        </button>
      )}
    </div>
  );
}
