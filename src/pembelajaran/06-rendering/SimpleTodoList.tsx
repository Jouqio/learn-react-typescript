/**
 * ============================================================================
 * TAHAP 6: PRAKTIK RENDERING LIST & KONDISIONAL (SimpleTodoList.tsx)
 * ============================================================================
 * 
 * TUJUAN PEMBELAJARAN:
 * 1. Merender array objek dengan method `.map()` dan key unik `todo.id`.
 * 2. Menerapkan Conditional Rendering:
 *    - Penyaringan data (Filter: Semua / Aktif / Selesai)
 *    - Tampilan Empty State jika hasil filter kosong
 *    - Badge prioritas dengan warna kondisional terukur
 *    - Teks tercoret saat status `isCompleted === true`
 * 3. Memperbarui status item dalam array secara immutable (`.map()` saat update).
 */

import { useState } from "react";
import { ListChecks, Inbox } from "lucide-react";

// 1. Tipe Data Prioritas & Interface Todo (Type Safety)
export type PriorityLevel = "low" | "medium" | "high";
export type FilterType = "all" | "active" | "completed";

export interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
  priority: PriorityLevel;
}

// 2. Data Awal Contoh (Clean Code)
const INITIAL_TODOS: TodoItem[] = [
  {
    id: 101,
    title: "Pelajari Konsep JSX & Component",
    isCompleted: true,
    priority: "high",
  },
  {
    id: 102,
    title: "Pahami Props & Typing Interface",
    isCompleted: true,
    priority: "high",
  },
  {
    id: 103,
    title: "Kuasai useState & Event Handling",
    isCompleted: false,
    priority: "medium",
  },
  {
    id: 104,
    title: "Eksplorasi API Fetching dengan useEffect",
    isCompleted: false,
    priority: "low",
  },
];

export function SimpleTodoList() {
  // State daftar todo (array of TodoItem)
  const [todos, setTodos] = useState<TodoItem[]>(INITIAL_TODOS);

  // State tab filter yang aktif
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  // Handler untuk toggle status selesai (Immutable Update)
  const handleToggleComplete = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  // Filter list data berdasarkan activeFilter
  const filteredTodos = todos.filter((todo) => {
    if (activeFilter === "active") return !todo.isCompleted;
    if (activeFilter === "completed") return todo.isCompleted;
    return true; // "all"
  });

  // Hitung jumlah tugas yang selesai
  const completedCount = todos.filter((t) => t.isCompleted).length;
  const totalCount = todos.length;

  return (
    <section className="learning-card">
      <div className="card-top-meta">
        <div className="card-badge">
          <ListChecks size={14} />
          Tahap 6: Praktik List & Kondisional
        </div>
      </div>

      <div className="todo-header-row">
        <div>
          <h2 className="card-title">Daftar Agenda Belajar (Todo List)</h2>
          <p className="card-subtitle">
            Klik kotak centang untuk menandai selesai, dan ubah filter di bawah
          </p>
        </div>
        <div className="progress-pill">
          {completedCount} / {totalCount} Selesai
        </div>
      </div>

      {/* Filter Tabs (Conditional Styling) */}
      <div className="filter-button-group">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`btn-filter ${activeFilter === "all" ? "active" : ""}`}
        >
          Semua ({totalCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("active")}
          className={`btn-filter ${activeFilter === "active" ? "active" : ""}`}
        >
          Aktif ({totalCount - completedCount})
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("completed")}
          className={`btn-filter ${activeFilter === "completed" ? "active" : ""}`}
        >
          Selesai ({completedCount})
        </button>
      </div>

      {/* Conditional Rendering: Jika Filter Kosong */}
      {filteredTodos.length === 0 ? (
        <div className="empty-state-box">
          <Inbox size={18} style={{ color: "var(--text-muted)" }} />
          <span>Tidak ada agenda dalam filter ini.</span>
        </div>
      ) : (
        /* List Rendering: Looping dengan .map() dan key unik */
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              onClick={() => handleToggleComplete(todo.id)}
              className={`todo-item ${todo.isCompleted ? "completed" : ""}`}
            >
              <div className="todo-left">
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => handleToggleComplete(todo.id)}
                  className="todo-checkbox"
                />
                <span className="todo-title">{todo.title}</span>
              </div>

              {/* Badge Prioritas Kondisional */}
              <span className={`priority-badge priority-${todo.priority}`}>
                {todo.priority === "high" && "Tinggi"}
                {todo.priority === "medium" && "Sedang"}
                {todo.priority === "low" && "Rendah"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
