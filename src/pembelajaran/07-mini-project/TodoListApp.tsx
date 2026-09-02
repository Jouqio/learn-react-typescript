/**
 * ============================================================================
 * TAHAP 7: MINI PROJECT AKHIR - TODO LIST APP (TodoListApp.tsx)
 * ============================================================================
 * 
 * TUJUAN AKHIR PEMBELAJARAN REACT + TYPESCRIPT DASAR:
 * Mengintegrasikan seluruh materi yang telah dipelajari dari Tahap 1 hingga Tahap 6:
 * 1. Component Architecture & Single Responsibility (Tahap 1)
 * 2. Props & Interface Type Contracts (Tahap 2)
 * 3. State Management dengan useState & Immutable Update (Tahap 3)
 * 4. Event Handling, Form Input & Validasi (Tahap 4)
 * 5. Lifecycle & Interaktivitas UI (Tahap 5)
 * 6. Conditional Rendering & List Rendering dengan Key Unik (Tahap 6)
 */

import { useState } from "react";
import { FolderKanban, Layers, CheckSquare, Inbox } from "lucide-react";
import type { TaskItem, TaskPriority, TaskFilter } from "./types";
import { TodoForm } from "./TodoForm";
import { TodoItemRow } from "./TodoItemRow";
import { TodoFilterBar } from "./TodoFilterBar";

// Data awal sebagai demonstrasi saat aplikasi dibuka
const INITIAL_TASKS: TaskItem[] = [
  {
    id: "task-1",
    title: "Menyelesaikan Modul TypeScript Murni",
    isCompleted: true,
    priority: "high",
    createdAt: "08:30 WIB",
  },
  {
    id: "task-2",
    title: "Mempelajari Props, State, dan Event di React",
    isCompleted: true,
    priority: "high",
    createdAt: "09:15 WIB",
  },
  {
    id: "task-3",
    title: "Membangun Mini Project Todo List Lengkap",
    isCompleted: false,
    priority: "medium",
    createdAt: "10:00 WIB",
  },
];

export function TodoListApp() {
  // 1. State Daftar Tugas
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);

  // 2. State Filter Aktif
  const [currentFilter, setCurrentFilter] = useState<TaskFilter>("all");

  // Handler: Tambah Tugas Baru (Immutable Array Prepend)
  const handleAddTask = (title: string, priority: TaskPriority) => {
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: title,
      isCompleted: false,
      priority: priority,
      createdAt: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }) + " WIB",
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  // Handler: Toggle Selesai (Immutable Array Map)
  const handleToggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  // Handler: Hapus Tugas Berdasarkan ID (Immutable Array Filter)
  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Handler: Bersihkan Semua Tugas yang Sudah Selesai
  const handleClearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.isCompleted));
  };

  // Logika Penyaringan (Filtering Data)
  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "active") return !task.isCompleted;
    if (currentFilter === "completed") return task.isCompleted;
    return true; // "all"
  });

  // Hitungan Statistik
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const activeCount = totalCount - completedCount;

  return (
    <section className="learning-card mini-project-container">
      <div className="card-top-meta">
        <div className="card-badge accent">
          <FolderKanban size={14} />
          Tahap 7: Mini Project Akhir
        </div>
      </div>
      
      <div className="project-header">
        <h2 className="card-title">TaskFlow: Todo List App</h2>
        <p className="card-subtitle">
          Aplikasi pengelola tugas lengkap dengan penambahan, penghapusan, filter status,
          dan validasi input berbasis Clean Architecture.
        </p>
      </div>

      {/* 1. Component Form Tambah Tugas */}
      <TodoForm onAddTask={handleAddTask} />

      {/* 2. Component Bilah Filter & Statistik */}
      <TodoFilterBar
        currentFilter={currentFilter}
        totalCount={totalCount}
        activeCount={activeCount}
        completedCount={completedCount}
        onFilterChange={setCurrentFilter}
        onClearCompleted={handleClearCompleted}
      />

      {/* 3. Daftar Tugas (List Rendering / Empty State) */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state-box">
          {currentFilter === "all" ? (
            <>
              <CheckSquare size={18} />
              <span>Belum ada tugas. Tambahkan tugas pertama Anda di atas.</span>
            </>
          ) : (
            <>
              <Inbox size={18} />
              <span>Tidak ada tugas dalam kategori "{currentFilter}".</span>
            </>
          )}
        </div>
      ) : (
        <ul className="task-list-ul">
          {filteredTasks.map((task) => (
            <TodoItemRow
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </ul>
      )}

      {/* Ringkasan Kode Arsitektur */}
      <div className="architecture-summary">
        <h4>
          <Layers size={14} />
          Arsitektur Bersih yang Diterapkan
        </h4>
        <div className="arch-tags">
          <span className="arch-tag">Single Responsibility</span>
          <span className="arch-tag">Type Contracts (types.ts)</span>
          <span className="arch-tag">Immutable State Updates</span>
          <span className="arch-tag">Strict TypeScript Generics</span>
        </div>
      </div>
    </section>
  );
}
