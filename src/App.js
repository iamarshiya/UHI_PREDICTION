import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Riskmap from "./pages/Riskmap";
import Forecast from "./pages/Forecast";
import Locality from "./pages/Locality";
import Mitigation from "./pages/Mitigation";
import about from "./pages/about";
import Chatbot from "./components/chatbot";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<Mitigation />} />
        <Route path="/riskmap" element={<Riskmap />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/locality" element={<Locality />} />
        <Route path="/mitigation" element={<Mitigation />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;