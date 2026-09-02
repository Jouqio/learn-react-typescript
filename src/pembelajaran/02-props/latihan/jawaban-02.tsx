/**
 * ============================================================================
 * KUNCI JAWABAN LATIHAN 02: PROPS & TYPING DENGAN INTERFACE (jawaban-02.tsx)
 * ============================================================================
 * 
 * TUJUAN PEMBELAJARAN & EVALUASI:
 * Membandingkan solusi yang Anda buat di `latihan-02.tsx` dengan implementasi
 * standar industri: penulisan interface, destructuring, default values, dan
 * pemanfaatan tipe data primitif & boolean di React + TypeScript.
 * ============================================================================
 */

import { CheckCircle2, Tag, ShoppingBag } from "lucide-react";

// KENAPA INTERFACE DITULIS DI ATAS COMPONENT?
// Menulis interface tepat sebelum fungsi komponen adalah standar arsitektur React.
// Interface berfungsi sebagai "Daftar Menu" atau "Kontrak Resmi" yang langsung
// dibaca oleh developer lain untuk mengetahui data apa saja yang dibutuhkan komponen.

export interface ProdukCardProps {
  namaProduk: string;       // Properti wajib bertipe string
  harga: number;            // Properti wajib bertipe number
  kategori?: string;        // Tanda tanya (?) berarti opsional (boleh tidak dioper)
  tersedia?: boolean;       // Tanda tanya (?) berarti opsional (status ketersediaan stok)
}

// NILAI DEFAULT SEBAGAI KONSTANTA (PRINSIP DRY / CLEAN CODE)
const DEFAULT_KATEGORI = "Umum";
const DEFAULT_TERSEDIA = true;

/**
 * Component ProdukCard (Kunci Jawaban)
 * 
 * TEKNIK CLEAN CODE YANG DIGUNAKAN:
 * 1. Parameter Destructuring: Kita langsung membuka objek props `{ namaProduk, harga, ... }`
 *    sehingga tidak perlu menulis `props.namaProduk` berulang-ulang di dalam JSX.
 * 2. Default Parameters: `kategori = DEFAULT_KATEGORI` memastikan bahwa jika parent
 *    tidak mengirimkan nilai `kategori`, variabel tidak bernilai `undefined`.
 */
export function ProdukCard({
  namaProduk,
  harga,
  kategori = DEFAULT_KATEGORI,
  tersedia = DEFAULT_TERSEDIA,
}: ProdukCardProps) {
  // Fungsi murni untuk memformat mata uang IDR
  const formatRupiah = (nominal: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(nominal);
  };

  return (
    <div className="user-card-item">
      {/* Header Kartu: Nama Produk & Kategori */}
      <div className="user-card-header">
        <div>
          <h4 className="user-card-name" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <ShoppingBag size={16} style={{ color: "var(--accent)" }} />
            <span>{namaProduk}</span>
          </h4>
          <span className="user-card-role" style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.2rem" }}>
            <Tag size={12} style={{ color: "var(--text-muted)" }} />
            <span>Kategori: {kategori}</span>
          </span>
        </div>

        {/* Status Ketersediaan Stok */}
        <span className={`status-indicator ${tersedia ? "available" : ""}`}>
          <span className="status-dot"></span>
          <span>{tersedia ? "Stok Tersedia" : "Habis Terjual"}</span>
        </span>
      </div>

      {/* Body Kartu: Informasi Harga */}
      <div className="user-card-body">
        <p className="user-card-info" style={{ fontWeight: 600, color: "var(--accent)", fontSize: "0.92rem" }}>
          Harga: {formatRupiah(harga)}
        </p>
      </div>
    </div>
  );
}

/**
 * Component Jawaban02 (Parent Showcase Component)
 */
