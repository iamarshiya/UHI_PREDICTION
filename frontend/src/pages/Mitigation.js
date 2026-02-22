import { useState, useRef, useEffect } from "react";

const localities = [
  { rank: 1, name: "Area A", risk: 95 },
  { rank: 2, name: "Area B", risk: 90 },
  { rank: 3, name: "Area C", risk: 65 },
  { rank: 4, name: "Area D", risk: 84 },
  { rank: 5, name: "Area E", risk: 55 },
  { rank: 6, name: "Area F", risk: 69 },
  { rank: 7, name: "Area I", risk: 28 },
  { rank: 8, name: "Area G", risk: 42 },
  { rank: 9, name: "Area H", risk: 77 },
];

const getRiskLevel = (score) => {
  if (score >= 75) return "High";
  if (score >= 50) return "Medium";
  return "Low";
};

const riskColors = {
  High: { dot: "bg-red-500", text: "text-red-600", bg: "bg-red-50" },
  Medium: { dot: "bg-yellow-400", text: "text-yellow-600", bg: "bg-yellow-50" },
  Low: { dot: "bg-green-500", text: "text-green-600", bg: "bg-green-50" },
};

const filterOptions = ["All", "High", "Medium", "Low"];

export default function RiskTable() {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = localities.filter((loc) => {
    const matchSearch = loc.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      selectedFilter === "All" || getRiskLevel(loc.risk) === selectedFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/1739626936_img-climate.webp')" }}
    >
      {/* Slight overlay for readability */}
      <div className="absolute inset-0 bg-white/10" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-3xl mx-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6">

        {/* Top Controls */}
        <div className="flex items-start gap-4 mb-5">
          {/* Search */}
          <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 shadow-sm">
            <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search Locality...."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none"
            />
          </div>

          {/* Risk Filter Dropdown */}
          <div className="flex flex-col gap-1 min-w-[180px]" ref={dropdownRef}>
            <label className="text-xs font-medium text-gray-500 ml-1">Risk Filter:</label>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 shadow-sm hover:border-gray-300 transition-all"
              >
                <span>{selectedFilter === "All" ? "" : selectedFilter}</span>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-1 overflow-hidden">
                  {filterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedFilter(option);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors ${
                        selectedFilter === option ? "bg-green-50" : ""
                      }`}
                    >
                      {option === "All" ? (
                        <>
                          {selectedFilter === "All" && (
                            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          <span className={`${selectedFilter === "All" ? "ml-0" : "ml-7"} font-medium text-gray-800`}>All</span>
                        </>
                      ) : (
                        <>
                          <span className={`w-3 h-3 rounded-full shrink-0 ${riskColors[option].dot}`} />
                          <span className="text-gray-700">{option}</span>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100/90">
                <th className="text-left px-5 py-3 font-semibold text-gray-700 w-20">Rank</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Locality</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700 w-28">Risk Score</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700 w-28">Risk</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-400 bg-white">
                    No localities found.
                  </td>
                </tr>
              ) : (
                filtered.map((loc, idx) => {
                  const level = getRiskLevel(loc.risk);
                  const colors = riskColors[level];
                  const isEven = idx % 2 === 0;
                  return (
                    <tr
                      key={loc.rank}
                      className={`border-t border-gray-100 transition-colors hover:bg-blue-50/40 ${
                        isEven ? "bg-white/90" : "bg-gray-50/80"
                      }`}
                    >
                      <td className="px-5 py-3.5 text-gray-600">{loc.rank}</td>
                      <td className="px-5 py-3.5 text-gray-800 font-medium">{loc.name}</td>
                      <td className="px-5 py-3.5 text-gray-700">{loc.risk}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
                          <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                          {level}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        <p className="text-xs text-gray-400 mt-3 text-right">
          Showing {filtered.length} of {localities.length} localities
        </p>
      </div>
    </div>
  );
}