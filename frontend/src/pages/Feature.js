import { useState } from "react";

const features = [
  {
    title: "Real-Time Satellite Data Integration",
    description:
      "Integrates with Google Earth Engine to analyze real-time satellite data for continuous environmental monitoring.",
    icon: "🛰️",
    accent: "#166534",
  },
  {
    title: "Urban Heat Hotspot Detection",
    description:
      "Uses AI-based spatial analysis to detect high-temperature zones and urban heat islands at the locality level.",
    icon: "🌡️",
    accent: "#15803d",
  },
  {
    title: "Green Cover & Vegetation Loss Analysis",
    description:
      "Tracks vegetation health and green cover changes to identify environmental degradation and rising risk.",
    icon: "🌿",
    accent: "#16a34a",
  },
  {
    title: "Explainable AI Insights",
    description:
      "Provides explainable insights behind risk scores and predictions to build trust and support decision-making.",
    icon: "🧠",
    accent: "#22c55e",
  },
  {
    title: "Early Warning & Alert System",
    description:
      "Detects rapidly rising risk zones and issues early alerts for heat stress and environmental threats.",
    icon: "⚡",
    accent: "#4ade80",
  },
  {
    title: "AI-Powered Risk Mitigation Strategies",
    description:
      "Guides cities with AI-powered solutions for urban cooling, green zones, and resilient infrastructure.",
    icon: "🛡️",
    accent: "#86efac",
  },
];

export default function FeaturesSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 32px",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture dots */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(74,222,128,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />

      {/* Glow blobs */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(22,163,74,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "56px", position: "relative" }}>
        <p
          style={{
            fontSize: "12px",
            fontFamily: "'Courier New', monospace",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#4ade80",
            marginBottom: "12px",
          }}
        >
          What We Offer
        </p>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: "700",
            color: "#f0fdf4",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Features
          <span
            style={{
              color: "#4ade80",
              fontStyle: "italic",
              fontWeight: "400",
              marginLeft: "12px",
            }}
          >
            ,
          </span>{" "}
          <span style={{ color: "#bbf7d0", fontWeight: "300", fontStyle: "italic" }}>
            that we provide
          </span>
        </h2>
        <div
          style={{
            marginTop: "20px",
            height: "2px",
            width: "80px",
            background: "linear-gradient(90deg, transparent, #4ade80, transparent)",
            margin: "20px auto 0",
          }}
        />
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          maxWidth: "1100px",
          width: "100%",
          position: "relative",
        }}
      >
        {features.map((feature, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background:
                hovered === i
                  ? "linear-gradient(135deg, rgba(20,83,45,0.95) 0%, rgba(22,101,52,0.95) 100%)"
                  : "rgba(5,46,22,0.7)",
              border: `1px solid ${hovered === i ? feature.accent : "rgba(74,222,128,0.2)"}`,
              borderRadius: "16px",
              padding: "32px 28px",
              cursor: "default",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: hovered === i ? "translateY(-6px)" : "translateY(0)",
              boxShadow:
                hovered === i
                  ? `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${feature.accent}30`
                  : "0 4px 16px rgba(0,0,0,0.3)",
              backdropFilter: "blur(12px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Card glow top-left corner */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "60px",
                height: "60px",
                background: `radial-gradient(circle at top left, ${feature.accent}25 0%, transparent 70%)`,
                pointerEvents: "none",
                transition: "opacity 0.3s",
                opacity: hovered === i ? 1 : 0,
              }}
            />

            {/* Icon */}
            <div
              style={{
                fontSize: "28px",
                marginBottom: "16px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "52px",
                height: "52px",
                borderRadius: "12px",
                background: `${feature.accent}20`,
                border: `1px solid ${feature.accent}40`,
              }}
            >
              {feature.icon}
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: "1.05rem",
                fontWeight: "700",
                color: "#f0fdf4",
                marginBottom: "12px",
                lineHeight: 1.3,
                fontFamily: "'Georgia', serif",
              }}
            >
              {feature.title}
            </h3>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background: `linear-gradient(90deg, ${feature.accent}60, transparent)`,
                marginBottom: "14px",
              }}
            />

            {/* Description */}
            <p
              style={{
                fontSize: "0.875rem",
                color: "#86efac",
                lineHeight: 1.7,
                margin: 0,
                fontFamily: "'Trebuchet MS', sans-serif",
              }}
            >
              {feature.description}
            </p>

            {/* Bottom accent line on hover */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)`,
                opacity: hovered === i ? 1 : 0,
                transition: "opacity 0.3s",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}