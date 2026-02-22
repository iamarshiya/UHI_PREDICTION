import { useState } from "react";

const faqs = [
  {
    question: "How accurate are predictions?",
    answer:
      "Our AI models achieve over 92% accuracy in climate risk predictions by combining real-time satellite imagery, historical climate data, and advanced machine learning algorithms. The system continuously self-improves as more data is processed, ensuring predictions become increasingly precise over time.",
  },
  {
    question: "Can this scale to multiple cities?",
    answer:
      "Absolutely. The platform is built on a cloud-native, microservices architecture designed to scale horizontally. We currently support monitoring across 50+ cities simultaneously with no degradation in performance. Adding new cities takes as little as 48 hours of onboarding and data ingestion.",
  },
  {
    question: "How often is data updated?",
    answer:
      "Satellite data is refreshed every 6 hours via Google Earth Engine integration. Ground sensor data (where available) streams in real-time. Risk scores and environmental indices are recalculated every hour to reflect the latest conditions on the ground.",
  },
  {
    question: "Is real-time monitoring supported?",
    answer:
      "Yes. Our platform provides live dashboards with sub-hourly updates for critical environmental indicators including urban heat indices, air quality metrics, vegetation cover, and flood risk zones. Alert thresholds can be configured per locality for instant notifications.",
  },
  {
    question: "How is this different from traditional environmental monitoring systems?",
    answer:
      "Traditional systems rely on sparse ground sensors and reactive reporting. ClimateRisk AI uses satellite-driven, AI-augmented analysis that is proactive — predicting risk before it materializes. Our explainable AI layer also provides decision-makers with transparent reasoning behind every alert, something legacy systems simply cannot offer.",
  },
];

