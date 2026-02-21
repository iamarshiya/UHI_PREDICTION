import { useState, useEffect } from "react";

const BellIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2 8 6 12 14 4" />
  </svg>
);

const Toast = ({ message, show }) => (
  <div className={`fixed bottom-7 right-7 z-50 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-2xl transition-all duration-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
    {message}
  </div>
);

// 🔑 Replace with your Google Maps Embed API key
// Get one at: https://console.cloud.google.com/apis/credentials
// Make sure "Maps Embed API" is enabled for your project
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

export default function Dashboard() {
  const [place1, setPlace1] = useState("Pimpri Chinchwad");
  const [place2, setPlace2] = useState("Pune");
  const [selected, setSelected] = useState("tabular");
  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const handleGenerate = () => {
    const label = selected === "tabular" ? "Tabular" : "Graphical";
    showToast(`✓ ${label} report for ${place2 || "selected place"} generated!`);
  };

  return (
    <div className="flex min-h-screen bg-blue-50 font-sans">

      {/* Sidebar */}
      <div className="w-3 bg-green-200 rounded-r-xl flex-shrink-0" />

      {/* Main */}
      <div className="flex-1 p-6 flex flex-col gap-5">

        {/* Topbar */}
        <div className="flex justify-end items-center gap-3">
          <button className="relative p-2 rounded-full hover:bg-green-100 transition-colors text-gray-700">
            <BellIcon />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-blue-50" />
          </button>
          <div className="flex items-center gap-2 bg-white border border-green-200 rounded-full px-4 py-2 w-48 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-all">
            <span className="text-gray-400"><SearchIcon /></span>
            <input
              type="text"
              placeholder="Search"
              className="text-sm text-black bg-transparent outline-none w-full placeholder-gray-400"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">

          {/* Left Panel */}
          <div className="flex flex-col gap-4">

            {/* Places Card */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <h2 className="font-bold text-xl text-gray-800 mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>Places</h2>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  value={place1}
                  onChange={e => setPlace1(e.target.value)}
                  placeholder="Enter place 1"
                  className="bg-white border border-green-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all w-full"
                />
                <input
                  type="text"
                  value={place2}
                  onChange={e => setPlace2(e.target.value)}
                  placeholder="Enter place 2"
                  className="bg-white border border-green-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all w-full"
                />
              </div>
            </div>

            {/* Dashboard Card */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <h2 className="font-bold text-xl text-gray-800 mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>DashBoard</h2>
              <p className="text-base font-semibold text-gray-700 mb-3">Select :</p>

              <div className="bg-white border border-green-200 rounded-lg overflow-hidden">
                {[
                  { value: "tabular", label: "Tabular" },
                  { value: "graphical", label: "Graphical" },
                ].map((opt, i, arr) => (
                  <div
                    key={opt.value}
                    onClick={() => setSelected(opt.value)}
                    className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors text-sm
                      ${selected === opt.value ? "bg-green-50 font-medium text-gray-800" : "text-gray-600 hover:bg-green-50"}
                      ${i < arr.length - 1 ? "border-b border-green-100" : ""}`}
                    role="option"
                    aria-selected={selected === opt.value}
                  >
                    {opt.label}
                    <span className={`transition-opacity ${selected === opt.value ? "opacity-100 text-green-600" : "opacity-0"}`}>
                      <CheckIcon />
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleGenerate}
                className="mt-5 border-2 border-green-500 text-green-600 font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-green-500 hover:text-white transition-all active:scale-95"
              >
                Generate Report
              </button>
            </div>

          </div>

          {/* Map */}
          <div className="bg-white border border-green-200 rounded-2xl overflow-hidden h-96 md:h-[430px]">
            <iframe
              title="Pune Map"
              src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(place2 || "Pune")}&zoom=12`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
            />
          </div>

        </div>
      </div>

      <Toast message={toast.message} show={toast.show} />
    </div>
  );
}