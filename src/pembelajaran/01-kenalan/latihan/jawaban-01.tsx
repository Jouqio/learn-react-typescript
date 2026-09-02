/**
 * ============================================================================
 * KUNCI JAWABAN LATIHAN 01: COMPONENT DASAR & SINTAKS JSX (jawaban-01.tsx)
 * ============================================================================
 * 
 * TUJUAN PEMBELAJARAN & EVALUASI:
 * Membandingkan solusi yang Anda buat di `latihan-01.tsx` dengan implementasi
 * standar Clean Code berbasis TypeScript dan React modern.
 * ============================================================================
 */

import { CheckCircle2, User, Heart } from "lucide-react";

// KENAPA KONSTANTA DITULIS DENGAN HURUF KAPITAL (UPPER_SNAKE_CASE)?
// Di JavaScript/TypeScript, konstanta bernilai statis yang tidak pernah berubah
// di luar scope fungsi secara konvensi ditulis dengan UPPER_SNAKE_CASE.
// Ini memudahkan developer membedakan antara variabel dinamis vs konstanta statis.

const NAMA_LENGKAP: string = "Zakie Kurniawan";
const UMUR: number = 21;
const PEKERJAAN_IMPIAN: string = "Senior Frontend Architect";

// Array string yang menyimpan daftar hobi
const DAFTAR_HOBI: readonly string[] = [
  "Mempelajari Arsitektur Clean Code",
  "Membaca Dokumentasi Teknologi Baru",
  "Mendengarkan Musik Lo-Fi saat Coding",
];

/**
 * Component Jawaban01 (Perkenalan Diri)
 * 
 * ALASAN DESAIN ARSITEKTUR:
 * 1. Nama component menggunakan PascalCase (`Jawaban01`). React mewajibkan huruf
 *    pertama kapital agar Virtual DOM dapat membedakan antara tag bawaan HTML (div, h1, p)
 *    dengan component kustom buatan developer.
 * 2. Mengembalikan satu elemen pembungkus (<article> atau <>...</>) untuk mematuhi
 *    aturan Single Root Element JSX.
 */
export function Jawaban01() {
  return (
    <article className="learning-card" style={{ marginTop: "1rem" }}>
      {/* Header Kartu: Status Selesai */}
      <div className="card-top-meta">
        <span className="card-badge" style={{ color: "var(--success)", borderColor: "var(--success-border)" }}>
          <CheckCircle2 size={13} />
          Kunci Jawaban Latihan 01 (Resmi)
        </span>
      </div>

      {/* Judul: Menggunakan interpolasi string {} */}
      <h3 className="card-title" style={{ fontSize: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <User size={18} style={{ color: "var(--accent)" }} />
        <span>Halo, Saya {NAMA_LENGKAP}!</span>
      </h3>

      {/* Deskripsi: Menggabungkan beberapa variabel dalam satu paragraf */}
      <p className="card-subtitle" style={{ marginBottom: "1.25rem" }}>
        Saat ini saya berumur <strong>{UMUR} tahun</strong> dan bercita-cita menjadi{" "}
        <span style={{ color: "var(--accent)" }}>{PEKERJAAN_IMPIAN}</span>.
      </p>

      {/* Box Daftar Hobi */}
      <div className="concept-box">
        <div className="concept-box-header">
          <Heart size={15} style={{ color: "var(--danger)" }} />
          <span>Hobi & Ketertarikan:</span>
        </div>
        <ul>
          {/* 
            Pada Tahap 1, kita menampilkan item array secara terstruktur.
            Setiap variabel TypeScript diapit kurung kurawal {} agar dievaluasi oleh JSX.
          */}
          <li>{DAFTAR_HOBI[0]}</li>
          <li>{DAFTAR_HOBI[1]}</li>
          <li>{DAFTAR_HOBI[2]}</li>
        </ul>
      </div>

      {/* Catatan Evaluasi Clean Code */}
      <div style={{ marginTop: "1rem", padding: "0.75rem", background: "var(--bg-canvas)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.82rem" }}>
        <span style={{ color: "var(--success)", fontWeight: 600 }}>Poin Evaluasi: </span>
        Apakah kode Anda sudah membungkus semua elemen dalam 1 root tag, menggunakan kurung kurawal <code>&#123;&#125;</code> untuk variabel, dan bebas dari error TypeScript? Jika ya, selamat! Anda telah menguasai dasar sintaks JSX.
      </div>
    </article>
  );
}

export default Jawaban01;

/* ============================================================================
 * PENJELASAN TAMBAHAN (MATERI KUNCI TAHAP 1)
 * ============================================================================
 * 
 * 1. MENGAPA BUTUH KURUNG KURAWAL `{}` DI DALAM JSX?
 *    Di dalam JSX, teks di luar kurung kurawal dianggap sebagai string HTML biasa.
 *    Ketika kita ingin "keluar sejenak dari mode HTML" dan "masuk ke mode JavaScript/TypeScript",
 *    kita menyisipkan kurung kurawal `{namaVariabel}`.
 * 
 * 2. ATURAN SINGLE ROOT ELEMENT:
 *    Component React harus mengembalikan TEPAT SATU elemen induk.
 *    Jika Anda mencoba me-return dua tag sejajar tanpa pembungkus seperti ini:
 *       return (
 *         <h1>Halo</h1>
 *         <p>Deskripsi</p>
 *       );
 *    Maka TypeScript/Babel akan melempar SyntaxError.
 *    Solusinya: Bungkus dengan `<article>`, `<div>`, atau React Fragment `<> ... </>`.
 * 
 * ============================================================================
 * KESALAHAN UMUM PEMULA (HATI-HATI!):
 * ============================================================================
 * 
 * ❌ Kesalahan 1: Lupa kurung kurawal saat memanggil variabel
 *    Contoh: `<h1>Halo, Saya NAMA_LENGKAP!</h1>`
 *    Akibat: Di layar akan muncul tulisan harfiah "NAMA_LENGKAP", bukan isi dari variabelnya!
 * 
 * ❌ Kesalahan 2: Memberi nama function component dengan huruf kecil
 *    Contoh: `function perkenalanDiri() { return <div>...</div>; }`
 *    Akibat: React mengira `perkenalanDiri` adalah tag HTML biasa (seperti <div> atau <span>),
 *    sehingga tidak akan dirender dengan benar. Wajib diawali huruf kapital (`PerkenalanDiri`).
 * 
 * ❌ Kesalahan 3: Menggunakan atribut HTML `class` bukan `className`
 *    Contoh: `<div class="card">...</div>`
 *    Akibat: Muncul peringatan di console browser karena kata `class` sudah menjadi
 *    kata kunci bawaan (reserved keyword) milik JavaScript untuk mendefinisikan Class OOP.
 * ============================================================================
 */
