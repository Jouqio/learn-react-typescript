/**
 * ============================================================================
 * KUNCI JAWABAN LATIHAN 04: EVENT HANDLING, FORM & VALIDASI (jawaban-04.tsx)
 * ============================================================================
 * 
 * TUJUAN PEMBELAJARAN & EVALUASI:
 * Membandingkan solusi yang Anda buat di `latihan-04.tsx` dengan implementasi
 * standar industri: penanganan SyntheticEvent React, pencegahan form reload,
 * sanitasi input teks, dan validasi sisi klien yang bersih.
 * ============================================================================
 */

import { useState } from "react";
import { CheckCircle2, Mail, Send, RotateCcw, AlertCircle } from "lucide-react";

// KONSTANTA ATURAN VALIDASI (CLEAN CODE / PRINSIP DRY)
const MIN_EMAIL_LENGTH = 5;

export function Jawaban04() {
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  // HANDLER 1: Perubahan Nilai Input Teks (onChange)
  // KENAPA HARUS MEMAKAI `React.ChangeEvent<HTMLInputElement>`?
  // React membungkus event browser asli ke dalam SyntheticEvent. Memberikan generic
  // `<HTMLInputElement>` memberitahu TypeScript bahwa target event pasti memiliki
  // properti `.value` berupa string, sehingga kita mendapatkan autocomplete penuh tanpa `any`!
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    // UX Bersih: Hapus pesan error saat pengguna mulai memperbaiki ketikannya
    if (errorMessage) {
      setErrorMessage("");
    }
    if (isSubscribed) {
      setIsSubscribed(false);
    }
  };

  // HANDLER 2: Pengiriman Formulir (onSubmit)
  // KENAPA HARUS `e.preventDefault()`?
  // Perilaku default formulir HTML di browser adalah mengirim HTTP POST/GET dan
  // me-reload seluruh halaman. Di aplikasi React (Single Page Application), reload
  // tersebut akan menghapus seluruh state di memori. `e.preventDefault()` mencegah reload itu.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanEmail = email.trim();

    // Validasi 1: Cek apakah input kosong
    if (!cleanEmail) {
      setErrorMessage("Alamat email tidak boleh kosong!");
      return;
    }

    // Validasi 2: Cek panjang teks dan keberadaan karakter '@'
    if (cleanEmail.length < MIN_EMAIL_LENGTH || !cleanEmail.includes("@")) {
      setErrorMessage(
        `Email tidak valid: harus minimal ${MIN_EMAIL_LENGTH} karakter dan menyertakan tanda '@'!`
      );
      return;
    }

    // Validasi Sukses
    setIsSubscribed(true);
    setErrorMessage("");
  };

  // HANDLER 3: Reset Formulir (onClick)
  const handleReset = () => {
    setEmail("");
    setErrorMessage("");
    setIsSubscribed(false);
  };

  return (
    <section className="learning-card" style={{ marginTop: "1rem" }}>
      <div className="card-top-meta">
        <span className="card-badge" style={{ color: "var(--success)", borderColor: "var(--success-border)" }}>
          <CheckCircle2 size={13} />
          Kunci Jawaban Latihan 04 (Resmi)
        </span>
      </div>

      <h3 className="card-title" style={{ fontSize: "1.3rem" }}>
        Formulir Langganan Buletin Developer (Newsletter)
      </h3>
      <p className="card-subtitle">
        Pola form type-safe dengan penanganan <code>onSubmit</code>, <code>onChange</code>, dan validasi terisolasi:
      </p>

      {/* Form Element */}
      <form onSubmit={handleSubmit} className="custom-form">
        <div className="form-field">
          <label htmlFor="newsletter-email-official" className="form-label" style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <Mail size={14} style={{ color: "var(--text-muted)" }} />
            <span>Alamat Email:</span>
          </label>
          <input
            id="newsletter-email-official"
            type="text"
            value={email}
            onChange={handleEmailChange}
            placeholder="Contoh: programmer@gmail.com"
            className={`form-input ${errorMessage ? "input-error" : ""}`}
          />
        </div>

        {/* Indikator Pesan Error */}
        {errorMessage && (
          <div className="error-badge">
            <AlertCircle size={14} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Aksi Form */}
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            <Send size={14} />
            <span>Berlangganan Newsletter</span>
          </button>

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

      {/* Notifikasi Berhasil */}
      {isSubscribed && (
        <div className="submit-result-card" style={{ marginTop: "1.5rem" }}>
          <div className="result-header">
            <span className="result-badge">
              <CheckCircle2 size={16} />
              <span>Pendaftaran Berhasil!</span>
            </span>
          </div>
          <p className="result-note" style={{ color: "var(--text-heading)", fontWeight: 500 }}>
            Terima kasih! Email konfirmasi buletin mingguan telah dikirim ke <code>{email}</code>.
          </p>
        </div>
      )}

      <div style={{ marginTop: "1.25rem", padding: "0.75rem", background: "var(--bg-canvas)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", fontSize: "0.82rem" }}>
        <span style={{ color: "var(--success)", fontWeight: 600 }}>Poin Evaluasi: </span>
        Apakah Anda berhasil memanggil <code>e.preventDefault()</code> saat submit, menggunakan tipe event <code>React.ChangeEvent</code> & <code>React.FormEvent</code>, serta menampilkan feedback error secara kondisional? Pola ini adalah standar penanganan formulir di seluruh ekosistem React!
      </div>
    </section>
  );
}

export default Jawaban04;

/* ============================================================================
 * PENJELASAN TAMBAHAN (MATERI KUNCI TAHAP 4)
 * ============================================================================
 * 
 * 1. APA ITU CONTROLLED COMPONENT?
 *    Input teks di atas disebut "Controlled Component" karena nilainya dikendalikan
 *    sepenuhnya oleh state React (`value={email}`). Setiap kali user mengetik 1 huruf,
 *    event `onChange` dipicu, state diperbarui, dan React menampilkan huruf terbaru ke input.
 *    Kelebihannya: kita bisa memvalidasi, memformat, atau membatasi input secara real-time!
 * 
 * 2. PERBEDAAN SINTAKS HTML DENGAN REACT:
 *    - HTML : `onsubmit="return handleSubmit(event)"`
 *    - React: `onSubmit={handleSubmit}` (camelCase dan menerima referensi fungsi murni).
 * 
 * ============================================================================
 * KESALAHAN UMUM PEMULA (HATI-HATI!):
 * ============================================================================
 * 
 * ❌ Kesalahan 1: Lupa e.preventDefault() pada form
 *    Akibat: Setiap kali tombol kirim ditekan, halaman browser akan langsung me-reload
 *    dan seluruh isian form serta state aplikasi ter-reset hilang!
 * 
 * ❌ Kesalahan 2: Memanggil fungsi langsung di JSX
 *    Contoh: `<button onClick={handleReset()}>Reset</button>`
 *    Akibat: Tanda kurung `()` membuat `handleReset` langsung dieksekusi saat render,
 *    bukan saat tombol diklik!
 *    Solusi Benar: `<button onClick={handleReset}>Reset</button>`
 * 
 * ❌ Kesalahan 3: Tidak memberi type="button" pada tombol selain submit
 *    Di dalam tag `<form>`, setiap tombol secara default bertipe `type="submit"`!
 *    Jika Anda membuat tombol "Reset" tanpa menulis `type="button"`, browser akan
 *    menganggap tombol itu memicu submit form!
 * ============================================================================
 */
