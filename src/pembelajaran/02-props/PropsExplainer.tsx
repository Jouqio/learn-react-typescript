/**
 * ============================================================================
 * TAHAP 2: PENGENALAN PROPS & TYPING DENGAN INTERFACE (PropsExplainer.tsx)
 * ============================================================================
 * 
 * 1. APA ITU PROPS?
 *    Props (singkatan dari "Properties") adalah cara kita mengirim data dari
 *    Component Induk (Parent) ke Component Anak (Child).
 * 
 *    Analogi: Pikirkan component sebagai "Function", dan props adalah "Parameter / Argumen"
 *    yang dimasukkan ke dalam function tersebut.
 *    - Function biasa : `hitungLuas(panjang, lebar)`
 *    - Component React: `<UserCard name="Zakie" age={20} />`
 * 
 * 2. KENAPA BUTUH PROPS?
 *    Tanpa props, component bersifat kaku / statis (hanya menampilkan data yang di-hardcode).
 *    Dengan props, satu component yang sama bisa menampilkan data yang berbeda-beda (Reusable).
 * 
 * 3. ATURAN EMAS PROPS (IMMUTABLE / READ-ONLY):
 *    Props bersifat "Read-Only" (hanya bisa dibaca oleh component child).
 *    Component child TIDAK BOLEH mengubah nilai props yang diterimanya secara langsung!
 */

import { Boxes, Package, Code2 } from "lucide-react";
import { CodeComparison } from "../common/CodeComparison";

// Interface untuk data poin materi props
interface ConceptPoint {
  id: string;
  title: string;
  description: string;
  analogy: string;
}

const PROPS_CONCEPTS: ConceptPoint[] = [
  {
    id: "parameter-analogy",
    title: "1. Props = Parameter Fungsi",
    description: "Props dikirim dari parent ke child dalam bentuk atribut deklaratif pada tag JSX.",
    analogy: "Meneruskan argumen data ke dalam fungsi murni.",
  },
  {
    id: "one-way-data-flow",
    title: "2. Alur Data Satu Arah (One-Way Data Flow)",
    description: "Data selalu mengalir turun dari Parent ke Child secara hierarkis dan terprediksi.",
    analogy: "Data source of truth berada di sisi parent.",
  },
  {
    id: "read-only",
    title: "3. Bersifat Read-Only (Immutable)",
    description: "Komponen anak dilarang mengubah nilai props miliknya sendiri secara langsung.",
    analogy: "Kontrak baca-saja (immutable snapshot).",
  },
];

export function PropsExplainer() {
  return (
    <section className="learning-card">
      <div className="card-top-meta">
        <div className="card-badge">
          <Boxes size={14} />
          Tahap 2: Konsep Props
        </div>
      </div>

      <h2 className="card-title">Apa itu Props & Mengapa Kita Membutuhkannya?</h2>
      <p className="card-subtitle">
        Memahami cara mengirim data antar komponen dengan jaminan type-safety TypeScript
      </p>

      {/* Grid Poin Konsep */}
      <div className="concept-box">
        <div className="concept-box-header">
          <Package size={16} />
          <span>Prinsip Fundamental Props di React</span>
        </div>
        <ul>
          {PROPS_CONCEPTS.map((concept) => (
            <li key={concept.id}>
              <strong>{concept.title}:</strong> {concept.description}{" "}
              <em>({concept.analogy})</em>
            </li>
          ))}
        </ul>
      </div>

      {/* Komparasi Visual Salah vs Benar */}
      <CodeComparison
        title="Typing Props: Any vs TypeScript Interface"
        wrongTitle="Inline 'any' Type"
        wrongCode={`function BadCard(props: { name: any; age: any }) {
  // Tidak ada autocomplete, rawan typo dan runtime bug!
  return <div>{props.name} ({props.age})</div>;
}`}
        wrongExplanation="Menggunakan 'any' menghilangkan manfaat static typing, autocomplete, dan validasi props."
        correctTitle="Explicit Interface"
        correctCode={`interface UserCardProps {
  name: string;
  age: number;
  role?: string; // Optional prop
}

function GoodCard({ name, age, role = "Member" }: UserCardProps) {
  return <div>{name} - {age} thn ({role})</div>;
}`}
        correctExplanation="Interface terdokumentasi rapi, mendukung default value, dan divalidasi saat kompilasi."
      />

      {/* Pola Penulisan Interface Props */}
      <div className="code-snippet-card">
        <div className="code-snippet-header">
          <span>
            <Code2 size={14} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
            Pola Lengkap Penulisan Interface Props
          </span>
          <small>TypeScript</small>
        </div>
        <pre className="code-snippet-pre">
{`// 1. Definisikan interface props di atas component
interface UserCardProps {
  name: string;          // Wajib diisi (string)
  age: number;           // Wajib diisi (number)
  role?: string;         // Optional (?): boleh diisi atau tidak
  isActive?: boolean;    // Optional (?): status boolean
}

// 2. Destructuring props langsung di parameter dengan default value
export function UserCard({ 
  name, 
  age, 
  role = "Pelajar", 
  isActive = true 
}: UserCardProps) {
  // Gunakan variabel name, age, role, isActive secara type-safe!
}`}
        </pre>
      </div>
    </section>
  );
}
