/**
 * ============================================================================
 * TAHAP 1: STRUKTUR PROJECT VITE + REACT-TS (StrukturProjectExplainer.tsx)
 * ============================================================================
 * 
 * BAGAIMANA REACT BISA TAMPIL DI BROWSER?
 * 
 * 1. `index.html` (Pintu Masuk Browser)
 *    Browser memuat index.html. Di dalam index.html terdapat satu elemen kosong:
 *    `<div id="root"></div>` dan tag `<script type="module" src="/src/main.tsx"></script>`.
 * 
 * 2. `src/main.tsx` (Jembatan Penghubung / Entry Point React)
 *    File ini mencari elemen `id="root"` di HTML menggunakan `document.getElementById('root')`,
 *    lalu merender component utama (`<App />`) ke dalam elemen tersebut via `createRoot`.
 * 
 * 3. `src/App.tsx` (Component Utama / Root Component)
 *    Component utama tempat kita menyusun component-component lainnya.
 * 
 * 4. `src/pembelajaran/` (Folder Materi Belajar Kita)
 *    Setiap konsep dibuatkan component tersendiri (contoh: HelloWorld.tsx)
 *    agar rapi dan mudah diuji.
 */

import { 
  FolderGit2, 
  Workflow, 
  FolderTree, 
  Folder, 
  FileCode, 
  ArrowRight 
} from "lucide-react";

// Tipe data untuk item penjelasan folder agar aman secara TypeScript
interface ProjectItem {
  id: string;
  name: string;
  type: "folder" | "file";
  description: string;
}

// Data daftar file & folder project Vite React-TS
const PROJECT_STRUCTURE_ITEMS: ProjectItem[] = [
  {
    id: "public",
    name: "public/",
    type: "folder",
    description: "Asset statis yang tidak diproses oleh bundler (contoh: favicon, gambar statis).",
  },
  {
    id: "src",
    name: "src/",
    type: "folder",
    description: "Jantung aplikasi kita! Semua kode React (.tsx), CSS, asset, dan logic ada di sini.",
  },
  {
    id: "src-pembelajaran",
    name: "src/pembelajaran/",
    type: "folder",
    description: "Folder modul materi belajar kita (01-kenalan, 02-props, 03-state, dst).",
  },
  {
    id: "index-html",
    name: "index.html",
    type: "file",
    description: "File HTML utama yang memuat <div id=\"root\"></div> sebagai tempat React dirender.",
  },
  {
    id: "src-main",
    name: "src/main.tsx",
    type: "file",
    description: "Entry point TypeScript yang me-mount component <App /> ke dalam DOM HTML.",
  },
  {
    id: "src-app",
    name: "src/App.tsx",
    type: "file",
    description: "Root Component yang menjadi wadah utama menyusun komponen-komponen antarmuka.",
  },
  {
    id: "package-json",
    name: "package.json",
    type: "file",
    description: "Daftar paket dependensi (React, TS) dan perintah (npm run dev, npm run build).",
  },
];

export function StrukturProjectExplainer() {
  return (
    <section className="learning-card">
      <div className="card-top-meta">
        <div className="card-badge">
          <FolderGit2 size={14} />
          Tahap 1: Struktur & Alur Kerja
        </div>
      </div>

      <h2 className="card-title">Struktur Folder & Alur Kerja Vite + React-TS</h2>
      <p className="card-subtitle">
        Memahami bagaimana React merender tampilan dari file HTML hingga ke komponen TSX
      </p>

      {/* Diagram Alur Rendering */}
      <div className="flow-container">
        <div className="flow-header">
          <Workflow size={16} />
          <span>Alur Eksekusi Rendering React</span>
        </div>
        <div className="flow-steps">
          <div className="flow-step-box">
            <span className="step-num-pill">1</span>
            <span className="flow-step-title">index.html</span>
            <small className="flow-step-desc">&lt;div id="root"&gt;</small>
          </div>
          <ArrowRight size={16} className="flow-arrow-icon" />
          <div className="flow-step-box">
            <span className="step-num-pill">2</span>
            <span className="flow-step-title">main.tsx</span>
            <small className="flow-step-desc">createRoot().render()</small>
          </div>
          <ArrowRight size={16} className="flow-arrow-icon" />
          <div className="flow-step-box">
            <span className="step-num-pill">3</span>
            <span className="flow-step-title">App.tsx</span>
            <small className="flow-step-desc">Root Component</small>
          </div>
          <ArrowRight size={16} className="flow-arrow-icon" />
          <div className="flow-step-box highlight">
            <span className="step-num-pill">4</span>
            <span className="flow-step-title">HelloWorld.tsx</span>
            <small className="flow-step-desc">Component Anda</small>
          </div>
        </div>
      </div>

      {/* Panduan File & Folder */}
      <div className="flow-container">
        <div className="flow-header">
          <FolderTree size={16} />
          <span>Panduan File & Folder Penting</span>
        </div>
        <ul className="structure-list">
          {PROJECT_STRUCTURE_ITEMS.map((item) => (
            <li key={item.id} className="structure-item">
              <span className="file-badge">
                {item.type === "folder" ? (
                  <Folder size={15} className="flow-arrow-icon" />
                ) : (
                  <FileCode size={15} className="flow-arrow-icon" />
                )}
                <span>{item.name}</span>
              </span>
              <span className="file-desc">{item.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
