/**
 * ============================================================================
 * LATIHAN 05: useEffect, FETCH API, LOADING & ERROR STATE (latihan-05.tsx)
 * ============================================================================
 * 
 * TUJUAN LATIHAN:
 * 1. Menggunakan hook `useEffect` untuk menjalankan efek samping (side effects) pengambilan data HTTP.
 * 2. Mengelola 3 state utama siklus hidup pemanggilan API: data, loading, dan error.
 * 3. Mengetik antarmuka (interface) data balikan REST API publik (`https://jsonplaceholder.typicode.com/users`).
 * 4. Memahami fungsi dependency array kosong `[]` agar fetch hanya berjalan 1 kali saat komponen pertama kali dipasang (mount).
 * 5. Menampilkan indikator loading dan penanganan pesan error jika fetch gagal.
 * 
 * ESTIMASI TINGKAT KESULITAN:
 * 🟡 Sedang
 * 
 * PETUNJUK PENGERJAAN:
 * - Ikuti setiap instruksi bertanda `// TODO:` secara berurutan.
 * - Kode ini sudah bisa dijalankan tanpa error sejak awal.
 * ============================================================================
 */

import { useState, useEffect } from "react";
import { Users, Loader2, AlertTriangle, RefreshCw, Mail, Building } from "lucide-react";

// TODO 1: Definisikan interface `UserData` untuk data user dari JSONPlaceholder
// Properti yang dibutuhkan:
// - `id`: number
// - `name`: string
// - `email`: string
// - `company`: { name: string }
export interface UserData {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

// Data awal placeholder sebelum data riil diambil dari internet
const FALLBACK_USERS: UserData[] = [
  {
    id: 1,
    name: "Pengguna Contoh (Placeholder)",
    email: "contoh@placeholder.com",
    company: { name: "Tech Lab Placeholder" },
  },
];

export function Latihan05() {
  // TODO 2: Deklarasikan state `users` bertipe array UserData[]
  const [users, setUsers] = useState<UserData[]>(FALLBACK_USERS);

  // TODO 3: Deklarasikan state `isLoading` bertipe boolean (nilai awal: true)
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // TODO 4: Deklarasikan state `errorMessage` bertipe string (nilai awal: "")
  const [errorMessage, setErrorMessage] = useState<string>("");

  // TODO 5: Fungsi asinkron untuk mengambil data user dari API
  const fetchUsers = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      // Endpoint API publik JSONPlaceholder untuk data pengguna
      const response = await fetch("https://jsonplaceholder.typicode.com/users");

      if (!response.ok) {
        throw new Error(`Gagal mengambil data pengguna (HTTP Status: ${response.status})`);
      }

      const rawData = await response.json();
      // Simpan 4 pengguna pertama saja agar tampilan rapi
      setUsers(rawData.slice(0, 4));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan yang tidak terduga";
      setErrorMessage(msg);
    } finally {
      // Matikan indikator loading
      setIsLoading(false);
    }
  };

  // TODO 6: Gunakan useEffect dengan dependency array kosong []
  // agar `fetchUsers()` dieksekusi tepat 1 kali saat komponen dimuat (mount)
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="learning-card" style={{ marginTop: "1rem" }}>
      <div className="card-top-meta">
        <span className="card-badge">Soal Latihan 05</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <div>
          <h3 className="card-title" style={{ fontSize: "1.3rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Users size={20} style={{ color: "var(--accent)" }} />
            <span>Daftar Anggota Tim (Fetch REST API)</span>
          </h3>
          <p className="card-subtitle">
            Latihan fetching data eksternal, handling <code>isLoading</code>, dan <code>errorMessage</code>:
          </p>
        </div>

        {/* Tombol Muat Ulang Data */}
        <button
          type="button"
          onClick={fetchUsers}
          disabled={isLoading}
          className="btn-fetch"
          style={{ opacity: isLoading ? 0.6 : 1 }}
        >
          <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
          <span>{isLoading ? "Memuat..." : "Muat Ulang"}</span>
        </button>
      </div>

      {/* TODO 7: Tangani Kondisi Loading (Conditional Rendering) */}
      {isLoading && (
        <div className="loading-state">
          <Loader2 size={24} className="animate-spin" style={{ color: "var(--accent)" }} />
          <span>Sedang menyinkronkan data pengguna dari server...</span>
        </div>
      )}

      {/* TODO 8: Tangani Kondisi Error */}
      {errorMessage && !isLoading && (
        <div className="error-box" style={{ margin: "1rem 0" }}>
          <AlertTriangle size={18} style={{ color: "var(--danger)", flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 600, color: "var(--danger)" }}>Gagal Memuat Data</div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{errorMessage}</div>
          </div>
        </div>
      )}

      {/* TODO 9: Tampilkan Daftar Pengguna jika tidak sedang loading dan tidak error */}
      {!isLoading && !errorMessage && (
        <div className="post-grid" style={{ marginTop: "1rem" }}>
          {users.map((item) => (
            <article key={item.id} className="post-card">
              <div className="post-id">USER #{item.id}</div>
              <h4 className="post-title" style={{ fontSize: "1rem", marginBottom: "0.4rem" }}>
                {item.name}
              </h4>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <Mail size={13} style={{ color: "var(--accent)" }} />
                  {item.email}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <Building size={13} style={{ color: "var(--text-muted)" }} />
                  {item.company.name}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      <div style={{ marginTop: "1.25rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
        <em>
          💡 Setelah mencoba fitur fetch dan tombol reload di atas, periksa kunci jawaban resmi di{" "}
          <code>src/pembelajaran/05-effects/latihan/jawaban-05.tsx</code>.
        </em>
      </div>
    </section>
  );
}

export default Latihan05;
