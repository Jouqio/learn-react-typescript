/**
 * ============================================================================
 * TAHAP 3: LATIHAN PRAKTIK useState (Counter.tsx)
 * ============================================================================
 * 
 * TUJUAN PEMBELAJARAN:
 * 1. Menggunakan hook `useState` untuk menyimpan dan memanipulasi angka.
 * 2. Menggunakan updater function: `setCount(prev => prev + step)`
 *    (praktek terbaik agar update selalu berdasarkan state paling mutakhir).
 * 3. Menggabungkan Props + State: Props memberikan nilai awal (initial value),
 *    sedangkan State mengelola perubahan nilai tersebut di dalam component.
 */

import { useState } from "react";
import { Gauge, Plus, Minus, RotateCcw } from "lucide-react";

// 1. Interface Props untuk Counter
export interface CounterProps {
  initialValue?: number; // Nilai awal (opsional, default: 0)
  step?: number;         // Besaran penambahan/pengurangan (opsional, default: 1)
  label?: string;        // Label deskripsi (opsional)
}

// 2. Konstanta Nilai Default (Clean Code)
const DEFAULT_INITIAL_VALUE = 0;
const DEFAULT_STEP = 1;
const DEFAULT_LABEL = "Penghitung Angka (Counter)";

export function Counter({
  initialValue = DEFAULT_INITIAL_VALUE,
  step = DEFAULT_STEP,
  label = DEFAULT_LABEL,
}: CounterProps) {
  // State: count bertipe number, dengan nilai awal dari props `initialValue`
  const [count, setCount] = useState<number>(initialValue);

  // State kedua: riwayat aksi terakhir (contoh multiple state dalam 1 component)
  const [lastAction, setLastAction] = useState<string>("Belum ada interaksi");

  // Handler fungsi bersih untuk Tambah (+)
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + step);
    setLastAction(`Ditambah +${step}`);
  };

  // Handler fungsi bersih untuk Kurang (-)
  const handleDecrement = () => {
    setCount((prevCount) => prevCount - step);
    setLastAction(`Dikurang -${step}`);
  };

  // Handler fungsi bersih untuk Reset (0)
  const handleReset = () => {
    setCount(initialValue);
    setLastAction(`Direset ke nilai awal (${initialValue})`);
  };

  return (
    <div className="counter-container">
      <div className="counter-header">
        <h4 className="counter-title">{label}</h4>
        <span className="step-badge">Langkah: ±{step}</span>
      </div>

      {/* Nilai Count Utama */}
      <div className="counter-display">
        <span className="count-number">{count}</span>
        <span className="count-action-info">Aksi: {lastAction}</span>
      </div>

      {/* Tombol Interaksi */}
      <div className="counter-actions">
        <button
          type="button"
          onClick={handleDecrement}
          className="btn-counter btn-decrement"
          title={`Kurangi ${step}`}
        >
          <Minus size={13} />
          <span>{step}</span>
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="btn-counter btn-reset"
          title="Reset ke nilai awal"
        >
          <RotateCcw size={13} />
          <span>Reset</span>
        </button>

        <button
          type="button"
          onClick={handleIncrement}
          className="btn-counter btn-increment"
          title={`Tambah ${step}`}
        >
          <Plus size={13} />
          <span>{step}</span>
        </button>
      </div>
    </div>
  );
}

/**
 * Component Showcase Counter
 * Menampilkan 2 variasi Counter untuk membuktikan bahwa setiap instansi
 * component memiliki "State Independen"
 */
export function CounterShowcase() {
  return (
    <section className="learning-card">
      <div className="card-top-meta">
        <div className="card-badge">
          <Gauge size={14} />
          Tahap 3: Praktik Interaktif
        </div>
      </div>

      <h2 className="card-title">Penerapan State Interaktif pada Component</h2>
      <p className="card-subtitle">
        Klik tombol di bawah untuk melihat bagaimana React otomatis me-render ulang
        komponen saat state berubah. Kedua counter ini memiliki state independen:
      </p>

      <div className="counter-grid">
        {/* Counter 1: Standar step 1 */}
        <Counter initialValue={0} step={1} label="Counter A (Langkah 1)" />

        {/* Counter 2: Step 5 dengan nilai awal 10 */}
        <Counter initialValue={10} step={5} label="Counter B (Langkah 5, Awal 10)" />
      </div>
    </section>
  );
}
