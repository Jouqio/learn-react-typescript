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
  CheckCircle2
} from 'lucide-react';

// Tahap 1: Kenalan dengan React + TypeScript
import { HelloWorld } from './pembelajaran/01-kenalan/HelloWorld';
import { StrukturProjectExplainer } from './pembelajaran/01-kenalan/StrukturProjectExplainer';

// Tahap 2: Props (Mengirim Data ke Component)
import { PropsExplainer } from './pembelajaran/02-props/PropsExplainer';
import { UserCardShowcase } from './pembelajaran/02-props/UserCard';

// Tahap 3: useState (Data yang Bisa Berubah & Re-render)
import { StateExplainer } from './pembelajaran/03-state/StateExplainer';
import { CounterShowcase } from './pembelajaran/03-state/Counter';

// Tahap 4: Event Handling (Form & Interaksi User)
import { EventExplainer } from './pembelajaran/04-events/EventExplainer';
import { SimpleNameForm } from './pembelajaran/04-events/SimpleNameForm';

// Tahap 5: useEffect (Side Effects & Fetch API)
import { EffectExplainer } from './pembelajaran/05-effects/EffectExplainer';
import { PostListFetcher } from './pembelajaran/05-effects/PostListFetcher';

// Tahap 6: Conditional & List Rendering (.map & key)
import { RenderingExplainer } from './pembelajaran/06-rendering/RenderingExplainer';
import { SimpleTodoList } from './pembelajaran/06-rendering/SimpleTodoList';

// Tahap 7: Mini Project Akhir (Todo List App Lengkap)
import { TodoListApp } from './pembelajaran/07-mini-project/TodoListApp';

import './App.css';

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
      content: (
        <>
          <HelloWorld />
          <StrukturProjectExplainer />
        </>
      ),
    },
    {
      id: 2,
      step: "Tahap 2",
      title: "Props & Interface",
      icon: <Boxes size={14} />,
      content: (
        <>
          <PropsExplainer />
          <UserCardShowcase />
        </>
      ),
    },
    {
      id: 3,
      step: "Tahap 3",
      title: "useState & State",
      icon: <Cpu size={14} />,
      content: (
        <>
          <StateExplainer />
          <CounterShowcase />
        </>
      ),
    },
    {
      id: 4,
      step: "Tahap 4",
      title: "Event & Form",
      icon: <MousePointerClick size={14} />,
      content: (
        <>
          <EventExplainer />
          <SimpleNameForm />
        </>
      ),
    },
    {
      id: 5,
      step: "Tahap 5",
      title: "useEffect & Fetch",
      icon: <RefreshCw size={14} />,
      content: (
        <>
          <EffectExplainer />
          <PostListFetcher />
        </>
      ),
    },
    {
      id: 6,
      step: "Tahap 6",
      title: "List & Rendering",
      icon: <Split size={14} />,
      content: (
        <>
          <RenderingExplainer />
          <SimpleTodoList />
        </>
      ),
    },
    {
      id: 7,
      step: "Tahap 7",
      title: "Mini Project",
      icon: <FolderKanban size={14} />,
      content: <TodoListApp />,
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

        <h1 className="app-title">Belajar React + TypeScript untuk Pemula</h1>
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
            <span>Tampilkan Semua Modul (Roadmap Lengkap)</span>
          </button>
        </div>
      </nav>

      {/* Konten Utama */}
      <main className="app-main">
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
