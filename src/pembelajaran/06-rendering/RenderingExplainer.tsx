/**
 * ============================================================================
 * TAHAP 6: CONDITIONAL & LIST RENDERING (RenderingExplainer.tsx)
 * ============================================================================
 * 
 * 1. APA ITU CONDITIONAL RENDERING?
 *    Menampilkan elemen UI yang berbeda berdasarkan kondisi tertentu (mirip if-else).
 * 
 *    3 Cara Utama di React:
 *    a. Ternary Operator (`kondisi ? <KomponenA /> : <KomponenB />`)
 *       -> Cocok untuk memilih antara dua tampilan alternatif.
 *    b. Logical AND (`kondisi && <Komponen />`)
 *       -> Cocok jika hanya ingin merender sesuatu saat kondisi TRUE.
 *    c. Early Return dengan `if` biasa di atas return JSX
 *       -> Cocok untuk menangani kondisi guard clause.
 * 
 * 2. LIST RENDERING DENGAN .map() & ATURAN EMAS "key":
 *    Di React, kita mengubah array data menjadi array elemen JSX menggunakan method `.map()`.
 *    Prop `key` adalah ID unik yang digunakan oleh React Virtual DOM untuk melacak
 *    elemen mana yang ditambah, diubah, atau dihapus saat re-render.
 */

import { Split, Info } from "lucide-react";
import { CodeComparison } from "../common/CodeComparison";

interface RenderPattern {
  id: string;
  technique: string;
  syntaxExample: string;
  idealUse: string;
}

const RENDER_PATTERNS: RenderPattern[] = [
  {
    id: "ternary",
    technique: "Ternary Operator (? :)",
    syntaxExample: "isLoggedIn ? <UserProfile /> : <LoginForm />",
    idealUse: "Memilih antara 2 opsi tampilan berbeda.",
  },
  {
    id: "logical-and",
    technique: "Logical AND (&&)",
    syntaxExample: "hasUnreadMessages && <NotificationBadge />",
    idealUse: "Menampilkan elemen hanya jika kondisi bernilai true.",
  },
  {
    id: "list-map",
    technique: "List .map() + key unik",
    syntaxExample: "users.map(user => <UserCard key={user.id} {...user} />)",
    idealUse: "Merender daftar data array secara efisien & type-safe.",
  },
];

export function RenderingExplainer() {
  return (
    <section className="learning-card">
      <div className="card-top-meta">
        <div className="card-badge">
          <Split size={14} />
          Tahap 6: Konsep Rendering
        </div>
      </div>

      <h2 className="card-title">Conditional Rendering & Looping Data (.map)</h2>
      <p className="card-subtitle">
        Cara menyajikan antarmuka dinamis berdasarkan logika kondisi dan struktur data array
      </p>

      {/* Tabel Teknik Rendering */}
      <div className="table-responsive">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Teknik</th>
              <th>Pola Penulisan Kode</th>
              <th>Waktu Penggunaan Terbaik</th>
            </tr>
          </thead>
          <tbody>
            {RENDER_PATTERNS.map((pattern) => (
              <tr key={pattern.id}>
                <td className="table-label">{pattern.technique}</td>
                <td><code>{pattern.syntaxExample}</code></td>
                <td>{pattern.idealUse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Komparasi Visual: Key Index vs Key ID Unik */}
      <CodeComparison
        title="List Rendering: Index Array vs Unique ID untuk Prop 'key'"
        wrongTitle="Index Array Sebagai Key"
        wrongCode={`// ❌ ANTI-PATTERN:
items.map((item, index) => (
  <li key={index}>
    {item.name}
  </li>
));
// Jika urutan item berubah atau dihapus,
// React akan salah mengupdate state DOM!`}
        wrongExplanation="Penggunaan index sebagai key memicu bug visual state saat item dihapus atau disortir."
        correctTitle="Unique ID Sebagai Key"
        correctCode={`// ✅ BEST PRACTICE:
items.map((item) => (
  <li key={item.id}>
    {item.name}
  </li>
));
// React melacak identitas node secara akurat
// meskipun urutan item dalam array bergeser.`}
        correctExplanation="Virtual DOM dapat mencocokkan node secara presisi saat update diffing."
      />

      {/* Gotcha Angka 0 */}
      <CodeComparison
        title="Gotcha Logical AND: Angka 0 di Layar"
        wrongTitle="Gotcha Angka 0 (count && ...)"
        wrongCode={`// ❌ GOTCHA:
count && <p>Ada {count} item</p>

// Jika count bernilai 0 (falsy number),
// React akan merender angka "0" di layar!`}
        wrongExplanation="JavaScript mengevaluasi 0 && JSX menghasilkan nilai 0 yang dirender ke teks DOM."
        correctTitle="Evaluasi Boolean Sejati"
        correctCode={`// ✅ BENAR:
count > 0 && <p>Ada {count} item</p>

// Atau konversi eksplisit:
Boolean(count) && <p>Ada {count} item</p>`}
        correctExplanation="Pastikan ekspresi di sisi kiri operator && bernilai boolean murni (true/false)."
      />

      {/* Peringatan Gotcha Key */}
      <div className="concept-box">
        <div className="concept-box-header">
          <Info size={16} />
          <span>Aturan Emas Virtual DOM Diffing</span>
        </div>
        <p>
          Prop <code>key</code> tidak diteruskan sebagai props ke dalam komponen child.
          React menggunakannya secara eksklusif di level reconciler internal. Selalu gunakan
          identitas unik bawaan dari database/entitas (seperti UUID atau ID numerik).
        </p>
      </div>
    </section>
  );
}
