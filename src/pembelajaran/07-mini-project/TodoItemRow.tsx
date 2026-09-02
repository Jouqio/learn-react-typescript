/**
 * ============================================================================
 * TAHAP 7: BARIS ITEM TUGAS (TodoItemRow.tsx)
 * ============================================================================
 * 
 * TANGGUNG JAWAB KOMPONEN (Single Responsibility):
 * Bertanggung jawab menampilkan data satu item tugas, menangani aksi centang
 * (toggle complete), dan tombol hapus (delete).
 */

import { Trash2 } from "lucide-react";
import type { TaskItem } from "./types";

// Interface Props di atas Component
export interface TodoItemRowProps {
  task: TaskItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItemRow({ task, onToggle, onDelete }: TodoItemRowProps) {
  return (
    <li className={`task-row-item ${task.isCompleted ? "task-completed" : ""}`}>
      {/* Kolom Kiri: Checkbox & Judul */}
      <div className="task-row-left">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
          aria-label={`Tandai ${task.title} sebagai selesai`}
        />
        <div className="task-info">
          <span className="task-title-text">{task.title}</span>
          <small className="task-timestamp">{task.createdAt}</small>
        </div>
      </div>

      {/* Kolom Kanan: Badge Prioritas & Tombol Hapus */}
      <div className="task-row-right">
        <span className={`priority-pill priority-${task.priority}`}>
          {task.priority === "high" && "Tinggi"}
          {task.priority === "medium" && "Sedang"}
          {task.priority === "low" && "Rendah"}
        </span>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="btn-delete-task"
          title="Hapus tugas ini"
          aria-label="Hapus tugas"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </li>
  );
}
