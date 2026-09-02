/**
 * ============================================================================
 * LATIHAN 03: useState & MULTIPLE STATE INTERAKTIF (latihan-03.tsx)
 * ============================================================================
 * 
 * TUJUAN LATIHAN:
 * 1. Menggunakan hook `useState` dengan static typing TypeScript.
 * 2. Mengelola lebih dari satu state independen dalam satu component:
 *    - State 1: `likes` (number) untuk menghitung jumlah apresiasi/like.
 *    - State 2: `isBookmarked` (boolean) untuk toggle status simpan artikel.
 * 3. Menerapkan Updater Function `(prev => prev + 1)` saat mengupdate state angka.
 * 4. Menerapkan toggle boolean `(prev => !prev)` untuk mengubah status true/false.
 * 
 * ESTIMASI TINGKAT KESULITAN:
 * 🟢 Mudah - Sedang
 * 
 * PETUNJUK PENGERJAAN:
 * - Ikuti setiap instruksi bertanda `// TODO:` secara berurutan.
 * - Kode ini sudah bisa dijalankan tanpa error sejak awal.
 * ============================================================================
 */

import { useState } from "react";
import { Heart, Bookmark, RotateCcw } from "lucide-react";

export function Latihan03() {
  // TODO 1: Deklarasikan state 'likes' bertipe number dengan nilai awal 0
  // Contoh: const [likes, setLikes] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);

  // TODO 2: Deklarasikan state 'isBookmarked' bertipe boolean dengan nilai awal false
  // Contoh: const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // TODO 3: Buat fungsi handler untuk menambah like
  // PENTING: Gunakan updater function `(prev => prev + 1)` agar selalu akurat!
  const handleLike = () => {
    // TODO 3.1: Panggil setLikes dengan callback updater function
    setLikes((prevLikes) => prevLikes + 1);
  };

  // TODO 4: Buat fungsi handler untuk toggle bookmark
  // Nilai dibalik: jika true jadi false, jika false jadi true
  const handleToggleBookmark = () => {
    // TODO 4.1: Panggil setIsBookmarked dengan `(prev => !prev)`
    setIsBookmarked((prev) => !prev);
  };

  // TODO 5: Buat fungsi reset untuk mengembalikan kedua state ke nilai awal
  const handleReset = () => {
    // TODO 5.1: Reset likes ke 0 dan isBookmarked ke false
    setLikes(0);
    setIsBookmarked(false);
  };

  return (
    <section className="learning-card" style={{ marginTop: "1rem" }}>
      <div className="card-top-meta">
        <span className="card-badge">Soal Latihan 03</span>
      </div>

      <h3 className="card-title" style={{ fontSize: "1.3rem" }}>
        Kartu Interaktif Artikel & Apresiasi
      </h3>
      <p className="card-subtitle">
        Latihan mengelola beberapa state independen (angka counter dan status toggle boolean):
      </p>

      {/* Konten Kartu Artikel */}
      <div className="concept-box" style={{ background: "var(--bg-canvas)" }}>
        <h4 style={{ color: "var(--text-heading)", marginBottom: "0.5rem" }}>
          Panduan Memahami Clean Architecture di Frontend
        </h4>
        <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Pemisahan tanggung jawab komponen, kontrak type-safety dengan TypeScript,
          serta pembaruan state yang immutable adalah fondasi aplikasi yang tangguh.
        </p>
      </div>

      {/* Baris Status & Indikator Interaksi */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        padding: "1rem", 
        background: "var(--bg-subtle)", 
        borderRadius: "var(--radius-md)", 
        margin: "1rem 0" 
      }}>
        <div>
          {/* TODO 6: Tampilkan nilai state `likes` di dalam span */}
          <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)" }}>
            ❤️ {likes} Likes
          </span>
        </div>

        <div>
          {/* TODO 7: Tampilkan status Bookmark berdasarkan state `isBookmarked` */}
          <span className={`status-indicator ${isBookmarked ? "available" : ""}`}>
            <span className="status-dot"></span>
            <span>{isBookmarked ? "Tersimpan di Bookmark" : "Belum Disimpan"}</span>
          </span>
        </div>
      </div>

      {/* Tombol-Tombol Aksi Interaktif */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {/* Tombol Like */}
        <button
          type="button"
          onClick={handleLike}
          className="btn-counter btn-increment"
          style={{ padding: "0.6rem 1rem" }}
        >
          <Heart size={14} style={{ color: "var(--danger)" }} />
          <span>Beri Like (+1)</span>
        </button>

        {/* Tombol Toggle Bookmark */}
        <button
          type="button"
          onClick={handleToggleBookmark}
          className="btn-counter"
          style={{ padding: "0.6rem 1rem" }}
        >
          <Bookmark size={14} style={{ color: isBookmarked ? "var(--accent)" : "var(--text-muted)" }} />
          <span>{isBookmarked ? "Hapus Bookmark" : "Simpan Bookmark"}</span>
        </button>

        {/* Tombol Reset */}
        <button
          type="button"
          onClick={handleReset}
          className="btn-counter btn-reset"
          style={{ padding: "0.6rem 1rem" }}
        >
          <RotateCcw size={14} />
          <span>Reset Interaksi</span>
        </button>
      </div>

      <div style={{ marginTop: "1.25rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
        <em>
          💡 Setelah selesai mencoba interaksi klik di atas, periksa kunci jawaban resmi di{" "}
          <code>src/pembelajaran/03-state/latihan/jawaban-03.tsx</code>.
        </em>
      </div>
    </section>
  );
}

export default Latihan03;
