/**
 * ============================================================================
 * LATIHAN 06: CONDITIONAL & LIST RENDERING (.map & key) (latihan-06.tsx)
 * ============================================================================
 * 
 * TUJUAN LATIHAN:
 * 1. Melakukan perulangan data array objek ke elemen JSX menggunakan method `.map()`.
 * 2. Menerapkan prop `key` unik berbasis ID permanen data (bukan index array).
 * 3. Menerapkan Conditional Rendering dengan operator ternary dan logical AND (`&&`).
 * 4. Menampilkan tampilan kosong (*Empty State*) saat data tidak ditemukan atau disaring.
 * 5. Membuat filter interaktif berdasarkan status ("Semua", "Tersedia", "Dipinjam").
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
import { BookOpen, CheckCircle, Clock, Filter, Inbox } from "lucide-react";

// TODO 1: Definisikan interface `BukuItem`
// - id: string
// - judul: string
// - penulis: string
// - sedangDipinjam: boolean
export interface BukuItem {
  id: string;
  judul: string;
  penulis: string;
  sedangDipinjam: boolean;
}

// Data awal daftar buku perpustakaan
const DAFTAR_BUKU_AWAL: BukuItem[] = [
  { id: "buku-1", judul: "Clean Code: A Handbook of Agile Craftsmanship", penulis: "Robert C. Martin", sedangDipinjam: false },
  { id: "buku-2", judul: "The Pragmatic Programmer", penulis: "Andrew Hunt & David Thomas", sedangDipinjam: true },
  { id: "buku-3", judul: "Designing Data-Intensive Applications", penulis: "Martin Kleppmann", sedangDipinjam: false },
  { id: "buku-4", judul: "Refactoring: Improving the Design of Existing Code", penulis: "Martin Fowler", sedangDipinjam: true },
];

type FilterBuku = "semua" | "tersedia" | "dipinjam";

export function Latihan06() {
  // TODO 2: Deklarasikan state `daftarBuku` dengan nilai awal `DAFTAR_BUKU_AWAL`
  const [daftarBuku, setDaftarBuku] = useState<BukuItem[]>(DAFTAR_BUKU_AWAL);

  // TODO 3: Deklarasikan state `filterAktif` bertipe FilterBuku (nilai awal: "semua")
  const [filterAktif, setFilterAktif] = useState<FilterBuku>("semua");

  // TODO 4: Fungsi toggle status peminjaman buku secara immutable
  const handleTogglePinjam = (idBuku: string) => {
    setDaftarBuku((prev) =>
      prev.map((buku) =>
        buku.id === idBuku ? { ...buku, sedangDipinjam: !buku.sedangDipinjam } : buku
      )
    );
  };

  // TODO 5: Filter buku berdasarkan `filterAktif`
  const bukuTerfilter = daftarBuku.filter((buku) => {
    if (filterAktif === "tersedia") return !buku.sedangDipinjam;
    if (filterAktif === "dipinjam") return buku.sedangDipinjam;
    return true; // "semua"
  });

  return (
    <section className="learning-card" style={{ marginTop: "1rem" }}>
      <div className="card-top-meta">
        <span className="card-badge">Soal Latihan 06</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <h3 className="card-title" style={{ fontSize: "1.3rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <BookOpen size={20} style={{ color: "var(--accent)" }} />
            <span>Katalog Peminjaman Buku Perpustakaan</span>
          </h3>
          <p className="card-subtitle">
            Latihan me-render array objek, prop <code>key</code> unik, filter dinamis, dan empty state:
          </p>
        </div>

        {/* Bilah Tombol Filter */}
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

      {/* TODO 6: Conditional Rendering - Jika bukuTerfilter kosong, tampilkan Empty State */}
      {bukuTerfilter.length === 0 ? (
        <div className="empty-state" style={{ padding: "2rem 1rem", textAlign: "center", color: "var(--text-muted)" }}>
          <Inbox size={32} style={{ margin: "0 auto 0.5rem", opacity: 0.5 }} />
          <p>Tidak ada buku yang sesuai dengan filter "{filterAktif}".</p>
        </div>
      ) : (
        /* TODO 7: List Rendering - Looping `bukuTerfilter` menggunakan `.map()` */
        <ul className="simple-todo-list" style={{ marginTop: "1rem" }}>
          {bukuTerfilter.map((buku) => (
            // TODO 8: Wajib pasang prop `key` dengan `buku.id`
            <li key={buku.id} className="simple-todo-item">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {/* Tombol Toggle Status Peminjaman */}
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
                  {/* TODO 9: Conditional Icon (Ternary) */}
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

              {/* Status Badge */}
              <span className={`status-indicator ${!buku.sedangDipinjam ? "available" : ""}`}>
                <span className="status-dot"></span>
                <span>{buku.sedangDipinjam ? "Sedang Dipinjam" : "Tersedia"}</span>
              </span>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: "1.25rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
        <em>
          💡 Setelah mencoba filter dan klik toggle status buku di atas, periksa kunci jawaban resmi di{" "}
          <code>src/pembelajaran/06-rendering/latihan/jawaban-06.tsx</code>.
        </em>
      </div>
    </section>
  );
}

export default Latihan06;
