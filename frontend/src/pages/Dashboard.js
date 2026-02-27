import { useState, useEffect } from "react";
import { 
  BarChart, Bar, 
  LineChart, Line, 
  ScatterChart, Scatter, ZAxis,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
  body { background: #f3f4f6; }
  
  @keyframes fadeUp { from { opacity:0; transform:translateY(15px); } to { opacity:1; transform:translateY(0); } }
  .animate-up { animation: fadeUp 0.5s ease both; }
  
  /* Custom scrollbar for dropdown */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
`;

export const PUNE_LOCALITIES = [
  "Agarkar Nagar", "Ahire", "Alandi Mhatobachi", "Ambadwet", "Ambegaon Budruk", "Anurag Society", "Ashtapur", "Askarwadi", "Aundh", "Bakori", "Balasaheb Thakare Nagar", "Baner Annex", "Bhim Nagar", "Bhose", "Biwri", "Block B6", "Bopgaon", "Chaitanya Nagar", "Chambli", "Chandan Tekadi", "Chande", "Charholi Budruk", "Chikhali", "Chokhi Dhani", "Chovisawadi", "Darumbre", "Dattawadi", "Defence Area", "Dehu Phata", "Dehu Road", "Devadi", "Dive", "Donaje", "Ganesh Nagar", "Ganesh Nagar Chikhali", "Ganesh Peth", "Garade", "Garden City", "Gaud Dara", "Gawdewadi", "Ghera Sinhagad", "Girinagar", "Godambewadi", "Gorhe Bk.", "Hadapsar", "Haveli", "Hinjawadi Phase II", "Jadhav Wadi", "Jadhavwadi", "Kalas Malwadi", "Kalewadi", "Kalwad", "Kasarsai", "Kate Patil Nagar", "Keshav Nagar", "Kesnand", "Khadakwadi", "Khadewadi", "Khese Park", "Kodit Bk.", "Kodit Kh.", "Kolwadi", "Kondhawe-Dhawade", "Kondhwa Budruk", "Koregaon Bhima", "Koyali Tarf Chakan", "Kunjirwadi", "Kurali", "Kusagaon", "Loni Kalbhor", "M I D C Technology Park", "MIDC", "Madhala Vada", "Mandvi Bk.", "Manekhadi", "Mangadewadi", "Mangalwar Peth", "Manjari Budruk", "Manjari Khurd", "Materewadi", "Moee", "Moi", "Morewadi", "Mukaiwadi", "Mukund Nagar", "Mulkhed", "Mundhwa", "Murkutenagar", "NIBM उंद्री रोड", "Naigaon", "Nanekarwadi", "Narayan Peth", "Nighoje", "Pawarwadi", "Perne", "Phase-3", "Phugewadi", "Phulgaon", "Phursungi", "Pimpalgaon", "Pimpri-Chinchwad", "Pune", "Rakshak Nagar", "Rakshak Society", "Ramoshiwadi", "Rase", "Sai Nagar", "Saibaba Nagar", "Sambhajinagar", "Sangamvadi", "Sant Eknath Nagar 2", "Sashte", "Saswad Rural", "Saykarwadi", "Sector No. 28", "Shindevadi", "Shiv Nagar", "Shivare", "Sortapwadi Phata", "Sus", "Taljai Forest Area", "Tarade", "Telco Quality Aid Center", "Thapewadi", "Tophakhana", "Urawade", "Varve Bk", "Wadakinala", "Wadegaon", "Wadgaon Budruk", "Wadgaon Shinde", "Wadgaonghenand", "Wadhu Bk.", "Wadki", "Wagholi", "Wangani", "Wardade", "Warje", "Warvadi", "Yerawada", "hiware", "शिवशंभो पार्क"
];


export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Pune City");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [topPlacesData, setTopPlacesData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const [riskPieData, setRiskPieData] = useState([]);
  const [kpiData, setKpiData] = useState({ risk: "--", greenDeficit: "--", population: "--", resilience: "--" });
  
  const [criticalZonesList, setCriticalZonesList] = useState([]);
  const [showCriticalModal, setShowCriticalModal] = useState(false);
  
  const [rawData, setRawData] = useState(null);

  const filtered = PUNE_LOCALITIES.filter(l => l.toLowerCase().includes(search.toLowerCase()));

  const processData = (data, targetLocality) => {
      setCity(targetLocality);
      
      const mostLivable = data.rankings?.most_livable || [];
      const leastLivable = data.rankings?.least_livable || [];
      
      // 1. Top Places (Combining Most Livable for positive chart)
      const topLiv = mostLivable.map(item => ({
        name: item.locality || "Unknown",
        index: Math.round(item.livability_index) || 0,
        risk: Math.round(item.risk) || 0
      }));
      setTopPlacesData(topLiv.slice(0, 10));

      let features = (data.features || []).map(f => f.properties);

      // 2. Scatter Data & Pie Data (Always show city-wide context for charts)
      const scat = features.map(p => ({
        risk: p.risk ? Math.round(p.risk) : 0,
        green: p.green_deficit !== undefined ? p.green_deficit : 0,
        area: p.locality || 'Unknown'
      }));
      setScatterData(scat);

      let high = 0, mod = 0, safe = 0;
      let criticalLocs = new Set();
      features.forEach(p => {
        const r = p.risk || 0;
        if (r > 60) {
            high++;
            if (p.locality && p.locality !== "Unknown") criticalLocs.add(p.locality);
        }
        else if (r >= 30) mod++;
        else safe++;
      });
      setRiskPieData([
        { name: 'High Risk (>60)', value: high, color: '#ef4444' },
        { name: 'Moderate Risk (30-60)', value: mod, color: '#f59e0b' },
        { name: 'Low Risk (<30)', value: safe, color: '#10b981' }
      ]);
      setCriticalZonesList(Array.from(criticalLocs));

      const trends = leastLivable.slice(0, 10).map(p => ({
        time: p.locality ? p.locality.substring(0, 10) : 'Unknown',
        temp: p.risk ? Math.round(p.risk) : 0,
        average: p.livability_index ? Math.round(100 - p.livability_index) : 0
      }));
      setTrendData(trends);

      // KPI Filtering - Focus KPIs strictly on the targeted locality!
      if (targetLocality && targetLocality !== "Pune" && targetLocality !== "Pune City") {
         const localFeatures = features.filter(f => f.locality === targetLocality);
         if (localFeatures.length > 0) features = localFeatures;
      }

      if (features.length > 0) {
        const avgRisk = features.reduce((acc, p) => acc + (p.risk || 0), 0) / features.length;
        const avgGreenDeficit = features.reduce((acc, p) => acc + (p.green_deficit || 0), 0) / features.length;
        const pop = features.reduce((acc, p) => acc + (p.people_at_risk || 0), 0);
        const avgReslience = features.reduce((acc, p) => acc + (p.resilience_score || 0), 0) / features.length;
        
        setKpiData({
          risk: avgRisk.toFixed(2),
          greenDeficit: avgGreenDeficit.toFixed(2) + '%',
          population: pop.toLocaleString(),
          resilience: avgReslience.toFixed(2),
          temp: (avgRisk * 0.15 + 28).toFixed(1) + "°C"
        });
      } else {
        setKpiData({ risk: "N/A", greenDeficit: "N/A", population: "N/A", resilience: "N/A", temp: "N/A" });
      }
  };

  const fetchData = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:5001";
      const res = await fetch(`${apiUrl}/analyze?city=Pune`);
      if (!res.ok) throw new Error("Failed to fetch data from backend. Make sure the python backend is running locally on port 5001.");
      
      const data = await res.json();
      setRawData(data);
      processData(data, "Pune City");
      
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectCity = (selected) => {
    setSearch(selected);
    setShowDropdown(false);
    if (rawData) {
       processData(rawData, selected);
    }
  };

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 64 }}>
      <style>{STYLES}</style>

      {/* ── Search Header ── */}
      <div style={{ background: "#ffffff", padding: "40px 32px 64px", borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
          <div>
            <h1 style={{ fontSize: 36, fontWeight: 900, color: "#111827", letterSpacing: "-1px", marginBottom: 8 }}>
              City Analytics
            </h1>
            <p style={{ color: "#4b5563", fontSize: 15 }}>Real-time Urban Heat Island (UHI) index & risk monitoring.</p>
          </div>

          <div style={{ position: "relative", width: "100%", maxWidth: 360, zIndex: 50 }}>
            <div style={{ position: "relative" }}>
              <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="18" height="18" fill="none" stroke="#6b7280" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search Pune locality..."
                value={search}
                onChange={e => { setSearch(e.target.value); setShowDropdown(true); }}
                onFocus={() => setShowDropdown(true)}
                style={{ width: "100%", padding: "14px 16px 14px 44px", borderRadius: 12, border: "1px solid #e5e7eb", background: "#f9fafb", color: "#111827", fontSize: 14, outline: "none", transition: "all 0.2s" }}
                onFocusCapture={e => e.target.style.borderColor = "#c084fc"}
                onBlurCapture={e => e.target.style.borderColor = "#e5e7eb"}
              />
              {/* Dropdown */}
              {showDropdown && filtered.length > 0 && search !== city && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", boxShadow: "0 10px 40px rgba(0,0,0,0.2)", overflow: "hidden" }}>
                  {filtered.map(loc => (
                    <div key={loc} onClick={() => handleSelectCity(loc)}
                      style={{ padding: "12px 16px", fontSize: 13, color: "#111827", cursor: "pointer", borderBottom: "1px solid #f3f4f6" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f0fdf4"}
                      onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                    >
                      {loc}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Dashboard Content ── */}
      <div style={{ maxWidth: 1280, margin: "-32px auto 0", padding: "0 32px", position: "relative", zIndex: 10 }}>
        
        {loading ? (
          <div style={{ background: "#fff", borderRadius: 20, padding: 64, textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <div style={{ width: 40, height: 40, border: "3px solid #e5e7eb", borderTopColor: "#10b981", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>Fetching live satellite and weather data...</h3>
            <p style={{ color: "#6b7280", fontSize: 14, marginTop: 4 }}>Calculating LST, NDVI, and risk parameters from the Earth Engine. This may take about ~25 seconds.</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : errorMsg ? (
          <div style={{ background: "#fef2f2", borderRadius: 20, padding: 40, textAlign: "center", border: "1.5px solid #fecaca" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#991b1b" }}>Wait! Backend Connection Failed</h3>
            <p style={{ color: "#b91c1c", fontSize: 14, marginTop: 4, maxWidth: 600, margin: "4px auto 0" }}>{errorMsg}</p>
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 40 }}>
              <KpiCard label="Avg Heat Risk Score" value={kpiData.risk} sub="Score > 60 is High" trend="up" icon="🌡️" delay="0.05s" />
              <div onClick={() => setShowCriticalModal(true)} style={{ cursor: "pointer" }}>
                <KpiCard label="Critical Risk Zones" value={criticalZonesList.length} sub="Tap to view localities" trend="up" icon="🚨" delay="0.1s" isClickable={true} />
              </div>
              <KpiCard label="Est. Population Exposed" value={kpiData.population} sub="Vulnerable demographic" trend="up" icon="👥" delay="0.15s" />
              <KpiCard label="Live Est. Temperature" value={kpiData.temp} sub="Calculated from LST" trend="up" icon="☀️" delay="0.18s" />
              <KpiCard label="Urban Resilience Score" value={kpiData.resilience} sub="Score from 0-100" trend="down" icon="🌿" delay="0.2s" />
            </div>

            {/* Charts Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 24, alignItems: "start" }}>

              {/* Col 1: Top 10 Places & Trend */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                
                {/* Bar Chart: Most Livable / Risk */}
                <ChartCard title={`Top 10 Most Livable Localities`} sub="Ranked by Livability Index vs UHI Heat Risk" delay="0.25s">
                  <div style={{ height: 320, marginTop: 16 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topPlacesData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                        <Tooltip
                          contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                          labelStyle={{ fontWeight: 700, color: '#111827', marginBottom: 4 }}
                        />
                        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                        <Bar dataKey="index" name="Livability Index" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                        <Bar dataKey="risk" name="Heat Risk Score" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>

                {/* Line Graph: Heat Trend */}
                <ChartCard title="Least Livable Resilience Trend" sub="Risk levels compared to baseline vulnerability in critical zones" delay="0.35s">
                  <div style={{ height: 280, marginTop: 16 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} domain={['dataMin - 5', 'dataMax + 5']} />
                        <Tooltip
                          contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                        />
                        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                        <Line type="monotone" dataKey="temp" name="UHI Risk Score" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="average" name="Vulnerability Baseline" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>

              </div>

              {/* Col 2: Scatter, Pie, Map placeholder */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                
                {/* Scatter Plot */}
                <ChartCard title="Heat Risk vs. Green Deficit" sub="Correlation across sampled data points" delay="0.3s">
                  <div style={{ height: 260, marginTop: 16 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 10, bottom: 0, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis type="number" dataKey="green" name="Green Deficit" unit="%" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} />
                        <YAxis type="number" dataKey="risk" name="Risk Score" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} domain={['dataMin-1', 'dataMax+1']} />
                        <ZAxis type="category" dataKey="area" name="Zone" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                        <Scatter name="Zones" data={scatterData} fill="#f59e0b">
                           {scatterData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.risk > 60 ? "#ef4444" : entry.risk < 30 ? "#10b981" : "#f59e0b"} />
                           ))}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>

                {/* Pie Chart */}
                <ChartCard title="Area Risk Distribution" sub="Total landmass risk categorization" delay="0.4s">
                  <div style={{ height: 260, marginTop: 8 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={riskPieData}
                          cx="50%" cy="50%"
                          innerRadius={60} outerRadius={90}
                          paddingAngle={4}
                          dataKey="value"
                          stroke="none"
                        >
                          {riskPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                        <Legend wrapperStyle={{ fontSize: 12 }} verticalAlign="bottom" height={36}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>

                

              </div>
            </div>
          </>
        )}
      </div>

      {/* Critical Zones Modal */}
      {showCriticalModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          {/* Backdrop */}
          <div 
            onClick={() => setShowCriticalModal(false)}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", animation: "fadeIn 0.2s ease" }}
          />
          {/* Modal Content */}
          <div style={{ position: "relative", background: "#fff", borderRadius: 24, width: "100%", maxWidth: 500, maxHeight: "80vh", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", animation: "fadeUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            <div style={{ padding: "24px 32px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 24 }}>🚨</span>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", letterSpacing: "-0.5px" }}>Critical Risk Zones</h2>
              </div>
              <button 
                onClick={() => setShowCriticalModal(false)}
                style={{ width: 32, height: 32, borderRadius: "50%", background: "#f3f4f6", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280" }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: "16px 32px", overflowY: "auto" }}>
              <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 16 }}>These sampled localities are currently reading extreme Heat Risk Scores &gt; 60 and require mitigation.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {criticalZonesList.length === 0 ? (
                  <div style={{ padding: "12px 16px", color: "#15803d", fontWeight: "600", fontSize: "14px", background: "#f0fdf4", borderRadius: "12px" }}>No critical zones detected in this sample!</div>
                ) : (
                  criticalZonesList.map((zone, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#fef2f2", borderRadius: 12, border: "1px solid #fee2e2" }}>
                      <span style={{ fontWeight: 700, color: "#991b1b", fontSize: 15 }}>{zone}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", background: "#fee2e2", padding: "4px 8px", borderRadius: 6 }}>Action Required</span>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div style={{ padding: "24px 32px", borderTop: "1px solid #f3f4f6", background: "#f9fafb", borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
              <button 
                onClick={() => setShowCriticalModal(false)}
                style={{ width: "100%", padding: "14px", borderRadius: 12, background: "#111827", color: "#fff", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer" }}
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  );
}

// --- Small Reusable UI Components ---

function KpiCard({ label, value, sub, trend, icon, delay, isClickable }) {
  const isUp = trend === "up";
  return (
    <div className="animate-up" style={{ 
      background: "#fff", borderRadius: 20, padding: 24, paddingBottom: 20, 
      boxShadow: isClickable ? "0 8px 30px rgba(239, 68, 68, 0.15)" : "0 4px 24px rgba(0,0,0,0.04)", 
      border: isClickable ? "1.5px solid #fca5a5" : "1px solid #f3f4f6", 
      animationDelay: delay,
      transition: "transform 0.2s, box-shadow 0.2s"
    }}
    onMouseEnter={e => { if (isClickable) e.currentTarget.style.transform = "translateY(-4px)" }}
    onMouseLeave={e => { if (isClickable) e.currentTarget.style.transform = "translateY(0)" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <span style={{ fontSize: 24, background: "#f3f4f6", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12 }}>{icon}</span>
        <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 8px", borderRadius: 6, background: isUp ? "#fee2e2" : "#dcfce7", color: isUp ? "#b91c1c" : "#15803d" }}>
          {isUp ? "↑" : "↓"} {sub.split(" ")[0]}
        </span>
      </div>
      <div style={{ fontSize: 32, fontWeight: 900, color: "#111827", lineHeight: 1, letterSpacing: "-0.5px" }}>{value}</div>
      <div style={{ fontSize: 13, color: "#6b7280", marginTop: 8, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function ChartCard({ title, sub, children, delay }) {
  return (
    <div className="animate-up" style={{ background: "#fff", borderRadius: 24, padding: "28px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.04)", border: "1px solid #f3f4f6", animationDelay: delay }}>
      <h3 style={{ fontSize: 18, fontWeight: 800, color: "#111827", letterSpacing: "-0.3px" }}>{title}</h3>
      <p style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>{sub}</p>
      {children}
    </div>
  );
}