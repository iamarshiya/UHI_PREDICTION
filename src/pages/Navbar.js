import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Risk Report", path: "/riskmap" },
  { name: "Forecast Future", path: "/forecast" },
  { name: "Climate Assistant", path: "/chatbot" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* ── Top utility bar ── */}
      <div style={{ background: "#030712", color: "#9ca3af", fontSize: 12, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 32px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse 2s infinite" }} />
          Live Risk Monitoring Active
        </span>
        <div style={{ display: "flex", gap: 24 }}>
          <Link to="#" style={{ color: "#9ca3af", textDecoration: "none" }}>Research</Link>
          <Link to="/dashboard" style={{ color: "#9ca3af", textDecoration: "none" }}>City Dashboard</Link>
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50, background: "#fff",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.10)" : "0 1px 4px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.3s"
      }}>
        {/* Logo + links + CTA */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>

          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, textDecoration: "none" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#030712", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
              <svg viewBox="0 0 32 32" width="26" height="26">
                <circle cx="16" cy="16" r="13" fill="none" stroke="#4ade80" strokeWidth="1.5" />
                <path d="M16 5 C10 5 7 10 7 14 C7 19.5 11.5 23 16 27 C20.5 23 25 19.5 25 14 C25 10 22 5 16 5Z" fill="#4ade80" opacity="0.9" />
                <path d="M13 9 C10 11 9 15 11 18" fill="none" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 20, color: "#111827", lineHeight: 1, letterSpacing: "-0.5px" }}>CityCare</div>
              <div style={{ fontSize: 9, color: "#16a34a", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1 }}>Climate AI</div>
            </div>
          </Link>

          {/* Nav links */}
          <div style={{ display: "flex", alignItems: "center", flex: 1, justifyContent: "center", gap: 4 }}>
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.name} to={link.path} style={{
                  fontSize: 13, fontWeight: isActive ? 700 : 500,
                  padding: "7px 16px", borderRadius: 999,
                  background: isActive ? "#111827" : "transparent",
                  color: isActive ? "#fff" : "#4b5563",
                  textDecoration: "none", whiteSpace: "nowrap",
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => { if (!isActive) { e.target.style.background = "#f3f4f6"; e.target.style.color = "#111827"; }}}
                onMouseLeave={e => { if (!isActive) { e.target.style.background = "transparent"; e.target.style.color = "#4b5563"; }}}
                >{link.name}</Link>
              );
            })}
          </div>
        </div>

        {/* ── Community Feedback strip ── */}
        <div style={{ borderTop: "1px solid #f3f4f6", background: "#f0fdf4" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "8px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6b7280" }}>
              <svg width="14" height="14" fill="#22c55e" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Help us improve CityCare — share your experience with climate data in your city.
            </div>
            <Link to="/community-feedback" style={{ display: "flex", alignItems: "center", gap: 6, border: "1.5px solid #22c55e", color: "#15803d", background: "transparent", fontSize: 12, fontWeight: 600, padding: "6px 16px", borderRadius: 999, cursor: "pointer", whiteSpace: "nowrap", marginLeft: 16, textDecoration: "none" }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              Community Feedback
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
