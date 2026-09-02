/**
 * ============================================================================
 * LATIHAN 04: EVENT HANDLING, FORM & VALIDASI (latihan-04.tsx)
 * ============================================================================
 * 
 * TUJUAN LATIHAN:
 * 1. Menerapkan Controlled Form Component di React.
 * 2. Menangani event `onChange` dengan typing `React.ChangeEvent<HTMLInputElement>`.
 * 3. Menangani event `onSubmit` dengan typing `React.FormEvent<HTMLFormElement>`.
 * 4. Mencegah reload halaman bawaan browser menggunakan `e.preventDefault()`.
 * 5. Membuat validasi email sederhana (harus mengandung karakter '@' dan minimal 5 karakter).
 * 6. Menangani event `onClick` untuk tombol reset formulir.
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
import { Mail, Send, RotateCcw, AlertCircle, CheckCircle2 } from "lucide-react";

export function Latihan04() {
  // TODO 1: Deklarasikan state input teks email (string)
  const [email, setEmail] = useState<string>("");

  // TODO 2: Deklarasikan state pesan error validasi (string)
  const [errorMessage, setErrorMessage] = useState<string>("");

  // TODO 3: Deklarasikan state status berhasil terdaftar (boolean)
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  // TODO 4: Handler untuk event onChange input email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Reset error dan status sukses jika user mulai mengetik ulang
    if (errorMessage) {
      setErrorMessage("");
    }
    if (isSubscribed) {
      setIsSubscribed(false);
    }
  };

  // TODO 5: Handler untuk event onSubmit formulir
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // TODO 5.1: PENTING! Cegah browser me-refresh/reload halaman
    e.preventDefault();

    const trimmedEmail = email.trim();

    // TODO 5.2: Buat validasi:
    // Email tidak boleh kosong, minimal 5 karakter, dan wajib mengandung karakter '@'
    if (!trimmedEmail) {
      setErrorMessage("Email wajib diisi!");
      return;
    }

    if (trimmedEmail.length < 5 || !trimmedEmail.includes("@")) {
      setErrorMessage("Format email tidak valid (harus mengandung '@' dan minimal 5 karakter)!");
      return;
    }

    // Jika validasi lolos:
    setIsSubscribed(true);
    setErrorMessage("");
  };

  // TODO 6: Handler onClick untuk tombol reset formulir
  const handleReset = () => {
    setEmail("");
    setErrorMessage("");
    setIsSubscribed(false);
  };

  return (
    <section className="learning-card" style={{ marginTop: "1rem" }}>
      <div className="card-top-meta">
        <span className="card-badge">Soal Latihan 04</span>
      </div>

      <h3 className="card-title" style={{ fontSize: "1.3rem" }}>
        Formulir Langganan Buletin Developer (Newsletter)
      </h3>
      <p className="card-subtitle">
        Latihan menangani event <code>onChange</code>, <code>onSubmit</code>, validasi input, dan pencegahan reload halaman:
      </p>

      {/* TODO 7: Pasang event onSubmit pada tag form */}
      <form onSubmit={handleSubmit} className="custom-form">
        <div className="form-field">
          <label htmlFor="newsletter-email" className="form-label" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <Mail size={14} style={{ color: "var(--text-muted)" }} />
            <span>Alamat Email Anda:</span>
          </label>
          <div style={{ position: "relative" }}>
            <input
              id="newsletter-email"
              type="text"
              value={email}
              onChange={handleEmailChange}
              placeholder="Contoh: programmer@gmail.com"
              className={`form-input ${errorMessage ? "input-error" : ""}`}
            />
          </div>
        </div>

        {/* Pesan Error Validasi */}
        {errorMessage && (
          <div className="error-badge">
            <AlertCircle size={14} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Tombol Aksi Form */}
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            <Send size={14} />
            <span>Berlangganan Newsletter</span>
          </button>

          {/* TODO 8: Pasang event onClick pada tombol Reset */}
          <button
            type="button"
            onClick={handleReset}
            className="btn-reset-form"
          >
            <RotateCcw size={14} style={{ display: "inline", marginRight: "4px" }} />
            <span>Reset</span>
          </button>
        </div>
      </form>

      {/* Notifikasi Berhasil (Conditional Rendering) */}
      {isSubscribed && (
        <div className="submit-result-card" style={{ marginTop: "1.5rem" }}>
          <div className="result-header">
            <span className="result-badge">
              <CheckCircle2 size={16} />
              <span>Berhasil Berlangganan!</span>
            </span>
          </div>
          <p className="result-note" style={{ color: "var(--text-heading)", fontWeight: 500 }}>
            Terima kasih! Email konfirmasi telah dikirim ke <code>{email}</code>.
          </p>
        </div>
      )}

      <div style={{ marginTop: "1.25rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
        <em>
          💡 Setelah mencoba mengetik dan men-submit form di atas, periksa kunci jawaban resmi di{" "}
          <code>src/pembelajaran/04-events/latihan/jawaban-04.tsx</code>.
        </em>
      </div>
    </section>
  );
}

export default Latihan04;
