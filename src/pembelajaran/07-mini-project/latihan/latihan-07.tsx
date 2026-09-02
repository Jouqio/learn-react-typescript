/**
 * ============================================================================
 * LATIHAN 07: MINI PROJECT - CATATAN BELANJA (Shopping List App) (latihan-07.tsx)
 * ============================================================================
 * 
 * TUJUAN LATIHAN:
 * Menggabungkan SELURUH konsep yang telah dipelajari dari Tahap 1 hingga Tahap 6:
 * 1. [Tahap 1] JSX, Fragment, dan arsitektur komponen terisolasi.
 * 2. [Tahap 2] Typing kontrak `interface` dan pengoperan data via Props ke child component.
 * 3. [Tahap 3] Manajemen multiple state: daftar belanja, input teks, kategori, dan filter aktif.
 * 4. [Tahap 4] Event Handling `onSubmit` form, `e.preventDefault()`, dan validasi input.
 * 5. [Tahap 5] `useEffect` untuk side effect sinkronisasi data ke LocalStorage browser.
 * 6. [Tahap 6] Looping array dengan `.map()`, prop `key` berbasis ID unik, filter deklaratif,
 *               dan conditional rendering status belanja (sudah dibeli vs belum).
 * 
 * ESTIMASI TINGKAT KESULITAN:
 * 🟡 Sedang (Mini Project Integrasi Menyeluruh)
 * 
 * PETUNJUK PENGERJAAN:
 * - Ikuti setiap instruksi bertanda `// TODO:` secara berurutan.
 * - Kode ini sudah bisa dijalankan tanpa error sejak awal.
 * ============================================================================
 */

import { useState, useEffect } from "react";
import { ShoppingCart, Plus, Trash2, CheckCircle2, Circle, Filter, AlertCircle, Sparkles } from "lucide-react";

// TODO 1: Definisikan interface `ItemBelanja`
// - `id`: string
// - `nama`: string
// - `jumlah`: number
// - `sudahDibeli`: boolean
// - `kategori`: string
export interface ItemBelanja {
  id: string;
  nama: string;
  jumlah: number;
  sudahDibeli: boolean;
  kategori: string;
}

export type FilterBelanja = "semua" | "belum" | "sudah";

// Data awal sebagai sampel pengujian
const DATA_AWAL_BELANJA: ItemBelanja[] = [
  { id: "item-1", nama: "Beras Pandan Wangi 5kg", jumlah: 1, sudahDibeli: true, kategori: "Pokok" },
  { id: "item-2", nama: "Minyak Goreng 2 Liter", jumlah: 2, sudahDibeli: false, kategori: "Pokok" },
  { id: "item-3", nama: "Kopi Arabika Gayo 250g", jumlah: 1, sudahDibeli: false, kategori: "Minuman" },
];

/**
 * Child Component 1: Baris Item Belanja (Menerapkan Props & Event)
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
        {/* TODO 2: Tombol toggle status belanja (sudah dibeli / belum) */}
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
          {/* TODO 3: Tampilkan nama item dan berikan efek coret (line-through) jika sudah dibeli */}
          <span
            className="item-title"
            style={{ textDecoration: item.sudahDibeli ? "line-through" : "none" }}
          >
            {item.nama}
          </span>
          <span className="item-meta" style={{ display: "flex", gap: "0.5rem" }}>
            <span>Qty: {item.jumlah}</span>
            <span>•</span>
            <span style={{ color: "var(--accent)" }}>{item.kategori}</span>
          </span>
        </div>
      </div>

      {/* TODO 4: Tombol hapus item dari daftar belanja */}
      <button
        type="button"
        onClick={() => onHapusItem(item.id)}
        className="btn-delete"
        title="Hapus dari daftar belanja"
      >
        <Trash2 size={15} />
      </button>
    </li>
  );
}

/**
 * Component Utama Latihan 07: Catatan Belanja Cerdas
 */
export function Latihan07() {
  // TODO 5: State daftar item belanja (diinisialisasi dari localStorage jika ada)
  const [daftarBelanja, setDaftarBelanja] = useState<ItemBelanja[]>(() => {
    const saved = localStorage.getItem("belajar_react_catatan_belanja");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DATA_AWAL_BELANJA;
      }
    }
    return DATA_AWAL_BELANJA;
  });

  // State form input baru
  const [inputNama, setInputNama] = useState<string>("");
  const [inputJumlah, setInputJumlah] = useState<number>(1);
  const [inputKategori, setInputKategori] = useState<string>("Pokok");
  const [pesanError, setPesanError] = useState<string>("");

  // State filter status
  const [filterAktif, setFilterAktif] = useState<FilterBelanja>("semua");

  // TODO 6: useEffect untuk sinkronisasi otomatis ke LocalStorage setiap kali `daftarBelanja` berubah
  useEffect(() => {
    localStorage.setItem("belajar_react_catatan_belanja", JSON.stringify(daftarBelanja));
  }, [daftarBelanja]);

  // TODO 7: Handler untuk menambah item belanja baru via form onSubmit
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

    // Tambahkan item secara immutable
    setDaftarBelanja((prev) => [itemBaru, ...prev]);

    // Reset isian form
    setInputNama("");
    setInputJumlah(1);
    setPesanError("");
  };

  // TODO 8: Handler toggle status item
  const handleToggleStatus = (id: string) => {
    setDaftarBelanja((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, sudahDibeli: !item.sudahDibeli } : item
      )
    );
  };

  // TODO 9: Handler hapus item belanja
  const handleHapusItem = (id: string) => {
    setDaftarBelanja((prev) => prev.filter((item) => item.id !== id));
  };

  // TODO 10: Derived state daftar item yang terfilter
  const itemTerfilter = daftarBelanja.filter((item) => {
    if (filterAktif === "belum") return !item.sudahDibeli;
    if (filterAktif === "sudah") return item.sudahDibeli;
    return true; // "semua"
  });

  const totalSelesai = daftarBelanja.filter((i) => i.sudahDibeli).length;

  return (
    <section className="learning-card" style={{ marginTop: "1rem" }}>
      <div className="card-top-meta">
        <span className="card-badge">Mini Project Integrasi (Soal 07)</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <h3 className="card-title" style={{ fontSize: "1.35rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShoppingCart size={22} style={{ color: "var(--accent)" }} />
            <span>Catatan Belanja Rumah Tangga (Smart Shopping List)</span>
          </h3>
          <p className="card-subtitle">
            Aplikasi mini yang memadukan seluruh konsep: Component, Props, State, Event, Effects, & Rendering:
          </p>
        </div>

        {/* Counter Ringkasan Progress Belanja */}
        <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", background: "var(--bg-canvas)", padding: "0.4rem 0.8rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
          Progress: <strong>{totalSelesai}</strong> dari <strong>{daftarBelanja.length}</strong> barang terbeli
        </div>
      </div>

      {/* Form Tambah Item Belanja */}
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

      {/* Filter Bar */}
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

      {/* List Item Belanja */}
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

      <div style={{ marginTop: "1.25rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
        <em>
          💡 Coba tambahkan barang belanja baru, centang statusnya, dan refresh browser Anda untuk membuktikan persistensi data LocalStorage. Setelah itu periksa kunci jawaban di{" "}
          <code>src/pembelajaran/07-mini-project/latihan/jawaban-07.tsx</code>.
        </em>
      </div>
    </section>
  );
}

export default Latihan07;
