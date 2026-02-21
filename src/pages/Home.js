import { useState } from "react";

const NibbleLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#22c55e" />
    <path
      d="M20 8 C14 8 10 13 10 18 C10 22 12 25 16 27 C14 29 13 31 14 33 C16 31 18 30 20 30 C22 30 24 31 26 33 C27 31 26 29 24 27 C28 25 30 22 30 18 C30 13 26 8 20 8Z"
      fill="white"
      opacity="0.9"
    />
    <ellipse cx="20" cy="18" rx="5" ry="6" fill="#22c55e" />
  </svg>
);

export default function NibbleLanding() {
  const [activeNav, setActiveNav] = useState("Home");
  const navItems = ["Home", "About us", "Features", "Services", "Contact"];

  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Top yellow accent border */}
      <div className="h-1 w-full bg-yellow-400" />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2">
          <NibbleLogo />
          <span className="text-2xl font-bold text-gray-900 tracking-tight">Nibble</span>
        </div>

        <ul className="flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => setActiveNav(item)}
                className={`text-sm font-medium transition-colors pb-0.5 ${
                  activeNav === item
                    ? "text-gray-900 font-bold border-b-2 border-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button className="px-5 py-2 text-sm font-semibold text-gray-900 border-2 border-gray-800 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-200">
            Login
          </button>
          <button className="px-5 py-2 text-sm font-semibold text-gray-900 bg-lime-400 rounded-full hover:bg-lime-500 transition-all duration-200">
            Get in touch
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full overflow-hidden" style={{ height: "calc(100vh - 73px)" }}>

        {/* Background Image */}
        <img
          src="/climate image nibble.jpg.jpeg"
          alt="Climate environmental background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Hero Text */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10 max-w-lg">
          <h1 className="text-5xl font-extrabold text-white leading-snug drop-shadow-2xl">
            AI-Powered{" "}
            <span className="bg-white text-gray-900 px-2 py-0.5 leading-relaxed inline">
              Environmental
            </span>
            <br />
            Risk Prediction
            <br />
            for Smarter Cities
          </h1>
        </div>
      </div>
    </div>
  );
}