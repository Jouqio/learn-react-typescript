/**
 * ============================================================================
 * KUNCI JAWABAN LATIHAN 07: MINI PROJECT - CATATAN BELANJA (jawaban-07.tsx)
 * ============================================================================
 * 
 * TUJUAN PEMBELAJARAN & EVALUASI:
 * Membandingkan implementasi aplikasi Anda dengan standar arsitektur Clean Code
 * produksi: komposisi komponen, lifting state up, sinkronisasi LocalStorage yang efisien,
 * serta static typing penuh tanpa ketergantungan library eksternal.
 * ============================================================================
 */

import { useState, useEffect } from "react";
import { CheckCircle2, ShoppingCart, Plus, Trash2, Circle, Filter, AlertCircle, Sparkles } from "lucide-react";

// KONTRAK DATA ENTITAS UTAMA (TYPE SAFETY)
export interface ItemBelanja {
  id: string;
  nama: string;
  jumlah: number;
  sudahDibeli: boolean;
  kategori: string;
}

export type FilterBelanja = "semua" | "belum" | "sudah";

// DATA DEFAULT JIKA LOCAL STORAGE KOSONG
const DATA_AWAL_BELANJA: readonly ItemBelanja[] = [
  { id: "item-1", nama: "Beras Pandan Wangi 5kg", jumlah: 1, sudahDibeli: true, kategori: "Pokok" },
  { id: "item-2", nama: "Minyak Goreng 2 Liter", jumlah: 2, sudahDibeli: false, kategori: "Pokok" },
  { id: "item-3", nama: "Kopi Arabika Gayo 250g", jumlah: 1, sudahDibeli: false, kategori: "Minuman" },
];

const STORAGE_KEY = "belajar_react_catatan_belanja";

/**
 * Child Component: Baris Item Belanja
 * 
 * ALASAN DESAIN ARSITEKTUR:
 * Komponen ini adalah "Presentational Component" murni. Ia tidak memiliki state internal,
 * melainkan hanya menerima data dan callback function via Props dari parent.
 */
export interface BarisItemBelanjaProps {
  item: ItemBelanja;
  onToggleStatus: (id: string) => void;
  onHapusItem: (id: string) => void;
}

export function BarisItemBelanja({ item, onToggleStatus, onHapusItem }: BarisItemBelanjaProps) {
  return (
    <li className="todo-item-row" style={{ opacity: item.sudahDibeli ? 0.65 : 1 }}>
      <div className="item-main-area">
        {/* Tombol Centang */}
        <button
          type="button"
          onClick={() => onToggleStatus(item.id)}
          className={`checkbox-custom ${item.sudahDibeli ? "checked" : ""}`}
          title="Tandai sudah dibeli"
        >
          {item.sudahDibeli ? (
            <CheckCircle2 size={16} style={{ color: "var(--success)" }} />
          ) : (
            <Circle size={16} style={{ color: "var(--text-muted)" }} />
          )}
        </button>

        <div className="item-text-group">
          <span
            className="item-title"
            style={{ textDecoration: item.sudahDibeli ? "line-through" : "none" }}
          >
            {item.nama}
          </span>
          <span className="item-meta" style={{ display: "flex", gap: "0.5rem" }}>
            <span>Qty: <strong>{item.jumlah}</strong></span>
            <span>•</span>
            <span style={{ color: "var(--accent)" }}>{item.kategori}</span>
          </span>
        </div>
      </div>

      {/* Tombol Hapus */}
      <button
        type="button"
        onClick={() => onHapusItem(item.id)}
        className="btn-delete"
        title="Hapus barang belanja"
      >
        <Trash2 size={15} />
      </button>
    </li>
  );
}

/**
 * Component Container Utama: Jawaban07
 */
