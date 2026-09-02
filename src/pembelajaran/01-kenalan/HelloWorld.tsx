/**
 * ============================================================================
 * TAHAP 1: COMPONENT PERTAMA (HelloWorld.tsx)
 * ============================================================================
 * 
 * 1. APA ITU REACT?
 *    React adalah JavaScript/TypeScript library untuk membangun antarmuka (User Interface / UI)
 *    berdasarkan "Component".
 * 
 * 2. APA ITU COMPONENT?
 *    Component adalah potongan kode yang independen dan reusable (dapat digunakan kembali).
 *    Analogi: Pikirkan Component seperti "Balok LEGO". Kita membuat balok-balok kecil
 *    (seperti Button, Card, Header, Footer), lalu menyusunnya menjadi bangunan rumah (Aplikasi Web).
 * 
 *    Secara teknis di React modern, Component hanyalah sebuah FUNCTION yang mengembalikan (return) JSX!
 * 
 * 3. APA ITU JSX / TSX?
 *    - JSX = JavaScript XML.
 *    - TSX = TypeScript XML (JSX dengan dukungan static typing TypeScript).
 *    JSX memungkinkan kita menulis kode yang mirip HTML langsung di dalam JavaScript/TypeScript.
 * 
 * 4. ATURAN PENTING JSX:
 *    - Harus selalu mengembalikan SATU elemen pembungkus (Single Root Element)
 *      atau menggunakan Fragment: `<> ... </>` jika tidak ingin menambah <div> ekstra di DOM.
 *    - Nama class di HTML menjadi `className` di JSX (karena `class` adalah reserved keyword JS).
 *    - Tag yang tidak punya penutup harus ditutup sendiri (self-closing), misal: `<img />`, `<input />`.
 */

import { BookOpen, Lightbulb, Compass } from "lucide-react";
import { CodeComparison } from "../common/CodeComparison";

// Konstanta teks agar menghindari magic string di dalam JSX (Prinsip Clean Code)
const GREETING_TITLE = "Halo! Selamat Datang di React + TypeScript";
const GREETING_SUBTITLE = "Ini adalah Component React pertama Anda (HelloWorld.tsx)";
const LEARNING_MOTTO = "Paham Konsep Dasar ➔ Tulis Clean Code ➔ Kuasai Frontend Modern";

export function HelloWorld() {
  return (
    <section className="learning-card">
      <div className="card-top-meta">
        <div className="card-badge">
          <Compass size={14} />
          Tahap 1: Component Dasar
        </div>
      </div>

      <h2 className="card-title">{GREETING_TITLE}</h2>
      <p className="card-subtitle">{GREETING_SUBTITLE}</p>

      {/* Kotak Konsep Kunci */}
      <div className="concept-box">
        <div className="concept-box-header">
          <Lightbulb size={16} />
          <span>3 Konsep Kunci yang Dipelajari:</span>
        </div>
        <ul>
          <li>
            <strong>1. Function = Component:</strong> Fungsi <code>HelloWorld()</code> ini
            adalah component yang menghasilkan tampilan UI.
          </li>
          <li>
            <strong>2. Sintaks JSX/TSX:</strong> Kode di dalam tanda kurung <code>return (...)</code>{" "}
            tampak seperti HTML, tetapi sebenarnya dieksekusi sebagai TypeScript yang aman (<em>type-safe</em>).
          </li>
          <li>
            <strong>3. Tag Pembungkus:</strong> Seluruh elemen di atas dibungkus dalam satu tag{" "}
            <code>&lt;section&gt;...&lt;/section&gt;</code>.
          </li>
        </ul>
      </div>

      {/* Komparasi Visual: Salah vs Benar */}
      <CodeComparison
        title="Pola JSX: Root Element Pembungkus"
        wrongTitle="Multiple Root Elements"
        wrongCode={`function BadComponent() {
  return (
    <h1>Judul</h1>
    <p>Paragraf</p> // SyntaxError: Adjacent JSX elements must be wrapped!
  );
}`}
        wrongExplanation="JSX mewajibkan hanya ada 1 root element yang di-return oleh function component."
        correctTitle="React Fragment Wrapper"
        correctCode={`function GoodComponent() {
  return (
    <>
      <h1>Judul</h1>
      <p>Paragraf</p>
    </>
  );
}`}
        correctExplanation="Gunakan React Fragment (<> ... </>) untuk membungkus tanpa menambah node ekstra ke DOM."
      />

      <div className="motto-box">
        <BookOpen size={14} className="flow-arrow-icon" />
        <span className="motto-label">Motto:</span>
        <span className="motto-text">"{LEARNING_MOTTO}"</span>
      </div>
    </section>
  );
}
