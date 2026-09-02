/**
 * ============================================================================
 * LATIHAN RUNNER (LatihanRunner.tsx)
 * ============================================================================
 * 
 * Komponen utilitas interaktif untuk memilih dan menjalankan latihan-XX.tsx
 * maupun jawaban-XX.tsx (Tahap 1 s.d. 7) secara instan melalui dropdown selector,
 * tanpa perlu mengubah file konfigurasi atau import secara manual.
 * ============================================================================
 */

import { useState } from "react";
import { PlayCircle, Code2, Sparkles, FileCode } from "lucide-react";

// Import Seluruh Latihan (Soal)
import { Latihan01 } from "./01-kenalan/latihan/latihan-01";
import { Latihan02 } from "./02-props/latihan/latihan-02";
import { Latihan03 } from "./03-state/latihan/latihan-03";
import { Latihan04 } from "./04-events/latihan/latihan-04";
import { Latihan05 } from "./05-effects/latihan/latihan-05";
import { Latihan06 } from "./06-rendering/latihan/latihan-06";
import { Latihan07 } from "./07-mini-project/latihan/latihan-07";

// Import Seluruh Kunci Jawaban Resmi
import { Jawaban01 } from "./01-kenalan/latihan/jawaban-01";
import { Jawaban02 } from "./02-props/latihan/jawaban-02";
import { Jawaban03 } from "./03-state/latihan/jawaban-03";
import { Jawaban04 } from "./04-events/latihan/jawaban-04";
import { Jawaban05 } from "./05-effects/latihan/jawaban-05";
import { Jawaban06 } from "./06-rendering/latihan/jawaban-06";
import { Jawaban07 } from "./07-mini-project/latihan/jawaban-07";

interface ItemLatihanConfig {
  nomor: number;
  label: string;
  topik: string;
  filePathSoal: string;
  filePathJawaban: string;
  komponenSoal: React.ReactNode;
  komponenJawaban: React.ReactNode;
}

const DAFTAR_LATIHAN: ItemLatihanConfig[] = [
  {
    nomor: 1,
    label: "Latihan 01: Component Dasar & JSX",
    topik: "Function Component, JSX rules, Fragment, & interpolasi {variabel}",
    filePathSoal: "src/pembelajaran/01-kenalan/latihan/latihan-01.tsx",
    filePathJawaban: "src/pembelajaran/01-kenalan/latihan/jawaban-01.tsx",
    komponenSoal: <Latihan01 />,
    komponenJawaban: <Jawaban01 />,
  },
  {
    nomor: 2,
    label: "Latihan 02: Props & Typing Interface",
    topik: "Kontrak interface, optional props (?), & parameter default values",
    filePathSoal: "src/pembelajaran/02-props/latihan/latihan-02.tsx",
    filePathJawaban: "src/pembelajaran/02-props/latihan/jawaban-02.tsx",
    komponenSoal: <Latihan02 />,
    komponenJawaban: <Jawaban02 />,
  },
  {
    nomor: 3,
    label: "Latihan 03: useState & Multiple State",
    topik: "State independen, updater function (prev => ...), & toggle boolean",
    filePathSoal: "src/pembelajaran/03-state/latihan/latihan-03.tsx",
    filePathJawaban: "src/pembelajaran/03-state/latihan/jawaban-03.tsx",
    komponenSoal: <Latihan03 />,
    komponenJawaban: <Jawaban03 />,
  },
  {
    nomor: 4,
    label: "Latihan 04: Event Handling & Form Input",
    topik: "onChange, onSubmit, e.preventDefault(), & validasi input teks",
    filePathSoal: "src/pembelajaran/04-events/latihan/latihan-04.tsx",
    filePathJawaban: "src/pembelajaran/04-events/latihan/jawaban-04.tsx",
    komponenSoal: <Latihan04 />,
    komponenJawaban: <Jawaban04 />,
  },
  {
    nomor: 5,
    label: "Latihan 05: useEffect & Asynchronous Fetch",
    topik: "Side effects, JSONPlaceholder fetch, loading state, & error handling",
    filePathSoal: "src/pembelajaran/05-effects/latihan/latihan-05.tsx",
    filePathJawaban: "src/pembelajaran/05-effects/latihan/jawaban-05.tsx",
    komponenSoal: <Latihan05 />,
    komponenJawaban: <Jawaban05 />,
  },
  {
    nomor: 6,
    label: "Latihan 06: Conditional & List Rendering",
    topik: "Looping .map(), permanent key ID, empty state, & filter status",
    filePathSoal: "src/pembelajaran/06-rendering/latihan/latihan-06.tsx",
    filePathJawaban: "src/pembelajaran/06-rendering/latihan/jawaban-06.tsx",
    komponenSoal: <Latihan06 />,
    komponenJawaban: <Jawaban06 />,
  },
  {
    nomor: 7,
    label: "Latihan 07: Mini Project Catatan Belanja",
    topik: "Integrasi menyeluruh Tahap 1-6 + persistensi LocalStorage",
    filePathSoal: "src/pembelajaran/07-mini-project/latihan/latihan-07.tsx",
    filePathJawaban: "src/pembelajaran/07-mini-project/latihan/jawaban-07.tsx",
    komponenSoal: <Latihan07 />,
    komponenJawaban: <Jawaban07 />,
  },
];

