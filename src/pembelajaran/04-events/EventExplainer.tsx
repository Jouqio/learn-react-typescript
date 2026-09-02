/**
 * ============================================================================
 * TAHAP 4: EVENT HANDLING & TYPING DI TYPESCRIPT (EventExplainer.tsx)
 * ============================================================================
 * 
 * 1. APA ITU EVENT HANDLING DI REACT?
 *    Event adalah aksi yang dipicu oleh user (seperti klik tombol, mengetik di input,
 *    mengirimkan form).
 *    React menggunakan "SyntheticEvent", yaitu wrapper lintas browser yang membuat
 *    perilaku event sama persis di semua browser.
 * 
 * 2. PERBEDAAN SINTAKS HTML VS REACT:
 *    - HTML biasa : `onclick="handleClick()"` (lowercase, string pemanggil)
 *    - React JSX  : `onClick={handleClick}` (camelCase, mengoper function reference!)
 */

import { MousePointerClick, ShieldCheck, Zap } from "lucide-react";
import { CodeComparison } from "../common/CodeComparison";

interface EventGuideItem {
  id: string;
  eventName: string;
  tsType: string;
  targetElement: string;
  usageSnippet: string;
}

const EVENT_GUIDE_ITEMS: EventGuideItem[] = [
  {
    id: "onclick",
    eventName: "onClick",
    tsType: "React.MouseEvent<HTMLButtonElement>",
    targetElement: "<button>, <a>, <div>",
    usageSnippet: "const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... };",
  },
  {
    id: "onchange",
    eventName: "onChange",
    tsType: "React.ChangeEvent<HTMLInputElement>",
    targetElement: "<input>, <select>, <textarea>",
    usageSnippet: "const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { e.target.value };",
  },
  {
    id: "onsubmit",
    eventName: "onSubmit",
    tsType: "React.FormEvent<HTMLFormElement>",
    targetElement: "<form>",
    usageSnippet: "const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); };",
  },
];

export function EventExplainer() {
  return (
    <section className="learning-card">
      <div className="card-top-meta">
        <div className="card-badge">
          <MousePointerClick size={14} />
          Tahap 4: Konsep Event
        </div>
      </div>

      <h2 className="card-title">Typing Event Handler di React + TypeScript</h2>
      <p className="card-subtitle">
        Memahami cara menangani interaksi pengguna dengan typing yang presisi dan aman dari bug
      </p>

      {/* Tabel Panduan Event Typing */}
      <div className="table-responsive">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Event JSX</th>
              <th>Elemen Sasaran</th>
              <th>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <ShieldCheck size={14} /> Tipe Event di TypeScript
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {EVENT_GUIDE_ITEMS.map((item) => (
              <tr key={item.id}>
                <td className="table-label"><code>{item.eventName}</code></td>
                <td>{item.targetElement}</td>
                <td className="highlight-state"><code>{item.tsType}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Komparasi Visual: Eksekusi Langsung vs Reference */}
      <CodeComparison
        title="Passing Event: Eksekusi Langsung vs Referensi Fungsi"
        wrongTitle="Eksekusi Langsung Saat Render"
        wrongCode={`// ❌ SALAH:
<button onClick={handleClick()}>
  Simpan
</button>
// Tanda kurung () membuat fungsi langsung
// dieksekusi saat proses rendering berlangsung!`}
        wrongExplanation="Fungsi terpanggil seketika saat render, bukan saat tombol diklik pengguna."
        correctTitle="Oper Referensi / Arrow Function"
        correctCode={`// ✅ BENAR:
<button onClick={handleClick}>
  Simpan
</button>

// Atau jika membutuhkan argumen:
<button onClick={() => handleClick(userId)}>
  Hapus
</button>`}
        correctExplanation="Hanya fungsi yang dipanggil ketika user benar-benar mengklik tombol."
      />

      {/* Kotak Clean Code Rule */}
      <div className="concept-box">
        <div className="concept-box-header">
          <Zap size={16} />
          <span>2 Aturan Emas Event Handling</span>
        </div>
        <ul>
          <li>
            <strong>1. Jangan Eksekusi Langsung di JSX:</strong> Tuliskan{" "}
            <code>onClick=&#123;handleClick&#125;</code> (tanpa tanda kurung{" "}
            <code>()</code>). Jika butuh passing argumen, bungkus dalam arrow function:{" "}
            <code>onClick=&#123;() =&gt; handleSelect(id)&#125;</code>.
          </li>
          <li>
            <strong>2. Selalu e.preventDefault() pada Form:</strong> Secara default, browser
            akan me-reload seluruh halaman saat tombol submit form ditekan. Di Single Page
            Application (React), kita cegah reload tersebut menggunakan{" "}
            <code>e.preventDefault()</code>.
          </li>
        </ul>
      </div>
    </section>
  );
}
