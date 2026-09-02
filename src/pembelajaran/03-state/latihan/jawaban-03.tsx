/**
 * ============================================================================
 * KUNCI JAWABAN LATIHAN 03: useState & MULTIPLE STATE INTERAKTIF (jawaban-03.tsx)
 * ============================================================================
 * 
 * TUJUAN PEMBELAJARAN & EVALUASI:
 * Membandingkan solusi yang Anda buat di `latihan-03.tsx` dengan implementasi
 * standar industri: penggunaan updater function, penanganan multiple state,
 * dan reaktivitas Virtual DOM React.
 * ============================================================================
 */

import { useState } from "react";
import { CheckCircle2, Heart, Bookmark, RotateCcw, Sparkles } from "lucide-react";

// NILAI AWAL SEBAGAI KONSTANTA BERSIH
const INITIAL_LIKES = 0;
const INITIAL_BOOKMARKED = false;

export function Jawaban03() {
  // STATE 1: Menampung angka likes
  // KENAPA DIBERIKAN GENERIC TYPE <number>?
  // Meskipun TypeScript bisa otomatis mendeteksi (infer) tipe data dari nilai awal `0`,
  // menulis `<number>` secara eksplisit mempertegas kontrak memori komponen.
  const [likes, setLikes] = useState<number>(INITIAL_LIKES);

  // STATE 2: Menampung status boolean apakah artikel di-bookmark
  const [isBookmarked, setIsBookmarked] = useState<boolean>(INITIAL_BOOKMARKED);

  // HANDLER 1: Menambah Like dengan Updater Function
  // KENAPA HARUS `(prevLikes => prevLikes + 1)` BUKAN `setLikes(likes + 1)`?
  // Di React, pembaruan state bersifat asinkron (batching). Jika ada multiple update
  // yang terjadi berdekatan, menggunakan `likes + 1` dapat membaca nilai 'lama' yang basi (stale state).
  // Updater function menjamin kita selalu memodifikasi nilai paling mutakhir (latest state).
  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  // HANDLER 2: Toggle Status Bookmark
  // Pola `(prev => !prev)` adalah cara paling bersih untuk membalik nilai boolean
  // tanpa bergantung pada variabel luar closure.
  const handleToggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  // HANDLER 3: Reset Seluruh Interaksi
  const handleReset = () => {
    setLikes(INITIAL_LIKES);
    setIsBookmarked(INITIAL_BOOKMARKED);
  };

  return (
    <section className="learning-card" style={{ marginTop: "1rem" }}>
      <div className="card-top-meta">
        <span className="card-badge" style={{ color: "var(--success)", borderColor: "var(--success-border)" }}>
          <CheckCircle2 size={13} />
          Kunci Jawaban Latihan 03 (Resmi)
        </span>
      </div>

      <h3 className="card-title" style={{ fontSize: "1.3rem" }}>
        Kartu Interaktif Artikel & Apresiasi
      </h3>
      <p className="card-subtitle">
        Penerapan state independen: mengelola data counter dan flag boolean secara aman dan reaktif:
      </p>

      {/* Konten Artikel */}
      <div className="concept-box" style={{ background: "var(--bg-canvas)" }}>
        <h4 style={{ color: "var(--text-heading)", marginBottom: "0.5rem" }}>
          Panduan Memahami Clean Architecture di Frontend
        </h4>
        <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Pemisahan tanggung jawab komponen, kontrak type-safety dengan TypeScript,
          serta pembaruan state yang immutable adalah fondasi aplikasi yang tangguh.
        </p>
      </div>

      {/* Baris Status Data */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        padding: "1rem", 
        background: "var(--bg-subtle)", 
        borderRadius: "var(--radius-md)", 
        margin: "1rem 0",
        border: "1px solid var(--border-subtle)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Heart size={18} style={{ color: likes > 0 ? "var(--danger)" : "var(--text-muted)" }} />
          <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-heading)", fontFamily: "var(--font-mono)" }}>
            {likes} Likes
          </span>
          {likes >= 5 && (
            <span style={{ fontSize: "0.75rem", color: "var(--warning)", background: "var(--warning-subtle)", padding: "0.15rem 0.45rem", borderRadius: "var(--radius-sm)", display: "inline-flex", alignItems: "center", gap: "3px" }}>
              <Sparkles size={11} /> Populer!
            </span>
          )}
        </div>

        <div>
          <span className={`status-indicator ${isBookmarked ? "available" : ""}`}>
            <span className="status-dot"></span>
            <span>{isBookmarked ? "Tersimpan di Bookmark" : "Belum Disimpan"}</span>
          </span>
        </div>
      </div>

      {/* Tombol Interaksi */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={handleLike}
          className="btn-counter btn-increment"
          style={{ padding: "0.6rem 1rem" }}
        >
          <Heart size={14} style={{ color: "var(--danger)" }} />
          <span>Beri Like (+1)</span>
        </button>

        <button
          type="button"
          onClick={handleToggleBookmark}
          className="btn-counter"
          style={{ 
            padding: "0.6rem 1rem",
            background: isBookmarked ? "var(--accent-subtle)" : "var(--bg-surface)",
            borderColor: isBookmarked ? "var(--accent-border)" : "var(--border-subtle)"
          }}
        >
          <Bookmark size={14} style={{ color: isBookmarked ? "var(--accent)" : "var(--text-muted)" }} />
          <span>{isBookmarked ? "Hapus Bookmark" : "Simpan Bookmark"}</span>
        </button>

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

      <div style={{ marginTop: "1.25rem", padding: "0.75rem", background: "var(--bg-canvas)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.82rem" }}>
        <span style={{ color: "var(--success)", fontWeight: 600 }}>Poin Evaluasi: </span>
        Apakah Anda berhasil menggunakan fungsi updater <code>(prev =&gt; prev + 1)</code> untuk state angka dan <code>(prev =&gt; !prev)</code> untuk toggle boolean? Kedua teknik ini adalah best practice wajib di React modern!
      </div>
    </section>
  );
}

export default Jawaban03;

/* ============================================================================
 * PENJELASAN TAMBAHAN (MATERI KUNCI TAHAP 3)
 * ============================================================================
 * 
 * 1. BAGAIMANA REACT TAHU KAPAN HARUS MERENDER ULANG TAMPILAN?
 *    React HANYA merender ulang tampilan ketika fungsi setter (seperti `setLikes` atau
 *    `setIsBookmarked`) dipanggil. Memodifikasi variabel secara langsung tidak akan pernah
 *    memicu rendering ulang Virtual DOM.
 * 
 * 2. KAPAN HARUS MEMISAHKAN MENJADI DUA STATE BERBEDA?
 *    Jika dua data berubah secara independen (misal: jumlah like dan status bookmark tidak
 *    selalu berubah bersamaan), lebih baik deklarasikan sebagai 2 `useState` terpisah
 *    daripada menggabungkannya dalam 1 objek kompleks. Ini menjaga kode tetap simpel dan modular.
 * 
 * ============================================================================
 * KESALAHAN UMUM PEMULA (HATI-HATI!):
 * ============================================================================
 * 
 * ❌ Kesalahan 1: Mutasi langsung tanpa setter function
 *    Contoh: `likes = likes + 1;`
 *    Akibat: Nilai variabel bertambah di memori JavaScript, TETAPI tampilan di layar
 *    tetap tidak berubah karena React tidak tahu ada data yang baru!
 * 
 * ❌ Kesalahan 2: Memanggil setter secara naif berkali-kali
 *    Contoh:
 *    setLikes(likes + 1);
 *    setLikes(likes + 1);
 *    Akibat: Anda mengira like bertambah 2, padahal hanya bertambah 1! Karena kedua
 *    pemanggilan membaca nilai snapshot `likes` yang sama.
 *    Solusi Benar:
 *    setLikes(prev => prev + 1);
 *    setLikes(prev => prev + 1); // Dijamin bertambah 2!
 * ============================================================================
 */
