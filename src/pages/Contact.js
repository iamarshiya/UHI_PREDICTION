import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "How accurate are predictions?",
    answer:
      "Our models achieve 92–97% accuracy on short-term (24–72 hour) climate risk forecasts, validated against historical event data across 50+ cities. Accuracy varies by region and event type; confidence intervals are always shown alongside predictions.",
  },
  {
    id: 2,
    question: "Can this scale to multiple cities?",
    answer:
      "Yes. The platform is architected for multi-city deployments. Enterprise plans support unlimited city nodes with a centralised dashboard. Each city gets its own calibrated ML model trained on local historical and satellite data.",
  },
  {
    id: 3,
    question: "How often is data updated?",
    answer:
      "Satellite imagery and sensor feeds are ingested every 15 minutes. Risk scores and predictions refresh hourly by default, with near-real-time updates (every 5 minutes) available on Enterprise plans during active weather events.",
  },
  {
    id: 4,
    question: "Is real-time monitoring supported?",
    answer:
      "Absolutely. ClimateRisk AI integrates with IoT sensor networks, weather stations, and ESA/NASA satellite streams for continuous real-time monitoring. Alerts and webhooks can be configured for any threshold breach.",
  },
  {
    id: 5,
    question: "How is this different from traditional environmental monitoring systems?",
    answer:
      "Traditional systems are reactive — they report what has happened. ClimateRisk AI is predictive: it fuses satellite imagery, sensor data, and climate models to forecast risk hours or days ahead, giving authorities time to act rather than react.",
  },
];

const SocialIcon = ({ label, children }) => (
  <a
    href="#"
    aria-label={label}
    className="w-9 h-9 rounded-md flex items-center justify-center bg-green-600 hover:bg-green-500 transition-colors"
  >
    {children}
  </a>
);

export default function FAQSection() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <div className="min-h-screen flex flex-col bg-green-50">

      {/* FAQ Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-14">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
          FAQ Section
        </h1>
        <p className="text-center text-gray-600 text-sm mb-10">
          Find quick answers to common questions about our platform, features, and how to get started
        </p>

        <div className="flex flex-col gap-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  {faq.question}
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`w-4 h-4 text-gray-400 flex-shrink-0 ml-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 px-8 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between gap-8">

          {/* Left */}
          <div className="flex-1">
            <p className="text-white text-xs font-bold tracking-widest uppercase mb-4">
              India | Global
            </p>
            <p className="text-xs leading-relaxed font-semibold text-gray-200 mb-4">
              ClimateRisk AI is an AI-powered system that helps cities predict and manage climate risks
              using real-time satellite data and machine learning.
              <br />
              Built to support smarter environmental governance and urban resilience.
            </p>
            <div className="text-xs leading-6 text-gray-400">
              <p className="font-semibold text-gray-300">Registered Office:</p>
              <p>Pune, India</p>
              <p>T: +91 XXXXX XXXXX</p>
              <p>Email: info@climateriskAI.in</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-end gap-2">
            {/* Facebook */}
            <SocialIcon label="Facebook">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </SocialIcon>

            {/* Instagram */}
            <SocialIcon label="Instagram">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="white" />
              </svg>
            </SocialIcon>

            {/* X / Twitter */}
            <SocialIcon label="X">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </SocialIcon>

            {/* LinkedIn */}
            <SocialIcon label="LinkedIn">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </SocialIcon>

            {/* YouTube */}
            <SocialIcon label="YouTube">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#16a34a" />
              </svg>
            </SocialIcon>
          </div>

        </div>
      </footer>
    </div>
  );
}