/**
 * ============================================================================
 * LATIHAN 02: PROPS & TYPING DENGAN INTERFACE (latihan-02.tsx)
 * ============================================================================
 * 
 * TUJUAN LATIHAN:
 * 1. Mendefinisikan kontrak tipe data komponen menggunakan `interface` TypeScript.
 * 2. Menerapkan optional prop (`?`) untuk properti yang tidak wajib diisi.
 * 3. Menerapkan destructuring props langsung pada parameter function.
 * 4. Memberikan default value pada optional prop agar komponen tetap aman dari `undefined`.
 * 5. Menggunakan komponen anak (<ProdukCard />) berulang kali dengan props berbeda dari parent.
 * 
 * ESTIMASI TINGKAT KESULITAN:
 * 🟢 Mudah - Sedang
 * 
 * PETUNJUK PENGERJAAN:
 * - Ikuti setiap instruksi bertanda `// TODO:` secara berurutan.
 * - Kode ini sudah bisa dijalankan tanpa error TypeScript sejak awal.
 * ============================================================================
 */

// TODO 1: Definisikan interface bernama `ProdukCardProps`
// Ketentuan:
// - `namaProduk`  : string (Wajib)
// - `harga`       : number (Wajib)
// - `kategori`    : string (Opsional `?`, nilai default nanti: "Umum")
// - `tersedia`    : boolean (Opsional `?`, nilai default nanti: true)
export interface ProdukCardProps {
  namaProduk: string;
  harga: number;
  // TODO 1.1: Tambahkan property 'kategori' bertipe string dan bersifat opsional (?)
  kategori?: string;
  // TODO 1.2: Tambahkan property 'tersedia' bertipe boolean dan bersifat opsional (?)
  tersedia?: boolean;
}

/**
 * Component ProdukCard (Child Component)
 * 
 * TODO 2:
 * Lakukan destructuring props di parameter fungsi dan berikan default value:
 * - `kategori = "Umum"`
 * - `tersedia = true`
 */
export function ProdukCard({
  namaProduk,
  harga,
  kategori = "Umum", // TODO: Berikan default value "Umum" jika kategori tidak dikirim
  tersedia = true,   // TODO: Berikan default value true jika status tersedia tidak dikirim
}: ProdukCardProps) {
  // Format mata uang Rupiah yang rapi (Clean Code)
  const formatRupiah = (nominal: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(nominal);
  };

  return (
    <div className="user-card-item">
      <div className="user-card-header">
        <div>
          {/* TODO 3: Tampilkan namaProduk di dalam tag <h4> */}
          <h4 className="user-card-name">{namaProduk}</h4>
          {/* TODO 4: Tampilkan kategori produk */}
          <span className="user-card-role">Kategori: {kategori}</span>
        </div>

        {/* TODO 5: Tampilkan status ketersediaan stok */}
        <span className={`status-indicator ${tersedia ? "available" : ""}`}>
          <span className="status-dot"></span>
          <span>{tersedia ? "Stok Tersedia" : "Habis Terjual"}</span>
        </span>
      </div>

      <div className="user-card-body">
        {/* TODO 6: Tampilkan harga terformat */}
        <p className="user-card-info" style={{ fontWeight: 600, color: "var(--accent)" }}>
          Harga: {formatRupiah(harga)}
        </p>
      </div>
    </div>
  );
}

/**
 * Component Latihan02 (Parent Showcase Component)
 * 
 * TODO 7:
 * Panggil component <ProdukCard /> sebanyak 3 kali dengan variasi props:
 * 1. Produk A: Isi SEMUA props lengkap (namaProduk, harga, kategori, tersedia: true).
 * 2. Produk B: Jangan kirim prop `kategori` (uji apakah default value "Umum" berfungsi).
 * 3. Produk C: Isi `tersedia: false` untuk menguji tampilan barang habis.
 */
export function Latihan02() {
  return (
    <section className="learning-card" style={{ marginTop: "1rem" }}>
      <div className="card-top-meta">
        <span className="card-badge">Soal Latihan 02</span>
      </div>

      <h3 className="card-title" style={{ fontSize: "1.3rem" }}>
        Katalog Produk Toko Komputer (Latihan Props)
      </h3>
      <p className="card-subtitle">
        Satu template komponen <code>&lt;ProdukCard /&gt;</code> digunakan ulang dengan data props berbeda:
      </p>

      <div className="user-card-grid">
        {/* Produk 1: Props Lengkap */}
        <ProdukCard
          namaProduk="Keyboard Mechanical RGB"
          harga={450000}
          kategori="Aksesoris PC"
          tersedia={true}
        />

        {/* Produk 2: Tanpa prop kategori (mengandalkan default value "Umum") */}
        <ProdukCard
          namaProduk="Mouse Gaming Wireless"
          harga={275000}
          tersedia={true}
        />

        {/* Produk 3: Stok Habis (tersedia = false) */}
        <ProdukCard
          namaProduk="Monitor 24 Inch 144Hz"
          harga={1850000}
          kategori="Monitor"
          tersedia={false}
        />
      </div>

      <div style={{ marginTop: "1.25rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
        <em>
          💡 Setelah selesai, periksa kunci jawaban resmi di file{" "}
          <code>src/pembelajaran/02-props/latihan/jawaban-02.tsx</code>.
        </em>
      </div>
    </section>
  );
}

export default Latihan02;
