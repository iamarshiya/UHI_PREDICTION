import { useState, useEffect } from "react";

const NibbleLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="20" fill="#4ade80" opacity="0.15" />
    <path
      d="M20 8C13.4 8 8 13.4 8 20s5.4 12 12 12 12-5.4 12-12S26.6 8 20 8zm-2 16.5c-2.5-1.2-4-3.7-4-6.5 0-1.5.4-2.9 1.2-4.1C16.4 15.7 18 17.7 18 20v4.5zm4 0V20c0-2.3 1.6-4.3 3.8-5.1.8 1.2 1.2 2.6 1.2 4.1 0 2.8-1.5 5.3-4 6.5z"
      fill="#22c55e"
    />
  </svg>
);

export default function NibbleLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white overflow-x-hidden">
      
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-md bg-white/95 backdrop-blur-sm" : "bg-white"
        }`}
        style={{ borderBottom: "1px solid #f0f0f0" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <NibbleLogo />
            <span className="text-xl font-bold">Nibble</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Home", "About us", "Features", "Services", "Contact"].map(
              (item) => (
                <a key={item} href="#" className="nav-link">
                  {item}
                </a>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <button className="btn-outline">Login</button>
            <button className="btn-green">Get in touch</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative w-full"
        style={{ height: "100vh", minHeight: 560, paddingTop: 64 }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            top: 64,
            backgroundImage: "url('public\climate image nibble.jpg.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Dark Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(0,0,0,0.65), rgba(0,0,0,0.3))",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-16">
          <h1
            className={`text-white text-5xl font-bold transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            AI-Powered <span className="bg-white text-black px-2">
              Environmental
            </span>
            <br />
            Risk Prediction
            <br />
            for Smarter Cities
          </h1>

          <p
            className={`text-white/80 mt-6 max-w-md transition-all duration-700 delay-200 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Harnessing satellite data and machine learning to predict
            environmental risks before they happen.
          </p>

          <div
            className={`mt-8 flex gap-4 transition-all duration-700 delay-300 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <button className="bg-lime-500 hover:bg-lime-600 px-6 py-3 rounded-full font-bold">
              Get Started
            </button>

            <button className="border border-white px-6 py-3 rounded-full text-white">
              Learn More
            </button>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400" />
      </section>
    </div>
  );
}