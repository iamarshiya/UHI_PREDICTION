import { useState, useRef } from "react";

const LOCALITIES = [
  "Andheri East, Mumbai", "Andheri West, Mumbai", "Bandra, Mumbai", "Borivali, Mumbai",
  "Chembur, Mumbai", "Dadar, Mumbai", "Dharavi, Mumbai", "Ghatkopar, Mumbai",
  "Juhu, Mumbai", "Kandivali, Mumbai", "Kurla, Mumbai", "Malad, Mumbai",
  "Mulund, Mumbai", "Powai, Mumbai", "Thane West", "Thane East",
  "Vashi, Navi Mumbai", "Kharghar, Navi Mumbai", "Panvel", "Airoli",
  "Pune City", "Shivajinagar, Pune", "Kothrud, Pune", "Hinjewadi, Pune",
  "Nashik Road", "Aurangabad Central", "Nagpur West", "Nagpur East",
  "Delhi NCR", "Gurgaon", "Noida", "Faridabad",
  "Bengaluru South", "Bengaluru North", "Whitefield, Bengaluru", "Koramangala, Bengaluru",
  "Chennai Central", "Anna Nagar, Chennai", "Kolkata North", "Kolkata South",
  "Hyderabad Central", "Secunderabad", "Ahmedabad East", "Surat City",
];

