import { XCircle, CheckCircle2 } from "lucide-react";

export interface CodeComparisonProps {
  title?: string;
  wrongTitle?: string;
  wrongCode: string;
  wrongExplanation: string;
  correctTitle?: string;
  correctCode: string;
  correctExplanation: string;
}

export function CodeComparison({
  title = "Perbandingan: Anti-Pattern vs Best Practice",
  wrongTitle = "Anti-Pattern (Salah)",
  wrongCode,
  wrongExplanation,
  correctTitle = "Best Practice (Benar)",
  correctCode,
  correctExplanation,
}: CodeComparisonProps) {
  return (
    <div className="code-comparison-wrapper">
      {title && <div className="comparison-section-title">{title}</div>}
      <div className="code-comparison-grid">
        {/* Kolom Salah / Anti-Pattern */}
        <div className="code-box wrong">
          <div className="code-box-header">
            <span className="code-status-tag">
              <XCircle size={14} /> {wrongTitle}
            </span>
            <small>Hindari Pola Ini</small>
          </div>
          <pre className="code-box-content">{wrongCode.trim()}</pre>
          <div className="code-box-explanation">{wrongExplanation}</div>
        </div>

        {/* Kolom Benar / Best Practice */}
        <div className="code-box correct">
          <div className="code-box-header">
            <span className="code-status-tag">
              <CheckCircle2 size={14} /> {correctTitle}
            </span>
            <small>Direkomendasikan</small>
          </div>
          <pre className="code-box-content">{correctCode.trim()}</pre>
          <div className="code-box-explanation">{correctExplanation}</div>
        </div>
      </div>
    </div>
  );
}