export function Jawaban07() {
  // LAZY STATE INITIALIZATION:
  // KENAPA MENGGUNAKAN FUNGSI CALLBACK `useState(() => ...)`?
  // Membaca `localStorage.getItem()` adalah operasi synchronous I/O yang lambat.
  // Jika ditulis `useState(bacaStorage())`, operasi itu akan dijalankan pada SETIAP kali komponen re-render!
  // Dengan membungkusnya dalam callback `() => ...`, React HANYA menjalankannya tepat 1 kali saat inisialisasi awal.
  const [daftarBelanja, setDaftarBelanja] = useState<ItemBelanja[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [...DATA_AWAL_BELANJA];
      }
    }
    return [...DATA_AWAL_BELANJA];
  });

  // State Form Input
  const [inputNama, setInputNama] = useState<string>("");
  const [inputJumlah, setInputJumlah] = useState<number>(1);
  const [inputKategori, setInputKategori] = useState<string>("Pokok");
  const [pesanError, setPesanError] = useState<string>("");

  // State Filter Aktif
  const [filterAktif, setFilterAktif] = useState<FilterBelanja>("semua");

  // SINKRONISASI OTOMATIS LOCAL STORAGE DENGAN useEffect
  // Setiap kali state `daftarBelanja` berubah, simpan versi terbarunya ke disk browser
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(daftarBelanja));
  }, [daftarBelanja]);

  // HANDLER: Tambah Item Baru
  const handleTambahItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const namaBersih = inputNama.trim();
    if (!namaBersih) {
      setPesanError("Nama barang belanja tidak boleh kosong!");
      return;
    }

    const itemBaru: ItemBelanja = {
      id: `item-${Date.now()}`,
      nama: namaBersih,
      jumlah: inputJumlah > 0 ? inputJumlah : 1,
      sudahDibeli: false,
      kategori: inputKategori,
    };

    // Immutable state update (Prepend ke urutan teratas)
    setDaftarBelanja((prev) => [itemBaru, ...prev]);

    // Reset Form Input
    setInputNama("");
    setInputJumlah(1);
    setPesanError("");
  };

  // HANDLER: Toggle Status Pembelian
  const handleToggleStatus = (id: string) => {
    setDaftarBelanja((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, sudahDibeli: !item.sudahDibeli } : item
      )
    );
  };

  // HANDLER: Hapus Item
  const handleHapusItem = (id: string) => {
    setDaftarBelanja((prev) => prev.filter((item) => item.id !== id));
  };

  // DERIVED STATE: Filter data secara deklaratif
  const itemTerfilter = daftarBelanja.filter((item) => {
    if (filterAktif === "belum") return !item.sudahDibeli;
    if (filterAktif === "sudah") return item.sudahDibeli;
    return true;
  });

  const totalSelesai = daftarBelanja.filter((i) => i.sudahDibeli).length;

  return (
    <section className="learning-card" style={{ marginTop: "1rem" }}>
      <div className="card-top-meta">
        <span className="card-badge" style={{ color: "var(--success)", borderColor: "var(--success-border)" }}>
          <CheckCircle2 size={13} />
          Kunci Jawaban Mini Project 07 (Resmi)
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <h3 className="card-title" style={{ fontSize: "1.35rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShoppingCart size={22} style={{ color: "var(--accent)" }} />
            <span>Catatan Belanja Rumah Tangga (Smart Shopping List)</span>
          </h3>
          <p className="card-subtitle">
            Integrasi lengkap: Form validation, LocalStorage sync, status filtering, dan presentational components:
          </p>
        </div>

        {/* Indikator Statistik */}
        <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", background: "var(--bg-canvas)", padding: "0.4rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
          Progress: <strong>{totalSelesai}</strong> dari <strong>{daftarBelanja.length}</strong> barang terbeli
        </div>
      </div>

      {/* Form Tambah Item */}
      <form onSubmit={handleTambahItem} className="todo-form-container" style={{ marginTop: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <input
            type="text"
            value={inputNama}
            onChange={(e) => {
              setInputNama(e.target.value);
              if (pesanError) setPesanError("");
            }}
            placeholder="Tambahkan nama barang... (misal: Telur 1kg)"
            className="form-input"
            style={{ flex: 3, minWidth: "180px" }}
          />

          <input
            type="number"
            min={1}
            max={99}
            value={inputJumlah}
            onChange={(e) => setInputJumlah(Number(e.target.value))}
            className="form-input"
            style={{ flex: 1, minWidth: "70px" }}
            title="Jumlah kuantitas barang"
          />

          <select
            value={inputKategori}
            onChange={(e) => setInputKategori(e.target.value)}
            className="form-input"
            style={{ flex: 1.5, minWidth: "110px" }}
          >
            <option value="Pokok">Pokok</option>
            <option value="Sayur & Buah">Sayur & Buah</option>
            <option value="Minuman">Minuman</option>
            <option value="Kebersihan">Kebersihan</option>
            <option value="Lainnya">Lainnya</option>
          </select>

          <button type="submit" className="btn-add-todo" style={{ flexShrink: 0 }}>
            <Plus size={15} />
            <span>Tambah</span>
          </button>
        </div>

        {pesanError && (
          <div className="error-badge" style={{ marginTop: "0.5rem" }}>
            <AlertCircle size={14} />
            <span>{pesanError}</span>
          </div>
        )}
      </form>

      {/* Bilah Navigasi Filter */}
      <div className="filter-bar-container" style={{ marginTop: "1rem" }}>
        <div className="filter-tabs">
          <Filter size={14} style={{ color: "var(--text-muted)", alignSelf: "center", marginRight: "0.25rem" }} />
          {(["semua", "belum", "sudah"] as FilterBelanja[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setFilterAktif(mode)}
              className={`filter-tab-btn ${filterAktif === mode ? "active" : ""}`}
            >
              {mode === "semua" ? "Semua Barang" : mode === "belum" ? "Belum Dibeli" : "Sudah Dibeli"}
            </button>
          ))}
        </div>
      </div>

      {/* Daftar Item Belanja */}
      <div className="todo-list-container" style={{ marginTop: "0.75rem" }}>
        {itemTerfilter.length === 0 ? (
          <div className="todo-empty-state">
            <Sparkles size={28} className="empty-icon" />
            <p className="empty-text">Tidak ada barang belanja pada kategori ini.</p>
          </div>
        ) : (
          <ul className="todo-items-wrapper">
            {itemTerfilter.map((item) => (
              <BarisItemBelanja
                key={item.id}
                item={item}
                onToggleStatus={handleToggleStatus}
                onHapusItem={handleHapusItem}
              />
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: "1.25rem", padding: "0.75rem", background: "var(--bg-canvas)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.82rem" }}>
        <span style={{ color: "var(--success)", fontWeight: 600 }}>Poin Evaluasi: </span>
        Selamat! Anda telah berhasil menggabungkan seluruh konsep fundamental React + TypeScript (JSX, Props, State, Form Events, Side Effects ke LocalStorage, dan Conditional/List Rendering) ke dalam satu proyek utuh yang siap digunakan di dunia nyata.
      </div>
    </section>
  );
}

export default Jawaban07;

/* ============================================================================
 * PENJELASAN TAMBAHAN (INTEGRASI KURIKULUM LENGKAP)
 * ============================================================================
 * 
 * 1. MENGAPA KOMPONEN HARUS DIPECAH (LIFTING STATE UP)?
 *    State `daftarBelanja` disimpan di komponen induk (`Jawaban07`), bukan di
 *    setiap baris `BarisItemBelanja`. Ini memungkinkan induk untuk menghitung total
 *    progress, memfilter item, dan melakukan sinkronisasi LocalStorage secara terpusat,
 *    sementara baris item hanya bertugas menampilkan UI dan memicu event callback.
 * 
 * 2. PRINSIP CLEAN CODE UNTUK STATE ARRAY:
 *    - Menambah item : `setDaftarBelanja(prev => [itemBaru, ...prev])`
 *    - Menghapus item: `setDaftarBelanja(prev => prev.filter(i => i.id !== id))`
 *    - Mengubah item : `setDaftarBelanja(prev => prev.map(i => i.id === id ? { ...i, sudahDibeli: !i.sudahDibeli } : i))`
 *    Semua operasi di atas 100% IMMUTABLE (menghasilkan array baru tanpa merusak array lama).
 * 
 * ============================================================================
 * KESALAHAN UMUM PEMULA (HATI-HATI!):
 * ============================================================================
 * 
 * ❌ Kesalahan 1: Menggunakan .push() atau .splice() untuk mengubah state array
 *    Contoh: `daftarBelanja.push(itemBaru); setDaftarBelanja(daftarBelanja);`
 *    Akibat: Referensi memori array tidak berubah (masih object pointer yang sama),
 *    sehingga React mengira tidak ada perubahan data dan TIDAK AKAN merender ulang layar!
 * 
 * ❌ Kesalahan 2: Menggunakan index array sebagai key saat ada fitur hapus item
 *    Akibat: Jika item tengah dihapus, elemen-elemen di bawahnya akan bergeser index
 *    dan menyebabkan bug visual pada checkbox/animasi. Gunakan ID permanen (`key={item.id}`).
 * ============================================================================
 */