export function Jawaban02() {
  return (
    <section className="learning-card" style={{ marginTop: "1rem" }}>
      <div className="card-top-meta">
        <span className="card-badge" style={{ color: "var(--success)", borderColor: "var(--success-border)" }}>
          <CheckCircle2 size={13} />
          Kunci Jawaban Latihan 02 (Resmi)
        </span>
      </div>

      <h3 className="card-title" style={{ fontSize: "1.3rem" }}>
        Katalog Produk Toko Komputer (Showcase Props)
      </h3>
      <p className="card-subtitle">
        Pembuktian 3 variasi props: komponen yang sama menyajikan data dinamis secara aman dan konsisten:
      </p>

      <div className="user-card-grid">
        {/* Kasus 1: Mengirim seluruh props lengkap */}
        <ProdukCard
          namaProduk="Keyboard Mechanical RGB"
          harga={450000}
          kategori="Aksesoris PC"
          tersedia={true}
        />

        {/* Kasus 2: Menguji fallback default value (kategori & status ketersediaan) */}
        <ProdukCard
          namaProduk="Mouse Gaming Wireless"
          harga={275000}
          // kategori tidak dikirim -> fallback otomatis ke "Umum"
          // tersedia tidak dikirim -> fallback otomatis ke true
        />

        {/* Kasus 3: Menguji kondisi stok habis */}
        <ProdukCard
          namaProduk="Monitor 24 Inch 144Hz"
          harga={1850000}
          kategori="Monitor"
          tersedia={false}
        />
      </div>

      <div style={{ marginTop: "1.25rem", padding: "0.75rem", background: "var(--bg-canvas)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.82rem" }}>
        <span style={{ color: "var(--success)", fontWeight: 600 }}>Poin Evaluasi: </span>
        Apakah Anda berhasil membuat interface dengan tanda tanya <code>?</code> untuk properti opsional, memanfaatkan parameter default value, dan merender 3 kartu produk dengan benar? Jika ya, pemahaman Anda tentang Props sudah sangat baik!
      </div>
    </section>
  );
}

export default Jawaban02;

/* ============================================================================
 * PENJELASAN TAMBAHAN (MATERI KUNCI TAHAP 2)
 * ============================================================================
 * 
 * 1. APA ITU INTERFACE KONTRAK?
 *    TypeScript interface adalah jaminan (garansi) bahwa komponen tidak akan
 *    menerima data yang salah. Jika Anda mencoba mengirim angka ke prop yang mewajibkan
 *    string, editor dan compiler TypeScript akan langsung memberi tahu error tersebut
 *    sebelum kode dijalankan di browser!
 * 
 * 2. MENGAPA HARUS MENENTUKAN DEFAULT VALUE PADA OPTIONAL PROPS?
 *    Jika sebuah prop diberi tanda tanya `?`, nilainya bisa berupa `undefined` saat tidak
 *    dioper oleh parent. Memberikan default value pada parameter destructuring mencegah
 *    munculnya teks kosong atau error runtime `Cannot read property of undefined`.
 * 
 * ============================================================================
 * KESALAHAN UMUM PEMULA (HATI-HATI!):
 * ============================================================================
 * 
 * ❌ Kesalahan 1: Mengubah nilai props di dalam komponen anak
 *    Contoh:
 *    function ProdukCard(props: ProdukCardProps) {
 *      props.harga = 500000; // DILARANG! TypeError: Cannot assign to read only property
 *    }
 *    Aturan Emas: Props bersifat Read-Only (Immutable). Komponen anak HANYA boleh
 *    membaca data yang diberikan oleh parent, tidak boleh memodifikasinya!
 * 
 * ❌ Kesalahan 2: Menggunakan tipe 'any' untuk props
 *    Contoh: `function ProdukCard(props: any)`
 *    Akibat: Menghilangkan semua kekuatan TypeScript (tidak ada autocomplete, tidak ada
 *    peringatan typo, dan rawan bug).
 * 
 * ❌ Kesalahan 3: Lupa kurung kurawal `{}` untuk nilai selain string
 *    Contoh: `<ProdukCard harga="450000" tersedia="true" />`
 *    Akibat: TypeScript akan error karena nilai tersebut dikirim sebagai string, bukan
 *    sebagai number (`harga={450000}`) dan boolean (`tersedia={true}`).
 * ============================================================================
 */
