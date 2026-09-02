/**
 * ============================================================================
 * KUNCI JAWABAN LATIHAN 06: CONDITIONAL & LIST RENDERING (jawaban-06.tsx)
 * ============================================================================
 * 
 * TUJUAN PEMBELAJARAN & EVALUASI:
 * Membandingkan solusi yang Anda buat di `latihan-06.tsx` dengan implementasi
 * standar industri: penanganan prop `key` unik, rekonsiliasi Virtual DOM,
 * pembaruan list secara immutable, dan conditional rendering anti-gotcha.
 * ============================================================================
 */

import { useState } from "react";
import { CheckCircle2, BookOpen, CheckCircle, Clock, Filter, Inbox } from "lucide-react";

// KONTRAK DATA ENTITAS BUKU
export interface BukuItem {
  id: string;
  judul: string;
  penulis: string;
  sedangDipinjam: boolean;
}

// UNION TYPE UNTUK FILTER (MEMBATASI HANYA PADA 3 NILAI VALID)
type FilterBuku = "semua" | "tersedia" | "dipinjam";

const DAFTAR_BUKU_AWAL: BukuItem[] = [
  { id: "buku-1", judul: "Clean Code: A Handbook of Agile Craftsmanship", penulis: "Robert C. Martin", sedangDipinjam: false },
  { id: "buku-2", judul: "The Pragmatic Programmer", penulis: "Andrew Hunt & David Thomas", sedangDipinjam: true },
  { id: "buku-3", judul: "Designing Data-Intensive Applications", penulis: "Martin Kleppmann", sedangDipinjam: false },
  { id: "buku-4", judul: "Refactoring: Improving the Design of Existing Code", penulis: "Martin Fowler", sedangDipinjam: true },
];

