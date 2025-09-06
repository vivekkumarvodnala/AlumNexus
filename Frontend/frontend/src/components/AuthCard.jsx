// src/components/AuthCard.jsx
import React from "react";

/**
 * Small wrapper card used by auth pages.
 * children = form or content
 */
export default function AuthCard({ children, title, subtitle }) {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-6">
          {/* simple logo circle */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#0D9488" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 12h16M12 4v16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold" style={{ color: "#1F2937" }}>AlumNexus</h3>
            {subtitle && <p className="text-sm text-accent/60">{subtitle}</p>}
          </div>
        </div>

        <div>
          {title && <h2 className="text-2xl font-semibold mb-2" style={{ color: "#1F2937" }}>{title}</h2>}
          {children}
        </div>
      </div>
    </div>
  );
}
