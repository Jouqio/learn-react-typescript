/**
 * ============================================================================
 * LATIHAN 01: COMPONENT DASAR & SINTAKS JSX (latihan-01.tsx)
 * ============================================================================
 * 
 * TUJUAN LATIHAN:
 * 1. Melatih pembuatan Function Component React pertama secara mandiri.
 * 2. Memahami aturan Single Root Element menggunakan React Fragment (<>...</>).
 * 3. Menampilkan variabel/konstanta TypeScript ke dalam sintaks JSX menggunakan kurung kurawal {}.
 * 4. Menerapkan clean code dengan memisahkan konstanta data dari template JSX.
 * 
 * ESTIMASI TINGKAT KESULITAN:
 * 🟢 Mudah (Cocok untuk pemula yang baru mengenal JSX & TypeScript)
 * 
 * PETUNJUK PENGERJAAN:
 * - Baca setiap komentar bertanda `// TODO:` secara berurutan.
 * - Ganti kode placeholder sementara dengan implementasi yang benar.
 * - Kode ini sudah valid secara TypeScript (bisa di-compile tanpa error),
 *   namun tampilannya belum lengkap sampai Anda menyelesaikan semua TODO.
 * ============================================================================
 */

// TODO 1: Siapkan konstanta biodata diri di bawah ini
// Berikan tipe data yang sesuai (string, number, array of string)
// Contoh:
// const NAMA_LENGKAP: string = "...";
// const UMUR: number = ...;
// const PEKERJAAN_IMPIAN: string = "...";
// const DAFTAR_HOBI: string[] = ["...", "..."];

const NAMA_LENGKAP: string = "[Isi Nama Anda Di Sini]";
const UMUR: number = 0; // TODO: Ganti dengan umur Anda
const PEKERJAAN_IMPIAN: string = "[Isi Pekerjaan Impian Anda]";

// TODO 2: Lengkapi array hobi minimal 2 hobi favorit Anda
const DAFTAR_HOBI: string[] = ["Hobi 1", "Hobi 2"];

/**
 * Component PerkenalanDiri (Latihan 01)
 * 
 * TODO 3:
 * Lengkapi return JSX di bawah agar menampilkan:
 * 1. Judul kartu: "Halo, Saya [NAMA_LENGKAP]!"
 * 2. Paragraf deskripsi: "Saat ini saya berumur [UMUR] tahun dan bercita-cita menjadi [PEKERJAAN_IMPIAN]."
 * 3. Daftar hobi menggunakan list HTML (<ul> dan <li>) dari variabel DAFTAR_HOBI.
 * 4. PENTING: Pastikan seluruh elemen dibungkus oleh SATU pembungkus (React Fragment <>...</> atau tag <article>).
 */
export function Latihan01() {
  return (
    <article className="learning-card" style={{ marginTop: "1rem" }}>
      <div className="card-top-meta">
        <span className="card-badge">Soal Latihan 01</span>
      </div>

      {/* TODO 4: Tampilkan NAMA_LENGKAP di dalam tag <h3> menggunakan interpolasi kurung kurawal {} */}
      <h3 className="card-title" style={{ fontSize: "1.2rem" }}>
        Halo, Saya {NAMA_LENGKAP}!
      </h3>

      {/* TODO 5: Tampilkan UMUR dan PEKERJAAN_IMPIAN di dalam paragraf ini */}
      <p className="card-subtitle" style={{ marginBottom: "1rem" }}>
        Saat ini saya berumur {UMUR} tahun dan bercita-cita menjadi {PEKERJAAN_IMPIAN}.
      </p>

      <div className="concept-box">
        <div className="concept-box-header">
          <span>Hobi Favorit Saya:</span>
        </div>
        {/* TODO 6: Tampilkan hobi dari DAFTAR_HOBI secara manual atau akses indeks [0] dan [1] */}
        <ul>
          <li>{DAFTAR_HOBI[0]}</li>
          <li>{DAFTAR_HOBI[1]}</li>
        </ul>
      </div>

      {/* Status Checklist Belajar */}
      <div style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
        <em>
          💡 Setelah selesai mengisi TODO di atas, bandingkan kode Anda dengan file{" "}
          <code>src/pembelajaran/01-kenalan/latihan/jawaban-01.tsx</code>.
        </em>
      </div>
    </article>
  );
}

export default Latihan01;
