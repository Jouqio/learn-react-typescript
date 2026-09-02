/**
 * ============================================================================
 * ROOT COMPONENT (App.tsx)
 * Modern Technical Documentation Architecture
 * Reference Style: Linear, Vercel Docs, Stripe Docs
 * ============================================================================
 */

import { useState } from 'react';
import {
  Atom,
  ChevronLeft,
  ChevronRight,
  Compass,
  Boxes,
  Cpu,
  MousePointerClick,
  RefreshCw,
  Split,
  FolderKanban,
  CheckCircle2,
  BookOpen,
  Code2,
  Terminal,
  FileCheck
} from 'lucide-react';

// Komponen Layout Dashboard Baru
import { Sidebar, type SidebarTab } from './components/Sidebar';
import { DashboardHeader } from './components/DashboardHeader';
import { ModuleSelector } from './components/ModuleSelector';
import { LatihanRunner } from './pembelajaran/LatihanRunner';

// Tahap 1: Kenalan dengan React + TypeScript
import { HelloWorld } from './pembelajaran/01-kenalan/HelloWorld';
import { StrukturProjectExplainer } from './pembelajaran/01-kenalan/StrukturProjectExplainer';
import { Latihan01 } from './pembelajaran/01-kenalan/latihan/latihan-01';
import { Jawaban01 } from './pembelajaran/01-kenalan/latihan/jawaban-01';

// Tahap 2: Props (Mengirim Data ke Component)
import { PropsExplainer } from './pembelajaran/02-props/PropsExplainer';
import { UserCardShowcase } from './pembelajaran/02-props/UserCard';
import { Latihan02 } from './pembelajaran/02-props/latihan/latihan-02';
import { Jawaban02 } from './pembelajaran/02-props/latihan/jawaban-02';

// Tahap 3: useState (Data yang Bisa Berubah & Re-render)
import { StateExplainer } from './pembelajaran/03-state/StateExplainer';
import { CounterShowcase } from './pembelajaran/03-state/Counter';
import { Latihan03 } from './pembelajaran/03-state/latihan/latihan-03';
import { Jawaban03 } from './pembelajaran/03-state/latihan/jawaban-03';

// Tahap 4: Event Handling (Form & Interaksi User)
import { EventExplainer } from './pembelajaran/04-events/EventExplainer';
import { SimpleNameForm } from './pembelajaran/04-events/SimpleNameForm';
import { Latihan04 } from './pembelajaran/04-events/latihan/latihan-04';
import { Jawaban04 } from './pembelajaran/04-events/latihan/jawaban-04';

// Tahap 5: useEffect (Side Effects & Fetch API)
import { EffectExplainer } from './pembelajaran/05-effects/EffectExplainer';
import { PostListFetcher } from './pembelajaran/05-effects/PostListFetcher';
import { Latihan05 } from './pembelajaran/05-effects/latihan/latihan-05';
import { Jawaban05 } from './pembelajaran/05-effects/latihan/jawaban-05';

// Tahap 6: Conditional & List Rendering (.map & key)
import { RenderingExplainer } from './pembelajaran/06-rendering/RenderingExplainer';
import { SimpleTodoList } from './pembelajaran/06-rendering/SimpleTodoList';
import { Latihan06 } from './pembelajaran/06-rendering/latihan/latihan-06';
import { Jawaban06 } from './pembelajaran/06-rendering/latihan/jawaban-06';

// Tahap 7: Mini Project Akhir (Todo List App Lengkap)
import { TodoListApp } from './pembelajaran/07-mini-project/TodoListApp';
import { Latihan07 } from './pembelajaran/07-mini-project/latihan/latihan-07';
import { Jawaban07 } from './pembelajaran/07-mini-project/latihan/jawaban-07';

import './App.css';

/**
 * Komponen pembungkus Modul 1 dengan opsi melihat Materi, Soal Latihan, atau Kunci Jawaban
 */