export function Jawaban06() {
  const [daftarBuku, setDaftarBuku] = useState<BukuItem[]>(DAFTAR_BUKU_AWAL);
  const [filterAktif, setFilterAktif] = useState<FilterBuku>("semua");

  // PEMBARUAN IMMUTABLE DENGAN .map()
  // KENAPA TIDAK BOLEH `buku.sedangDipinjam = !buku.sedangDipinjam`?
  // Karena memodifikasi objek array secara langsung merusak prinsip keabadian data (immutability).
  // Method `.map()` membuat array baru dan spread operator `{ ...buku }` menyalin objek baru.
  const handleTogglePinjam = (idBuku: string) => {
    setDaftarBuku((prev) =>
      prev.map((buku) =>
        buku.id === idBuku
          ? { ...buku, sedangDipinjam: !buku.sedangDipinjam }
          : buku
      )
    );
  };

  // PENYARINGAN DAFTAR SECARA DEKLARATIF (DERIVED STATE)
  // Tidak perlu membuat state terpisah untuk `bukuTerfilter`!
  // Menghitung data turunan saat render menjaga data selalu sinkron dengan state utama.
  const bukuTerfilter = daftarBuku.filter((buku) => {
    if (filterAktif === "tersedia") return !buku.sedangDipinjam;
    if (filterAktif === "dipinjam") return buku.sedangDipinjam;
    return true; // "semua"
  });

  return (
    <section className="learning-card" style={{ marginTop: "1rem" }}>
      <div className="card-top-meta">
        <span className="card-badge" style={{ color: "var(--success)", borderColor: "var(--success-border)" }}>
          <CheckCircle2 size={13} />
          Kunci Jawaban Latihan 06 (Resmi)
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <h3 className="card-title" style={{ fontSize: "1.3rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <BookOpen size={20} style={{ color: "var(--accent)" }} />
            <span>Katalog Peminjaman Buku Perpustakaan</span>
          </h3>
          <p className="card-subtitle">
            Pola render daftar berefisiensi tinggi dengan validasi key permanen dan pemfilteran deklaratif:
          </p>
        </div>

        {/* Tab Filter Status */}
        <div style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
          <Filter size={14} style={{ color: "var(--text-muted)" }} />
          {(["semua", "tersedia", "dipinjam"] as FilterBuku[]).map((opsi) => (
            <button
              key={opsi}
              type="button"
              onClick={() => setFilterAktif(opsi)}
              className={`btn-filter ${filterAktif === opsi ? "active" : ""}`}
            >
              {opsi === "semua" ? "Semua" : opsi === "tersedia" ? "Tersedia" : "Dipinjam"}
            </button>
          ))}
        </div>
      </div>

      {/* CONDITIONAL RENDERING: OPERATOR TERNARY (EMPTY STATE vs LIST) */}
      {bukuTerfilter.length === 0 ? (
        <div className="empty-state" style={{ padding: "2rem 1rem", textAlign: "center", color: "var(--text-muted)" }}>
          <Inbox size={32} style={{ margin: "0 auto 0.5rem", opacity: 0.5 }} />
          <p>Tidak ada buku yang sesuai dengan filter "{filterAktif}".</p>
        </div>
      ) : (
        <ul className="simple-todo-list" style={{ marginTop: "1rem" }}>
          {bukuTerfilter.map((buku) => (
            /* 
              PENGGUNAAN KEY BERBASIS ID PERMANEN:
              `key={buku.id}` membantu mesin diffing Virtual DOM React melacak perpindahan,
              penambahan, atau penghapusan elemen secara presisi tanpa merender ulang seluruh list!
            */
            <li key={buku.id} className="simple-todo-item">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => handleTogglePinjam(buku.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                  title="Klik untuk ubah status pinjam"
                >
                  {buku.sedangDipinjam ? (
                    <Clock size={16} style={{ color: "var(--warning)" }} />
                  ) : (
                    <CheckCircle size={16} style={{ color: "var(--success)" }} />
                  )}
                </button>

                <div>
                  <div style={{ fontWeight: 500, color: "var(--text-heading)", textDecoration: buku.sedangDipinjam ? "line-through" : "none" }}>
                    {buku.judul}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    Penulis: {buku.penulis}
                  </div>
                </div>
              </div>

              <span className={`status-indicator ${!buku.sedangDipinjam ? "available" : ""}`}>
                <span className="status-dot"></span>
                <span>{buku.sedangDipinjam ? "Sedang Dipinjam" : "Tersedia"}</span>
              </span>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: "1.25rem", padding: "0.75rem", background: "var(--bg-canvas)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.82rem" }}>
        <span style={{ color: "var(--success)", fontWeight: 600 }}>Poin Evaluasi: </span>
        Apakah Anda selalu menyematkan prop <code>key=&#123;item.id&#125;</code> saat looping <code>.map()</code>, melakukan update array secara immutable, dan menyaring daftar via <em>derived state</em>? Teknik ini adalah standar emas performa rendering di React.
      </div>
    </section>
  );
}

export default Jawaban06;

/* ============================================================================
 * PENJELASAN TAMBAHAN (MATERI KUNCI TAHAP 6)
 * ============================================================================
 * 
 * 1. MENGAPA PROP KEY TIDAK BOLEH MENGGUNAKAN INDEX ARRAY?
 *    Contoh berbahaya: `items.map((item, index) => <li key={index}>...</li>)`
 *    Jika item pertama dihapus, item kedua akan bergeser dan mendapatkan `key={0}`.
 *    React akan mengira elemen tersebut adalah elemen lama yang sama, sehingga
 *    state internal (seperti input checkbox atau animasi CSS) bisa tertukar ke item lain!
 *    Gunakan SELALU ID permanen (`key={item.id}`).
 * 
 * 2. APA ITU DERIVED STATE (STATE TURUNAN)?
 *    Alih-alih menyimpan dua state (`semuaBuku` dan `bukuTerfilter`), kita HANYA perlu
 *    menyimpan satu state `filterAktif`. Data `bukuTerfilter` dihitung langsung saat
 *    komponen dieksekusi. Ini mencegah bug desinkronisasi data!
 * 
 * ============================================================================
 * KESALAHAN UMUM PEMULA (HATI-HATI!):
 * ============================================================================
 * 
 * ❌ Kesalahan 1: Jebakan Angka 0 pada Operator Logical AND
 *    Contoh: `{daftarBuku.length && <DaftarBuku />}`
 *    Akibat: Jika `daftarBuku` kosong (`length` bernilai 0), JavaScript akan
 *    menampilkan angka "0" harfiah di layar browser!
 *    Solusi Benar:
 *    `{daftarBuku.length > 0 && <DaftarBuku />}` atau gunakan operator ternary:
 *    `{daftarBuku.length > 0 ? <DaftarBuku /> : <EmptyState />}`
 * 
 * ❌ Kesalahan 2: Menggunakan method .forEach() bukan .map() di dalam JSX
 *    Akibat: `.forEach()` mengembalikan `undefined`, sehingga tidak ada tampilan
 *    apapun yang keluar di layar! Di dalam JSX, wajib gunakan `.map()` yang
 *    mengembalikan array elemen JSX baru.
 * ============================================================================
 */