const ISSUES = [
  { id: "heat",      icon: "🌡️", label: "Excessive heat" },
  { id: "trees",     icon: "🌳", label: "Lack of trees / green cover" },
  { id: "water",     icon: "💧", label: "Water scarcity" },
  { id: "drainage",  icon: "🚧", label: "Poor drainage" },
  { id: "pollution", icon: "🚗", label: "High traffic pollution" },
  { id: "waste",     icon: "🗑️", label: "Waste accumulation" },
  { id: "shade",     icon: "☂️", label: "No shaded areas" },
  { id: "other",     icon: "✏️", label: "Other" },
];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
  body { background: #f8faf8; }
  input, textarea, select { font-family: inherit; }
  button { font-family: inherit; cursor: pointer; }

  @keyframes fadeUp   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes popIn    { from { opacity:0; transform:scale(0.88); } to { opacity:1; transform:scale(1); } }
  @keyframes float    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
  @keyframes shimmer  { from { background-position: -200% center; } to { background-position: 200% center; } }
  @keyframes checkPop { 0% { transform:scale(0); } 70% { transform:scale(1.2); } 100% { transform:scale(1); } }

  .step-card { animation: fadeUp 0.5s ease both; }
  .step-card:nth-child(1) { animation-delay: 0.05s; }
  .step-card:nth-child(2) { animation-delay: 0.12s; }
  .step-card:nth-child(3) { animation-delay: 0.19s; }
  .step-card:nth-child(4) { animation-delay: 0.26s; }
  .step-card:nth-child(5) { animation-delay: 0.33s; }
  .step-card:nth-child(6) { animation-delay: 0.40s; }

  .issue-chip:hover { border-color: #16a34a !important; background: #f0fdf4 !important; transform: translateY(-2px); }
  .issue-chip-checked { border-color: #16a34a !important; background: #dcfce7 !important; }

  input:focus, textarea:focus, select:focus { outline: none; border-color: #22c55e !important; box-shadow: 0 0 0 3px rgba(34,197,94,0.12) !important; }

  .submit-btn:hover { background: #15803d !important; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(22,163,74,0.35) !important; }
  .submit-btn:active { transform: translateY(0); }

  .success-card { animation: popIn 0.5s cubic-bezier(.34,1.56,.64,1) both; }
  .leaf-float { animation: float 3s ease-in-out infinite; }
`;

export default function FeedbackForm() {
  const [locality, setLocality]         = useState("");
  const [localitySearch, setLocalitySearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [issues, setIssues]             = useState([]);
  const [description, setDescription]  = useState("");
  const [photos, setPhotos]             = useState([]);
  const [contact, setContact]           = useState("");
  const [submitted, setSubmitted]       = useState(false);
  const fileRef = useRef(null);

  const filtered = LOCALITIES.filter(l =>
    l.toLowerCase().includes(localitySearch.toLowerCase())
  );

  const toggleIssue = (id) =>
    setIssues(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(f => ({ name: f.name, url: URL.createObjectURL(f) }));
    setPhotos(prev => [...prev, ...previews].slice(0, 5));
  };

  const removePhoto = (i) => setPhotos(prev => prev.filter((_, idx) => idx !== i));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!locality || issues.length === 0) return;
    setSubmitted(true);
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <style>{STYLES}</style>
        <div className="success-card" style={{ background: "#fff", borderRadius: 28, padding: "56px 48px", maxWidth: 480, width: "100%", textAlign: "center", boxShadow: "0 24px 80px rgba(0,0,0,0.10)", border: "1.5px solid #bbf7d0" }}>
          <div className="leaf-float" style={{ fontSize: 72, marginBottom: 24 }}>🌱</div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: "#111827", marginBottom: 12, letterSpacing: "-0.5px" }}>
            Thank you for helping make<br />your city better 🌱
          </h2>
          <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
            Your report has been submitted. Our team will review and take action in your locality. Together we build a healthier city.
          </p>
          <div style={{ background: "#f0fdf4", borderRadius: 16, padding: "16px 24px", marginBottom: 32, border: "1px solid #bbf7d0" }}>
            <div style={{ fontSize: 12, color: "#16a34a", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Report Summary</div>
            <div style={{ fontSize: 13, color: "#374151" }}>📍 {locality}</div>
            <div style={{ fontSize: 13, color: "#374151", marginTop: 4 }}>
              🏷️ {issues.map(id => ISSUES.find(x => x.id === id)?.label).join(", ")}
            </div>
          </div>
          <button onClick={() => { setSubmitted(false); setLocality(""); setLocalitySearch(""); setIssues([]); setDescription(""); setPhotos([]); setContact(""); }}
            style={{ background: "#16a34a", color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 32px", borderRadius: 999, border: "none", boxShadow: "0 4px 16px rgba(22,163,74,0.3)", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#15803d"}
            onMouseLeave={e => e.currentTarget.style.background = "#16a34a"}
          >
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div style={{ minHeight: "100vh", background: "#f8faf8" }}>
      <style>{STYLES}</style>

      

      {/* Hero banner */}
      <div style={{ background: "#ffffff", padding: "48px 40px", textAlign: "center", borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🏙️</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: "#111827", letterSpacing: "-1px", marginBottom: 10, lineHeight: 1.15 }}>
            Report a Climate Issue
          </h1>
          <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.65 }}>
            Your report helps city planners, climate teams, and local governments take real action. Every submission matters.
          </p>
        </div>
      </div>

      {/* Form body */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 80px" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* ── Step 1: Locality ── */}
          <div className="step-card" style={{ background: "#fff", borderRadius: 20, padding: "28px 32px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", border: "1.5px solid #e5e7eb" }}>
            <StepLabel num="1" label="Select Your Locality" required />
            <div style={{ position: "relative", marginTop: 16 }}>
              <div style={{ position: "relative" }}>
                <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="16" height="16" fill="none" stroke="#9ca3af" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search your area, city, or neighbourhood…"
                  value={localitySearch}
                  onChange={e => { setLocalitySearch(e.target.value); setShowDropdown(true); setLocality(""); }}
                  onFocus={() => setShowDropdown(true)}
                  style={{ width: "100%", padding: "12px 14px 12px 40px", border: "1.5px solid #e5e7eb", borderRadius: 12, fontSize: 14, color: "#111827", background: "#fff", transition: "all 0.2s" }}
                />
              </div>
              {/* Dropdown */}
              {showDropdown && filtered.length > 0 && !locality && (
                <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "#fff", borderRadius: 14, border: "1.5px solid #e5e7eb", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", zIndex: 50, maxHeight: 220, overflowY: "auto" }}>
                  {filtered.slice(0, 12).map(loc => (
                    <div key={loc}
                      onClick={() => { setLocality(loc); setLocalitySearch(loc); setShowDropdown(false); }}
                      style={{ padding: "10px 16px", fontSize: 13, color: "#374151", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "background 0.15s", borderBottom: "1px solid #f9fafb" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f0fdf4"}
                      onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                    >
                      <svg width="13" height="13" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {loc}
                    </div>
                  ))}
                </div>
              )}
              {locality && (
                <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8, background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 10, padding: "8px 14px" }}>
                  <svg width="14" height="14" fill="#22c55e" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span style={{ fontSize: 13, color: "#15803d", fontWeight: 600 }}>📍 {locality}</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Step 2: Issue type ── */}
          <div className="step-card" style={{ background: "#fff", borderRadius: 20, padding: "28px 32px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", border: "1.5px solid #e5e7eb" }}>
            <StepLabel num="2" label="Type of Issue" required />
            <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 4, marginBottom: 16 }}>Select all that apply</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {ISSUES.map(issue => {
                const checked = issues.includes(issue.id);
                return (
                  <label key={issue.id} className={`issue-chip ${checked ? "issue-chip-checked" : ""}`}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", border: `1.5px solid ${checked ? "#16a34a" : "#e5e7eb"}`, borderRadius: 12, cursor: "pointer", background: checked ? "#dcfce7" : "#fafafa", transition: "all 0.18s", userSelect: "none" }}
                  >
                    <input type="checkbox" checked={checked} onChange={() => toggleIssue(issue.id)} style={{ display: "none" }} />
                    <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked ? "#16a34a" : "#d1d5db"}`, background: checked ? "#16a34a" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.18s" }}>
                      {checked && (
                        <svg width="12" height="12" fill="none" stroke="#fff" viewBox="0 0 24 24" style={{ animation: "checkPop 0.2s ease" }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span style={{ fontSize: 14 }}>{issue.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: checked ? "#14532d" : "#374151" }}>{issue.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* ── Step 3: Description ── */}
          <div className="step-card" style={{ background: "#fff", borderRadius: 20, padding: "28px 32px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", border: "1.5px solid #e5e7eb" }}>
            <StepLabel num="3" label="Short Description" />
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              maxLength={400}
              rows={4}
              placeholder="Describe what you're facing in your area… (e.g. The road near our building has no shade, extreme heat between 12-4 PM makes it unbearable for pedestrians)"
              style={{ width: "100%", marginTop: 16, padding: "14px 16px", border: "1.5px solid #e5e7eb", borderRadius: 12, fontSize: 14, color: "#111827", lineHeight: 1.6, resize: "vertical", background: "#fafafa", transition: "all 0.2s" }}
            />
            <div style={{ textAlign: "right", fontSize: 11, color: "#9ca3af", marginTop: 6 }}>{description.length}/400</div>
          </div>

          {/* ── Step 4: Photo upload ── */}
          <div className="step-card" style={{ background: "#fff", borderRadius: 20, padding: "28px 32px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", border: "1.5px solid #e5e7eb" }}>
            <StepLabel num="4" label="Upload Photos" badge="Optional" />
            <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 4, marginBottom: 16 }}>📷 Hot roads, broken footpaths, dry parks… (max 5 photos)</p>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={handlePhotos} style={{ display: "none" }} />
            <div
              onClick={() => fileRef.current.click()}
              style={{ border: "2px dashed #d1d5db", borderRadius: 14, padding: "28px 20px", textAlign: "center", cursor: "pointer", background: "#fafafa", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#22c55e"; e.currentTarget.style.background = "#f0fdf4"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#d1d5db"; e.currentTarget.style.background = "#fafafa"; }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>📸</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>Click to upload photos</div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>JPG, PNG, WEBP · up to 5 images</div>
            </div>
            {photos.length > 0 && (
              <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
                {photos.map((p, i) => (
                  <div key={i} style={{ position: "relative", width: 80, height: 80, borderRadius: 10, overflow: "hidden", border: "2px solid #bbf7d0", flexShrink: 0 }}>
                    <img src={p.url} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <button type="button" onClick={() => removePhoto(i)}
                      style={{ position: "absolute", top: 3, right: 3, width: 20, height: 20, borderRadius: "50%", background: "rgba(0,0,0,0.65)", border: "none", color: "#fff", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}
                    >✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Step 5: Contact ── */}
          <div className="step-card" style={{ background: "#fff", borderRadius: 20, padding: "28px 32px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", border: "1.5px solid #e5e7eb" }}>
            <StepLabel num="5" label="Your Contact" badge="Optional" />
            <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 4, marginBottom: 16 }}>We'll notify you when action is taken. Your details stay private.</p>
            <input
              type="text"
              placeholder="Email address or phone number"
              value={contact}
              onChange={e => setContact(e.target.value)}
              style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #e5e7eb", borderRadius: 12, fontSize: 14, color: "#111827", background: "#fafafa", transition: "all 0.2s" }}
            />
          </div>

          {/* ── Submit ── */}
          <div className="step-card">
            {(!locality || issues.length === 0) && (
              <p style={{ fontSize: 12, color: "#f59e0b", textAlign: "center", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <span>⚠️</span>
                {!locality ? "Please select a locality to continue" : "Please select at least one issue type"}
              </p>
            )}
            <button
              type="submit"
              className="submit-btn"
              disabled={!locality || issues.length === 0}
              style={{
                width: "100%", background: locality && issues.length > 0 ? "#16a34a" : "#9ca3af",
                color: "#fff", fontWeight: 800, fontSize: 16, padding: "17px 28px",
                borderRadius: 16, border: "none", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 10, boxShadow: locality && issues.length > 0 ? "0 4px 20px rgba(22,163,74,0.3)" : "none",
                transition: "all 0.2s", cursor: locality && issues.length > 0 ? "pointer" : "not-allowed"
              }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Submit Report
            </button>
            <p style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", marginTop: 14 }}>
              🔒 Your data is secure and only used for city improvement purposes
            </p>
          </div>

        </form>
      </div>

      {/* Footer */}
      <div style={{ background: "#030712", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#4b5563", fontSize: 12 }}>
          <span>© 2026</span>
          <strong style={{ color: "#e5e7eb" }}>CityCare</strong>
          <span>. All rights reserved.</span>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy Policy", "Terms", "Accessibility"].map(l => (
            <a key={l} href="#" style={{ color: "#4b5563", fontSize: 12, transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#fff"}
              onMouseLeave={e => e.target.style.color = "#4b5563"}
            >{l}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Helper: Step Label ── */
function StepLabel({ num, label, required, badge }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#111827", color: "#4ade80", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {num}
      </div>
      <span style={{ fontWeight: 700, fontSize: 16, color: "#111827" }}>{label}</span>
      {required && <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 600 }}>*</span>}
      {badge && (
        <span style={{ fontSize: 10, color: "#6b7280", background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 999, padding: "2px 8px", fontWeight: 600, letterSpacing: "0.05em" }}>
          {badge}
        </span>
      )}
    </div>
  );
}