function Modul1View() {
  const [tab, setTab] = useState<'materi' | 'latihan' | 'jawaban'>('materi');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Sub-tab Switcher Latihan */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'var(--bg-surface)',
        padding: '0.4rem 0.6rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        width: 'fit-content'
      }}>
        <button
          type="button"
          onClick={() => setTab('materi')}
          className={`btn-filter ${tab === 'materi' ? 'active' : ''}`}
        >
          Materi Teori
        </button>
        <button
          type="button"
          onClick={() => setTab('latihan')}
          className={`btn-filter ${tab === 'latihan' ? 'active' : ''}`}
        >
          Soal Latihan 01
        </button>
        <button
          type="button"
          onClick={() => setTab('jawaban')}
          className={`btn-filter ${tab === 'jawaban' ? 'active' : ''}`}
        >
          Kunci Jawaban 01
        </button>
      </div>

      {tab === 'materi' && (
        <>
          <HelloWorld />
          <StrukturProjectExplainer />
        </>
      )}

      {tab === 'latihan' && (
        <div>
          <div style={{ marginBottom: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Silakan buka file <code>src/pembelajaran/01-kenalan/latihan/latihan-01.tsx</code> di editor, ikuti komentar <code>// TODO:</code>, dan simpan untuk melihat hasilnya di bawah ini:
          </div>
          <Latihan01 />
        </div>
      )}

      {tab === 'jawaban' && (
        <div>
          <div style={{ marginBottom: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Berikut adalah kunci jawaban resmi berstandar Clean Code dari <code>src/pembelajaran/01-kenalan/latihan/jawaban-01.tsx</code>:
          </div>
          <Jawaban01 />
        </div>
      )}
    </div>
  );
}

/**
 * Komponen pembungkus Modul 2 dengan opsi melihat Materi, Soal Latihan, atau Kunci Jawaban
 */
function Modul2View() {
  const [tab, setTab] = useState<'materi' | 'latihan' | 'jawaban'>('materi');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Sub-tab Switcher Latihan */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'var(--bg-surface)',
        padding: '0.4rem 0.6rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        width: 'fit-content'
      }}>
        <button
          type="button"
          onClick={() => setTab('materi')}
          className={`btn-filter ${tab === 'materi' ? 'active' : ''}`}
        >
          Materi Teori
        </button>
        <button
          type="button"
          onClick={() => setTab('latihan')}
          className={`btn-filter ${tab === 'latihan' ? 'active' : ''}`}
        >
          Soal Latihan 02
        </button>
        <button
          type="button"
          onClick={() => setTab('jawaban')}
          className={`btn-filter ${tab === 'jawaban' ? 'active' : ''}`}
        >
          Kunci Jawaban 02
        </button>
      </div>

      {tab === 'materi' && (
        <>
          <PropsExplainer />
          <UserCardShowcase />
        </>
      )}

      {tab === 'latihan' && (
        <div>
          <div style={{ marginBottom: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Silakan buka file <code>src/pembelajaran/02-props/latihan/latihan-02.tsx</code> di editor, lengkapi komentar <code>// TODO:</code>, dan simpan untuk melihat hasilnya:
          </div>
          <Latihan02 />
        </div>
      )}

      {tab === 'jawaban' && (
        <div>
          <div style={{ marginBottom: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Berikut adalah kunci jawaban resmi berstandar Clean Code dari <code>src/pembelajaran/02-props/latihan/jawaban-02.tsx</code>:
          </div>
          <Jawaban02 />
        </div>
      )}
    </div>
  );
}

/**
 * Komponen pembungkus Modul 3 dengan opsi melihat Materi, Soal Latihan, atau Kunci Jawaban
 */
function Modul3View() {
  const [tab, setTab] = useState<'materi' | 'latihan' | 'jawaban'>('materi');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Sub-tab Switcher Latihan */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'var(--bg-surface)',
        padding: '0.4rem 0.6rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        width: 'fit-content'
      }}>
        <button
          type="button"
          onClick={() => setTab('materi')}
          className={`btn-filter ${tab === 'materi' ? 'active' : ''}`}
        >
          Materi Teori
        </button>
        <button
          type="button"
          onClick={() => setTab('latihan')}
          className={`btn-filter ${tab === 'latihan' ? 'active' : ''}`}
        >
          Soal Latihan 03
        </button>
        <button
          type="button"
          onClick={() => setTab('jawaban')}
          className={`btn-filter ${tab === 'jawaban' ? 'active' : ''}`}
        >
          Kunci Jawaban 03
        </button>
      </div>

      {tab === 'materi' && (
        <>
          <StateExplainer />
          <CounterShowcase />
        </>
      )}

      {tab === 'latihan' && (
        <div>
          <div style={{ marginBottom: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Silakan buka file <code>src/pembelajaran/03-state/latihan/latihan-03.tsx</code> di editor, ikuti komentar <code>// TODO:</code>, dan simpan untuk melihat hasilnya:
          </div>
          <Latihan03 />
        </div>
      )}

      {tab === 'jawaban' && (
        <div>
          <div style={{ marginBottom: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Berikut adalah kunci jawaban resmi berstandar Clean Code dari <code>src/pembelajaran/03-state/latihan/jawaban-03.tsx</code>:
          </div>
          <Jawaban03 />
        </div>
      )}
    </div>
  );
}

/**
 * Komponen pembungkus Modul 4 dengan opsi melihat Materi, Soal Latihan, atau Kunci Jawaban
 */
function Modul4View() {
  const [tab, setTab] = useState<'materi' | 'latihan' | 'jawaban'>('materi');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Sub-tab Switcher Latihan */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'var(--bg-surface)',
        padding: '0.4rem 0.6rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        width: 'fit-content'
      }}>
        <button
          type="button"
          onClick={() => setTab('materi')}
          className={`btn-filter ${tab === 'materi' ? 'active' : ''}`}
        >
          Materi Teori
        </button>
        <button
          type="button"
          onClick={() => setTab('latihan')}
          className={`btn-filter ${tab === 'latihan' ? 'active' : ''}`}
        >
          Soal Latihan 04
        </button>
        <button
          type="button"
          onClick={() => setTab('jawaban')}
          className={`btn-filter ${tab === 'jawaban' ? 'active' : ''}`}
        >
          Kunci Jawaban 04
        </button>
      </div>

      {tab === 'materi' && (
        <>
          <EventExplainer />
          <SimpleNameForm />
        </>
      )}

      {tab === 'latihan' && (
        <div>
          <div style={{ marginBottom: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Silakan buka file <code>src/pembelajaran/04-events/latihan/latihan-04.tsx</code> di editor, ikuti komentar <code>// TODO:</code>, dan simpan untuk melihat hasilnya:
          </div>
          <Latihan04 />
        </div>
      )}

      {tab === 'jawaban' && (
        <div>
          <div style={{ marginBottom: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Berikut adalah kunci jawaban resmi berstandar Clean Code dari <code>src/pembelajaran/04-events/latihan/jawaban-04.tsx</code>:
          </div>
          <Jawaban04 />
        </div>
      )}
    </div>
  );
}

/**
 * Komponen pembungkus Modul 5 dengan opsi melihat Materi, Soal Latihan, atau Kunci Jawaban
 */
function Modul5View() {
  const [tab, setTab] = useState<'materi' | 'latihan' | 'jawaban'>('materi');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Sub-tab Switcher Latihan */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'var(--bg-surface)',
        padding: '0.4rem 0.6rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        width: 'fit-content'
      }}>
        <button
          type="button"
          onClick={() => setTab('materi')}
          className={`btn-filter ${tab === 'materi' ? 'active' : ''}`}
        >
          Materi Teori
        </button>
        <button
          type="button"
          onClick={() => setTab('latihan')}
          className={`btn-filter ${tab === 'latihan' ? 'active' : ''}`}
        >
          Soal Latihan 05
        </button>
        <button
          type="button"
          onClick={() => setTab('jawaban')}
          className={`btn-filter ${tab === 'jawaban' ? 'active' : ''}`}
        >
          Kunci Jawaban 05
        </button>
      </div>

      {tab === 'materi' && (
        <>
          <EffectExplainer />
          <PostListFetcher />
        </>
      )}

      {tab === 'latihan' && (
        <div>
          <div style={{ marginBottom: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Silakan buka file <code>src/pembelajaran/05-effects/latihan/latihan-05.tsx</code> di editor, ikuti komentar <code>// TODO:</code>, dan simpan untuk melihat hasilnya:
          </div>
          <Latihan05 />
        </div>
      )}

      {tab === 'jawaban' && (
        <div>
          <div style={{ marginBottom: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Berikut adalah kunci jawaban resmi berstandar Clean Code dari <code>src/pembelajaran/05-effects/latihan/jawaban-05.tsx</code>:
          </div>
          <Jawaban05 />
        </div>
      )}
    </div>
  );
}

/**
 * Komponen pembungkus Modul 6 dengan opsi melihat Materi, Soal Latihan, atau Kunci Jawaban
 */
function Modul6View() {
  const [tab, setTab] = useState<'materi' | 'latihan' | 'jawaban'>('materi');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Sub-tab Switcher Latihan */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'var(--bg-surface)',
        padding: '0.4rem 0.6rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        width: 'fit-content'
      }}>
        <button
          type="button"
          onClick={() => setTab('materi')}
          className={`btn-filter ${tab === 'materi' ? 'active' : ''}`}
        >
          Materi Teori
        </button>
        <button
          type="button"
          onClick={() => setTab('latihan')}
          className={`btn-filter ${tab === 'latihan' ? 'active' : ''}`}
        >
          Soal Latihan 06
        </button>
        <button
          type="button"
          onClick={() => setTab('jawaban')}
          className={`btn-filter ${tab === 'jawaban' ? 'active' : ''}`}
        >
          Kunci Jawaban 06
        </button>
      </div>

      {tab === 'materi' && (
        <>
          <RenderingExplainer />
          <SimpleTodoList />
        </>
      )}

      {tab === 'latihan' && (
        <div>
          <div style={{ marginBottom: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Silakan buka file <code>src/pembelajaran/06-rendering/latihan/latihan-06.tsx</code> di editor, ikuti komentar <code>// TODO:</code>, dan simpan untuk melihat hasilnya:
          </div>
          <Latihan06 />
        </div>
      )}

      {tab === 'jawaban' && (
        <div>
          <div style={{ marginBottom: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Berikut adalah kunci jawaban resmi berstandar Clean Code dari <code>src/pembelajaran/06-rendering/latihan/jawaban-06.tsx</code>:
          </div>
          <Jawaban06 />
        </div>
      )}
    </div>
  );
}

/**
 * Komponen pembungkus Modul 7 dengan opsi melihat Mini Project 1 (Todo List), Soal Latihan 07 (Shopping List), atau Kunci Jawaban 07
 */
function Modul7View() {
  const [tab, setTab] = useState<'materi' | 'latihan' | 'jawaban'>('materi');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Sub-tab Switcher Latihan */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'var(--bg-surface)',
        padding: '0.4rem 0.6rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        width: 'fit-content'
      }}>
        <button
          type="button"
          onClick={() => setTab('materi')}
          className={`btn-filter ${tab === 'materi' ? 'active' : ''}`}
        >
          Proyek 1: TaskFlow (Todo)
        </button>
        <button
          type="button"
          onClick={() => setTab('latihan')}
          className={`btn-filter ${tab === 'latihan' ? 'active' : ''}`}
        >
          Soal Latihan 07 (Belanja)
        </button>
        <button
          type="button"
          onClick={() => setTab('jawaban')}
          className={`btn-filter ${tab === 'jawaban' ? 'active' : ''}`}
        >
          Kunci Jawaban 07
        </button>
      </div>

      {tab === 'materi' && <TodoListApp />}

      {tab === 'latihan' && (
        <div>
          <div style={{ marginBottom: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Silakan buka file <code>src/pembelajaran/07-mini-project/latihan/latihan-07.tsx</code> di editor, ikuti komentar <code>// TODO:</code>, dan simpan untuk melihat hasilnya:
          </div>
          <Latihan07 />
        </div>
      )}

      {tab === 'jawaban' && (
        <div>
          <div style={{ marginBottom: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Berikut adalah kunci jawaban resmi berstandar Clean Code dari <code>src/pembelajaran/07-mini-project/latihan/jawaban-07.tsx</code>:
          </div>
          <Jawaban07 />
        </div>
      )}
    </div>
  );
}

interface ModuleConfig {
  id: number;
  step: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export function App() {
  const [activeTab, setActiveTab] = useState<SidebarTab>('materi');
  // State navigasi modul aktif (1 s.d. 7, atau 0 untuk 'Tampilkan Semua')
  const [activeModuleId, setActiveModuleId] = useState<number>(1);

  const modules: ModuleConfig[] = [
    {
      id: 1,
      step: "Tahap 1",
      title: "Pengenalan React",
      icon: <Compass size={14} />,
      content: <Modul1View />,
    },
    {
      id: 2,
      step: "Tahap 2",
      title: "Props & Interface",
      icon: <Boxes size={14} />,
      content: <Modul2View />,
    },
    {
      id: 3,
      step: "Tahap 3",
      title: "useState & State",
      icon: <Cpu size={14} />,
      content: <Modul3View />,
    },
    {
      id: 4,
      step: "Tahap 4",
      title: "Event & Form",
      icon: <MousePointerClick size={14} />,
      content: <Modul4View />,
    },
    {
      id: 5,
      step: "Tahap 5",
      title: "useEffect & Fetch",
      icon: <RefreshCw size={14} />,
      content: <Modul5View />,
    },
    {
      id: 6,
      step: "Tahap 6",
      title: "List & Rendering",
      icon: <Split size={14} />,
      content: <Modul6View />,
    },
    {
      id: 7,
      step: "Tahap 7",
      title: "Mini Project",
      icon: <FolderKanban size={14} />,
      content: <Modul7View />,
    },
  ];

  const handleSelectModule = (id: number) => {
    setActiveModuleId(id);
    setActiveTab('materi');
  };

  const handleSelectTab = (tab: SidebarTab) => {
    setActiveTab(tab);
  };

  const currentModule = modules.find((m) => m.id === activeModuleId);

  return (
    <div className="dashboard-layout">
      {/* 1. Sidebar Navigasi Icon-Only */}
      <Sidebar activeTab={activeTab} onSelectTab={handleSelectTab} />

      {/* 2. Main Content Area */}
      <div className="dashboard-main-wrapper">
        <main className="dashboard-main">
          {/* a. Header Hero Section */}
          <DashboardHeader />

          {/* Konten Berdasarkan Tab Navigasi Sidebar */}
          {activeTab === 'runner' ? (
            <div className="module-section">
              <div className="module-header-banner">
                <span className="module-header-tag">
                  <Code2 size={16} />
                  <span>Pusat Uji Coba Latihan (Interactive Runner)</span>
                </span>
                <span className="curriculum-progress-text">
                  Latihan 01 s.d. 07
                </span>
              </div>
              <LatihanRunner />
            </div>
          ) : activeTab === 'docs' ? (
            <div className="module-section">
              <div className="module-header-banner">
                <span className="module-header-tag">
                  <BookOpen size={16} />
                  <span>Panduan & Standar Kode Proyek</span>
                </span>
              </div>
              <div className="learning-card">
                <h3 className="card-title">Standar Kualitas & Arsitektur Proyek</h3>
                <p className="card-subtitle">
                  Repositori ini menerapkan standar rekayasa frontend modern berpedoman Clean Architecture:
                </p>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  <li><strong style={{ color: 'var(--text-heading)' }}>Strict Type Safety:</strong> Validasi ketat kontrak interface TypeScript tanpa tipe <code>any</code>.</li>
                  <li><strong style={{ color: 'var(--text-heading)' }}>Single Responsibility Principle:</strong> Pemisahan komponen form, row, list, dan business logic.</li>
                  <li><strong style={{ color: 'var(--text-heading)' }}>Immutable State Updates:</strong> Mutasi data state selalu menggunakan operasi array murni (spread, filter, map).</li>
                  <li><strong style={{ color: 'var(--text-heading)' }}>Modern Linter & Bundler:</strong> Ditenagai oleh Vite 8 dan engine Oxlint v1.79.</li>
                </ul>
              </div>
            </div>
          ) : activeTab === 'files' ? (
            <div className="module-section">
              <div className="module-header-banner">
                <span className="module-header-tag">
                  <FolderKanban size={16} />
                  <span>Struktur Modul & Folder Proyek</span>
                </span>
              </div>
              <div className="learning-card">
                <h3 className="card-title">Arsitektur Direktori Kurikulum</h3>
                <p className="card-subtitle">Struktur modular yang terisolasi di dalam folder <code>src/pembelajaran/</code>:</p>
                <pre className="code-block" style={{ marginTop: '1rem' }}>
{`src/
├── components/          # Komponen Layout Dashboard (Sidebar, Header, ModuleSelector)
├── pembelajaran/        # 7 Tahap Kurikulum Terstruktur
│   ├── 01-kenalan/      # Component dasar, JSX rules, & Fragment
│   ├── 02-props/        # Interface typing, destructuring, & default values
│   ├── 03-state/        # useState memory, reactivity, & updater function
│   ├── 04-events/       # SyntheticEvent, controlled form, & validasi
│   ├── 05-effects/      # useEffect, side effects, & REST API fetching
│   ├── 06-rendering/    # Conditional ternary & immutable list .map()
│   ├── 07-mini-project/ # Mini project TaskFlow (Todo List App Lengkap)
│   └── LatihanRunner.tsx # Runner interaktif pengujian latihan mandiri
├── App.css              # Technical stylesheet dashboard
└── index.css            # Desain token & CSS variables`}
                </pre>
              </div>
            </div>
          ) : activeTab === 'progress' ? (
            <div className="module-section">
              <div className="module-header-banner">
                <span className="module-header-tag">
                  <FileCheck size={16} />
                  <span>Status Kurikulum Pembelajaran</span>
                </span>
                <span className="curriculum-progress-text">7 dari 7 Tahap Tersedia</span>
              </div>
              <div className="learning-card">
                <h3 className="card-title">Capaian Materi Belajar</h3>
                <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
                  {modules.map((m) => (
                    <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--accent)' }} />
                        <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{m.step}: {m.title}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleSelectModule(m.id)}
                        className="btn-filter"
                        style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
                      >
                        Buka Tahap Ini
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeTab === 'settings' ? (
            <div className="module-section">
              <div className="module-header-banner">
                <span className="module-header-tag">
                  <Terminal size={16} />
                  <span>Informasi Lingkungan (Environment)</span>
                </span>
              </div>
              <div className="learning-card">
                <h3 className="card-title">Spesifikasi Teknologi & Konfigurasi</h3>
                <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
                  <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>React Core Engine</span>
                    <code style={{ color: 'var(--accent)' }}>v19.2.8 (Strict Mode Enabled)</code>
                  </div>
                  <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>TypeScript Version</span>
                    <code style={{ color: 'var(--accent)' }}>~6.0.2 (Static Type Contract)</code>
                  </div>
                  <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Frontend Bundler</span>
                    <code style={{ color: 'var(--accent)' }}>Vite 8.2.2 + Oxc Plugin</code>
                  </div>
                  <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Static Code Analysis</span>
                    <code style={{ color: 'var(--accent)' }}>Oxlint v1.79.0 (0 Errors)</code>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Tampilan Utama Materi (Home & Materi) */
            <>
              {/* b. Module Selector Card */}
              <ModuleSelector
                modules={modules}
                activeModuleId={activeModuleId}
                onSelectModule={handleSelectModule}
              />

              {/* c. Konten Pembelajaran */}
              {activeModuleId === 0 ? (
                // Tampilkan Seluruh Modul Berurutan
                modules.map((mod) => (
                  <div key={mod.id} className="module-section">
                    <div className="module-header-banner">
                      <span className="module-header-tag">
                        {mod.icon}
                        <span>{mod.step}: {mod.title}</span>
                      </span>
                    </div>
                    {mod.content}
                  </div>
                ))
              ) : (
                // Tampilkan Modul Aktif Terfokus
                currentModule && (
                  <div className="module-section">
                    <div className="module-header-banner">
                      <span className="module-header-tag">
                        {currentModule.icon}
                        <span>{currentModule.step}: {currentModule.title}</span>
                      </span>
                      <span className="curriculum-progress-text">
                        Tahap {currentModule.id} / 7
                      </span>
                    </div>

                    {currentModule.content}

                    {/* Bottom Stepper Navigation */}
                    <div className="module-bottom-nav">
                      <button
                        type="button"
                        onClick={() => setActiveModuleId((prev) => Math.max(1, prev - 1))}
                        disabled={currentModule.id === 1}
                        className="btn-nav-module"
                      >
                        <ChevronLeft size={16} />
                        <span>Modul Sebelumnya</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveModuleId((prev) => Math.min(7, prev + 1))}
                        disabled={currentModule.id === 7}
                        className="btn-nav-module"
                      >
                        <span>Modul Selanjutnya</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )
              )}
            </>
          )}
        </main>

        {/* Footer Bersih & Profesional */}
        <footer className="app-footer">
          <div className="app-footer-left">
            <Atom size={16} style={{ color: "var(--accent)" }} />
            <span>React + TypeScript Learning Curriculum</span>
          </div>
          <div className="app-footer-right">
            <span>Clean Architecture • Zero AI Slop</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
