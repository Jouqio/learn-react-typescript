/**
 * ============================================================================
 * TAHAP 4: PRAKTIK FORM DENGAN EVENT HANDLING (SimpleNameForm.tsx)
 * ============================================================================
 * 
 * TUJUAN PEMBELAJARAN:
 * 1. Menerapkan Controlled Component (input teks yang nilainya dikendalikan oleh state).
 * 2. Menangani `onChange` dengan typing `React.ChangeEvent<HTMLInputElement>`.
 * 3. Menangani `onSubmit` dengan typing `React.FormEvent<HTMLFormElement>` dan `e.preventDefault()`.
 * 4. Validasi minimal: Nama wajib diisi dan minimal 3 karakter.
 */

import { useState } from "react";
import { 
  FileSpreadsheet, 
  Send, 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2 
} from "lucide-react";

// Interface data hasil submit
export interface SubmittedData {
  name: string;
  salutation: string;
  submittedAt: string;
}

// Konstanta aturan validasi (Clean Code)
const MIN_NAME_LENGTH = 3;
const DEFAULT_SALUTATION = "Kak";

export function SimpleNameForm() {
  // State untuk input teks nama
  const [name, setName] = useState<string>("");

  // State untuk pilihan sapaan (dropdown)
  const [salutation, setSalutation] = useState<string>(DEFAULT_SALUTATION);

  // State untuk pesan error validasi (string kosong jika tidak ada error)
  const [errorMessage, setErrorMessage] = useState<string>("");

  // State untuk menampung data yang berhasil disubmit
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);

  // 1. Handler Event onChange Input Nama (Type-Safe)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);

    // Validasi real-time saat mengetik
    if (newName.trim().length > 0 && newName.trim().length < MIN_NAME_LENGTH) {
      setErrorMessage(`Nama terlalu pendek (minimal ${MIN_NAME_LENGTH} karakter).`);
    } else {
      setErrorMessage("");
    }
  };

  // 2. Handler Event onChange Dropdown Sapaan
  const handleSalutationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSalutation(e.target.value);
  };

  // 3. Handler Event onSubmit Form (Type-Safe)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // PENTING: Cegah browser refresh otomatis!
    e.preventDefault();

    const trimmedName = name.trim();

    // Validasi saat form dikirim
    if (trimmedName.length < MIN_NAME_LENGTH) {
      setErrorMessage(`Gagal kirim: Nama harus minimal ${MIN_NAME_LENGTH} karakter!`);
      return;
    }

    // Jika lolos validasi, simpan ke submittedData
    setSubmittedData({
      name: trimmedName,
      salutation: salutation,
      submittedAt: new Date().toLocaleTimeString("id-ID"),
    });

    // Reset input dan error setelah sukses
    setErrorMessage("");
  };

  // 4. Handler Reset Form
  const handleResetForm = () => {
    setName("");
    setSalutation(DEFAULT_SALUTATION);
    setErrorMessage("");
    setSubmittedData(null);
  };

  return (
    <section className="learning-card">
      <div className="card-top-meta">
        <div className="card-badge">
          <FileSpreadsheet size={14} />
          Tahap 4: Praktik Form & Validasi
        </div>
      </div>

      <h2 className="card-title">Form Sapaan Sederhana (Controlled Form)</h2>
      <p className="card-subtitle">
        Ketik nama Anda dan klik tombol kirim untuk menguji penanganan event form
      </p>

      {/* Elemen Form dengan onSubmit */}
      <form onSubmit={handleSubmit} className="custom-form">
        <div className="form-group-row">
          {/* Dropdown Sapaan */}
          <div className="form-field select-field">
            <label htmlFor="salutation-select" className="form-label">
              Sapaan:
            </label>
            <select
              id="salutation-select"
              value={salutation}
              onChange={handleSalutationChange}
              className="form-input"
            >
              <option value="Kak">Kak</option>
              <option value="Mas">Mas</option>
              <option value="Mbak">Mbak</option>
              <option value="Pak">Pak</option>
              <option value="Bu">Bu</option>
            </select>
          </div>

          {/* Input Nama Teks */}
          <div className="form-field name-field">
            <label htmlFor="name-input" className="form-label">
              Nama Lengkap:
            </label>
            <input
              id="name-input"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Contoh: Zakie Kurniawan"
              className={`form-input ${errorMessage ? "input-error" : ""}`}
            />
          </div>
        </div>

        {/* Indikator Pesan Error Validasi */}
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
            <span>Kirim Salam</span>
          </button>
          <button
            type="button"
            onClick={handleResetForm}
            className="btn-reset-form"
          >
            <RotateCcw size={13} style={{ display: "inline", marginRight: "4px" }} />
            <span>Reset</span>
          </button>
        </div>
      </form>

      {/* Kartu Hasil Submit (Conditional Rendering) */}
      {submittedData && (
        <div className="submit-result-card">
          <div className="result-header">
            <span className="result-badge">
              <CheckCircle2 size={16} />
              <span>Data Berhasil Dikirim</span>
            </span>
            <small className="result-time">{submittedData.submittedAt} WIB</small>
          </div>
          <h3 className="result-greeting">
            Selamat datang, {submittedData.salutation} {submittedData.name}!
          </h3>
          <p className="result-note">
            Event <code>onSubmit</code> berhasil dicegat dengan{" "}
            <code>e.preventDefault()</code>, dan data disimpan ke dalam state dengan tipe data{" "}
            <code>SubmittedData</code>.
          </p>
        </div>
      )}
    </section>
  );
}
