/**
 * ============================================================================
 * TAHAP 5: PENGENALAN useEffect & SIDE EFFECTS (EffectExplainer.tsx)
 * ============================================================================
 * 
 * 1. APA ITU "SIDE EFFECT" (EFEK SAMPING)?
 *    Secara default, fungsi component React hanya bertugas satu hal:
 *    Menerima data (props/state) dan MENGEMBALIKAN TAMPILAN JSX (Pure Rendering).
 *    
 *    Segala hal yang terjadi "di luar" proses rendering murni tersebut disebut SIDE EFFECT:
 *    - Mengambil data dari server/API (Data Fetching)
 *    - Mengubah judul tab browser (`document.title`)
 *    - Memasang timer/interval (`setInterval`, `setTimeout`)
 *    - Berlangganan event eksternal (Websocket, Event Listener window)
 * 
 * 2. KAPAN useEffect DIJALANKAN?
 *    `useEffect` berjalan SETELAH component selesai dirender di layar.
 */

import { RefreshCw, Clock, ChefHat } from "lucide-react";
import { CodeComparison } from "../common/CodeComparison";

interface DependencyPattern {
  id: string;
  syntax: string;
  trigger: string;
  useCase: string;
}

const DEPENDENCY_PATTERNS: DependencyPattern[] = [
  {
    id: "empty-array",
    syntax: "useEffect(() => { ... }, [])",
    trigger: "Hanya 1x saat komponen pertama kali dimuat (Mounting)",
    useCase: "Fetch data awal dari API, inisialisasi listener.",
  },
  {
    id: "with-deps",
    syntax: "useEffect(() => { ... }, [userId])",
    trigger: "Saat mount + setiap kali nilai `userId` berubah",
    useCase: "Fetch ulang data profil saat user memilih ID baru.",
  },
  {
    id: "no-deps",
    syntax: "useEffect(() => { ... })",
    trigger: "Berjalan setiap kali komponen mengalami re-render",
    useCase: "Logging performa / debugging.",
  },
];

export function EffectExplainer() {
  return (
    <section className="learning-card">
      <div className="card-top-meta">
        <div className="card-badge">
          <RefreshCw size={14} />
          Tahap 5: Konsep useEffect
        </div>
      </div>

      <h2 className="card-title">Apa itu useEffect & Kapan Harus Digunakan?</h2>
      <p className="card-subtitle">
        Memahami cara menangani efek samping (side effects) seperti HTTP Fetching tanpa risiko infinite loop
      </p>

      {/* Tabel Pola Dependency Array */}
      <div className="table-responsive">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Sintaks Dependency</th>
              <th>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <Clock size={14} /> Kapan Berjalan?
                </span>
              </th>
              <th>Contoh Kasus Penggunaan</th>
            </tr>
          </thead>
          <tbody>
            {DEPENDENCY_PATTERNS.map((pattern) => (
              <tr key={pattern.id}>
                <td className="table-label"><code>{pattern.syntax}</code></td>
                <td className="highlight-state">{pattern.trigger}</td>
                <td>{pattern.useCase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Komparasi Visual: Fetch Langsung vs Di Dalam useEffect */}
      <CodeComparison
        title="Side Effects: Fetch Langsung di Body Component vs useEffect"
        wrongTitle="Fetch Langsung di Body Fungsi"
        wrongCode={`function BadComponent() {
  // BAHAYA INFINITE LOOP:
  fetch('/api/posts')
    .then(res => res.json())
    .then(data => setData(data)); // setState memicu re-render
                                  // re-render memicu fetch lagi!
  return <div>...</div>;
}`}
        wrongExplanation="Fetch memicu re-render tak berujung dan membuat browser freeze (infinite loop)."
        correctTitle="Bungkus dalam useEffect"
        correctCode={`function GoodComponent() {
  // AMAN DENGAN DEPENDENCY ARRAY KOSONG []:
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setData(data));
  }, []); // Hanya berjalan 1 kali saat component dipasang

  return <div>...</div>;
}`}
        correctExplanation="useEffect berjalan terisolasi setelah render pertama, aman dan terkontrol."
      />

      {/* Panduan Analogi */}
      <div className="concept-box">
        <div className="concept-box-header">
          <ChefHat size={16} />
          <span>Analogi Sederhana: Koki & Efek Samping</span>
        </div>
        <p>
          Bayangkan component Anda adalah seorang <strong>Koki Restoran</strong>.
          Tugas utama koki adalah memasak hidangan (merender JSX).
          Namun setelah hidangan siap di meja, ada tugas lain di luar memasak:
          menelepon supplier bahan baku, mencatat pesanan, atau menyalakan timer oven.
          Itulah <strong>Side Effect</strong> yang kita sinkronkan dengan aman melalui <code>useEffect</code>!
        </p>
      </div>
    </section>
  );
}
