/**
 * ============================================================================
 * TAHAP 3: PENGENALAN useState & TYPING DI TYPESCRIPT (StateExplainer.tsx)
 * ============================================================================
 * 
 * 1. APA ITU STATE?
 *    State adalah "memori" internal dari sebuah component.
 *    State menyimpan data yang BISA BERUBAH seiring interaksi pengguna
 *    (misal: tombol diklik, form diisi, data bertambah/berkurang).
 * 
 * 2. PERBEDAAN BESAR: PROPS VS STATE
 *    - PROPS : Seperti "DNA" yang diturunkan dari orang tua (Parent).
 *              Bersifat Read-Only (tidak bisa diubah oleh component itu sendiri).
 *    - STATE : Seperti "Pikiran / Mood" internal diri sendiri.
 *              Bisa diubah kapan saja oleh component itu sendiri menggunakan setter function.
 * 
 * 3. KAPAN REACT MELAKUKAN RE-RENDER?
 *    Ketika nilai State diubah lewat setter function (contoh: `setCount(5)`),
 *    React akan secara otomatis MENJALANKAN ULANG (re-render) component tersebut
 *    sehingga tampilan UI di layar langsung sinkron dengan data terbaru!
 */

import { Cpu, Package, Layers, Code2 } from "lucide-react";
import { CodeComparison } from "../common/CodeComparison";

interface StateComparisonItem {
  id: string;
  aspect: string;
  propsFeature: string;
  stateFeature: string;
}

const COMPARISON_DATA: StateComparisonItem[] = [
  {
    id: "origin",
    aspect: "Sumber Data",
    propsFeature: "Diterima dari luar (Parent Component)",
    stateFeature: "Dikelola di dalam component itu sendiri",
  },
  {
    id: "mutability",
    aspect: "Bisa Diubah?",
    propsFeature: "Tidak (Read-only / Immutable)",
    stateFeature: "Ya (Via fungsi setter)",
  },
  {
    id: "trigger",
    aspect: "Efek Perubahan",
    propsFeature: "Re-render jika parent mengirim nilai baru",
    stateFeature: "Otomatis memicu Re-render saat di-update",
  },
];

export function StateExplainer() {
  return (
    <section className="learning-card">
      <div className="card-top-meta">
        <div className="card-badge">
          <Cpu size={14} />
          Tahap 3: Konsep State
        </div>
      </div>

      <h2 className="card-title">Apa itu useState & Bedanya dengan Props?</h2>
      <p className="card-subtitle">
        Memahami bagaimana React menyimpan memori komponen dan memperbarui tampilan secara reaktif
      </p>

      {/* Tabel Perbandingan Props vs State */}
      <div className="table-responsive">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Karakteristik</th>
              <th>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <Package size={14} /> Props
                </span>
              </th>
              <th>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <Layers size={14} /> State
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_DATA.map((item) => (
              <tr key={item.id}>
                <td className="table-label">{item.aspect}</td>
                <td>{item.propsFeature}</td>
                <td className="highlight-state">{item.stateFeature}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Komparasi Visual: Mutasi Langsung vs Setter Function */}
      <CodeComparison
        title="Update State: Mutasi Langsung vs Setter Function"
        wrongTitle="Mutasi Langsung (Anti-Pattern)"
        wrongCode={`// JANGAN LAKUKAN INI:
count = count + 1;

// Mutasi variabel lokal tidak akan pernah
// memicu siklus re-render React!`}
        wrongExplanation="React tidak dapat mendeteksi mutasi langsung. UI di layar tidak akan berubah."
        correctTitle="Updater Function (Best Practice)"
        correctCode={`// GUNAKAN SETTER FUNCTION:
setCount((prevCount) => prevCount + 1);

// Memberitahu React untuk memperbarui nilai
// dan menjadwalkan render ulang tampilan UI.`}
        correctExplanation="Setter function menjamin update reaktif dan bebas dari bug race-condition."
      />

      {/* Panduan Typing useState di TypeScript */}
      <div className="code-snippet-card">
        <div className="code-snippet-header">
          <span>
            <Code2 size={14} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
            3 Pola Typing useState di TypeScript
          </span>
          <small>TypeScript</small>
        </div>
        <pre className="code-snippet-pre">
{`// 1. Primitive Type (Tipe Otomatis Terdeteksi / Inferred)
const [count, setCount] = useState(0); // number
const [text, setText] = useState("");  // string

// 2. Union / Nullable Type (Nilai Awal Boleh Kosong/Null)
const [userId, setUserId] = useState<number | null>(null);

// 3. Object / Array Kompleks (Gunakan Generic <Type>)
interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

const [todos, setTodos] = useState<TodoItem[]>([]);`}
        </pre>
      </div>
    </section>
  );
}
