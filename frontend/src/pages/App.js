import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Riskmap from "./pages/Riskmap";
import Forecast from "./pages/Forecast";
import Locality from "./pages/location";
import Mitigation from "./pages/Mitigation";
import about from "./pages/about";
import Contact from "./pages/Contact";
import Feature from "./pages/Feature";
import Chatbot from "./components/chatbot";
import CommunityFeeddback from "./pages/CommunityFeeddback";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<about />} />
        <Route path="/riskmap" element={<Riskmap />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/locality" element={<Locality />} />
        <Route path="/mitigation" element={<Mitigation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feature" element={<Feature />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/community-feedback" element={<CommunityFeeddback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;