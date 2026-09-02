/**
 * ============================================================================
 * TAHAP 7: FORM TAMBAH TUGAS (TodoForm.tsx)
 * ============================================================================
 * 
 * TANGGUNG JAWAB KOMPONEN (Single Responsibility):
 * Hanya bertanggung jawab menangani input form dan memvalidasi sebelum
 * meneruskan data ke parent melalui callback prop `onAddTask`.
 */

import { useState } from "react";
import { Plus, AlertCircle } from "lucide-react";
import type { TaskPriority } from "./types";

// 1. Interface Props di atas Component (Clean Code)
export interface TodoFormProps {
  onAddTask: (title: string, priority: TaskPriority) => void;
}

// 2. Konstanta Nilai Bersih
const MIN_TITLE_LENGTH = 3;
const DEFAULT_PRIORITY: TaskPriority = "medium";

export function TodoForm({ onAddTask }: TodoFormProps) {
  // State lokal input teks
  const [title, setTitle] = useState<string>("");

  // State lokal dropdown prioritas
  const [priority, setPriority] = useState<TaskPriority>(DEFAULT_PRIORITY);

  // State pesan validasi
  const [validationError, setValidationError] = useState<string>("");

  // Handler perubahan input judul
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (validationError) {
      setValidationError("");
    }
  };

  // Handler perubahan dropdown prioritas
  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as TaskPriority);
  };

  // Handler submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    // Validasi input
    if (trimmedTitle.length < MIN_TITLE_LENGTH) {
      setValidationError(
        `Judul tugas terlalu singkat (minimal ${MIN_TITLE_LENGTH} karakter).`
      );
      return;
    }

    // Panggil callback parent (Props Upward Communication)
    onAddTask(trimmedTitle, priority);

    // Reset input setelah sukses
    setTitle("");
    setPriority(DEFAULT_PRIORITY);
    setValidationError("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-add-form">
      <div className="todo-form-inputs">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Tuliskan tugas baru Anda..."
          className={`todo-input-field ${validationError ? "input-error" : ""}`}
        />

        <select
          value={priority}
          onChange={handlePriorityChange}
          className="todo-select-priority"
        >
          <option value="high">Prioritas: Tinggi</option>
          <option value="medium">Prioritas: Sedang</option>
          <option value="low">Prioritas: Rendah</option>
        </select>

        <button type="submit" className="btn-add-task">
          <Plus size={14} />
          <span>Tambah Tugas</span>
        </button>
      </div>

      {/* Indikator Validasi */}
      {validationError && (
        <span className="form-error-text">
          <AlertCircle size={13} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle" }} />
          {validationError}
        </span>
      )}
    </form>
  );
}