// Celadon green palette — #ACE1AF as hero accent
const C = {
  bg: "#f0f8f1",
  bgCard: "#ffffff",
  bgCardOpen: "#f5fbf5",
  accent: "#4a8c4e",          // darker green for text/icons on light bg
  accentLight: "#ACE1AF",     // celadon — the star accent
  accentGlow: "#d4f0d5",      // very light celadon for glows
  accentBorder: "#ACE1AF",
  textPrimary: "#1a3d1e",
  textSecondary: "#3b6b40",
  textMuted: "#7aab7e",
  footerBg: "#111f12",
  footerText: "#ACE1AF",
  footerMuted: "#7aab7e",
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(170deg, ${C.bg} 0%, #e2f4e3 50%, #d4efd5 100%)`,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Georgia', serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle mesh background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(172,225,175,0.25) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(74,140,78,0.1) 0%, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      {/* Circle decorations top-right */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          border: `1px solid rgba(172,225,175,0.45)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "340px",
          height: "340px",
          borderRadius: "50%",
          border: `1px solid rgba(172,225,175,0.28)`,
          pointerEvents: "none",
        }}
      />

      {/* ── FAQ Content ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "72px 24px 80px",
          position: "relative",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: "800",
            color: C.textPrimary,
            margin: "0 0 16px",
            textAlign: "center",
            letterSpacing: "-0.02em",
          }}
        >
          FAQ{" "}
          <span style={{ color: "#1a3d1e", fontStyle: "italic", fontWeight: "700" }}>
            Section
          </span>
        </h2>

        <p
          style={{
            color: C.textSecondary,
            fontSize: "1rem",
            textAlign: "center",
            maxWidth: "580px",
            lineHeight: 1.75,
            marginBottom: "16px",
            fontFamily: "'Trebuchet MS', sans-serif",
          }}
        >
          Find quick answers to common questions about our platform, features, and how to
          get started.
        </p>

        {/* Teal underline accent */}
        <div
          style={{
            height: "3px",
            width: "60px",
            borderRadius: "99px",
            background: `linear-gradient(90deg, ${C.accentLight}, ${C.accentGlow})`,
            marginBottom: "56px",
          }}
        />

        {/* Accordion */}
        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  background: isOpen ? C.bgCardOpen : C.bgCard,
                  border: `1.5px solid ${isOpen ? C.accentBorder : "rgba(172,225,175,0.45)"}`,
                  borderRadius: "14px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  boxShadow: isOpen
                    ? `0 8px 30px rgba(74,140,78,0.12), 0 0 0 1px rgba(172,225,175,0.2)`
                    : "0 2px 8px rgba(74,140,78,0.07)",
                }}
              >
                <div style={{ display: "flex" }}>
                  {/* Left colored bar */}
                  <div
                    style={{
                      width: isOpen ? "4px" : "0px",
                      background: `linear-gradient(180deg, ${C.accentLight}, ${C.accentGlow})`,
                      transition: "width 0.3s ease",
                      flexShrink: 0,
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    {/* Question row */}
                    <button
                      onClick={() => toggle(i)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "22px 26px",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        gap: "16px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.975rem",
                          fontWeight: "600",
                          color: isOpen ? C.accent : C.textPrimary,
                          fontFamily: "'Georgia', serif",
                          transition: "color 0.3s",
                          lineHeight: 1.4,
                        }}
                      >
                        {faq.question}
                      </span>

                      {/* Chevron */}
                      <span
                        style={{
                          flexShrink: 0,
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: isOpen
                            ? `rgba(172,225,175,0.3)`
                            : "rgba(172,225,175,0.12)",
                          border: `1px solid ${isOpen ? C.accentBorder : "rgba(172,225,175,0.45)"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.3s ease",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2 4L6 8L10 4"
                            stroke={C.accent}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    {/* Answer */}
                    <div
                      style={{
                        maxHeight: isOpen ? "320px" : "0px",
                        overflow: "hidden",
                        transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      <div
                        style={{
                          padding: "0 26px 26px",
                          borderTop: `1px solid rgba(172,225,175,0.4)`,
                          paddingTop: "18px",
                        }}
                      >
                        <p
                          style={{
                            color: C.textSecondary,
                            fontSize: "0.9rem",
                            lineHeight: 1.85,
                            margin: 0,
                            fontFamily: "'Trebuchet MS', sans-serif",
                          }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer
        style={{
          background: C.footerBg,
          borderTop: `2px solid rgba(172,225,175,0.2)`,
          padding: "52px 48px 36px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Footer bg glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(172,225,175,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "40px",
            position: "relative",
          }}
        >
          {/* Left: Info */}
          <div style={{ maxWidth: "460px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: C.accentLight,
                  boxShadow: `0 0 8px ${C.accentLight}`,
                }}
              />
              <p
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: C.accentLight,
                  margin: 0,
                }}
              >
                INDIA | GLOBAL
              </p>
            </div>

            <p
              style={{
                color: "#c8eeca",
                fontSize: "0.875rem",
                lineHeight: 1.85,
                margin: "0 0 22px",
                fontFamily: "'Trebuchet MS', sans-serif",
              }}
            >
              <strong style={{ color: "#edfaee" }}>ClimateRisk AI</strong> is an
              AI-powered system that helps cities predict and manage climate risks using
              real-time satellite data and machine learning.
              <br />
              Built to support smarter environmental governance and urban resilience.
            </p>

            <div
              style={{
                color: C.footerMuted,
                fontSize: "0.82rem",
                lineHeight: 2.1,
                fontFamily: "'Trebuchet MS', sans-serif",
                borderLeft: `2px solid rgba(172,225,175,0.3)`,
                paddingLeft: "14px",
              }}
            >
              <p style={{ margin: 0, fontWeight: "600", color: "#ACE1AF" }}>
                Registered Office:
              </p>
              <p style={{ margin: 0 }}>Pune, India</p>
              <p style={{ margin: 0 }}>T: +91 XXXXX XXXXX</p>
              <p style={{ margin: 0 }}>Email: info@climateriskai.in</p>
            </div>
          </div>

          {/* Right: Socials */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "14px",
              alignSelf: "flex-end",
            }}
          >
            <p
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: C.footerMuted,
                margin: 0,
              }}
            >
              Connect With Us
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                { label: "f", title: "Facebook" },
                { label: "📷", title: "Instagram" },
                { label: "✉", title: "Email" },
                { label: "in", title: "LinkedIn" },
                { label: "▶", title: "YouTube" },
              ].map((s, i) => (
                <button
                  key={i}
                  title={s.title}
                  onMouseEnter={() => setHoveredSocial(i)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background:
                      hoveredSocial === i
                        ? `rgba(172,225,175,0.22)`
                        : "rgba(172,225,175,0.08)",
                    border: `1px solid ${
                      hoveredSocial === i ? C.accentBorder : "rgba(172,225,175,0.25)"
                    }`,
                    color: hoveredSocial === i ? "#edfaee" : C.accentLight,
                    fontSize: "14px",
                    fontWeight: "700",
                    fontFamily: "'Georgia', serif",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                    transform: hoveredSocial === i ? "translateY(-3px)" : "translateY(0)",
                    boxShadow:
                      hoveredSocial === i
                        ? `0 6px 20px rgba(172,225,175,0.2)`
                        : "none",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: "40px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(172,225,175,0.12)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              color: "rgba(172,225,175,0.35)",
              fontSize: "0.75rem",
              fontFamily: "'Courier New', monospace",
              margin: 0,
              letterSpacing: "0.1em",
            }}
          >
            © 2025 ClimateRisk AI · All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}