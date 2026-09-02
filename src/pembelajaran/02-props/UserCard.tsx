/**
 * ============================================================================
 * TAHAP 2: COMPONENT DENGAN PROPS & INTERFACE (UserCard.tsx)
 * ============================================================================
 * 
 * LATIHAN PRAKTIK:
 * Membuat component UserCard yang menerima data profil via Props dengan static typing.
 * 
 * ATURAN CLEAN CODE:
 * 1. Interface selalu didefinisikan di ATAS component dengan nama yang jelas (`UserCardProps`).
 * 2. Props di-destructure di parameter function dengan nilai default (default value) untuk optional props.
 * 3. Hindari magic string/number di dalam kode.
 */

import { UserCheck, Calendar } from "lucide-react";

// 1. Definisi Interface Props (Type Contract)
export interface UserCardProps {
  name: string;              // Wajib (string)
  age: number;               // Wajib (number)
  role?: string;             // Opsional (string), default: "Frontend Developer"
  skills?: string[];         // Opsional (array of string), default: []
  isAvailableForHire?: boolean; // Opsional (boolean), default: false
}

// 2. Nilai Default Konstanta (Clean Code)
const DEFAULT_ROLE = "Frontend Developer";
const DEFAULT_AVAILABILITY = false;

/**
 * Component UserCard
 * Menerima props sesuai kontrak `UserCardProps`
 */
export function UserCard({
  name,
  age,
  role = DEFAULT_ROLE,
  skills = [],
  isAvailableForHire = DEFAULT_AVAILABILITY,
}: UserCardProps) {
  return (
    <div className="user-card-item">
      {/* Header Kartu: Nama & Badge Status */}
      <div className="user-card-header">
        <div>
          <h4 className="user-card-name">{name}</h4>
          <span className="user-card-role">{role}</span>
        </div>
        <span className={`status-indicator ${isAvailableForHire ? "available" : ""}`}>
          <span className="status-dot"></span>
          <span>{isAvailableForHire ? "Open to Work" : "Busy"}</span>
        </span>
      </div>

      {/* Informasi Detail */}
      <div className="user-card-body">
        <p className="user-card-info">
          <Calendar size={13} style={{ color: "var(--text-muted)" }} />
          <span>{age} tahun</span>
        </p>

        {/* Daftar Keahlian (Skills) jika ada */}
        {skills.length > 0 && (
          <div className="skills-container">
            <span className="skills-title">Keahlian</span>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <span key={`${skill}-${index}`} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Component Latihan Showcase
 * Menampilkan contoh penggunaan <UserCard /> dengan berbagai kombinasi props
 */
export function UserCardShowcase() {
  return (
    <section className="learning-card">
      <div className="card-top-meta">
        <div className="card-badge">
          <UserCheck size={14} />
          Tahap 2: Praktik UserCard
        </div>
      </div>

      <h2 className="card-title">Penerapan Nyata Props pada Component</h2>
      <p className="card-subtitle">
        Satu component <code>&lt;UserCard /&gt;</code> yang sama, digunakan ulang 3 kali
        dengan data (props) yang berbeda-beda secara type-safe:
      </p>

      <div className="user-card-grid">
        {/* Penggunaan 1: Mengirim semua props lengkap */}
        <UserCard
          name="Zakie"
          age={21}
          role="Fullstack Developer"
          skills={["TypeScript", "React", "Node.js"]}
          isAvailableForHire={true}
        />

        {/* Penggunaan 2: Menggunakan default value untuk role & status */}
        <UserCard
          name="Budi Santoso"
          age={25}
          skills={["JavaScript", "HTML/CSS"]}
        />

        {/* Penggunaan 3: Props minimal (hanya name & age) */}
        <UserCard
          name="Siti Rahma"
          age={23}
          role="UI/UX Designer & Frontend"
          isAvailableForHire={true}
        />
      </div>
    </section>
  );
}
