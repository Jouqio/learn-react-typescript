/**
 * ============================================================================
 * KUNCI JAWABAN LATIHAN 05: useEffect, FETCH API, LOADING & ERROR STATE (jawaban-05.tsx)
 * ============================================================================
 * 
 * TUJUAN PEMBELAJARAN & EVALUASI:
 * Membandingkan solusi yang Anda buat di `latihan-05.tsx` dengan implementasi
 * standar industri: sinkronisasi efek samping (side effects), isolasi async fetch,
 * pemanfaatan `finally`, serta type-safety data bertingkat (nested object).
 * ============================================================================
 */

import { useState, useEffect } from "react";
import { CheckCircle2, Users, Loader2, AlertTriangle, RefreshCw, Mail, Building } from "lucide-react";

// KONTRAK DATA TIPE NESTED (CLEAN CODE)
// Data balikan dari API seringkali memiliki objek bersarang (nested object).
// Mengetik `company: { name: string }` menjamin kita tidak salah menulis nama properti!
export interface UserData {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

const API_USERS_ENDPOINT = "https://jsonplaceholder.typicode.com/users";
const MAX_DISPLAYED_USERS = 4;

export function Jawaban05() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // FUNGSI ASINKRON FETCH DATA
  // KENAPA FUNGSI FETCH DIBUAT TERPISAH DI LUAR useEffect?
  // 1. Agar fungsi ini bisa dipanggil kembali (reusable) saat user menekan tombol "Muat Ulang".
  // 2. Callback `useEffect` TIDAK BOLEH dijadikan fungsi async secara langsung
  //    (dilarang: `useEffect(async () => ...)` karena React mengharapkan fungsi cleanup
  //    atau undefined sebagai return value).
  const fetchUsers = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(API_USERS_ENDPOINT);

      // Selalu cek response.ok! Status HTTP 404 atau 500 TIDAK otomatis memicu catch() bawaan fetch!
      if (!response.ok) {
        throw new Error(`Server merespons dengan status HTTP ${response.status}`);
      }

