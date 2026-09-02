/**
 * ============================================================================
 * TAHAP 7: DEFINISI TIPE DATA MINI PROJECT (types.ts)
 * ============================================================================
 * 
 * Memisahkan kontrak tipe data (Types/Interfaces) ke file terpisah adalah
 * praktik Clean Code standar industri. Hal ini memastikan:
 * 1. Single Source of Truth untuk struktur data aplikasi.
 * 2. Tipe data dapat di-import dan digunakan ulang di berbagai komponen
 *    tanpa duplikasi (DRY - Don't Repeat Yourself).
 */

// Tipe prioritas tugas menggunakan Union Literal Types
export type TaskPriority = "low" | "medium" | "high";

// Tipe status filter yang didukung
export type TaskFilter = "all" | "active" | "completed";

// Kontrak objek utama Tugas (Todo)
export interface TaskItem {
  id: string;              // Menggunakan string unik (timestamp/UUID)
  title: string;           // Judul tugas
  isCompleted: boolean;    // Status selesai / belum
  priority: TaskPriority;  // Tingkat urgensi
  createdAt: string;       // Waktu dibuat
}
