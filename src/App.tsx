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
  LayoutGrid,
  CheckCircle2,
  PlayCircle
} from 'lucide-react';

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

  const currentModule = modules.find((m) => m.id === activeModuleId);

  return (
    <div className="app-container">
      {/* Header Utama Dokumentasi */}
      <header className="app-header">
        <div className="header-meta-row">
          <div className="header-brand-badge">
            <Atom size={15} />
            <span>Kurikulum React + TS</span>
          </div>
          <span className="header-version">v19.2 • Strict Mode</span>
        </div>

        <h1 className="app-title">Belajar React + TypeScript</h1>
        <p className="app-subtitle">
          Dokumentasi dan materi interaktif dengan prinsip Clean Code, Strict Type Safety,
          dan arsitektur modular dari dasar hingga mini project produksi.
        </p>
      </header>

      {/* Curriculum Module Switcher */}
      <nav className="curriculum-nav-wrapper" aria-label="Navigasi Kurikulum">
        <div className="curriculum-nav-header">
          <span className="curriculum-nav-title">
            <CheckCircle2 size={16} style={{ color: "var(--accent)" }} />
            <span>Pilih Modul Pembelajaran</span>
          </span>
          <span className="curriculum-progress-text">
            {activeModuleId === 0
              ? "Semua Modul (7 Tahap)"
              : `Modul ${activeModuleId} dari 7`}
          </span>
        </div>

        <div className="module-nav-grid">
          {modules.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveModuleId(m.id)}
              className={`module-nav-btn ${activeModuleId === m.id ? "active" : ""}`}
            >
              <span className="module-nav-step">{m.step}</span>
              <span className="module-nav-name">{m.title}</span>
            </button>
          ))}

          <button
            type="button"
            onClick={() => setActiveModuleId(0)}
            className={`all-modules-btn ${activeModuleId === 0 ? "active" : ""}`}
          >
            <LayoutGrid size={14} />
            <span>Tampilkan Semua Modul</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveModuleId(99)}
            className={`all-modules-btn ${activeModuleId === 99 ? "active" : ""}`}
            style={{ 
              borderColor: activeModuleId === 99 ? "var(--accent)" : undefined,
              color: activeModuleId === 99 ? "var(--accent)" : undefined
            }}
          >
            <PlayCircle size={14} />
            <span>Latihan Runner (Pilih Soal 1-7)</span>
          </button>
        </div>
      </nav>

      {/* Konten Utama */}
      <main className="app-main">
        {activeModuleId === 99 ? (
          // Tampilkan Runner Latihan Khusus
          <div className="module-section">
            <div className="module-header-banner">
              <span className="module-header-tag">
                <PlayCircle size={14} />
                <span>Mode Latihan Runner</span>
              </span>
              <span className="curriculum-progress-text">
                Pilih & Uji Latihan 01 s.d. 07
              </span>
            </div>
            <LatihanRunner />
          </div>
        ) : activeModuleId === 0 ? (
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
          // Tampilkan Modul Aktif Terfokus (Fokus & Ergonomis)
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
  );
}

export default App;