export function LatihanRunner() {
  const [nomorTerpilih, setNomorTerpilih] = useState<number>(1);
  const [modeTampilan, setModeTampilan] = useState<"soal" | "jawaban">("soal");

  const aktif = DAFTAR_LATIHAN.find((item) => item.nomor === nomorTerpilih) ?? DAFTAR_LATIHAN[0];

  return (
    <div className="learning-card" style={{ marginTop: "1rem", border: "1px solid var(--border-subtle)" }}>
      {/* Header Runner */}
      <div className="card-top-meta">
        <span className="card-badge" style={{ color: "var(--accent)", borderColor: "var(--accent-border)" }}>
          <PlayCircle size={14} />
          <span>Interactive Exercise Runner</span>
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
        <div>
          <h3 className="card-title" style={{ fontSize: "1.35rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Code2 size={22} style={{ color: "var(--accent)" }} />
            <span>Pusat Pengujian Latihan Mandiri</span>
          </h3>
          <p className="card-subtitle">
            Pilih nomor soal latihan yang ingin Anda jalankan secara langsung melalui menu di bawah:
          </p>
        </div>

        {/* Toggle Mode: Soal vs Jawaban */}
        <div style={{ display: "flex", background: "var(--bg-surface)", padding: "0.25rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
          <button
            type="button"
            onClick={() => setModeTampilan("soal")}
            className={`btn-filter ${modeTampilan === "soal" ? "active" : ""}`}
            style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
          >
            Soal Latihan (TODO)
          </button>
          <button
            type="button"
            onClick={() => setModeTampilan("jawaban")}
            className={`btn-filter ${modeTampilan === "jawaban" ? "active" : ""}`}
            style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
          >
            Kunci Jawaban Resmi
          </button>
        </div>
      </div>

      {/* Selector Dropdown & Info File */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
        gap: "1rem", 
        background: "var(--bg-canvas)", 
        padding: "1rem", 
        borderRadius: "var(--radius-md)", 
        border: "1px solid var(--border-subtle)",
        marginBottom: "1.5rem"
      }}>
        <div>
          <label htmlFor="select-latihan" style={{ display: "block", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.4rem", fontWeight: 500 }}>
            Pilih Nomor Latihan:
          </label>
          <select
            id="select-latihan"
            value={nomorTerpilih}
            onChange={(e) => setNomorTerpilih(Number(e.target.value))}
            className="form-input"
            style={{ width: "100%", cursor: "pointer", background: "var(--bg-surface)", color: "var(--text-heading)", fontWeight: 500 }}
          >
            {DAFTAR_LATIHAN.map((opt) => (
              <option key={opt.nomor} value={opt.nomor}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", fontSize: "0.85rem" }}>
          <div style={{ color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.25rem" }}>
            <FileCode size={14} style={{ color: "var(--accent)" }} />
            <span>File yang Sedang Dijalankan:</span>
          </div>
          <code style={{ color: "var(--accent)", fontWeight: 600, background: "var(--bg-surface)", padding: "0.3rem 0.6rem", borderRadius: "var(--radius-sm)", width: "fit-content" }}>
            {modeTampilan === "soal" ? aktif.filePathSoal : aktif.filePathJawaban}
          </code>
        </div>
      </div>

      {/* Banner Informasi Topik */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "0.6rem", 
        padding: "0.75rem 1rem", 
        background: "var(--bg-subtle)", 
        borderRadius: "var(--radius-sm)", 
        borderLeft: "3px solid var(--accent)",
        fontSize: "0.85rem",
        marginBottom: "1.25rem"
      }}>
        <Sparkles size={16} style={{ color: "var(--accent)", flexShrink: 0 }} />
        <div>
          <span style={{ fontWeight: 600, color: "var(--text-heading)" }}>Topik Materi: </span>
          <span style={{ color: "var(--text-secondary)" }}>{aktif.topik}</span>
        </div>
      </div>

      {/* Render Komponen Terpilih */}
      <div style={{ borderTop: "1px dashed var(--border-subtle)", paddingTop: "1rem" }}>
        {modeTampilan === "soal" ? aktif.komponenSoal : aktif.komponenJawaban}
      </div>
    </div>
  );
}

export default LatihanRunner;