      const rawData: UserData[] = await response.json();
      setUsers(rawData.slice(0, MAX_DISPLAYED_USERS));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Terjadi kendala jaringan saat menghubungi server";
      setErrorMessage(msg);
    } finally {
      // Blok `finally` SELALU dijalankan, baik fetch sukses maupun gagal!
      // Ini memastikan spinner loading tidak berputar selamanya jika terjadi error.
      setIsLoading(false);
    }
  };

  // useEffect DENGAN DEPENDENCY ARRAY KOSONG []
  // Array kosong `[]` memberi tahu React: "Jalankan fungsi ini TEPAT SATU KALI saat komponen
  // pertama kali dipasang (mount) ke DOM, dan jangan jalankan lagi saat ada re-render biasa".
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="learning-card" style={{ marginTop: "1rem" }}>
      <div className="card-top-meta">
        <span className="card-badge" style={{ color: "var(--success)", borderColor: "var(--success-border)" }}>
          <CheckCircle2 size={13} />
          Kunci Jawaban Latihan 05 (Resmi)
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <h3 className="card-title" style={{ fontSize: "1.3rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Users size={20} style={{ color: "var(--accent)" }} />
            <span>Daftar Anggota Tim (Fetch REST API)</span>
          </h3>
          <p className="card-subtitle">
            Pola konsumsi REST API yang tangguh dengan penanganan 3 status UI secara elegan:
          </p>
        </div>

        <button
          type="button"
          onClick={fetchUsers}
          disabled={isLoading}
          className="btn-fetch"
          style={{ opacity: isLoading ? 0.6 : 1 }}
        >
          <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
          <span>{isLoading ? "Menyinkronkan..." : "Sinkronkan Ulang"}</span>
        </button>
      </div>

      {/* Kondisi 1: Loading State */}
      {isLoading && (
        <div className="loading-state">
          <Loader2 size={24} className="animate-spin" style={{ color: "var(--accent)" }} />
          <span>Sedang menyinkronkan data pengguna dari server...</span>
        </div>
      )}

      {/* Kondisi 2: Error State */}
      {errorMessage && !isLoading && (
        <div className="error-box" style={{ margin: "1rem 0" }}>
          <AlertTriangle size={18} style={{ color: "var(--danger)", flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 600, color: "var(--danger)" }}>Koneksi Gagal</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{errorMessage}</div>
          </div>
        </div>
      )}

      {/* Kondisi 3: Success State */}
      {!isLoading && !errorMessage && (
        <div className="post-grid" style={{ marginTop: "1rem" }}>
          {users.map((item) => (
            <article key={item.id} className="post-card">
              <div className="post-id">MEMBER #{item.id}</div>
              <h4 className="post-title" style={{ fontSize: "1rem", marginBottom: "0.4rem" }}>
                {item.name}
              </h4>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <Mail size={13} style={{ color: "var(--accent)" }} />
                  <span>{item.email}</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <Building size={13} style={{ color: "var(--text-muted)" }} />
                  <span>{item.company.name}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      <div style={{ marginTop: "1.25rem", padding: "0.75rem", background: "var(--bg-canvas)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.82rem" }}>
        <span style={{ color: "var(--success)", fontWeight: 600 }}>Poin Evaluasi: </span>
        Apakah Anda menggunakan array dependensi <code>[]</code> agar fetch tidak berulang tanpa henti, memvalidasi <code>response.ok</code>, serta mematikan loading di blok <code>finally</code>? Jika ya, Anda telah menguasai pola fetching data standar produksi!
      </div>
    </section>
  );
}

export default Jawaban05;

/* ============================================================================
 * PENJELASAN TAMBAHAN (MATERI KUNCI TAHAP 5)
 * ============================================================================
 * 
 * 1. MENGAPA TIDAK BOLEH MEMBUAT CALLBACK useEffect ASYNC?
 *    Contoh terlarang:
 *    useEffect(async () => {
 *      const res = await fetch(...);
 *    }, []);
 *    Alasan: Fungsi `async` selalu mengembalikan sebuah `Promise`.
 *    Sementara React mewajibkan fungsi `useEffect` HANYA mengembalikan fungsi cleanup
 *    (misal: untuk menghapus event listener atau menghentikan timer) atau `undefined`.
 * 
 * 2. MENGAPA response.ok PENTING?
 *    Method `fetch()` bawaan JavaScript HANYA me-reject promise jika terjadi kegagalan jaringan
 *    (seperti offline / kabel LAN putus). Jika server mengirim error 404 (Not Found) atau
 *    500 (Internal Server Error), fetch tetap menganggapnya sebagai "sukses"! Oleh karena itu,
 *    kita wajib mengecek `if (!response.ok)` secara manual.
 * 
 * ============================================================================
 * KESALAHAN UMUM PEMULA (HATI-HATI!):
 * ============================================================================
 * 
 * ❌ Kesalahan 1: Lupa dependency array [] (Infinite Fetch Loop!)
 *    Contoh:
 *    useEffect(() => {
 *      fetchData(); // TANPA ARRAY [] DI PARAMETER KEDUA!
 *    });
 *    Akibat: Fetch berjalan -> State di-update -> Komponen re-render -> useEffect jalan lagi
 *    -> Fetch berjalan lagi -> Loop tak berhingga sampai kuota API habis atau browser crash!
 * 
 * ❌ Kesalahan 2: Mematikan loading hanya di dalam blok try
 *    Akibat: Jika terjadi error jaringan di tengah jalan, kode melompat langsung ke `catch`,
 *    sehingga perintah `setIsLoading(false)` di dalam `try` terlewati dan spinner loading
 *    akan berputar selamanya di layar user!
 * ============================================================================
 */
