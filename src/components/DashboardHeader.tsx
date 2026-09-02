/**
 * ============================================================================
 * DASHBOARD HEADER COMPONENT (DashboardHeader.tsx)
 * Hero Header with Badge, Title, Subtitle, & Ambient Watermark Atom
 * ============================================================================
 */

import { Atom } from "lucide-react";

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  badgeLabel?: string;
  versionLabel?: string;
}

export function DashboardHeader({
  title = "Belajar React + TypeScript",
  subtitle = "Dokumentasi dan materi interaktif dengan prinsip Clean Code, Strict Type Safety, dan arsitektur modular dari dasar hingga mini project produksi.",
  badgeLabel = "KURIKULUM REACT + TS",
  versionLabel = "v19.2 • Strict Mode",
}: DashboardHeaderProps) {
  return (
    <header className="dashboard-hero">
      {/* Konten Teks Header */}
      <div className="hero-content">
        <div className="header-meta-row">
          <div className="header-brand-badge">
            <Atom size={14} />
            <span>{badgeLabel}</span>
          </div>
          <span className="header-version">{versionLabel}</span>
        </div>

        <h1 className="app-title">{title}</h1>
        <p className="app-subtitle">{subtitle}</p>
      </div>

      {/* Watermark Icon Atom Besar di Sisi Kanan Sebagai Dekorasi Visual */}
      <div className="hero-watermark-wrapper" aria-hidden="true">
        <Atom size={260} className="header-watermark-icon" />
      </div>
    </header>
  );
}

export default DashboardHeader;
